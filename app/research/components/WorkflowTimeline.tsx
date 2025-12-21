"use client";

import { AgentStep } from "@/types/research";
import { CheckCircle2, Circle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface WorkflowTimelineProps {
    steps: AgentStep[];
}

const DEFAULT_DISPLAY_STEPS: AgentStep[] = [
    {
        name: "planner",
        label: "Planner Agent",
        description: "Decomposing query into search tasks",
        status: "pending",
    },
    {
        name: "task_executor",
        label: "Search Agent",
        description: "Executing search strategy",
        status: "pending",
    },
    {
        name: "finalize",
        label: "Final Report Agent",
        description: "Generating final report",
        status: "pending",
    },
];

export function WorkflowTimeline({ steps }: WorkflowTimelineProps) {
    return (
        <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Researching...</span>
        </div>
    );
}
