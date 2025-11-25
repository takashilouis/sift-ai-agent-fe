import { Play } from "lucide-react";
import { Button } from "@/components/ui/button";

export function VideoDemo() {
    return (
        <section className="py-24 px-4 bg-background">
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                        See market-sift in Action
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Watch how our AI agents research products in real-time
                    </p>
                </div>

                {/* Video Container */}
                <div className="relative aspect-video rounded-2xl overflow-hidden bg-secondary border border-border shadow-lg group cursor-pointer">
                    {/* Placeholder with play button */}
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/5">
                        <div className="text-center space-y-4">
                            <div className="w-20 h-20 mx-auto rounded-full bg-primary/90 flex items-center justify-center group-hover:bg-primary transition-colors shadow-xl">
                                <Play className="w-10 h-10 text-primary-foreground ml-1" fill="currentColor" />
                            </div>
                            <p className="text-foreground font-medium">Watch Demo Video</p>
                            <p className="text-sm text-muted-foreground">2 minutes</p>
                        </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-4 left-4 px-3 py-1 bg-card/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground border border-border">
                        Product Demo
                    </div>
                </div>

                {/* Stats below video */}
                <div className="grid grid-cols-3 gap-6 mt-12 text-center">
                    <div className="space-y-1">
                        <div className="text-3xl font-bold text-foreground">10K+</div>
                        <div className="text-sm text-muted-foreground">Happy Users</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-3xl font-bold text-foreground">50K+</div>
                        <div className="text-sm text-muted-foreground">Products Analyzed</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-3xl font-bold text-foreground">95%</div>
                        <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
