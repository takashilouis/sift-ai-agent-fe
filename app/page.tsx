
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { Partners } from "@/components/landing/Partners";
import { Benefits } from "@/components/landing/Benefits";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <Hero />
            <Partners />
            <section id="features">
                <Benefits />
            </section>
            <section id="pricing">
                <Pricing />
            </section>
            <Footer />
        </div>
    );
}
