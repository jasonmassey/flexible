import { ComponentNode } from "@/lib/schema";

export function Text({ node }: { node: ComponentNode }) {
  return <p style={node.styles}>{node.props.text}</p>;
}
