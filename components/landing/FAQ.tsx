"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
    {
        question: "How does market-sift work?",
        answer: "market-sift uses advanced AI agents to automatically search across multiple e-commerce platforms, analyze product reviews, compare prices, and generate comprehensive research reports. Simply describe what you're looking for, and our AI does the rest.",
    },
    {
        question: "Is my data secure?",
        answer: "Yes, we take security seriously. All data is encrypted in transit and at rest. We never sell your personal information or search history to third parties. Your research is private and confidential.",
    },
    {
        question: "Can I cancel my subscription anytime?",
        answer: "Absolutely! You can cancel your subscription at any time with no questions asked. If you cancel, you'll continue to have access until the end of your current billing period.",
    },
    {
        question: "What sources does market-sift analyze?",
        answer: "We analyze data from dozens of e-commerce platforms including Amazon, eBay, Walmart, Target, Best Buy, and many more. We also aggregate reviews from trusted review sites to give you a complete picture.",
    },
    {
        question: "How accurate are the AI recommendations?",
        answer: "Our AI models are trained on millions of product reviews and comparisons. While we strive for high accuracy, we always recommend using our reports as one input in your decision-making process alongside your personal preferences and needs.",
    },
    {
        question: "Do you offer refunds?",
        answer: "Yes, we offer a 14-day money-back guarantee on all paid plans. If you're not satisfied with market-sift for any reason, contact us within 14 days for a full refund.",
    },
];

export function FAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <section className="py-24 px-4 bg-background">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-lg text-muted-foreground">
                        Everything you need to know about market-sift
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="border border-border rounded-lg bg-card overflow-hidden"
                        >
                            <button
                                onClick={() =>
                                    setOpenIndex(openIndex === index ? null : index)
                                }
                                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-secondary/50 transition-colors"
                            >
                                <span className="font-semibold text-foreground pr-4">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </button>
                            {openIndex === index && (
                                <div className="px-6 pb-4 text-muted-foreground leading-relaxed">
                                    {faq.answer}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
