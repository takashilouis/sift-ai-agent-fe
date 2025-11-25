"use client";

import { AgentStep } from "@/types/research";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowTimelineProps {
    steps: AgentStep[];
}

export function WorkflowTimeline({ steps }: WorkflowTimelineProps) {
    return (
        <div className="space-y-1">
            {steps.map((step, index) => {
                const isLast = index === steps.length - 1;

                return (
                    <div key={step.name} className="relative">
                        <div className="flex items-start gap-3 py-3">
                            {/* Step Icon */}
                            <div className="relative flex-shrink-0">
                                {step.status === "completed" && (
                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                )}
                                {step.status === "active" && (
                                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                                )}
                                {step.status === "pending" && (
                                    <Circle className="w-5 h-5 text-muted-foreground/40" />
                                )}
                                {step.status === "error" && (
                                    <Circle className="w-5 h-5 text-red-500" />
                                )}
                            </div>

                            {/* Step Content */}
                            <div className="flex-1 min-w-0 -mt-0.5">
                                <div
                                    className={cn(
                                        "font-medium text-sm",
                                        step.status === "completed" && "text-foreground",
                                        step.status === "active" && "text-primary",
                                        step.status === "pending" && "text-muted-foreground",
                                        step.status === "error" && "text-red-500"
                                    )}
                                >
                                    {step.label}
                                </div>
                                <div className="text-xs text-muted-foreground mt-0.5">
                                    {step.description}
                                </div>
                                {step.timestamp && (
                                    <div className="text-xs text-muted-foreground/60 mt-1">
                                        {new Date(step.timestamp).toLocaleTimeString()}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Connecting Line */}
                        {!isLast && (
                            <div
                                className={cn(
                                    "absolute left-[9px] top-10 w-[2px] h-8",
                                    step.status === "completed"
                                        ? "bg-primary/30"
                                        : "bg-muted-foreground/20"
                                )}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    );
}
