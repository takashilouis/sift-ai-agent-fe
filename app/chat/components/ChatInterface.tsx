"use client";

import { useState, useRef, useEffect } from "react";
import { MessageBubble } from "./MessageBubble";

interface Message {
    role: "user" | "assistant";
    content: string;
    timestamp?: string;
}

export function ChatInterface() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSend = async () => {
        if (!input.trim()) return;
        const userMsg: Message = { role: "user", content: input, timestamp: new Date().toISOString() };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);
        // Simulate AI response
        setTimeout(() => {
            setMessages((prev) => [
                ...prev,
                { role: "assistant", content: "(AI trả lời mẫu) " + userMsg.content, timestamp: new Date().toISOString() },
            ]);
            setIsLoading(false);
        }, 1200);
    };

    useEffect(() => {
        if (inputRef.current) inputRef.current.focus();
    }, []);

    return (
        <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto px-6 py-8 bg-surface-container-lowest">
                {messages.length === 0 && (
                    <div className="text-center text-tertiary py-20">Hãy bắt đầu cuộc trò chuyện về sản phẩm bạn quan tâm!</div>
                )}
                {messages.map((msg, idx) => (
                    <MessageBubble key={idx} message={msg} />
                ))}
                {isLoading && (
                    <div className="flex justify-start mb-2">
                        <div className="bg-surface-container-lowest text-on-surface px-5 py-3 rounded-2xl shadow-sm text-sm animate-pulse">
                            <span className="material-symbols-outlined text-primary mr-2 animate-bounce">more_horiz</span>
                            Đang soạn trả lời...
                        </div>
                    </div>
                )}
            </div>
            <form
                className="flex items-center gap-3 px-6 py-4 border-t border-outline-variant/10 bg-surface-container"
                onSubmit={e => {
                    e.preventDefault();
                    handleSend();
                }}
            >
                <input
                    ref={inputRef}
                    type="text"
                    className="flex-1 bg-surface-container-lowest rounded-full px-5 py-3 text-sm outline-none border border-outline-variant/20"
                    placeholder="Nhập câu hỏi về sản phẩm..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="btn-primary-gradient px-6 py-2.5 text-sm rounded-full disabled:opacity-50"
                    disabled={isLoading || !input.trim()}
                >
                    Gửi
                </button>
            </form>
        </div>
    );
}
