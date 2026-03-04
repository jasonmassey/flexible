import Anthropic from "@anthropic-ai/sdk";
import { tools } from "./tools";
import { buildSystemPrompt } from "./system-prompt";
import { executeToolCall } from "./tool-executor";
import { PageSchema, ChatMessage } from "@/lib/schema";

const anthropic = new Anthropic();

export async function processChat(
  schema: PageSchema,
  chatHistory: ChatMessage[],
  userMessage: string
): Promise<{
  response: string;
  updatedSchema: PageSchema;
  updatedHistory: ChatMessage[];
}> {
  let currentSchema = schema;
  const systemPrompt = buildSystemPrompt(currentSchema);

  // Build messages from chat history (last 20 messages for context)
  const recentHistory = chatHistory.slice(-20);
  const messages: Anthropic.MessageParam[] = recentHistory.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));
  messages.push({ role: "user", content: userMessage });

  let response = await anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4096,
    system: systemPrompt,
    tools,
    messages,
  });

  const toolResults: string[] = [];

  // Handle tool use loop
  while (response.stop_reason === "tool_use") {
    const assistantContent = response.content;
    messages.push({ role: "assistant", content: assistantContent });

    const toolUseBlocks = assistantContent.filter(
      (block) => block.type === "tool_use"
    ) as Array<{ type: "tool_use"; id: string; name: string; input: Record<string, any> }>;

    const toolResultContents: Anthropic.ToolResultBlockParam[] = [];

    for (const toolUse of toolUseBlocks) {
      const { schema: newSchema, result } = executeToolCall(
        currentSchema,
        toolUse.name,
        toolUse.input
      );
      currentSchema = newSchema;
      toolResults.push(result);

      toolResultContents.push({
        type: "tool_result",
        tool_use_id: toolUse.id,
        content: result,
      });
    }

    messages.push({ role: "user", content: toolResultContents });

    // Rebuild system prompt with updated schema so Claude sees current state
    const updatedSystemPrompt = buildSystemPrompt(currentSchema);

    response = await anthropic.messages.create({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      system: updatedSystemPrompt,
      tools,
      messages,
    });
  }

  // Extract text response
  const textBlocks = response.content.filter(
    (block): block is Anthropic.TextBlock => block.type === "text"
  );
  const responseText =
    textBlocks.map((b) => b.text).join("\n") ||
    (toolResults.length > 0
      ? "Done! I made the changes."
      : "I'm not sure what to change. Could you be more specific?");

  // Update chat history
  const newHistory = [
    ...chatHistory,
    {
      id: crypto.randomUUID(),
      role: "user" as const,
      content: userMessage,
      timestamp: Date.now(),
    },
    {
      id: crypto.randomUUID(),
      role: "assistant" as const,
      content: responseText,
      timestamp: Date.now(),
    },
  ];

  return {
    response: responseText,
    updatedSchema: currentSchema,
    updatedHistory: newHistory,
  };
}
