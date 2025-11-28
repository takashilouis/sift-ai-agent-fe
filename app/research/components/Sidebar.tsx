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
import { useState } from "react";
import Image from "next/image";

export function Sidebar() {
    const [projectsExpanded, setProjectsExpanded] = useState(true);

    return (
        <aside className="w-64 border-r border-border bg-card h-screen flex flex-col">
            {/* Logo & Search */}
            <div className="p-4 space-y-4">
                <div className="flex items-center gap-2">
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
                </div>

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
                <Button className="w-full justify-start gap-2" size="default" onClick={() => window.location.href = '/research'}>
                    <Plus className="w-4 h-4" />
                    New Research
                </Button>
                <Button className="w-full justify-start gap-2" variant="secondary" onClick={() => window.location.href = '/chat'}>
                    <MessageSquare className="w-4 h-4" />
                    New Chat
                </Button>
            </div>

            <Separator />

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {/* Recents */}
                <div className="mb-4">
                    <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2 px-2">
                        Recents
                    </div>
                    <div className="space-y-1">
                        <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:bg-secondary rounded-md transition-colors">
                            <FileText className="w-4 h-4" />
                            <span className="truncate">Best wireless headphones</span>
                        </button>
                        <button className="w-full flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground hover:bg-secondary rounded-md transition-colors">
                            <FileText className="w-4 h-4" />
                            <span className="truncate">Gaming laptops under $1500</span>
                        </button>
                    </div>
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
