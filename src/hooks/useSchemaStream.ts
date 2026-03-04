"use client";

import { useState, useEffect } from "react";
import { PageSchema } from "@/lib/schema";

export function useSchemaStream(
  sessionId: string,
  defaultSchema: PageSchema
): PageSchema {
  const [schema, setSchema] = useState<PageSchema>(defaultSchema);

  useEffect(() => {
    if (!sessionId) return;

    const eventSource = new EventSource(`/api/stream?sessionId=${sessionId}`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.schema) {
          setSchema(data.schema);
        }
      } catch (e) {
        console.error("SSE parse error:", e);
      }
    };

    eventSource.onerror = () => {
      console.error("SSE connection error, reconnecting...");
      eventSource.close();
      // EventSource auto-reconnects, but we close and let useEffect re-run
    };

    return () => {
      eventSource.close();
    };
  }, [sessionId]);

  return schema;
}
