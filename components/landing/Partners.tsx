import Image from "next/image";

const partners = [
    { name: "Amazon", color: "text-orange-600" },
    { name: "eBay", color: "text-blue-600" },
    { name: "Walmart", color: "text-blue-500" },
    { name: "Target", color: "text-red-600" },
    { name: "Best Buy", color: "text-yellow-600" },
    { name: "Newegg", color: "text-orange-500" },
    { name: "AliExpress", color: "text-red-500" },
    { name: "Etsy", color: "text-orange-600" },
];

export function Partners() {
    return (
        <section className="py-16 px-4 bg-secondary/30">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                        Sources we analyze
                    </h2>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6 items-center">
                    {partners.map((partner) => (
                        <div
                            key={partner.name}
                            className="flex items-center justify-center"
                        >
                            <div className="px-4 py-3 rounded-lg bg-card border border-border hover:shadow-md transition-shadow">
                                <span className={`text-sm font-bold ${partner.color}`}>
                                    {partner.name}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
