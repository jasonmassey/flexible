"use client";

import { useRef, useEffect } from "react";
import { ChatMessage } from "@/lib/schema";

interface ChatPanelProps {
  messages: ChatMessage[];
  input: string;
  isLoading: boolean;
  onInputChange: (value: string) => void;
  onSend: () => void;
  onReset: () => void;
}

export function ChatPanel({
  messages,
  input,
  isLoading,
  onInputChange,
  onSend,
  onReset,
}: ChatPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSend();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "1rem 1.25rem",
          borderBottom: "1px solid #e2e8f0",
          fontWeight: "600",
          fontSize: "0.875rem",
          color: "#334155",
          backgroundColor: "#fff",
        }}
      >
        Chat with AI
        <button
          onClick={onReset}
          style={{
            padding: "0.25rem 0.625rem",
            borderRadius: "0.375rem",
            border: "1px solid #e2e8f0",
            backgroundColor: "transparent",
            fontSize: "0.75rem",
            color: "#64748b",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>

      {/* Messages */}
      <div
        style={{
          flex: 1,
          overflow: "auto",
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.75rem",
        }}
      >
        {messages.length === 0 && (
          <div
            style={{
              textAlign: "center",
              color: "#94a3b8",
              fontSize: "0.875rem",
              marginTop: "2rem",
            }}
          >
            Describe changes you want to make to the page.
            <br />
            Try &quot;make the background dark&quot; or &quot;add a testimonials section&quot;.
          </div>
        )}
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
            }}
          >
            <div
              style={{
                maxWidth: "85%",
                padding: "0.625rem 0.875rem",
                borderRadius: "0.75rem",
                fontSize: "0.875rem",
                lineHeight: "1.5",
                backgroundColor: msg.role === "user" ? "#6366f1" : "#fff",
                color: msg.role === "user" ? "#fff" : "#334155",
                border: msg.role === "assistant" ? "1px solid #e2e8f0" : "none",
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                padding: "0.75rem 1rem",
                borderRadius: "0.75rem",
                backgroundColor: "#fff",
                border: "1px solid #e2e8f0",
                display: "flex",
                alignItems: "center",
                gap: "3px",
              }}
            >
              <span className="typing-dot" />
              <span className="typing-dot" />
              <span className="typing-dot" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div
        style={{
          padding: "1rem",
          borderTop: "1px solid #e2e8f0",
          backgroundColor: "#fff",
          display: "flex",
          gap: "0.5rem",
        }}
      >
        <textarea
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Describe a change..."
          rows={1}
          style={{
            flex: 1,
            padding: "0.625rem 0.875rem",
            borderRadius: "0.5rem",
            border: "1px solid #e2e8f0",
            fontSize: "0.875rem",
            resize: "none",
            outline: "none",
            fontFamily: "inherit",
          }}
        />
        <button
          onClick={onSend}
          disabled={isLoading || !input.trim()}
          style={{
            padding: "0.625rem 1rem",
            borderRadius: "0.5rem",
            backgroundColor: isLoading || !input.trim() ? "#cbd5e1" : "#6366f1",
            color: "#fff",
            border: "none",
            fontSize: "0.875rem",
            fontWeight: "600",
            cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}
