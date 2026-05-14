export function Partners() {
    const partners = ["AMAZON", "EBAY", "SHOPIFY", "WALMART", "ETSY"];

    return (
        <section className="bg-surface-container-low py-16">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-center text-sm font-bold text-tertiary/60 uppercase tracking-widest mb-10">
                    Trusted by Global Retailers
                </p>
                <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
                    {partners.map((name) => (
                        <div key={name} className="text-2xl font-black text-on-surface font-headline">
                            {name}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
