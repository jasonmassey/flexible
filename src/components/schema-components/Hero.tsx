import { ComponentNode } from "@/lib/schema";
import { SchemaRenderer } from "../SchemaRenderer";

export function Hero({ node }: { node: ComponentNode }) {
  return (
    <section style={node.styles}>
      {node.props.badge && (
        <span
          style={{
            display: "inline-block",
            padding: "0.375rem 1rem",
            borderRadius: "9999px",
            fontSize: "0.875rem",
            fontWeight: "500",
            backgroundColor: "var(--color-bg-secondary)",
            color: "var(--color-primary)",
            border: "1px solid var(--color-border)",
            marginBottom: "1.5rem",
          }}
        >
          {node.props.badge}
        </span>
      )}
      {node.children.map((child) => (
        <SchemaRenderer key={child.id} node={child} />
      ))}
    </section>
  );
}
