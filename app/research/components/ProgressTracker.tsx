"use client";

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
    completedTasks,
}: ProgressTrackerProps) {
    return (
        <div className="bg-surface-container-lowest rounded-[1.5rem] p-6 space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {status === "running" && (
                        <span className="material-symbols-outlined text-primary text-xl animate-spin">
                            progress_activity
                        </span>
                    )}
                    {status === "completed" && (
                        <span className="material-symbols-outlined text-secondary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                            check_circle
                        </span>
                    )}
                    {status === "error" && (
                        <span className="material-symbols-outlined text-error text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                            error
                        </span>
                    )}
                    <div>
                        <h3 className="font-semibold text-on-surface font-headline text-sm">
                            {status === "completed" ? "Research completed" : status === "error" ? "An error occurred" : currentTask || "Processing..."}
                        </h3>
                        {totalTasks && completedTasks !== undefined && (
                            <p className="text-xs text-tertiary">
                                Task {completedTasks} of {totalTasks}
                            </p>
                        )}
                    </div>
                </div>
                <span className="text-2xl font-black text-primary font-headline">
                    {Math.round(progress)}%
                </span>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                <div
                    className="h-full bg-gradient-to-r from-primary to-primary-container rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {status === "running" && currentTask && (
                <p className="text-xs text-tertiary animate-pulse">{currentTask}</p>
            )}
        </div>
    );
}
