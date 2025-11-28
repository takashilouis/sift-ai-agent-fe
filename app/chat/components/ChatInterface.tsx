"use client";

import { useState, useRef, useEffect } from "react";
import { Send, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageBubble } from "./MessageBubble";
import { streamChat, ChatMessage } from "@/app/api/client";

export function ChatInterface() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = { role: "user", content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);

        // Add placeholder for assistant message
        setMessages(prev => [...prev, { role: "assistant", content: "" }]);

        try {
            let fullContent = "";

            for await (const chunk of streamChat([...messages, userMessage])) {
                if (chunk.type === "content") {
                    fullContent += chunk.content;

                    setMessages(prev => {
                        const newMessages = [...prev];
                        const lastMessage = newMessages[newMessages.length - 1];
                        if (lastMessage.role === "assistant") {
                            lastMessage.content = fullContent;
                        }
                        return newMessages;
                    });
                }
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, {
                role: "system",
                content: "Sorry, an error occurred while processing your request."
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-full max-w-4xl mx-auto">
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground space-y-4">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center">
                            <BotIcon className="w-8 h-8" />
                        </div>
                        <h2 className="text-2xl font-semibold text-foreground">How can I help you today?</h2>
                        <p className="max-w-md">
                            I can help you research products, compare prices, and find the best deals.
                        </p>
                    </div>
                )}

                {messages.map((msg, index) => (
                    <MessageBubble
                        key={index}
                        role={msg.role}
                        content={msg.content}
                        isStreaming={isLoading && index === messages.length - 1 && msg.role === "assistant"}
                    />
                ))}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t bg-background">
                <form onSubmit={handleSubmit} className="flex gap-2">
                    <Input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask about a product..."
                        disabled={isLoading}
                        className="flex-1"
                    />
                    <Button type="submit" disabled={isLoading || !input.trim()}>
                        {isLoading ? <StopCircle className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                        <span className="sr-only">Send</span>
                    </Button>
                </form>
            </div>
        </div>
    );
}

function BotIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M12 8V4H8" />
            <rect width="16" height="12" x="4" y="8" rx="2" />
            <path d="M2 14h2" />
            <path d="M20 14h2" />
            <path d="M15 13v2" />
            <path d="M9 13v2" />
        </svg>
    )
}
