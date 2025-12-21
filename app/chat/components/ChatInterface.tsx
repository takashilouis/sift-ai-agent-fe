"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Send, StopCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageBubble } from "./MessageBubble";
import { streamChat, ChatMessage } from "@/app/api/client";

export function ChatInterface() {
    const searchParams = useSearchParams();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [agentStatus, setAgentStatus] = useState<string | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const [sessionId, setSessionId] = useState<string | undefined>(undefined);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Load chat session from URL parameter if present
    useEffect(() => {
        // Prevent fetching if we are currently loading (streaming) or if session ID is already set correctly
        if (isLoading) return;

        const urlSessionId = searchParams.get('session');

        if (urlSessionId) {
            // optimized: don't re-fetch if we already have this session loaded
            if (urlSessionId === sessionId && messages.length > 0) return;

            setSessionId(urlSessionId);

            // Fetch the chat session history
            fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/history/chat/${urlSessionId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.messages && Array.isArray(data.messages)) {
                        setMessages(data.messages.map((msg: any) => ({
                            role: msg.role,
                            content: msg.content
                        })));
                    }
                })
                .catch(err => {
                    console.error("Failed to load chat session:", err);
                    setMessages([{
                        role: "assistant",
                        content: "Failed to load chat history. Please try again."
                    }]);
                });
        } else {
            // No session ID in URL, reset to empty state only if we're not just starting a new one (isLoading covers this partially, but safer to be explicit)
            if (!isLoading && sessionId) {
                setSessionId(undefined);
                setMessages([]);
            }
        }
    }, [searchParams, sessionId, isLoading]); // Added dependencies to ensure correctness

    const abortControllerRef = useRef<AbortController | null>(null);

    const handleStop = () => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
            abortControllerRef.current = null;
            setIsLoading(false);
            setAgentStatus("Stopped by user");
        }
    };

    const handleSubmit = async (e: React.FormEvent | React.KeyboardEvent) => {
        e.preventDefault();
        if ((!input.trim() && !isLoading)) return;

        if (isLoading) {
            handleStop();
            return;
        }

        const userMessage: ChatMessage = { role: "user", content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsLoading(true);
        setAgentStatus(null); // Clear status on new submission

        // Add placeholder for assistant message
        setMessages(prev => [...prev, { role: "assistant", content: "" }]);

        // Create new AbortController
        const abortController = new AbortController();
        abortControllerRef.current = abortController;

        try {
            let fullContent = "";

            for await (const chunk of streamChat([...messages, userMessage], sessionId, abortController.signal)) {
                if (chunk.type === "session_id" && chunk.session_id) {
                    setSessionId(chunk.session_id);
                    // Update URL with session ID if it wasn't already set
                    if (!sessionId) {
                        const newUrl = `${window.location.pathname}?session=${chunk.session_id}`;
                        window.history.pushState({ path: newUrl }, "", newUrl);
                    }
                }
                else if (chunk.type === "agent_status") {
                    setAgentStatus(chunk.status || null);
                }
                else if (chunk.type === "content") {
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
        } catch (error: any) {
            if (error.name === 'AbortError') {
                console.log('Chat aborted');
                return;
            }
            console.error("Chat error:", error);
            setMessages(prev => [...prev, {
                role: "assistant",
                content: "Sorry, I encountered an error. Please try again."
            }]);
        } finally {
            abortControllerRef.current = null;
            setIsLoading(false);
            setAgentStatus(null);
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

                {agentStatus && (
                    <div className="flex items-center gap-2 p-4 bg-muted/30 rounded-lg border border-border animate-pulse">
                        <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                        <span className="text-sm text-muted-foreground">{agentStatus}</span>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t bg-background">
                <form onSubmit={handleSubmit} className="flex gap-2 items-end">
                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleSubmit(e);
                            }
                        }}
                        placeholder="Ask about a product..."
                        disabled={isLoading}
                        className="flex-1 min-h-[44px] max-h-[200px] w-full rounded-md border border-input bg-background px-3 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        rows={1}
                    />
                    <Button
                        type="submit"
                        disabled={!input.trim() && !isLoading}
                        className="h-11 mb-[1px]"
                        variant={isLoading ? "destructive" : "default"}
                    >
                        {isLoading ? <StopCircle className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                        <span className="sr-only">{isLoading ? "Stop" : "Send"}</span>
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
