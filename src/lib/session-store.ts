import { getDb } from "./db";
import { PageSchema, ChatMessage } from "./schema";
import { defaultSchema } from "./default-schema";

interface SessionRow {
  id: string;
  schema: string;
  chat_history: string;
  created_at: string;
  updated_at: string;
}

export function getSession(sessionId: string): {
  schema: PageSchema;
  chatHistory: ChatMessage[];
} {
  const db = getDb();
  const row = db
    .prepare("SELECT * FROM sessions WHERE id = ?")
    .get(sessionId) as SessionRow | undefined;

  if (!row) {
    // Create new session with default schema
    const schema = { ...defaultSchema, id: sessionId };
    db.prepare(
      "INSERT INTO sessions (id, schema, chat_history) VALUES (?, ?, ?)"
    ).run(sessionId, JSON.stringify(schema), "[]");
    return { schema, chatHistory: [] };
  }

  return {
    schema: JSON.parse(row.schema),
    chatHistory: JSON.parse(row.chat_history),
  };
}

export function updateSchema(
  sessionId: string,
  schema: PageSchema
): void {
  const db = getDb();
  db.prepare(
    "UPDATE sessions SET schema = ?, updated_at = datetime('now') WHERE id = ?"
  ).run(JSON.stringify(schema), sessionId);
}

export function updateChatHistory(
  sessionId: string,
  chatHistory: ChatMessage[]
): void {
  const db = getDb();
  db.prepare(
    "UPDATE sessions SET chat_history = ?, updated_at = datetime('now') WHERE id = ?"
  ).run(JSON.stringify(chatHistory), sessionId);
}

export function resetSession(sessionId: string): PageSchema {
  const schema = { ...defaultSchema, id: sessionId };
  const db = getDb();
  db.prepare(
    "UPDATE sessions SET schema = ?, chat_history = '[]', updated_at = datetime('now') WHERE id = ?"
  ).run(JSON.stringify(schema), sessionId);
  return schema;
}
