import { ComponentNode } from "@/lib/schema";
import { createElement } from "react";

export function Heading({ node }: { node: ComponentNode }) {
  const level = node.props.level || 1;
  const tag = `h${level}`;
  return createElement(tag, { style: node.styles }, node.props.text);
}
