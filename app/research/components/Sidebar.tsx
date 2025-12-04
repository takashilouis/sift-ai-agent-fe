"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
    Search,
    Plus,
    ChevronRight,
    ChevronDown,
    Folder,
    FileText,
    User,
    MessageSquare
} from "lucide-react";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface ResearchItem {
    id: string;
    query: string;
    preview: string;
    created_at: string;
}

interface ChatItem {
    id: string;
    first_message: string;
    created_at: string;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export function Sidebar() {
    const [projectsExpanded, setProjectsExpanded] = useState(true);
    const [researchExpanded, setResearchExpanded] = useState(true);
    const [chatExpanded, setChatExpanded] = useState(true);
    const [researchHistory, setResearchHistory] = useState<ResearchItem[]>([]);
    const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);

    useEffect(() => {
        // Fetch research history
        fetch(`${API_URL}/api/history/research?limit=10`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setResearchHistory(data);
                } else {
                    console.error("Research history is not an array:", data);
                    setResearchHistory([]);
                }
            })
            .catch(err => {
                console.error("Failed to fetch research history:", err);
                setResearchHistory([]);
            });

        // Fetch chat history
        fetch(`${API_URL}/api/history/chat?limit=10`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    setChatHistory(data);
                } else {
                    console.error("Chat history is not an array:", data);
                    setChatHistory([]);
                }
            })
            .catch(err => {
                console.error("Failed to fetch chat history:", err);
                setChatHistory([]);
            });
    }, []);

    return (
        <aside className="w-64 border-r border-border bg-card h-screen flex flex-col">
            {/* Logo & Search */}
            <div className="p-4 space-y-4">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                        <Image
                            src="/logo.png"
                            alt="market-sift logo"
                            width={32}
                            height={32}
                            className="object-contain"
                        />
                    </div>
                    <span className="font-semibold text-foreground">My Agents</span>
                </Link>

                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full h-9 pl-9 pr-3 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                </div>
            </div>

            {/* New Research Button */}
            <div className="px-4 pb-4 space-y-2">
                <Link href="/research" passHref legacyBehavior>
                    <Button className="w-full justify-start gap-2" size="default">
                        <Plus className="w-4 h-4" />
                        New Research
                    </Button>
                </Link>
                <Link href="/chat" passHref legacyBehavior>
                    <Button className="w-full justify-start gap-2" variant="secondary">
                        <MessageSquare className="w-4 h-4" />
                        New Chat
                    </Button>
                </Link>
            </div>

            <Separator />

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-4">
                {/* Research History */}
                <div>
                    <button
                        onClick={() => setResearchExpanded(!researchExpanded)}
                        className="w-full flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:bg-secondary rounded-md transition-colors mb-2"
                    >
                        {researchExpanded ? (
                            <ChevronDown className="w-3 h-3" />
                        ) : (
                            <ChevronRight className="w-3 h-3" />
                        )}
                        Research
                    </button>

                    {researchExpanded && (
                        <div className="space-y-1">
                            {researchHistory.length === 0 ? (
                                <div className="px-2 py-1.5 text-xs text-muted-foreground">
                                    No research yet
                                </div>
                            ) : (
                                researchHistory.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/research?id=${item.id}`}
                                        className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:bg-secondary rounded-md transition-colors"
                                    >
                                        <FileText className="w-4 h-4 flex-shrink-0" />
                                        <span className="truncate">{item.query}</span>
                                    </Link>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* Chat History */}
                <div>
                    <button
                        onClick={() => setChatExpanded(!chatExpanded)}
                        className="w-full flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:bg-secondary rounded-md transition-colors mb-2"
                    >
                        {chatExpanded ? (
                            <ChevronDown className="w-3 h-3" />
                        ) : (
                            <ChevronRight className="w-3 h-3" />
                        )}
                        Chat
                    </button>

                    {chatExpanded && (
                        <div className="space-y-1">
                            {chatHistory.length === 0 ? (
                                <div className="px-2 py-1.5 text-xs text-muted-foreground">
                                    No chats yet
                                </div>
                            ) : (
                                chatHistory.map((item) => (
                                    <Link
                                        key={item.id}
                                        href={`/chat?session=${item.id}`}
                                        className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:bg-secondary rounded-md transition-colors"
                                    >
                                        <MessageSquare className="w-4 h-4 flex-shrink-0" />
                                        <span className="truncate">{item.first_message}</span>
                                    </Link>
                                ))
                            )}
                        </div>
                    )}
                </div>

                {/* Projects */}
                <div>
                    <button
                        onClick={() => setProjectsExpanded(!projectsExpanded)}
                        className="w-full flex items-center gap-2 px-2 py-1.5 text-xs font-medium text-muted-foreground uppercase tracking-wider hover:bg-secondary rounded-md transition-colors mb-2"
                    >
                        {projectsExpanded ? (
                            <ChevronDown className="w-3 h-3" />
                        ) : (
                            <ChevronRight className="w-3 h-3" />
                        )}
                        Projects
                    </button>

                    {projectsExpanded && (
                        <div className="space-y-1 ml-2">
                            <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-foreground hover:bg-secondary rounded-md transition-colors">
                                <Folder className="w-4 h-4 text-primary" />
                                <span className="truncate">Electronics Research</span>
                            </button>
                            <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:bg-secondary rounded-md transition-colors">
                                <Folder className="w-4 h-4" />
                                <span className="truncate">Home & Kitchen</span>
                            </button>
                            <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:bg-secondary rounded-md transition-colors">
                                <Folder className="w-4 h-4" />
                                <span className="truncate">Fashion & Apparel</span>
                            </button>
                        </div>
                    )}
                </div>
            </nav>

            <Separator />

            {/* User Plan Card */}
            <div className="p-4">
                <div className="bg-secondary rounded-lg p-3 space-y-2">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                            <User className="w-3 h-3 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-foreground truncate">
                                Free Plan
                            </div>
                        </div>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        5 researches remaining this month
                    </p>
                </div>
            </div>
        </aside>
    );
}
