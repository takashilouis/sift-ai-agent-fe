"use client";

import { AgentStep } from "@/types/research";
import { CheckCircle2, Circle, Loader2, AlertCircle, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
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

    const getStatusIcon = (status: AgentStep["status"]) => {
        switch (status) {
            case "completed":
                return <CheckCircle2 className="w-5 h-5 text-green-500" />;
            case "error":
                return <AlertCircle className="w-5 h-5 text-red-500" />;
            case "active":
                return <Loader2 className="w-5 h-5 text-primary animate-spin" />;
            default:
                return <Circle className="w-5 h-5 text-muted-foreground" />;
        }
    };

    const getStatusColor = (status: AgentStep["status"]) => {
        switch (status) {
            case "completed":
                return "text-green-600 dark:text-green-400";
            case "error":
                return "text-red-600 dark:text-red-400";
            case "active":
                return "text-primary font-semibold";
            default:
                return "text-muted-foreground";
        }
    };

    const getConnectorColor = (status: AgentStep["status"]) => {
        switch (status) {
            case "completed":
                return "bg-green-500";
            case "error":
                return "bg-red-500";
            case "active":
                return "bg-primary";
            default:
                return "bg-border";
        }
    };

    if (steps.length === 0) {
        return null;
    }

    return (
        <div className="space-y-1">
            {steps.map((step, index) => {
                const isExpanded = expandedSteps.has(step.name);
                const hasDetails = step.description && step.description.length > 0;

                return (
                    <div key={step.name} className="relative">
                        {/* Connector Line */}
                        {index < steps.length - 1 && (
                            <div
                                className={cn(
                                    "absolute left-[10px] top-[28px] w-0.5 h-[calc(100%+4px)] transition-colors duration-300",
                                    getConnectorColor(step.status)
                                )}
                            />
                        )}

                        {/* Step Content */}
                        <div
                            className={cn(
                                "flex items-start gap-3 p-3 rounded-lg transition-all duration-200",
                                step.status === "active" && "bg-primary/5 border border-primary/20",
                                step.status === "completed" && "bg-green-50/50 dark:bg-green-950/10",
                                step.status === "error" && "bg-red-50/50 dark:bg-red-950/10",
                                hasDetails && "cursor-pointer hover:bg-muted/50"
                            )}
                            onClick={() => hasDetails && toggleStep(step.name)}
                        >
                            {/* Status Icon */}
                            <div className="flex-shrink-0 mt-0.5 relative z-10">
                                {getStatusIcon(step.status)}
                            </div>

                            {/* Content */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2">
                                    <h4 className={cn("text-sm font-medium", getStatusColor(step.status))}>
                                        {step.label}
                                    </h4>
                                    <div className="flex items-center gap-2">
                                        {step.timestamp && (
                                            <span className="text-xs text-muted-foreground">
                                                {new Date(step.timestamp).toLocaleTimeString()}
                                            </span>
                                        )}
                                        {hasDetails && (
                                            <div className="text-muted-foreground">
                                                {isExpanded ? (
                                                    <ChevronDown className="w-4 h-4" />
                                                ) : (
                                                    <ChevronRight className="w-4 h-4" />
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Expandable Description */}
                                {hasDetails && (
                                    <div
                                        className={cn(
                                            "overflow-hidden transition-all duration-200",
                                            isExpanded ? "max-h-96 mt-2" : "max-h-0"
                                        )}
                                    >
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                )}

                                {/* Always show description for active step */}
                                {!isExpanded && step.status === "active" && hasDetails && (
                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                                        {step.description}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

