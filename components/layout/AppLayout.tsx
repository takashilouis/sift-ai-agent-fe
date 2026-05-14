"use client";

import { AppSidebar } from "./AppSidebar";

interface AppLayoutProps {
    children: React.ReactNode;
    topBar?: React.ReactNode;
}

export function AppLayout({ children, topBar }: AppLayoutProps) {
    return (
        <div className="flex min-h-screen bg-background">
            <AppSidebar />
            <div className="flex-1 flex flex-col ml-[220px]">
                {topBar}
                <main className="flex-1 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
}
