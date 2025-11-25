import Link from "next/link";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
            <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center">
                        <Image
                            src="/logo.png"
                            alt="market-sift logo"
                            width={32}
                            height={32}
                            className="object-contain"
                        />
                    </div>
                    <span className="font-semibold text-foreground text-lg">
                        market-sift
                    </span>
                </Link>

                {/* Navigation Links */}
                <div className="hidden md:flex items-center gap-6">
                    <Link
                        href="#features"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Features
                    </Link>
                    <Link
                        href="#how-it-works"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        How It Works
                    </Link>
                    <Link
                        href="#pricing"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Pricing
                    </Link>
                    <Link
                        href="#faq"
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        FAQ
                    </Link>
                </div>

                {/* CTA Button */}
                <div className="flex items-center gap-3">
                    <Link href="/research">
                        <Button size="sm">
                            Start Research
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    );
}
