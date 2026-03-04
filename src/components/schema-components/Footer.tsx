import { ComponentNode } from "@/lib/schema";

export function Footer({ node }: { node: ComponentNode }) {
  const links = node.props.links || [];
  return (
    <footer style={node.styles}>
      <p style={{ marginBottom: links.length > 0 ? "0.5rem" : undefined }}>
        {node.props.text}
      </p>
      {links.length > 0 && (
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          {links.map((link: { label: string; href: string }, i: number) => (
            <a
              key={i}
              href={link.href}
              style={{ color: "var(--color-primary)", textDecoration: "none" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </footer>
  );
}
