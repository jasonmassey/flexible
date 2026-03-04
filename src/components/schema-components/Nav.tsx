import { ComponentNode } from "@/lib/schema";

export function Nav({ node }: { node: ComponentNode }) {
  const links = node.props.links || [];
  return (
    <nav style={node.styles}>
      <span style={{ fontSize: "1.25rem", fontWeight: "700", color: "var(--color-primary)" }}>
        {node.props.logo || "Logo"}
      </span>
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {links.map((link: { label: string; href: string }, i: number) => (
          <a
            key={i}
            href={link.href}
            style={{
              color: "var(--color-text-secondary)",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
