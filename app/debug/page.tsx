"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Search, Globe } from "lucide-react";

export default function DebugPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState<any>(null);

    // Search state
    const [searchQuery, setSearchQuery] = useState("");

    // Scrape state
    const [scrapeUrl, setScrapeUrl] = useState("");

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;

        setIsLoading(true);
        setResult(null);

        try {
            const response = await fetch("http://localhost:8000/api/debug/search", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: searchQuery, max_results: 5 }),
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            setResult({ error: "Failed to search", details: error });
        } finally {
            setIsLoading(false);
        }
    };

    const handleScrape = async () => {
        if (!scrapeUrl.trim()) return;

        setIsLoading(true);
        setResult(null);

        try {
            const response = await fetch("http://localhost:8000/api/debug/scrape", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: scrapeUrl }),
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            setResult({ error: "Failed to scrape", details: error });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto py-10 px-4 max-w-5xl">
            <h1 className="text-3xl font-bold mb-8">Debug Tools</h1>

            <Tabs defaultValue="search" className="w-full">
                <TabsList className="mb-6">
                    <TabsTrigger value="search" className="flex items-center gap-2">
                        <Search className="w-4 h-4" />
                        Search API
                    </TabsTrigger>
                    <TabsTrigger value="scrape" className="flex items-center gap-2">
                        <Globe className="w-4 h-4" />
                        Scrape API
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="search">
                    <Card>
                        <CardHeader>
                            <CardTitle>Test Search API (Tavily)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Enter search query..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                                />
                                <Button onClick={handleSearch} disabled={isLoading}>
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="scrape">
                    <Card>
                        <CardHeader>
                            <CardTitle>Test Scrape API (Playwright)</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Enter URL to scrape..."
                                    value={scrapeUrl}
                                    onChange={(e) => setScrapeUrl(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleScrape()}
                                />
                                <Button onClick={handleScrape} disabled={isLoading}>
                                    {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Scrape"}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {result && (
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Result</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="bg-muted p-4 rounded-lg overflow-auto max-h-[600px]">
                            <pre className="text-xs font-mono whitespace-pre-wrap">
                                {JSON.stringify(result, null, 2)}
                            </pre>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
