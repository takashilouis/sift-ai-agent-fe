import Link from "next/link";

export function Footer() {
    return (
        <footer className="bg-surface-container-low py-12 border-t border-outline-variant/10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
                <div className="space-y-2">
                    <div className="text-sm font-bold text-on-surface font-headline">Market Sift AI</div>
                    <p className="text-tertiary text-sm">© 2024 Market Sift AI. Organic Intelligence.</p>
                </div>
                <div className="flex flex-wrap justify-center gap-8 text-sm font-medium">
                    <a className="text-tertiary hover:text-primary transition-colors" href="#">Privacy</a>
                    <a className="text-tertiary hover:text-primary transition-colors" href="#">Terms</a>
                    <a className="text-tertiary hover:text-primary transition-colors" href="#">API Docs</a>
                    <a className="text-tertiary hover:text-primary transition-colors" href="#">Contact</a>
                </div>
                <div className="flex gap-6">
                    <a className="text-tertiary hover:text-primary transition-colors" href="#">
                        <span className="material-symbols-outlined">public</span>
                    </a>
                    <a className="text-tertiary hover:text-primary transition-colors" href="#">
                        <span className="material-symbols-outlined">chat_bubble</span>
                    </a>
                </div>
            </div>
        </footer>
    );
}
