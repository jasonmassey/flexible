import { ComponentNode } from "@/lib/schema";

export function Card({ node }: { node: ComponentNode }) {
  return (
    <div style={node.styles}>
      {node.props.icon && (
        <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>
          {node.props.icon}
        </div>
      )}
      {node.props.title && (
        <h3
          style={{
            fontSize: "1.25rem",
            fontWeight: "600",
            marginBottom: "0.75rem",
          }}
        >
          {node.props.title}
        </h3>
      )}
      {node.props.description && (
        <p style={{ color: "var(--color-text-secondary)", lineHeight: "1.6" }}>
          {node.props.description}
        </p>
      )}
    </div>
  );
}
