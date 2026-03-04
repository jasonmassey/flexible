import { ComponentNode } from "@/lib/schema";

export function ImageComponent({ node }: { node: ComponentNode }) {
  return (
    <img
      src={node.props.src}
      alt={node.props.alt || ""}
      style={node.styles}
    />
  );
}
