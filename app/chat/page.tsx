"use client";

import { Sidebar } from "@/app/research/components/Sidebar";
import { TopNav } from "@/app/research/components/TopNav";
import { ChatInterface } from "./components/ChatInterface";

export default function ChatPage() {
    return (
        <div className="flex h-screen bg-background">
            <Sidebar />

            <div className="flex-1 flex flex-col overflow-hidden">
                <TopNav />

                <main className="flex-1 overflow-hidden">
                    <ChatInterface />
                </main>
            </div>
        </div>
    );
}
