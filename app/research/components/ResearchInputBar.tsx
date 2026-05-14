"use client";

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
        <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
            <div className="flex items-center gap-3 bg-surface-container-lowest rounded-full px-5 py-3 shadow-md border border-outline-variant/20">
                <span className="material-symbols-outlined text-tertiary text-xl">search</span>
                <input
                    type="text"
                    placeholder="Type a product or category..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    disabled={isLoading}
                    className="flex-1 bg-transparent text-on-surface placeholder:text-tertiary outline-none text-sm py-1"
                />

                {/* Deep Research Toggle */}
                <div className="flex items-center gap-2 border-l border-outline-variant/20 pl-4">
                    <span className="text-xs text-tertiary font-medium whitespace-nowrap">Deep Research</span>
                    <button
                        type="button"
                        onClick={() => onDeepResearchChange(!isDeepResearch)}
                        disabled={isLoading}
                        className={`relative w-10 h-5 rounded-full transition-colors ${
                            isDeepResearch ? "bg-primary" : "bg-surface-dim"
                        }`}
                    >
                        <div
                            className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${
                                isDeepResearch ? "translate-x-5" : "translate-x-0.5"
                            }`}
                        />
                    </button>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isLoading || !query.trim()}
                    className="btn-primary-gradient px-6 py-2.5 text-sm flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isLoading ? (
                        <>
                            <span className="material-symbols-outlined text-lg animate-spin">progress_activity</span>
                            Researching...
                        </>
                    ) : (
                        <>
                            Research
                            <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
