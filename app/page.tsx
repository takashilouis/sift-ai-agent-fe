import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { VideoDemo } from "@/components/landing/VideoDemo";
import { Partners } from "@/components/landing/Partners";
import { Benefits } from "@/components/landing/Benefits";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Pricing } from "@/components/landing/Pricing";
import { Testimonials } from "@/components/landing/Testimonials";
import { FAQ } from "@/components/landing/FAQ";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";

export default function Home() {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <Hero />
            <VideoDemo />
            <Partners />
            <section id="features">
                <Benefits />
            </section>
            <section id="how-it-works">
                <HowItWorks />
            </section>
            <section id="pricing">
                <Pricing />
            </section>
            <Testimonials />
            <section id="faq">
                <FAQ />
            </section>
            <CTA />
            <Footer />
        </div>
    );
}
