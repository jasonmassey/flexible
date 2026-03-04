import { ComponentNode } from "@/lib/schema";
import { SchemaRenderer } from "../SchemaRenderer";

export function Section({ node }: { node: ComponentNode }) {
  return (
    <section id={node.props.anchor} style={node.styles}>
      {node.children.map((child) => (
        <SchemaRenderer key={child.id} node={child} />
      ))}
    </section>
  );
}
