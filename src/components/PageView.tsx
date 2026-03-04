"use client";

import { PageSchema } from "@/lib/schema";
import { SchemaRenderer } from "./SchemaRenderer";

export function PageView({ schema }: { schema: PageSchema }) {
  const cssVars = schema.cssVariables as Record<string, string>;

  return (
    <div
      className="page-view"
      style={{
        ...cssVars,
        width: "100%",
        height: "100%",
        overflow: "auto",
      } as React.CSSProperties}
    >
      <SchemaRenderer node={schema.root} />
    </div>
  );
}
