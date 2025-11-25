/**
 * Parse NDJSON (Newline Delimited JSON) stream
 * Each line is a separate JSON object
 */
export async function* parseNDJSONStream(
    stream: ReadableStream<Uint8Array>
): AsyncGenerator<any, void, unknown> {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    try {
        while (true) {
            const { done, value } = await reader.read();

            if (done) {
                // Process any remaining data in buffer
                if (buffer.trim()) {
                    try {
                        yield JSON.parse(buffer);
                    } catch (e) {
                        console.error("Failed to parse final JSON:", buffer, e);
                    }
                }
                break;
            }

            // Decode chunk and add to buffer
            buffer += decoder.decode(value, { stream: true });

            // Split by newlines and process complete lines
            const lines = buffer.split("\n");

            // Keep the last incomplete line in buffer
            buffer = lines.pop() || "";

            // Process complete lines
            for (const line of lines) {
                const trimmed = line.trim();
                if (trimmed) {
                    try {
                        yield JSON.parse(trimmed);
                    } catch (e) {
                        console.error("Failed to parse JSON line:", trimmed, e);
                    }
                }
            }
        }
    } finally {
        reader.releaseLock();
    }
}

/**
 * Parse a single NDJSON line
 */
export function parseNDJSONLine(line: string): any | null {
    const trimmed = line.trim();
    if (!trimmed) return null;

    try {
        return JSON.parse(trimmed);
    } catch (e) {
        console.error("Failed to parse NDJSON line:", trimmed, e);
        return null;
    }
}
