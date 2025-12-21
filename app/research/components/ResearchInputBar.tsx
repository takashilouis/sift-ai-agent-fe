"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mic, Upload } from "lucide-react";
import { useState } from "react";

interface ResearchInputBarProps {
    onSubmit: (query: string) => void;
    isLoading?: boolean;
    isDeepResearch: boolean;
    onDeepResearchChange: (value: boolean) => void;
}

export function ResearchInputBar({ onSubmit, isLoading, isDeepResearch, onDeepResearchChange }: ResearchInputBarProps) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSubmit(query);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full space-y-3">
            <div className="relative flex items-center gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                        type="text"
                        placeholder="What product are you researching today?"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        disabled={isLoading}
                        className="h-14 pl-12 pr-24 text-base border-2 focus-visible:ring-offset-0"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            disabled={isLoading}
                        >
                            <Mic className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
                <Button
                    type="submit"
                    size="lg"
                    className="h-14 px-8"
                    disabled={isLoading || !query.trim()}
                >
                    {isLoading ? "Researching..." : "Research"}
                </Button>
            </div>

            <div className="flex items-center gap-2 px-1">
                <label className="flex items-center gap-2 cursor-pointer group">
                    <div className="relative inline-flex items-center">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={isDeepResearch}
                            onChange={(e) => onDeepResearchChange(e.target.checked)}
                            disabled={isLoading}
                        />
                        <div className="w-9 h-5 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
                    </div>
                    <span className={`text-sm font-medium transition-colors ${isDeepResearch ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}>
                        Deep Research Mode
                    </span>
                </label>
                <span className="text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                    {isDeepResearch ? "Gemini Pro" : "Gemini Flash • Standard speed"}
                </span>
            </div>
        </form>
    );
}
