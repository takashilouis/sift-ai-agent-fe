"use client";

import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function TopNav() {
    return (
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6">
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

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                    <Settings className="w-4 h-4" />
                </Button>
            </div>
        </header>
    );
}
