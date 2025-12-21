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
    MessageSquare,
    MoreVertical,
    Trash2
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
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [itemToDelete, setItemToDelete] = useState<{ type: 'research' | 'chat', id: string, name: string } | null>(null);

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

    const handleDeleteClick = (type: 'research' | 'chat', id: string, name: string, e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setItemToDelete({ type, id, name });
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = async () => {
        if (!itemToDelete) return;

        try {
            const endpoint = itemToDelete.type === 'research'
                ? `/api/history/research/${itemToDelete.id}`
                : `/api/history/chat/${itemToDelete.id}`;

            const response = await fetch(`${API_URL}${endpoint}`, {
                method: 'DELETE',
            });

            if (!response.ok) throw new Error('Delete failed');

            // Refresh the appropriate history list
            if (itemToDelete.type === 'research') {
                setResearchHistory(prev => prev.filter(item => item.id !== itemToDelete.id));
            } else {
                setChatHistory(prev => prev.filter(item => item.id !== itemToDelete.id));
            }
        } catch (error) {
            console.error('Delete error:', error);
        } finally {
            setDeleteDialogOpen(false);
            setItemToDelete(null);
        }
    };

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
                                <>
                                    {researchHistory.map((item) => (
                                        <div key={item.id} className="group relative flex items-center gap-1 pr-1">
                                            <Link
                                                href={`/research?id=${item.id}`}
                                                className="flex-1 flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:bg-secondary rounded-md transition-colors min-w-0"
                                            >
                                                <FileText className="w-4 h-4 flex-shrink-0" />
                                                <span className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">{item.query}</span>
                                            </Link>
                                            <button
                                                className="flex-shrink-0 p-1 hover:bg-secondary rounded opacity-60 hover:opacity-100 transition-opacity"
                                                onClick={(e) => handleDeleteClick('research', item.id, item.query, e)}
                                                title="Delete"
                                            >
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                    {researchHistory.length >= 10 && (
                                        <button className="w-full px-2 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors text-center">
                                            ... See more
                                        </button>
                                    )}
                                </>
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
                                    <div key={item.id} className="group relative flex items-center gap-1 pr-1">
                                        <Link
                                            href={`/chat?session=${item.id}`}
                                            className="flex-1 flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:bg-secondary rounded-md transition-colors min-w-0"
                                        >
                                            <MessageSquare className="w-4 h-4 flex-shrink-0" />
                                            <span className="truncate block overflow-hidden text-ellipsis whitespace-nowrap">{item.first_message}</span>
                                        </Link>
                                        <button
                                            className="flex-shrink-0 p-1 hover:bg-secondary rounded opacity-60 hover:opacity-100 transition-opacity"
                                            onClick={(e) => handleDeleteClick('chat', item.id, item.first_message, e)}
                                            title="Delete"
                                        >
                                            <MoreVertical className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            )}
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

            {/* Delete Confirmation Dialog */}
            {deleteDialogOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setDeleteDialogOpen(false)}
                    />

                    {/* Dialog */}
                    <div className="relative bg-card border border-border rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
                        <h2 className="text-lg font-semibold text-foreground mb-2">
                            Delete {itemToDelete?.type === 'research' ? 'Research Report' : 'Chat Session'}?
                        </h2>
                        <p className="text-sm text-muted-foreground mb-4">
                            Are you sure you want to delete "{itemToDelete?.name}"? This action cannot be undone.
                        </p>
                        <div className="flex gap-2 justify-end">
                            <Button
                                variant="outline"
                                onClick={() => setDeleteDialogOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleDeleteConfirm}
                                className="bg-red-600 hover:bg-red-700"
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </aside>
    );
}
