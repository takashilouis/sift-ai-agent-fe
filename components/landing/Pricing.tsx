import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
    {
        name: "Starter",
        price: "$0",
        period: "forever",
        description: "Perfect for occasional shoppers",
        features: [
            "5 research reports per month",
            "Basic product comparison",
            "Email support",
            "48-hour report delivery",
        ],
        cta: "Get Started",
        popular: false,
    },
    {
        name: "Professional",
        price: "$29",
        period: "per month",
        description: "For serious shoppers and researchers",
        features: [
            "Unlimited research reports",
            "Advanced AI analysis",
            "Priority support",
            "Real-time report delivery",
            "Export to PDF",
            "Price tracking alerts",
        ],
        cta: "Start Free Trial",
        popular: true,
    },
    {
        name: "Enterprise",
        price: "Custom",
        period: "contact us",
        description: "For teams and businesses",
        features: [
            "Everything in Professional",
            "Team collaboration",
            "API access",
            "Custom integrations",
            "Dedicated account manager",
            "SLA guarantee",
        ],
        cta: "Contact Sales",
        popular: false,
    },
];

export function Pricing() {
    return (
        <section className="py-24 px-4 bg-background">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                        Simple, Transparent Pricing
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Choose the plan that's right for you. No hidden fees.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative rounded-2xl border p-8 space-y-6 ${plan.popular
                                    ? "border-primary bg-card shadow-lg scale-105"
                                    : "border-border bg-card"
                                }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                                    <span className="bg-primary text-primary-foreground text-xs font-semibold px-3 py-1 rounded-full">
                                        Most Popular
                                    </span>
                                </div>
                            )}

                            <div className="space-y-2">
                                <h3 className="text-xl font-semibold text-foreground">
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-bold text-foreground">
                                        {plan.price}
                                    </span>
                                    <span className="text-sm text-muted-foreground">
                                        /{plan.period}
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {plan.description}
                                </p>
                            </div>

                            <ul className="space-y-3">
                                {plan.features.map((feature, featureIndex) => (
                                    <li
                                        key={featureIndex}
                                        className="flex items-start gap-3 text-sm"
                                    >
                                        <Check className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                                        <span className="text-foreground">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button
                                className="w-full"
                                variant={plan.popular ? "default" : "outline"}
                                size="lg"
                            >
                                {plan.cta}
                            </Button>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12 text-sm text-muted-foreground">
                    All plans include a 14-day money-back guarantee
                </div>
            </div>
        </section>
    );
}
