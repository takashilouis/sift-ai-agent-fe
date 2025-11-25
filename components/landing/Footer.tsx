import Link from "next/link";
import { Twitter, Github, Linkedin } from "lucide-react";
import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-secondary/30 border-t border-border">
            <div className="max-w-6xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="space-y-4">
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
                            <span className="font-semibold text-foreground text-lg">
                                market-sift
                            </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                            AI-powered product research that saves you time and helps you make confident purchasing decisions.
                        </p>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Product</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="/research"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Start Research
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#pricing"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#features"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    API
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Company</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="#"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Careers
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="font-semibold text-foreground mb-4">Legal</h3>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <Link
                                    href="#"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="#"
                                    className="text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground">
                        © 2025 market-sift. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4">
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Twitter className="w-5 h-5" />
                        </Link>
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Github className="w-5 h-5" />
                        </Link>
                        <Link
                            href="#"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <Linkedin className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
