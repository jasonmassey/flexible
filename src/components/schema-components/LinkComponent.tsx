import { ComponentNode } from "@/lib/schema";
import { SchemaRenderer } from "../SchemaRenderer";

export function LinkComponent({ node }: { node: ComponentNode }) {
  return (
    <a href={node.props.href} style={node.styles}>
      {node.props.text}
      {node.children.map((child) => (
        <SchemaRenderer key={child.id} node={child} />
      ))}
    </a>
  );
}
