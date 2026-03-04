import { NextRequest, NextResponse } from "next/server";
import { resetSession } from "@/lib/session-store";
import { publish } from "@/lib/sse-manager";

export async function POST(request: NextRequest) {
  try {
    const { sessionId } = await request.json();

    if (!sessionId) {
      return NextResponse.json(
        { error: "Missing sessionId" },
        { status: 400 }
      );
    }

    const schema = resetSession(sessionId);
    publish(sessionId, { schema });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Reset error:", error);
    return NextResponse.json(
      { error: "Failed to reset session" },
      { status: 500 }
    );
  }
}
