"use client";

import { ComponentNode } from "@/lib/schema";
import { Badge } from "@/components/ui/badge";

export function BadgeComponent({ node }: { node: ComponentNode }) {
  const { text, variant = "default" } = node.props;

  return (
    <div style={node.styles}>
      <Badge variant={variant}>{text}</Badge>
    </div>
  );
}
