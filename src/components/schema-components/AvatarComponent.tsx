"use client";

import { ComponentNode } from "@/lib/schema";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function AvatarComponent({ node }: { node: ComponentNode }) {
  const { src, alt, fallback } = node.props;

  return (
    <div style={node.styles}>
      <Avatar>
        <AvatarImage src={src} alt={alt} />
        <AvatarFallback>{fallback ?? alt?.charAt(0) ?? "?"}</AvatarFallback>
      </Avatar>
    </div>
  );
}
