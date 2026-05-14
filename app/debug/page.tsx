
"use client";
import { AppLayout, AppTopBar } from "@/components/layout";
import { useState } from "react";

export default function DebugPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [scrapeUrl, setScrapeUrl] = useState("");
    const [result, setResult] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [tab, setTab] = useState<"search" | "scrape">("search");

    const handleSearch = async () => {
        setIsLoading(true);
        setResult(null);
        setTimeout(() => {
            setResult({ mock: "Search result for: " + searchQuery });
            setIsLoading(false);
        }, 1000);
    };
    const handleScrape = async () => {
        setIsLoading(true);
        setResult(null);
        setTimeout(() => {
            setResult({ mock: "Scrape result for: " + scrapeUrl });
            setIsLoading(false);
        }, 1000);
    };

    return (
        <AppLayout topBar={<AppTopBar title="Debug Playground" badge="Developer" />}> 
            <div className="max-w-3xl mx-auto py-12">
                <div className="flex gap-4 mb-8">
                    <button onClick={() => setTab("search")}
                        className={`px-6 py-2 rounded-lg font-bold text-sm ${tab === "search" ? "btn-primary-gradient" : "bg-surface-container text-on-surface"}`}>Search API</button>
                    <button onClick={() => setTab("scrape")}
                        className={`px-6 py-2 rounded-lg font-bold text-sm ${tab === "scrape" ? "btn-primary-gradient" : "bg-surface-container text-on-surface"}`}>Scrape API</button>
                </div>
                {tab === "search" && (
                    <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm space-y-4">
                        <h2 className="font-headline text-lg font-bold text-primary mb-2">Test Search API</h2>
                        <div className="flex gap-2 mb-4">
                            <input type="text" placeholder="Enter search query..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="flex-1 bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-2 text-sm" />
                            <button onClick={handleSearch} className="btn-primary-gradient px-6 py-2 rounded-lg" disabled={isLoading}>Search</button>
                        </div>
                        {isLoading && <div className="text-tertiary animate-pulse">Loading...</div>}
                        {result && <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>}
                    </div>
                )}
                {tab === "scrape" && (
                    <div className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm space-y-4">
                        <h2 className="font-headline text-lg font-bold text-primary mb-2">Test Scrape API</h2>
                        <div className="flex gap-2 mb-4">
                            <input type="text" placeholder="Enter URL to scrape..." value={scrapeUrl} onChange={e => setScrapeUrl(e.target.value)} className="flex-1 bg-surface-container border border-outline-variant/20 rounded-lg px-4 py-2 text-sm" />
                            <button onClick={handleScrape} className="btn-primary-gradient px-6 py-2 rounded-lg" disabled={isLoading}>Scrape</button>
                        </div>
                        {isLoading && <div className="text-tertiary animate-pulse">Loading...</div>}
                        {result && <pre className="bg-muted p-4 rounded-lg text-xs overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
