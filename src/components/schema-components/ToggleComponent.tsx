"use client";

import { ComponentNode } from "@/lib/schema";
import { Toggle } from "@/components/ui/toggle";

export function ToggleComponent({ node }: { node: ComponentNode }) {
  const { text, variant = "default" } = node.props;

  return (
    <div style={node.styles}>
      <Toggle variant={variant}>{text}</Toggle>
    </div>
  );
}
