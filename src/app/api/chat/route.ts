import { NextRequest, NextResponse } from "next/server";
import { getSession, updateSchema, updateChatHistory } from "@/lib/session-store";
import { publish } from "@/lib/sse-manager";
import { processChat } from "@/lib/agent/claude-client";

export async function POST(request: NextRequest) {
  try {
    const { sessionId, message } = await request.json();

    if (!sessionId || !message) {
      return NextResponse.json(
        { error: "Missing sessionId or message" },
        { status: 400 }
      );
    }

    // Get current session state
    const { schema, chatHistory } = getSession(sessionId);

    // Process through Claude
    const { response, updatedSchema, updatedHistory } = await processChat(
      schema,
      chatHistory,
      message
    );

    // Persist updated schema and chat history
    updateSchema(sessionId, updatedSchema);
    updateChatHistory(sessionId, updatedHistory);

    // Push updated schema to all SSE clients for this session
    publish(sessionId, { schema: updatedSchema });

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to process message" },
      { status: 500 }
    );
  }
}
