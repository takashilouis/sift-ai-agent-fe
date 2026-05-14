const benefits = [
    { icon: "insights", title: "Trend Sifting", description: "Identify viral products across 14 marketplaces before they hit the mainstream consciousness.", offset: false },
    { icon: "psychology", title: "AI Forecasting", description: "Predict seasonal demand with 94.2% accuracy using our proprietary Organic Intelligence models.", offset: true },
    { icon: "monitoring", title: "Competitor Spying", description: "Monitor price shifts and stockouts of your top 10 competitors in real-time, every day.", offset: false },
    { icon: "inventory_2", title: "Niche Discovery", description: "Uncover underserved categories with low competition and high search volume automatically.", offset: false },
    { icon: "reviews", title: "Sentiment Analysis", description: "AI parses millions of reviews to find product defects and customer pain points for you to solve.", offset: true },
    { icon: "api", title: "Export & Integrate", description: "One-click export to CSV, Shopify, or directly into your ERP through our robust API layer.", offset: false },
];

export function Benefits() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-24">
            <div className="text-center mb-20 space-y-4">
                <h2 className="text-4xl font-bold tracking-tight font-headline">Curated for Insight</h2>
                <p className="text-tertiary max-w-xl mx-auto">
                    Our 360° approach to product intelligence ensures you never miss a trending signal or a competitor&apos;s move.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {benefits.map((item) => (
                    <div
                        key={item.title}
                        className={`bg-surface-container-lowest p-8 rounded-[1.5rem] space-y-6 hover:translate-y-[-8px] transition-transform duration-300 ${item.offset ? "md:mt-8" : ""}`}
                    >
                        <div className="w-14 h-14 bg-surface-container flex items-center justify-center rounded-2xl">
                            <span className="material-symbols-outlined text-primary text-3xl">{item.icon}</span>
                        </div>
                        <h3 className="text-xl font-bold font-headline">{item.title}</h3>
                        <p className="text-tertiary leading-relaxed">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
