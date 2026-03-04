"use client";

import { ComponentNode } from "@/lib/schema";
import { Progress } from "@/components/ui/progress";

export function ProgressComponent({ node }: { node: ComponentNode }) {
  const { value, label } = node.props;

  return (
    <div style={node.styles}>
      {label && <p className="text-sm text-muted-foreground mb-1">{label}</p>}
      <Progress value={value} />
    </div>
  );
}
