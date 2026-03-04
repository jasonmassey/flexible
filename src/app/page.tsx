"use client";

import { useState } from "react";
import { EditorShell } from "@/components/EditorShell";
import { ChatPanel } from "@/components/ChatPanel";
import { defaultSchema } from "@/lib/default-schema";
import { useSchemaStream } from "@/hooks/useSchemaStream";
import { useChat } from "@/hooks/useChat";

export default function Home() {
  const [sessionId] = useState(() => {
    if (typeof window !== "undefined") {
      let id = document.cookie
        .split("; ")
        .find((c) => c.startsWith("session_id="))
        ?.split("=")[1];
      if (!id) {
        id = crypto.randomUUID();
        document.cookie = `session_id=${id}; path=/; max-age=${60 * 60 * 24 * 7}`;
      }
      return id;
    }
    return "";
  });

  const schema = useSchemaStream(sessionId, defaultSchema);
  const chat = useChat(sessionId);

  return (
    <EditorShell
      schema={schema}
      chatPanel={
        <ChatPanel
          messages={chat.messages}
          input={chat.input}
          isLoading={chat.isLoading}
          onInputChange={chat.setInput}
          onSend={chat.sendMessage}
          onReset={chat.resetChat}
        />
      }
    />
  );
}
