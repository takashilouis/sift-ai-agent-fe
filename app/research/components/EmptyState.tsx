"use client";

import { Card } from "@/components/ui/card";
import { Search, TrendingUp, Zap } from "lucide-react";

interface EmptyStateProps {
    onPromptClick: (prompt: string) => void;
}

const SUGGESTED_PROMPTS = [
    {
        icon: Search,
        title: "Compare wireless earbuds",
        prompt: "Compare the best wireless earbuds under $200 with good battery life and noise cancellation",
    },
    {
        icon: TrendingUp,
        title: "Find trending products",
        prompt: "What are the top-rated standing desks for home office in 2024?",
    },
    {
        icon: Zap,
        title: "Quick product analysis",
        prompt: "Analyze reviews for iPhone 15 Pro vs Samsung Galaxy S24 Ultra",
    },
];

export function EmptyState({ onPromptClick }: EmptyStateProps) {
    return (
        <div className="max-w-4xl mx-auto space-y-8 py-12">
            <div className="text-center space-y-3">
                <h2 className="text-2xl font-semibold text-foreground">
                    Start Your Product Research
                </h2>
                <p className="text-muted-foreground">
                    Enter a product query above or try one of these suggestions
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SUGGESTED_PROMPTS.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <Card
                            key={index}
                            className="p-6 cursor-pointer hover:shadow-md hover:border-primary/50 transition-all group"
                            onClick={() => onPromptClick(item.prompt)}
                        >
                            <div className="space-y-3">
                                <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                                    <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <div>
                                    <h3 className="font-medium text-foreground mb-1">
                                        {item.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {item.prompt}
                                    </p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
