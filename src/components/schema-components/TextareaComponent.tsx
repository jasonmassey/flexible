"use client";

import { ComponentNode } from "@/lib/schema";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function TextareaComponent({ node }: { node: ComponentNode }) {
  const { placeholder, label, rows } = node.props;
  const id = node.id;

  return (
    <div style={node.styles}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Textarea id={id} placeholder={placeholder} rows={rows} />
    </div>
  );
}
