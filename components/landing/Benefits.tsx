import { Search, TrendingUp, ShoppingCart, BarChart3, Shield, Zap } from "lucide-react";

const benefits = [
    {
        icon: Search,
        title: "Intelligent Search",
        description: "Our AI agents automatically find and analyze products across dozens of e-commerce platforms and review sites.",
    },
    {
        icon: TrendingUp,
        title: "Sentiment Analysis",
        description: "Understand what real customers think by analyzing thousands of reviews with advanced NLP technology.",
    },
    {
        icon: BarChart3,
        title: "Smart Comparison",
        description: "Compare features, prices, and value propositions side-by-side with AI-generated insights.",
    },
    {
        icon: Zap,
        title: "Lightning Fast",
        description: "Get comprehensive research reports in minutes, not hours. Save time and make decisions faster.",
    },
    {
        icon: Shield,
        title: "Unbiased Results",
        description: "No sponsored listings or affiliate bias. Just pure, data-driven product recommendations.",
    },
    {
        icon: ShoppingCart,
        title: "Purchase Confidence",
        description: "Make informed decisions backed by data, reviews, and AI analysis—no more buyer's remorse.",
    },
];

export function Benefits() {
    return (
        <section className="py-24 px-4 bg-background">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                        Why Choose market-sift?
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Focus on how it helps users instead of what features it has
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <div
                                key={index}
                                className="space-y-4 p-6 rounded-xl border border-border bg-card hover:shadow-md transition-shadow"
                            >
                                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                    <Icon className="w-6 h-6 text-primary" />
                                </div>
                                <div className="space-y-2">
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {benefit.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        {benefit.description}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
