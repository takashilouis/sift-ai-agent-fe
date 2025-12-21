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
    		padding: '2rem',
    		screens: {
    			'2xl': '1400px'
    		}
    	},
    	extend: {
    		colors: {
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		fontFamily: {
    			sans: [
    				'var(--font-inter)',
    				'Inter',
    				'system-ui',
    				'sans-serif'
    			]
    		},
    		fontSize: {
    			xs: [
    				'0.75rem',
    				{
    					lineHeight: '1.5'
    				}
    			],
    			sm: [
    				'0.875rem',
    				{
    					lineHeight: '1.6'
    				}
    			],
    			base: [
    				'1rem',
    				{
    					lineHeight: '1.7'
    				}
    			],
    			lg: [
    				'1.125rem',
    				{
    					lineHeight: '1.7'
    				}
    			],
    			xl: [
    				'1.25rem',
    				{
    					lineHeight: '1.6'
    				}
    			],
    			'2xl': [
    				'1.5rem',
    				{
    					lineHeight: '1.5'
    				}
    			],
    			'3xl': [
    				'1.875rem',
    				{
    					lineHeight: '1.4'
    				}
    			],
    			'4xl': [
    				'2.25rem',
    				{
    					lineHeight: '1.3'
    				}
    			]
    		},
    		boxShadow: {
    			sm: '0 1px 2px 0 rgba(42, 42, 40, 0.05)',
    			DEFAULT: '0 1px 3px 0 rgba(42, 42, 40, 0.08), 0 1px 2px -1px rgba(42, 42, 40, 0.08)',
    			md: '0 4px 6px -1px rgba(42, 42, 40, 0.08), 0 2px 4px -2px rgba(42, 42, 40, 0.08)',
    			lg: '0 10px 15px -3px rgba(42, 42, 40, 0.08), 0 4px 6px -4px rgba(42, 42, 40, 0.08)'
    		}
    	}
    },
    plugins: [require("tailwindcss-animate")],
};

export default config;
