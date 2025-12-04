import { parseNDJSONStream } from "@/lib/utils/stream";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export interface ResearchQuery {
    query: string;
    mode?: string;
    deep_research?: boolean;
}

export interface StreamChunk {
    step?: string;
    state?: any;
    timestamp?: string;
    type?: string;
    report_id?: string;
}

/**
 * Stream research results from the FastAPI backend
 * Yields NDJSON chunks as they arrive
 */
export async function* streamResearch(
    query: ResearchQuery
): AsyncGenerator<StreamChunk, void, unknown> {
    const response = await fetch(`${API_URL}/api/research`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(query),
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
    }

    if (!response.body) {
        throw new Error("Response body is null");
    }

    // Parse NDJSON stream
    for await (const chunk of parseNDJSONStream(response.body)) {
        yield chunk as StreamChunk;
    }
}

export interface ChatMessage {
    role: "user" | "assistant" | "system";
    content: string;
}

export interface ChatChunk {
    type: "content" | "tool_start" | "tool_end" | "session_id" | "agent_status";
    content?: string;
    tool?: string;
    input?: any;
    output?: string;
    session_id?: string;
    status?: string | null;
}

export async function* streamChat(
    messages: ChatMessage[],
    sessionId?: string,
    signal?: AbortSignal
): AsyncGenerator<ChatChunk, void, unknown> {
    const response = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages, session_id: sessionId }),
        signal,
    });

    if (!response.ok) {
        throw new Error(`API request failed: ${response.statusText}`);
    }

    if (!response.body) {
        throw new Error("Response body is null");
    }

    for await (const chunk of parseNDJSONStream(response.body)) {
        yield chunk as ChatChunk;
    }
}
