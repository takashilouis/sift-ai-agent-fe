import Link from "next/link";

export function Hero() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-20 md:py-32 flex flex-col md:flex-row items-center gap-16 pt-32">
            <div className="flex-1 space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-secondary-container text-on-secondary-container rounded-full text-sm font-medium">
                    <span className="material-symbols-filled text-sm">auto_awesome</span>
                    Organic Intelligence Now Live
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-on-surface leading-[1.1] font-headline">
                    AI-Powered Product <br />
                    <span className="text-primary italic">Research in Seconds</span>
                </h1>
                <p className="text-lg md:text-xl text-tertiary max-w-lg leading-relaxed">
                    Stop drowning in spreadsheets. Market Sift surfaces high-intent product opportunities using advanced LLMs and real-time market signals.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                    <Link
                        href="/research"
                        className="btn-primary-gradient px-8 py-4 text-lg hover:scale-105 transition-transform"
                    >
                        Start Sifting Free
                    </Link>
                    <button className="px-8 py-4 rounded-full font-bold text-lg text-primary hover:bg-surface-container-low transition-colors">
                        View Demo
                    </button>
                </div>
            </div>
            <div className="flex-1 relative">
                <div className="absolute inset-0 bg-primary/5 rounded-[1.5rem] -rotate-3 scale-105"></div>
                <div className="relative bg-surface-container-lowest p-4 rounded-[1.5rem] shadow-2xl">
                    <div className="aspect-video bg-inverse-surface rounded-[1rem] flex items-center justify-center overflow-hidden">
                        <div className="p-8 text-inverse-on-surface space-y-4 w-full">
                            <div className="flex items-center gap-3">
                                <span className="material-symbols-outlined text-primary-fixed-dim">monitoring</span>
                                <h3 className="font-headline font-bold text-lg">Market Analytics</h3>
                            </div>
                            <div className="space-y-2">
                                <div className="h-2 bg-primary-container/30 rounded-full w-3/4"></div>
                                <div className="h-2 bg-primary-container/20 rounded-full w-1/2"></div>
                                <div className="flex gap-4 mt-4">
                                    <div className="h-16 w-1/3 bg-primary-container/20 rounded-lg"></div>
                                    <div className="h-16 w-1/3 bg-secondary/20 rounded-lg"></div>
                                    <div className="h-16 w-1/3 bg-tertiary/20 rounded-lg"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
