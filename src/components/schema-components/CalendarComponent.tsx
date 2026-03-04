"use client";

import { ComponentNode } from "@/lib/schema";
import { Calendar } from "@/components/ui/calendar";

export function CalendarComponent({ node }: { node: ComponentNode }) {
  const { mode = "single" } = node.props;

  return (
    <div style={node.styles}>
      <Calendar mode={mode} />
    </div>
  );
}
