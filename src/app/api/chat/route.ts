import { NextRequest } from "next/server";
import {
  getSession,
  updateSchema,
  updateChatHistory,
} from "@/lib/session-store";
import { publish } from "@/lib/sse-manager";
import { processChat, StreamEvent } from "@/lib/agent/claude-client";

export async function POST(request: NextRequest) {
  const { sessionId, message } = await request.json();

  if (!sessionId || !message) {
    return new Response(
      JSON.stringify({ error: "Missing sessionId or message" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }

  const encoder = new TextEncoder();
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  const send = (event: StreamEvent) => {
    writer.write(encoder.encode(JSON.stringify(event) + "\n"));
  };

  // Run processing in background, streaming events as they occur
  (async () => {
    try {
      const { schema, chatHistory } = getSession(sessionId);

      const { updatedSchema, updatedHistory } = await processChat(
        schema,
        chatHistory,
        message,
        (event) => {
          send(event);

          // Also push schema updates via SSE so the page view updates live
          if (event.type === "schema_update") {
            publish(sessionId, { schema: event.schema });
          }
        }
      );

      // Persist final state
      updateSchema(sessionId, updatedSchema);
      updateChatHistory(sessionId, updatedHistory);

      // Final SSE push for the completed schema
      publish(sessionId, { schema: updatedSchema });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unknown error";
      send({ type: "error", message });
      send({ type: "done" });
    } finally {
      writer.close();
    }
  })();

  return new Response(readable, {
    headers: {
      "Content-Type": "application/x-ndjson",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
