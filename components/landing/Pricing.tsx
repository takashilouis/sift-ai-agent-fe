const plans = [
    {
        name: "Starter",
        price: "$49",
        period: "/mo",
        features: ["1,000 Product Credits", "Basic Trend Forecasting", "Email Support"],
        cta: "Get Started",
        popular: false,
    },
    {
        name: "Professional",
        price: "$129",
        period: "/mo",
        features: ["10,000 Product Credits", "Advanced AI Insights", "Competitor Tracking (50)", "API Access"],
        cta: "Go Pro",
        popular: true,
    },
    {
        name: "Enterprise",
        price: "$399",
        period: "/mo",
        features: ["Unlimited Credits", "Custom Model Training", "Dedicated Account Manager"],
        cta: "Contact Sales",
        popular: false,
    },
];

export function Pricing() {
    return (
        <section className="py-24 bg-surface-container">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-4xl font-bold tracking-tight font-headline">Flexible Intelligence</h2>
                    <p className="text-tertiary">Scale your research as your store grows. No hidden fees.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`bg-surface-container-lowest p-10 rounded-[1.5rem] space-y-8 ${
                                plan.popular
                                    ? "ring-4 ring-primary shadow-2xl relative scale-105 z-10"
                                    : ""
                            }`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                    Most Popular
                                </div>
                            )}
                            <div className="space-y-2">
                                <h4 className={`text-lg font-bold ${plan.popular ? "text-primary" : "text-tertiary"}`}>
                                    {plan.name}
                                </h4>
                                <div className="flex items-baseline gap-1">
                                    <span className={`font-black ${plan.popular ? "text-5xl" : "text-4xl"}`}>
                                        {plan.price}
                                    </span>
                                    <span className="text-tertiary">{plan.period}</span>
                                </div>
                            </div>
                            <ul className="space-y-4">
                                {plan.features.map((feature) => (
                                    <li key={feature} className="flex gap-3 items-center text-sm">
                                        <span
                                            className={`material-symbols-outlined text-lg ${plan.popular ? "text-secondary" : "text-secondary-fixed-dim"}`}
                                            style={{ fontVariationSettings: "'FILL' 1" }}
                                        >
                                            check_circle
                                        </span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={`w-full py-4 rounded-full font-bold ${
                                    plan.popular
                                        ? "btn-primary-gradient shadow-lg"
                                        : "border-2 border-outline-variant hover:bg-surface-container transition-colors"
                                }`}
                            >
                                {plan.cta}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
