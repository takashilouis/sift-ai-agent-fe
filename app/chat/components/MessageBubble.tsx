import { cn } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { User, Bot } from "lucide-react";

interface MessageBubbleProps {
    role: "user" | "assistant" | "system";
    content: string;
    isStreaming?: boolean;
}

export function MessageBubble({ role, content, isStreaming }: MessageBubbleProps) {
    const isUser = role === "user";

    return (
        <div className={cn(
            "flex w-full gap-4 p-4",
            isUser ? "flex-row-reverse" : "flex-row"
        )}>
            <div className={cn(
                "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center",
                isUser ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            )}>
                {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
            </div>

            <div className={cn(
                "rounded-lg p-4",
                isUser ? "max-w-[60%] bg-primary text-primary-foreground" : "flex-1 max-w-full bg-muted/50 border border-border"
            )}>
                <div className={cn(
                    "prose prose-sm max-w-none",
                    isUser ? "prose-invert" : "dark:prose-invert"
                )}>
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                            a: ({ node, ...props }) => <a className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                            h1: ({ node, ...props }) => <h1 className="text-2xl font-bold mt-4 mb-2" {...props} />,
                            h2: ({ node, ...props }) => <h2 className="text-xl font-bold mt-3 mb-2" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="text-lg font-semibold mt-2 mb-1" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc pl-5 my-2" {...props} />,
                            ol: ({ node, ...props }) => <ol className="list-decimal pl-5 my-2" {...props} />,
                            table: ({ node, ...props }) => (
                                <div className="overflow-x-auto my-4">
                                    <table className="min-w-full border-collapse border border-border" {...props} />
                                </div>
                            ),
                            th: ({ node, ...props }) => <th className="border border-border px-4 py-2 bg-muted font-semibold" {...props} />,
                            td: ({ node, ...props }) => <td className="border border-border px-4 py-2" {...props} />,
                            hr: ({ node, ...props }) => <hr className="my-4 border-border" {...props} />,
                            code: ({ node, className, children, ...props }: any) => {
                                const match = /language-(\w+)/.exec(className || "");
                                const isPlan = match && match[1] === "plan";

                                if (isPlan) {
                                    return (
                                        <details className="mb-4 bg-muted/50 rounded-lg border border-border overflow-hidden">
                                            <summary className="px-4 py-2 bg-muted cursor-pointer font-medium text-sm flex items-center gap-2 select-none hover:bg-muted/80 transition-colors">
                                                <span>Thinking Process / Plan</span>
                                            </summary>
                                            <div className="p-4 text-sm font-mono whitespace-pre-wrap bg-background/50">
                                                {children}
                                            </div>
                                        </details>
                                    );
                                }

                                return <code className={cn("bg-black/10 dark:bg-white/10 rounded px-1", className)} {...props}>{children}</code>;
                            },
                            pre: ({ node, children, ...props }) => {
                                return <pre className="bg-black/10 dark:bg-white/10 rounded p-2 overflow-x-auto my-2" {...props}>{children}</pre>;
                            },
                        }}
                    >
                        {content}
                    </ReactMarkdown>
                    {isStreaming && (
                        <span className="inline-block w-2 h-4 ml-1 bg-current animate-pulse" />
                    )}
                </div>
            </div>
        </div>
    );
}
