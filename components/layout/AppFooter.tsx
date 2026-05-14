export function AppFooter() {
    return (
        <footer className="border-t border-outline-variant/10 py-10 px-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between gap-8">
                <div className="space-y-2">
                    <h3 className="text-sm font-bold font-headline text-on-surface">Market Sift AI</h3>
                    <p className="text-xs text-tertiary max-w-xs">
                        Empowering commerce teams with organic market insights and AI-driven curator capabilities.
                    </p>
                </div>
                <div className="flex gap-16">
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-tertiary">Product</h4>
                        <div className="flex flex-col gap-2 text-sm text-on-surface-variant">
                            <a href="#" className="hover:text-primary transition-colors">Features</a>
                            <a href="#" className="hover:text-primary transition-colors">Integrations</a>
                            <a href="#" className="hover:text-primary transition-colors">API</a>
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-tertiary">Resources</h4>
                        <div className="flex flex-col gap-2 text-sm text-on-surface-variant">
                            <a href="#" className="hover:text-primary transition-colors">Documentation</a>
                            <a href="#" className="hover:text-primary transition-colors">Guides</a>
                            <a href="#" className="hover:text-primary transition-colors">Support</a>
                        </div>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <button className="p-2 hover:bg-surface-container rounded-full transition-colors">
                        <span className="material-symbols-outlined text-tertiary text-xl">volume_up</span>
                    </button>
                    <button className="p-2 hover:bg-surface-container rounded-full transition-colors">
                        <span className="material-symbols-outlined text-tertiary text-xl">tune</span>
                    </button>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-outline-variant/10 text-xs text-tertiary">
                © 2024 Market Sift AI. All rights reserved.
            </div>
        </footer>
    );
}
