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
                "flex-1 max-w-3xl rounded-lg p-4",
                isUser ? "bg-primary text-primary-foreground" : "bg-muted/50 border border-border"
            )}>
                <div className="prose prose-sm max-w-none dark:prose-invert">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                            a: ({ node, ...props }) => <a className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer" {...props} />,
                            code: ({ node, ...props }) => <code className="bg-black/10 dark:bg-white/10 rounded px-1" {...props} />,
                            pre: ({ node, ...props }) => <pre className="bg-black/10 dark:bg-white/10 rounded p-2 overflow-x-auto" {...props} />,
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
