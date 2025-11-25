"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ResearchState, Product } from "@/types/research";
import { TrendingUp, TrendingDown, Minus, ExternalLink, Star } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface FinalReportViewProps {
    state: ResearchState;
}

export function FinalReportView({ state }: FinalReportViewProps) {
    if (!state.final_report && !state.summary && !state.sentiment && !state.comparison) {
        return null;
    }

    return (
        <div className="space-y-6">
            {/* Sentiment Analysis */}
            {state.sentiment && (
                <Card>
                    <CardHeader>
                        <CardTitle>Sentiment Analysis</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm text-muted-foreground">
                            {state.sentiment.summary}
                        </p>

                        <div className="space-y-3">
                            <SentimentBar
                                label="Positive"
                                value={state.sentiment.positive}
                                color="bg-green-500"
                                icon={<TrendingUp className="w-4 h-4" />}
                            />
                            <SentimentBar
                                label="Neutral"
                                value={state.sentiment.neutral}
                                color="bg-gray-400"
                                icon={<Minus className="w-4 h-4" />}
                            />
                            <SentimentBar
                                label="Negative"
                                value={state.sentiment.negative}
                                color="bg-red-500"
                                icon={<TrendingDown className="w-4 h-4" />}
                            />
                        </div>

                        <div className="pt-2">
                            <div className="text-sm font-medium text-foreground">
                                Overall Sentiment Score
                            </div>
                            <div className="text-3xl font-semibold text-primary mt-1">
                                {state.sentiment.overall && !isNaN(Number(state.sentiment.overall))
                                    ? Number(state.sentiment.overall).toFixed(1)
                                    : "N/A"}
                                <span className="text-base text-muted-foreground">/10</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Product Comparison */}
            {state.comparison && state.comparison.products && state.comparison.products.length > 0 && (
                <Card>
                    <CardHeader>
                        <CardTitle>Product Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {state.comparison.winner && (
                            <div className="mb-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                                <div className="text-sm font-medium text-primary mb-1">
                                    Recommended Choice
                                </div>
                                <div className="text-foreground font-semibold">
                                    {state.comparison.winner}
                                </div>
                            </div>
                        )}

                        <div className="space-y-4">
                            {state.comparison.products.map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))}
                        </div>

                        {state.comparison.criteria && (
                            <>
                                <Separator className="my-6" />
                                <div className="space-y-3">
                                    <h4 className="font-medium text-foreground">Comparison Criteria</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <CriteriaItem label="Price" value={state.comparison.criteria.price} />
                                        <CriteriaItem label="Quality" value={state.comparison.criteria.quality} />
                                        <CriteriaItem label="Value" value={state.comparison.criteria.value} />
                                    </div>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Alternative Products */}
            {state.products && state.products.length > 0 && !state.comparison && (
                <Card>
                    <CardHeader>
                        <CardTitle>Products Found</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {state.products.map((product, index) => (
                                <ProductCard key={index} product={product} />
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Final Report */}
            {state.final_report && (
                <Card>
                    <CardHeader>
                        <CardTitle>Final Report</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="prose prose-sm max-w-none text-muted-foreground">
                            <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                    h1: ({ node, ...props }) => <h1 className="text-2xl font-semibold text-foreground mt-6 mb-3" {...props} />,
                                    h2: ({ node, ...props }) => <h2 className="text-xl font-semibold text-foreground mt-5 mb-2" {...props} />,
                                    h3: ({ node, ...props }) => <h3 className="text-lg font-semibold text-foreground mt-4 mb-2" {...props} />,
                                    p: ({ node, ...props }) => <p className="leading-relaxed mb-3" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc pl-6 mb-3 space-y-1" {...props} />,
                                    ol: ({ node, ...props }) => <ol className="list-decimal pl-6 mb-3 space-y-1" {...props} />,
                                    li: ({ node, ...props }) => <li className="leading-relaxed" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="font-semibold text-foreground" {...props} />,
                                    em: ({ node, ...props }) => <em className="italic" {...props} />,
                                    code: ({ node, ...props }) => <code className="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono" {...props} />,
                                    table: ({ node, ...props }) => (
                                        <div className="my-6 overflow-x-auto rounded-lg border border-border">
                                            <table className="w-full border-collapse" {...props} />
                                        </div>
                                    ),
                                    thead: ({ node, ...props }) => <thead className="bg-secondary/50" {...props} />,
                                    tbody: ({ node, ...props }) => <tbody className="divide-y divide-border" {...props} />,
                                    tr: ({ node, ...props }) => <tr className="hover:bg-secondary/30 transition-colors" {...props} />,
                                    th: ({ node, ...props }) => (
                                        <th className="px-4 py-3 text-left text-sm font-semibold text-foreground" {...props} />
                                    ),
                                    td: ({ node, ...props }) => (
                                        <td className="px-4 py-3 text-sm text-foreground" {...props} />
                                    ),
                                }}
                            >
                                {state.final_report}
                            </ReactMarkdown>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

function SentimentBar({
    label,
    value,
    color,
    icon,
}: {
    label: string;
    value: number;
    color: string;
    icon: React.ReactNode;
}) {
    const displayValue = value && !isNaN(Number(value)) ? Number(value) : 0;

    return (
        <div>
            <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2 text-sm text-foreground">
                    {icon}
                    {label}
                </div>
                <span className="text-sm font-medium text-foreground">
                    {displayValue > 0 ? `${displayValue}%` : "N/A"}
                </span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                    className={`h-full ${color} transition-all duration-500`}
                    style={{ width: `${displayValue}%` }}
                />
            </div>
        </div>
    );
}

function ProductCard({ product }: { product: Product }) {
    return (
        <div className="flex gap-4 p-4 border border-border rounded-lg hover:border-primary/50 transition-colors">
            {product.image && (
                <div className="w-24 h-24 flex-shrink-0 bg-secondary rounded-md overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                    />
                </div>
            )}
            <div className="flex-1 min-w-0 space-y-2">
                <div>
                    <h4 className="font-medium text-foreground line-clamp-2">
                        {product.name}
                    </h4>
                    {product.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                            {product.description}
                        </p>
                    )}
                </div>

                <div className="flex items-center gap-4 text-sm">
                    <div className="font-semibold text-primary">
                        ${Number(product.price).toFixed(2)}
                    </div>

                    {product.rating && (
                        <div className="flex items-center gap-1 text-muted-foreground">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span>{Number(product.rating).toFixed(1)}</span>
                            {product.reviews && (
                                <span className="text-xs">({product.reviews})</span>
                            )}
                        </div>
                    )}
                </div>

                {product.url && (
                    <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                    >
                        View Product
                        <ExternalLink className="w-3 h-3" />
                    </a>
                )}
            </div>
        </div>
    );
}

function CriteriaItem({ label, value }: { label: string; value: string }) {
    return (
        <div className="space-y-1">
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {label}
            </div>
            <div className="text-sm text-foreground">{value}</div>
        </div>
    );
}
