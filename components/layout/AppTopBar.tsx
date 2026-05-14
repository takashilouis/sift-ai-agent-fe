"use client";

interface AppTopBarProps {
    title: string;
    badge?: string;
    actions?: React.ReactNode;
}

export function AppTopBar({ title, badge, actions }: AppTopBarProps) {
    return (
        <header className="sticky top-0 z-40 glass-nav border-b border-outline-variant/10">
            <div className="flex items-center justify-between px-8 py-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-bold font-headline text-primary">{title}</h1>
                    {badge && (
                        <span className="px-3 py-0.5 bg-secondary-container text-on-secondary-container text-xs font-bold uppercase tracking-wider rounded-full">
                            {badge}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    {/* Search */}
                    <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-surface-container-lowest rounded-full border border-outline-variant/20">
                        <span className="material-symbols-outlined text-tertiary text-lg">search</span>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="bg-transparent text-sm text-on-surface placeholder:text-tertiary outline-none w-40"
                        />
                    </div>
                    {actions}
                    {/* Share & Export */}
                    <button className="p-2 hover:bg-surface-container rounded-full transition-colors">
                        <span className="material-symbols-outlined text-tertiary text-xl">share</span>
                    </button>
                    <button className="p-2 hover:bg-surface-container rounded-full transition-colors">
                        <span className="material-symbols-outlined text-tertiary text-xl">open_in_new</span>
                    </button>
                    {/* Avatar */}
                    <div className="w-9 h-9 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary text-xs font-bold overflow-hidden">
                        AR
                    </div>
                </div>
            </div>
        </header>
    );
}
