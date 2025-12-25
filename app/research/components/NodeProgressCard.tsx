"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, Circle, Loader2, AlertCircle, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

interface NodeProgressCardProps {
    name: string;
    label: string;
    description: string;
    status: "pending" | "active" | "completed" | "error";
    timestamp?: string;
    metadata?: {
        action?: string;
        query?: string;
        url?: string;
        product_title?: string;
        results_count?: number;
    };
}

export function NodeProgressCard({
    name,
    label,
    description,
    status,
    timestamp,
    metadata
}: NodeProgressCardProps) {
    const getStatusIcon = () => {
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

    const getStatusColor = () => {
        switch (status) {
            case "completed":
                return "border-green-500/50 bg-green-50/50 dark:bg-green-950/20";
            case "error":
                return "border-red-500/50 bg-red-50/50 dark:bg-red-950/20";
            case "active":
                return "border-primary/50 bg-primary/5 shadow-lg shadow-primary/10";
            default:
                return "border-border bg-muted/30";
        }
    };

    return (
        <Card className={cn("transition-all duration-300", getStatusColor())}>
            <CardContent className="p-4">
                <div className="flex items-start gap-3">
                    {/* Status Icon */}
                    <div className="flex-shrink-0 mt-0.5">
                        {getStatusIcon()}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 space-y-1">
                        {/* Header */}
                        <div className="flex items-center justify-between gap-2">
                            <h4 className="font-semibold text-sm text-foreground">
                                {label}
                            </h4>
                            {timestamp && (
                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="w-3 h-3" />
                                    {new Date(timestamp).toLocaleTimeString()}
                                </div>
                            )}
                        </div>

                        {/* Description */}
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {description}
                        </p>

                        {/* Metadata */}
                        {metadata && (
                            <div className="mt-2 space-y-1">
                                {metadata.query && (
                                    <div className="text-xs text-muted-foreground">
                                        <span className="font-medium">Query:</span> {metadata.query}
                                    </div>
                                )}
                                {metadata.url && (
                                    <div className="text-xs text-muted-foreground truncate">
                                        <span className="font-medium">URL:</span>{" "}
                                        <a
                                            href={metadata.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-primary hover:underline"
                                        >
                                            {metadata.url}
                                        </a>
                                    </div>
                                )}
                                {metadata.product_title && (
                                    <div className="text-xs text-muted-foreground">
                                        <span className="font-medium">Product:</span> {metadata.product_title}
                                    </div>
                                )}
                                {metadata.results_count !== undefined && (
                                    <div className="text-xs text-muted-foreground">
                                        <span className="font-medium">Results:</span> {metadata.results_count}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
