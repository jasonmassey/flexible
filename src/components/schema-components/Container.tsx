import { ComponentNode } from "@/lib/schema";
import { SchemaRenderer } from "../SchemaRenderer";

export function Container({
  node,
}: {
  node: ComponentNode;
}) {
  return (
    <div style={node.styles}>
      {node.children.map((child) => (
        <SchemaRenderer key={child.id} node={child} />
      ))}
    </div>
  );
}
