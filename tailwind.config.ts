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
                // Warm Organic - Terracotta & Sage palette
                background: "#fff8f4",
                surface: "#fff8f4",
                "surface-bright": "#fff8f4",
                "surface-dim": "#e8d7c9",
                "surface-container": "#fdebdc",
                "surface-container-low": "#fff1e7",
                "surface-container-high": "#f7e5d7",
                "surface-container-highest": "#f1dfd1",
                "surface-container-lowest": "#ffffff",
                "surface-variant": "#f1dfd1",
                "surface-tint": "#99462a",

                primary: "#99462a",
                "primary-container": "#d97757",
                "primary-fixed": "#ffdbd0",
                "primary-fixed-dim": "#ffb59e",
                "on-primary": "#ffffff",
                "on-primary-container": "#541400",
                "on-primary-fixed": "#390b00",
                "on-primary-fixed-variant": "#7a2f15",

                secondary: "#456647",
                "secondary-container": "#c4e9c2",
                "secondary-fixed": "#c7ecc5",
                "secondary-fixed-dim": "#abd0aa",
                "on-secondary": "#ffffff",
                "on-secondary-container": "#496a4b",
                "on-secondary-fixed": "#022109",
                "on-secondary-fixed-variant": "#2e4e31",

                tertiary: "#695c50",
                "tertiary-container": "#9f8f82",
                "tertiary-fixed": "#f2dfd0",
                "tertiary-fixed-dim": "#d5c3b5",
                "on-tertiary": "#ffffff",
                "on-tertiary-container": "#33291f",
                "on-tertiary-fixed": "#231a10",
                "on-tertiary-fixed-variant": "#514539",

                "on-surface": "#231a11",
                "on-surface-variant": "#55433d",
                "on-background": "#231a11",

                outline: "#88726c",
                "outline-variant": "#dbc1b9",

                error: "#ba1a1a",
                "error-container": "#ffdad6",
                "on-error": "#ffffff",
                "on-error-container": "#93000a",

                "inverse-surface": "#392f25",
                "inverse-on-surface": "#ffeee0",
                "inverse-primary": "#ffb59e",

                // Shadcn compatibility
                border: "#dbc1b9",
                input: "#dbc1b9",
                ring: "#99462a",
                foreground: "#231a11",
                muted: {
                    DEFAULT: "#f1dfd1",
                    foreground: "#695c50",
                },
                accent: {
                    DEFAULT: "#fdebdc",
                    foreground: "#231a11",
                },
                card: {
                    DEFAULT: "#ffffff",
                    foreground: "#231a11",
                },
                popover: {
                    DEFAULT: "#ffffff",
                    foreground: "#231a11",
                },
                destructive: {
                    DEFAULT: "#ba1a1a",
                    foreground: "#ffffff",
                },
            },
            borderRadius: {
                DEFAULT: "1rem",
                lg: "2rem",
                xl: "3rem",
                md: "1.5rem",
                sm: "0.5rem",
                full: "9999px",
            },
            fontFamily: {
                headline: ["var(--font-headline)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
                body: ["var(--font-body)", "Be Vietnam Pro", "system-ui", "sans-serif"],
                label: ["var(--font-body)", "Be Vietnam Pro", "system-ui", "sans-serif"],
            },
            boxShadow: {
                sm: "0 1px 2px 0 rgba(74, 63, 53, 0.05)",
                DEFAULT: "0 1px 3px 0 rgba(74, 63, 53, 0.08)",
                md: "0 4px 6px -1px rgba(74, 63, 53, 0.08)",
                lg: "0 10px 15px -3px rgba(74, 63, 53, 0.08)",
                xl: "0 24px 48px rgba(74, 63, 53, 0.06)",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
