import Link from "next/link";

export function Navbar() {
    return (
        <nav className="fixed top-0 w-full z-50 glass-nav">
            <div className="flex justify-between items-center w-full px-6 py-4 max-w-7xl mx-auto">
                <div className="text-xl font-bold text-on-surface tracking-tight font-headline">
                    Market Sift AI
                </div>
                <div className="hidden md:flex gap-8 items-center">
                    <a href="#features" className="text-primary font-bold border-b-2 border-primary pb-1 font-headline tracking-tight text-sm">
                        Features
                    </a>
                    <a href="#pricing" className="text-tertiary hover:text-on-surface transition-colors duration-200 text-sm">
                        Pricing
                    </a>
                    <Link href="/research" className="text-tertiary hover:text-on-surface transition-colors duration-200 text-sm">
                        Dashboard
                    </Link>
                    <Link href="/settings" className="text-tertiary hover:text-on-surface transition-colors duration-200 text-sm">
                        Settings
                    </Link>
                </div>
                <div className="flex items-center gap-4">
                    <Link
                        href="/login"
                        className="btn-primary-gradient px-6 py-2.5 text-sm"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </nav>
    );
}
