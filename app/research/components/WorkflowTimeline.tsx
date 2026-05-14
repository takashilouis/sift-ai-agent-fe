"use client";

import { AgentStep } from "@/types/research";
import { useState } from "react";

interface WorkflowTimelineProps {
    steps: AgentStep[];
}

export function WorkflowTimeline({ steps }: WorkflowTimelineProps) {
    const [expandedSteps, setExpandedSteps] = useState<Set<string>>(new Set());

    const toggleStep = (stepName: string) => {
        const newExpanded = new Set(expandedSteps);
        if (newExpanded.has(stepName)) {
            newExpanded.delete(stepName);
        } else {
            newExpanded.add(stepName);
        }
        setExpandedSteps(newExpanded);
    };

    if (steps.length === 0) return null;

    return (
        <div className="space-y-2">
            {steps.map((step, idx) => {
                const isExpanded = expandedSteps.has(step.name);
                const hasDetails = step.description && step.description.length > 0;
                let statusColor = "text-tertiary";
                let bgColor = "";
                if (step.status === "completed") {
                    statusColor = "text-green-600";
                    bgColor = "bg-green-50/50";
                } else if (step.status === "active") {
                    statusColor = "text-primary";
                    bgColor = "bg-primary/5 border border-primary/20";
                } else if (step.status === "error") {
                    statusColor = "text-error";
                    bgColor = "bg-error/10 border border-error/20";
                }
                return (
                    <div key={step.name} className={`rounded-xl p-4 flex flex-col gap-2 transition-all duration-200 ${bgColor} ${hasDetails ? "cursor-pointer hover:bg-surface-container" : ""}`} onClick={() => hasDetails && toggleStep(step.name)}>
                        <div className="flex items-center gap-3">
                            {/* Status Icon */}
                            <span className={`material-symbols-outlined text-xl ${statusColor} ${step.status === "active" ? "animate-spin" : ""}`}>{
                                step.status === "completed"
                                    ? "check_circle"
                                    : step.status === "active"
                                    ? "progress_activity"
                                    : step.status === "error"
                                    ? "error"
                                    : "radio_button_unchecked"
                            }</span>
                            <span className={`font-headline font-semibold text-base ${statusColor}`}>{step.label}</span>
                            <span className="ml-auto text-xs text-tertiary">{step.timestamp && new Date(step.timestamp).toLocaleTimeString()}</span>
                            {hasDetails && (
                                <span className="material-symbols-outlined text-tertiary text-base">{isExpanded ? "expand_less" : "expand_more"}</span>
                            )}
                        </div>
                        {hasDetails && isExpanded && (
                            <div className="pl-8 text-sm text-on-surface-variant">
                                {step.description}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
