"use client";

import { PageSchema } from "@/lib/schema";
import { PageView } from "./PageView";

export function EditorShell({
  schema,
  chatPanel,
}: {
  schema: PageSchema;
  chatPanel: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <div style={{ flex: "7", overflow: "auto" }}>
        <PageView schema={schema} />
      </div>
      <div
        style={{
          flex: "3",
          borderLeft: "1px solid #e2e8f0",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          backgroundColor: "#fafafa",
        }}
      >
        {chatPanel}
      </div>
    </div>
  );
}
