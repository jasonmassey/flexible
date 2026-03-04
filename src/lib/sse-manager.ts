type SSEClient = {
  id: string;
  controller: ReadableStreamDefaultController;
};

const sessions = new Map<string, SSEClient[]>();

export function subscribe(sessionId: string): ReadableStream {
  const clientId = crypto.randomUUID();

  const stream = new ReadableStream({
    start(controller) {
      const client: SSEClient = { id: clientId, controller };
      const clients = sessions.get(sessionId) || [];
      clients.push(client);
      sessions.set(sessionId, clients);

      // Send initial connection message
      controller.enqueue(`data: ${JSON.stringify({ connected: true })}\n\n`);
    },
    cancel() {
      const clients = sessions.get(sessionId) || [];
      sessions.set(
        sessionId,
        clients.filter((c) => c.id !== clientId)
      );
      if (sessions.get(sessionId)?.length === 0) {
        sessions.delete(sessionId);
      }
    },
  });

  return stream;
}

export function publish(sessionId: string, data: unknown): void {
  const clients = sessions.get(sessionId) || [];
  const message = `data: ${JSON.stringify(data)}\n\n`;

  const alive: SSEClient[] = [];
  for (const client of clients) {
    try {
      client.controller.enqueue(message);
      alive.push(client);
    } catch {
      // Client disconnected
    }
  }
  sessions.set(sessionId, alive);
}
