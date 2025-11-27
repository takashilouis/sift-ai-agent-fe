"use client";

import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function TopNav() {
    return (
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6">
            <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground text-lg">
                    Research report
                </span>
            </div>

            <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                    <Settings className="w-4 h-4" />
                </Button>
            </div>
        </header>
    );
}
