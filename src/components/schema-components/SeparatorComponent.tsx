"use client";

import { ComponentNode } from "@/lib/schema";
import { Separator } from "@/components/ui/separator";

export function SeparatorComponent({ node }: { node: ComponentNode }) {
  const { orientation = "horizontal" } = node.props;

  return (
    <div style={node.styles}>
      <Separator orientation={orientation} />
    </div>
  );
}
