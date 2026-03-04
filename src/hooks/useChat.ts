"use client";

import { useState, useCallback, useRef } from "react";
import { ChatMessage, ThinkingStep } from "@/lib/schema";

export function useChat(sessionId: string) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [thinkingSteps, setThinkingSteps] = useState<ThinkingStep[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  const sendMessage = useCallback(async () => {
    const text = input.trim();
    if (!text || isLoading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setThinkingSteps([]);

    abortRef.current = new AbortController();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, message: text }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const reader = res.body?.getReader();
      if (!reader) throw new Error("No response body");

      const decoder = new TextDecoder();
      let buffer = "";
      const steps: ThinkingStep[] = [];
      let finalText = "";
      let hadError = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (!line.trim()) continue;

          try {
            const event = JSON.parse(line);

            switch (event.type) {
              case "tool_call": {
                const step: ThinkingStep = {
                  type: "tool_call",
                  name: event.name,
                  input: event.input,
                };
                steps.push(step);
                setThinkingSteps([...steps]);
                break;
              }
              case "tool_result": {
                const step: ThinkingStep = {
                  type: "tool_result",
                  name: event.name,
                  result: event.result,
                  success: event.success,
                };
                steps.push(step);
                setThinkingSteps([...steps]);
                break;
              }
              case "error": {
                hadError = true;
                const step: ThinkingStep = {
                  type: "error",
                  message: event.message,
                };
                steps.push(step);
                setThinkingSteps([...steps]);
                break;
              }
              case "text": {
                finalText = event.content;
                break;
              }
              case "done": {
                // Handled after loop
                break;
              }
            }
          } catch {
            // Skip malformed lines
          }
        }
      }

      // Build assistant message with thinking steps attached
      if (finalText || hadError) {
        const assistantMessage: ChatMessage = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: finalText || "Something went wrong while processing your request.",
          thinking: steps.length > 0 ? steps : undefined,
          timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      if ((error as Error).name === "AbortError") return;

      const errorMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Sorry, something went wrong. Please try again.",
        thinking: [{ type: "error", message: (error as Error).message }],
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      console.error("Chat error:", error);
    } finally {
      setIsLoading(false);
      setThinkingSteps([]);
      abortRef.current = null;
    }
  }, [input, isLoading, sessionId]);

  const resetChat = useCallback(async () => {
    abortRef.current?.abort();
    try {
      await fetch("/api/reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });
      setMessages([]);
      setInput("");
      setThinkingSteps([]);
      setIsLoading(false);
    } catch (error) {
      console.error("Reset error:", error);
    }
  }, [sessionId]);

  return {
    messages,
    input,
    setInput,
    isLoading,
    thinkingSteps,
    sendMessage,
    resetChat,
  };
}
