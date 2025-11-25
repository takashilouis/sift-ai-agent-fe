import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            colors: {
                border: "#E4E2DD",
                input: "#E4E2DD",
                ring: "#4A7159",
                background: "#F6F5F2",
                foreground: "#2A2A28",
                primary: {
                    DEFAULT: "#4A7159",
                    foreground: "#FFFFFF",
                },
                secondary: {
                    DEFAULT: "#EFEDE7",
                    foreground: "#2A2A28",
                },
                muted: {
                    DEFAULT: "#EFEDE7",
                    foreground: "#6B6B68",
                },
                accent: {
                    DEFAULT: "#4A7159",
                    foreground: "#FFFFFF",
                },
                card: {
                    DEFAULT: "#FFFFFF",
                    foreground: "#2A2A28",
                },
            },
            borderRadius: {
                lg: "8px",
                md: "6px",
                sm: "4px",
            },
            fontFamily: {
                sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
            },
            fontSize: {
                xs: ["0.75rem", { lineHeight: "1.5" }],
                sm: ["0.875rem", { lineHeight: "1.6" }],
                base: ["1rem", { lineHeight: "1.7" }],
                lg: ["1.125rem", { lineHeight: "1.7" }],
                xl: ["1.25rem", { lineHeight: "1.6" }],
                "2xl": ["1.5rem", { lineHeight: "1.5" }],
                "3xl": ["1.875rem", { lineHeight: "1.4" }],
                "4xl": ["2.25rem", { lineHeight: "1.3" }],
            },
            boxShadow: {
                sm: "0 1px 2px 0 rgba(42, 42, 40, 0.05)",
                DEFAULT: "0 1px 3px 0 rgba(42, 42, 40, 0.08), 0 1px 2px -1px rgba(42, 42, 40, 0.08)",
                md: "0 4px 6px -1px rgba(42, 42, 40, 0.08), 0 2px 4px -2px rgba(42, 42, 40, 0.08)",
                lg: "0 10px 15px -3px rgba(42, 42, 40, 0.08), 0 4px 6px -4px rgba(42, 42, 40, 0.08)",
            },
        },
    },
    plugins: [],
};

export default config;
