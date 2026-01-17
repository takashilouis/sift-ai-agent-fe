"use client";

import { useState, useCallback, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Sidebar } from "./components/Sidebar";
import { TopNav } from "./components/TopNav";
import { ResearchInputBar } from "./components/ResearchInputBar";
import { EmptyState } from "./components/EmptyState";
import { WorkflowTimeline } from "./components/WorkflowTimeline";
import { StreamViewer } from "./components/StreamViewer";
import { FinalReportView } from "./components/FinalReportView";
import { ProgressTracker } from "./components/ProgressTracker";
import { streamResearch } from "@/app/api/client";
import { DEFAULT_STEPS, getStepsFromPlan, AgentStep, ResearchState, TaskResult } from "@/types/research";

function ResearchPageContent() {
    const searchParams = useSearchParams();
    const [isStreaming, setIsStreaming] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);
    const [steps, setSteps] = useState<AgentStep[]>(DEFAULT_STEPS);
    const [streamChunks, setStreamChunks] = useState<any[]>([]);
    const [researchState, setResearchState] = useState<ResearchState | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isDeepResearch, setIsDeepResearch] = useState(false);
    const [progress, setProgress] = useState(0);
    const [currentTask, setCurrentTask] = useState("");

    // Load research report from URL parameter if present
    useEffect(() => {
        const reportId = searchParams.get('id');

        // CRITICAL: Don't interfere if we're currently streaming!
        if (isStreaming) {
            return;
        }

        if (reportId) {
            // Reset state before loading new report
            setIsStreaming(false);
            setStreamChunks([]);
            setError(null);

            // Fetch the research report
            fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/history/research/${reportId}`)
                .then(res => res.json())
                .then(data => {
                    setHasStarted(true);
                    setResearchState({
                        query: data.query,
                        final_report: data.content
                    });
                    // Don't show steps for already completed reports loaded from history
                    setSteps([]);
                    setProgress(100);
                    setCurrentTask("Research complete");
                })
                .catch(err => {
                    console.error("Failed to load research report:", err);
                    setError("Failed to load research report");
                });
        } else {
            // No report ID in URL, reset to empty state
            setHasStarted(false);
            setResearchState(null);
            setSteps(DEFAULT_STEPS);
            setStreamChunks([]);
            setError(null);
            setProgress(0);
            setCurrentTask("");
        }
    }, [searchParams, isStreaming]);

    const handleResearch = useCallback(async (query: string) => {
        setIsStreaming(true);
        setHasStarted(true);
        setError(null);
        setStreamChunks([]);
        setResearchState({ query });
        setProgress(0);
        setCurrentTask("Starting research...");

        // Reset steps with first step as ACTIVE so it shows immediately
        setSteps(DEFAULT_STEPS.map((step, index) => ({
            ...step,
            status: index === 0 ? "active" : "pending"
        })));

        try {
            for await (const chunk of streamResearch({ query, deep_research: isDeepResearch })) {
                // Handle report_id chunk
                if (chunk.type === "report_id" && chunk.report_id) {
                    // Update URL with report ID without reloading
                    const newUrl = `${window.location.pathname}?id=${chunk.report_id}`;
                    window.history.pushState({ path: newUrl }, "", newUrl);
                    continue;
                }

                // Add chunk to stream viewer
                setStreamChunks(prev => [...prev, chunk]);

                // Update progress from backend
                if (chunk.progress !== undefined) {
                    setProgress(chunk.progress);
                }

                // Update current task description
                if (chunk.current_task) {
                    setCurrentTask(chunk.current_task);
                }

                // Update research state
                if (chunk.state) {
                    setResearchState(prev => {
                        const newState = {
                            ...prev,
                            ...chunk.state,
                        };

                        // Extract legacy fields from task_results for backward compatibility
                        if (chunk.state.task_results) {
                            const taskResults = chunk.state.task_results;

                            // Extract summary, sentiment, comparison from task results
                            for (const taskIdx in taskResults) {
                                const result: TaskResult = taskResults[taskIdx];

                                if (result.summary && !newState.summary) {
                                    newState.summary = result.summary;
                                }
                                if (result.sentiment && !newState.sentiment) {
                                    newState.sentiment = result.sentiment;
                                }
                                if (result.comparison && !newState.comparison) {
                                    newState.comparison = result.comparison;
                                }
                            }
                        }

                        return newState;
                    });

                    // Update steps based on plan (if plan is available)
                    // CRITICAL FIX: Only update steps from plan if we haven't already initialized them differently
                    // or if this is the explicit planner step
                    if (chunk.state.plan && chunk.step === "planner") {
                        // We defer step updates to the dedicated 'chunk.step' handler below 
                        // to avoid race conditions, but we ensure the plan data is available in state
                    }
                }

                // Update step status
                if (chunk.step) {
                    console.log('[Step Update]', chunk.step, 'current_task_index:', chunk.state?.current_task_index);

                    setSteps(prev => {
                        // CRITICAL FIX: Re-derive steps from plan if available in chunk.state, 
                        // preserving status of existing steps where possible.
                        // This handles the "planner" completion event where we switch from DEFAULT_STEPS to plan-based steps.

                        let currentSteps = [...prev];

                        // If this is the planner finishing, we need to switch to the plan-based steps
                        if (chunk.step === "planner" && chunk.state?.plan) {
                            const planSteps = getStepsFromPlan(chunk.state.plan);

                            // Map plan steps, marking planner as completed
                            currentSteps = planSteps.map((step, index) => {
                                if (step.name === "planner") {
                                    return { ...step, status: "completed" };
                                } else if (index === 1) {
                                    // First task after planner should be active
                                    return { ...step, status: "active" };
                                }
                                return step;
                            });
                            return currentSteps;
                        }

                        console.log('[Current Steps]', currentSteps.map(s => `${s.name}:${s.status}`).join(', '));

                        // Special handling for task_executor - update the current task
                        if (chunk.step === "task_executor" && chunk.state?.current_task_index !== undefined) {
                            // Backend increments index AFTER task execution, so current_task_index points to NEXT task
                            // The task that just completed is current_task_index - 1
                            const completedTaskIndex = chunk.state.current_task_index - 1;
                            const nextTaskIndex = chunk.state.current_task_index;

                            console.log('[Task Executor] Completed task_' + completedTaskIndex + ', next is task_' + nextTaskIndex);

                            return currentSteps.map((step) => {
                                // Mark the completed task as completed
                                if (step.name === `task_${completedTaskIndex}` && completedTaskIndex >= 0) {
                                    console.log('[Task Executor] Marking task_' + completedTaskIndex + ' as completed');
                                    return { ...step, status: "completed" };
                                }
                                // Mark the next task as active
                                if (step.name === `task_${nextTaskIndex}`) {
                                    console.log('[Task Executor] Marking task_' + nextTaskIndex + ' as active');
                                    return {
                                        ...step,
                                        status: "active",
                                        timestamp: chunk.timestamp || new Date().toISOString(),
                                    };
                                }
                                return step;
                            });
                        }

                        // For other steps (planner, finalize), match by name
                        return currentSteps.map((step) => {
                            if (step.name === chunk.step) {
                                console.log('[Step Match] Marking ' + chunk.step + ' as active');
                                return {
                                    ...step,
                                    status: "active",
                                    timestamp: chunk.timestamp || new Date().toISOString(),
                                };
                            }

                            // Mark previously active steps as completed when moving to next step
                            const stepIndex = currentSteps.findIndex(s => s.name === step.name);
                            const currentIndex = currentSteps.findIndex(s => s.name === chunk.step);
                            if (currentIndex >= 0 && stepIndex < currentIndex && step.status === "active") {
                                return { ...step, status: "completed" };
                            }

                            return step;
                        });
                    });
                }
            }

            // Mark the last active step as completed when streaming finishes
            setSteps(prev =>
                prev.map(step =>
                    step.status === "active" ? { ...step, status: "completed" } : step
                )
            );

            // Set progress to 100% and final message
            setProgress(100);
            setCurrentTask("Research complete!");
        } catch (err) {
            console.error("Research error:", err);
            setError(err instanceof Error ? err.message : "An error occurred during research");

            // Mark current step as error
            setSteps(prev =>
                prev.map(step =>
                    step.status === "active" ? { ...step, status: "error" } : step
                )
            );
        } finally {
            setIsStreaming(false);
        }
    }, [isDeepResearch]);

    const handlePromptClick = useCallback((prompt: string) => {
        handleResearch(prompt);
    }, [handleResearch]);

    return (
        <div className="flex h-screen bg-background">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <TopNav />

                <main className="flex-1 overflow-y-auto">
                    <div className="max-w-7xl mx-auto p-6 space-y-6">
                        {/* Header */}
                        <div className="space-y-2">
                            <h1 className="text-3xl font-semibold text-foreground">
                                Research report
                            </h1>
                            {researchState?.query && (
                                <p className="text-muted-foreground">
                                    {researchState.query}
                                </p>
                            )}
                        </div>

                        {/* Input Bar */}
                        <ResearchInputBar
                            onSubmit={handleResearch}
                            isLoading={isStreaming}
                            isDeepResearch={isDeepResearch}
                            onDeepResearchChange={setIsDeepResearch}
                        />

                        {/* Error Display */}
                        {error && (
                            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                                <strong>Error:</strong> {error}
                            </div>
                        )}

                        {/* Progress Tracker - ALWAYS VISIBLE DURING RESEARCH */}
                        {hasStarted && !researchState?.final_report && (
                            <div className="space-y-4">
                                <ProgressTracker
                                    progress={progress}
                                    currentTask={currentTask || (isStreaming ? "Processing..." : "Research complete")}
                                    status={isStreaming ? "running" : "completed"}
                                    totalTasks={researchState?.plan?.tasks?.length}
                                    completedTasks={researchState?.current_task_index}
                                />

                                {/* Workflow Timeline - ALWAYS VISIBLE */}
                                {steps.length > 0 && (
                                    <div className="bg-card border border-border rounded-lg p-6">
                                        <h3 className="text-sm font-semibold text-foreground mb-4">
                                            Research Progress
                                        </h3>
                                        <WorkflowTimeline steps={steps} />
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Content Area */}


                        {/* Final Report - Full Width Below */}
                        {!hasStarted ? null : researchState && (
                            <div className="mt-6">
                                <FinalReportView state={researchState} />
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default function ResearchPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading...</div>}>
            <ResearchPageContent />
        </Suspense>
    );
}
