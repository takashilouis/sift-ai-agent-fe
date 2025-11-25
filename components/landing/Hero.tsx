import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20">
            <div className="max-w-6xl mx-auto text-center space-y-8">
                {/* Logo/Icon */}
                <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden flex items-center justify-center">
                        <Image
                            src="/logo.png"
                            alt="market-sift logo"
                            width={80}
                            height={80}
                            className="object-contain"
                        />
                    </div>
                </div>

                {/* Hero Content */}
                <div className="space-y-6">
                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold text-foreground tracking-tight max-w-4xl mx-auto">
                        AI-Powered Product Research Made Simple
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        market-sift uses advanced AI agents to research, analyze, and compare products across the web—saving you hours of manual work and helping you make confident purchasing decisions.
                    </p>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Link href="/research">
                        <Button size="lg" className="text-base px-8 h-12 gap-2">
                            Start Free Research
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                    <Button size="lg" variant="outline" className="text-base px-8 h-12">
                        Watch Demo
                    </Button>
                </div>

                {/* Social Proof */}
                <div className="pt-8 text-sm text-muted-foreground">
                    Trusted by 10,000+ smart shoppers worldwide
                </div>
            </div>
        </section>
    );
}
