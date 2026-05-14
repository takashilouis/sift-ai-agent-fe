"use client";

import { useRef, useEffect } from "react";

interface MessageBubbleProps {
    message: {
        role: "user" | "assistant";
        content: string;
        timestamp?: string;
    };
}

export function MessageBubble({ message }: MessageBubbleProps) {
    const isUser = message.role === "user";
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }, []);

    return (
        <div
            ref={ref}
            className={`flex ${isUser ? "justify-end" : "justify-start"} mb-2`}
        >
            <div
                className={`max-w-[70%] px-5 py-3 rounded-2xl shadow-sm text-sm whitespace-pre-line ${
                    isUser
                        ? "bg-primary text-white rounded-br-md"
                        : "bg-surface-container-lowest text-on-surface rounded-bl-md border border-outline-variant/20"
                }`}
            >
                {message.content}
                {message.timestamp && (
                    <div className="text-xs text-tertiary mt-1 text-right">
                        {new Date(message.timestamp).toLocaleTimeString()}
                    </div>
                )}
            </div>
        </div>
    );
}
