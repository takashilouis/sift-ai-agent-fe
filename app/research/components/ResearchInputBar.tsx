"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Mic, Upload } from "lucide-react";
import { useState } from "react";

interface ResearchInputBarProps {
    onSubmit: (query: string) => void;
    isLoading?: boolean;
}

export function ResearchInputBar({ onSubmit, isLoading }: ResearchInputBarProps) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSubmit(query);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
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
                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            disabled={isLoading}
                        >
                            <Upload className="w-4 h-4" />
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
        </form>
    );
}
