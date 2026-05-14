import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { QueryProvider } from "./providers";

const plusJakarta = Plus_Jakarta_Sans({
    subsets: ["latin"],
    variable: "--font-headline",
    display: "swap",
    weight: ["400", "500", "600", "700", "800"],
});

const beVietnam = Be_Vietnam_Pro({
    subsets: ["latin"],
    variable: "--font-body",
    display: "swap",
    weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
    title: "Market Sift AI — Organic Intelligence",
    description: "AI-powered product research platform. Search, scrape, analyze and compare products across major e-commerce sites.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
            </head>
            <body className={`${plusJakarta.variable} ${beVietnam.variable} font-body antialiased bg-background text-on-surface`}>
                <QueryProvider>
                    {children}
                </QueryProvider>
            </body>
        </html>
    );
}
