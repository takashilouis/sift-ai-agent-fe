import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function CTA() {
    return (
        <section className="py-24 px-4 bg-primary text-primary-foreground">
            <div className="max-w-4xl mx-auto text-center space-y-8">
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold">
                        Ready to Make Smarter Purchases?
                    </h2>
                    <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
                        Join thousands of smart shoppers who use market-sift to research products and save time.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Link href="/research">
                        <Button
                            size="lg"
                            variant="secondary"
                            className="text-base px-8 h-12 gap-2"
                        >
                            Start Sifting
                            <ArrowRight className="w-4 h-4" />
                        </Button>
                    </Link>
                    <Button
                        size="lg"
                        variant="outline"
                        className="text-base px-8 h-12 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
                    >
                        View Pricing
                    </Button>
                </div>

                <p className="text-sm opacity-75">
                    No credit card required • Free forever plan available
                </p>
            </div>
        </section>
    );
}
