"use client";

import { ComponentNode } from "@/lib/schema";

export function Button({ node }: { node: ComponentNode }) {
  if (node.props.href) {
    return (
      <a href={node.props.href} style={{ ...node.styles, display: "inline-block", textDecoration: "none" }}>
        {node.props.text}
      </a>
    );
  }
  return <button style={node.styles}>{node.props.text}</button>;
}
