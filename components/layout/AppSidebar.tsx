"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/research", label: "Research", icon: "search" },
    { href: "/history", label: "History", icon: "history" },
    { href: "/chat", label: "Chat", icon: "chat" },
    { href: "/debug", label: "Playground", icon: "terminal" },
    { href: "/settings", label: "Settings", icon: "settings" },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <aside className="h-screen w-[220px] fixed left-0 top-0 bg-surface-container-low flex flex-col p-4 gap-6 font-body text-sm z-50">
            {/* Logo */}
            <div className="flex items-center gap-3 px-2 pt-2">
                <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center">
                    <span className="material-symbols-outlined text-on-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                        auto_awesome
                    </span>
                </div>
                <div>
                    <h1 className="text-base font-bold text-on-surface leading-tight font-headline">Market Sift</h1>
                    <p className="text-[10px] uppercase tracking-wider text-tertiary">Premium Plan</p>
                </div>
            </div>

            {/* New Research Button */}
            <Link
                href="/research"
                className="btn-primary-gradient flex items-center justify-center gap-2 py-3 px-4 text-sm"
            >
                <span className="material-symbols-outlined text-lg">add</span>
                New Research
            </Link>

            {/* Navigation */}
            <nav className="flex flex-col gap-1 flex-1">
                {navItems.map((item) => {
                    const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-[0.75rem] transition-colors duration-200 text-sm",
                                isActive
                                    ? "bg-surface-container-lowest text-primary font-semibold"
                                    : "text-on-surface-variant hover:bg-surface-container"
                            )}
                        >
                            <span
                                className="material-symbols-outlined text-xl"
                                style={isActive ? { fontVariationSettings: "'FILL' 1" } : undefined}
                            >
                                {item.icon}
                            </span>
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Bottom section */}
            <div className="space-y-1 border-t border-outline-variant/20 pt-4">
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-tertiary hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined text-xl">help</span>
                    Help
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2 text-sm text-tertiary hover:text-on-surface transition-colors">
                    <span className="material-symbols-outlined text-xl">logout</span>
                    Sign Out
                </a>
            </div>

            {/* User */}
            <div className="flex items-center gap-3 px-2 pb-2">
                <div className="w-9 h-9 rounded-full bg-surface-container-high overflow-hidden">
                    <div className="w-full h-full bg-tertiary-container flex items-center justify-center text-on-tertiary text-xs font-bold">
                        AR
                    </div>
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-on-surface truncate">Alex Rivera</p>
                    <p className="text-xs text-tertiary truncate">Lead Researcher</p>
                </div>
            </div>
        </aside>
    );
}
