import { Star } from "lucide-react";
import Image from "next/image";

const testimonials = [
    {
        name: "Sarah Chen",
        role: "Tech Enthusiast",
        avatar: "/avatars/sarah-chen.png",
        rating: 5,
        text: "market-sift saved me hours of research when buying my new laptop. The AI analysis was spot-on and helped me find the perfect model within my budget.",
    },
    {
        name: "Michael Rodriguez",
        role: "Small Business Owner",
        avatar: "/avatars/michael-rodriguez.png",
        rating: 5,
        text: "As a business owner, I need to make smart purchasing decisions. This tool gives me confidence that I'm getting the best value for every dollar spent.",
    },
    {
        name: "Emily Watson",
        role: "Professional Shopper",
        avatar: "/avatars/emily-watson.png",
        rating: 5,
        text: "The sentiment analysis feature is incredible. It cuts through the noise of fake reviews and shows me what real customers actually think.",
    },
    {
        name: "David Kim",
        role: "Product Manager",
        avatar: "/avatars/david-kim.png",
        rating: 5,
        text: "I use market-sift for competitive research. The comprehensive reports and unbiased comparisons are invaluable for my product strategy.",
    },
];

export function Testimonials() {
    return (
        <section className="py-24 px-4 bg-secondary/30">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                        Loved by People Worldwide
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Don't just take our word for it—see what our users have to say
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className="bg-card border border-border rounded-xl p-6 space-y-4 hover:shadow-md transition-shadow"
                        >
                            {/* Rating */}
                            <div className="flex gap-1">
                                {[...Array(testimonial.rating)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className="w-4 h-4 fill-primary text-primary"
                                    />
                                ))}
                            </div>

                            {/* Testimonial text */}
                            <p className="text-foreground leading-relaxed">
                                "{testimonial.text}"
                            </p>

                            {/* Author */}
                            <div className="flex items-center gap-3 pt-2">
                                <div className="w-10 h-10 rounded-full overflow-hidden bg-primary/10 flex-shrink-0">
                                    <Image
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        width={40}
                                        height={40}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                                <div>
                                    <div className="font-semibold text-foreground text-sm">
                                        {testimonial.name}
                                    </div>
                                    <div className="text-xs text-muted-foreground">
                                        {testimonial.role}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
