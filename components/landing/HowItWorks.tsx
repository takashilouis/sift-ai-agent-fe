import { MessageSquare, Search, FileText } from "lucide-react";

const steps = [
    {
        step: "01",
        icon: MessageSquare,
        title: "Describe What You Need",
        description: "Simply tell us what product you're looking for in natural language. No complex filters or search syntax required.",
    },
    {
        step: "02",
        icon: Search,
        title: "AI Agents Research",
        description: "Our intelligent agents search across multiple platforms, analyze reviews, compare prices, and gather comprehensive data.",
    },
    {
        step: "03",
        icon: FileText,
        title: "Get Your Report",
        description: "Receive a detailed research report with product comparisons, pros & cons, and AI-powered recommendations.",
    },
];

export function HowItWorks() {
    return (
        <section className="py-24 px-4 bg-secondary/30">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                        How It Works
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Explain how to get started with the product in 3 simple steps
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connection lines for desktop */}
                    <div className="hidden md:block absolute top-16 left-0 right-0 h-0.5 bg-border" style={{ width: '66%', left: '17%' }} />

                    {steps.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <div key={index} className="relative">
                                <div className="space-y-4 text-center">
                                    {/* Step number badge */}
                                    <div className="flex justify-center">
                                        <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-semibold relative z-10 border-4 border-background">
                                            {step.step}
                                        </div>
                                    </div>

                                    {/* Icon */}
                                    <div className="flex justify-center">
                                        <div className="w-14 h-14 rounded-lg bg-card border border-border flex items-center justify-center">
                                            <Icon className="w-7 h-7 text-primary" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-semibold text-foreground">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {step.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
