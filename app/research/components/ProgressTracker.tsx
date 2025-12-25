"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";

interface ProgressTrackerProps {
    progress: number;
    currentTask: string;
    status: "idle" | "running" | "completed" | "error";
    totalTasks?: number;
    completedTasks?: number;
}

export function ProgressTracker({
    progress,
    currentTask,
    status,
    totalTasks,
    completedTasks
}: ProgressTrackerProps) {
    const getStatusIcon = () => {
        switch (status) {
            case "completed":
                return <CheckCircle2 className="w-5 h-5 text-green-500" />;
            case "error":
                return <AlertCircle className="w-5 h-5 text-red-500" />;
            case "running":
                return <Loader2 className="w-5 h-5 text-primary animate-spin" />;
            default:
                return null;
        }
    };

    const getStatusText = () => {
        switch (status) {
            case "completed":
                return "Research completed";
            case "error":
                return "An error occurred";
            case "running":
                return currentTask || "Processing...";
            default:
                return "Ready";
        }
    };

    return (
        <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="pt-6">
                <div className="space-y-4">
                    {/* Status Header */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            {getStatusIcon()}
                            <div>
                                <h3 className="font-semibold text-foreground">
                                    {getStatusText()}
                                </h3>
                                {totalTasks && completedTasks !== undefined && (
                                    <p className="text-sm text-muted-foreground">
                                        Task {completedTasks} of {totalTasks}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-bold text-primary">
                                {Math.round(progress)}%
                            </p>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-2">
                        <Progress value={progress} className="h-2" />
                        {status === "running" && (
                            <p className="text-xs text-muted-foreground animate-pulse">
                                {currentTask}
                            </p>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
