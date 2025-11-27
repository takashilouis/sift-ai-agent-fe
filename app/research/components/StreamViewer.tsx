"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useRef } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";

interface StreamViewerProps {
    chunks: any[];
}

export function StreamViewer({ chunks }: StreamViewerProps) {
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [chunks]);

    if (chunks.length === 0) {
        return null;
    }

    return (
        <Card className="bg-secondary/30">
            <CardHeader>
                <CardTitle className="text-base">Live Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                    {chunks.map((chunk, index) => {
                        const stepName = chunk.step || "processing";
                        const timestamp = chunk.timestamp
                            ? new Date(chunk.timestamp).toLocaleTimeString()
                            : new Date().toLocaleTimeString();

                        // Extract meaningful message from state - avoid duplicates
                        let message = "";
                        if (chunk.state) {
                            // Priority order: specific task info > plan info > query (only for planner step)
                            if (chunk.state.current_task && chunk.state.current_task !== chunk.state.query) {
                                message = chunk.state.current_task;
                            } else if (chunk.state.plan && Array.isArray(chunk.state.plan) && chunk.step === "planner") {
                                message = `Created research plan with ${chunk.state.plan.length} tasks`;
                            } else if (chunk.step === "planner" && chunk.state.query) {
                                message = `Researching: ${chunk.state.query}`;
                            } else if (chunk.step === "task_executor" && chunk.state.current_task_index !== undefined) {
                                // Try to get the actual task description from the plan
                                if (chunk.state.plan && Array.isArray(chunk.state.plan)) {
                                    const taskIndex = chunk.state.current_task_index;
                                    const task = chunk.state.plan[taskIndex];
                                    if (task && typeof task === 'object' && 'description' in task) {
                                        message = task.description;
                                    } else if (typeof task === 'string') {
                                        message = task;
                                    } else if (task && typeof task === 'object' && 'action' in task) {
                                        // Show action type if no description
                                        message = `Running ${task.action} task`;
                                    } else {
                                        // Generic fallback - NO NUMBERS
                                        message = "Processing research task";
                                    }
                                } else {
                                    // Generic fallback - NO NUMBERS
                                    message = "Processing research task";
                                }
                            } else if (chunk.state.final_report) {
                                message = "Generated final report";
                            } else if (chunk.step === "scraper") {
                                message = "Extracting product information";
                            } else if (chunk.step === "search") {
                                message = "Searching for products";
                            }
                        }

                        const isComplete = index < chunks.length - 1;

                        // Skip rendering if no meaningful message
                        if (!message) {
                            return null;
                        }

                        return (
                            <div
                                key={index}
                                className="flex items-start gap-3 p-3 bg-card rounded-lg border border-border"
                            >
                                <div className="flex-shrink-0 mt-0.5">
                                    {isComplete ? (
                                        <CheckCircle2 className="w-4 h-4 text-primary" />
                                    ) : (
                                        <Loader2 className="w-4 h-4 text-primary animate-spin" />
                                    )}
                                </div>
                                <div className="flex-1 min-w-0 space-y-1">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-primary/10 text-primary text-xs font-medium">
                                            {stepName}
                                        </span>
                                        <span className="text-xs text-muted-foreground">
                                            {timestamp}
                                        </span>
                                    </div>
                                    <p className="text-sm text-foreground leading-relaxed">
                                        {message}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={bottomRef} />
                </div>
            </CardContent>
        </Card>
    );
}
