import { NextRequest } from "next/server";
import { subscribe } from "@/lib/sse-manager";
import { getSession } from "@/lib/session-store";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("sessionId");
  if (!sessionId) {
    return new Response("Missing sessionId", { status: 400 });
  }

  // Ensure session exists and get current schema
  const { schema } = getSession(sessionId);

  const sseStream = subscribe(sessionId);

  // Create a transform stream that prepends the current schema
  const { readable, writable } = new TransformStream();
  const writer = writable.getWriter();

  // Send current schema immediately
  writer.write(
    new TextEncoder().encode(
      `data: ${JSON.stringify({ schema })}\n\n`
    )
  );

  // Pipe the SSE stream through
  const reader = sseStream.getReader();
  (async () => {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        await writer.write(new TextEncoder().encode(value as string));
      }
    } catch {
      // Client disconnected
    } finally {
      writer.close();
    }
  })();

  return new Response(readable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
