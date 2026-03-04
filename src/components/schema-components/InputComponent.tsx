"use client";

import { ComponentNode } from "@/lib/schema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InputComponent({ node }: { node: ComponentNode }) {
  const { placeholder, label, type = "text" } = node.props;
  const id = node.id;

  return (
    <div style={node.styles}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Input id={id} type={type} placeholder={placeholder} />
    </div>
  );
}
