"use client";

import { ComponentNode } from "@/lib/schema";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export function CheckboxComponent({ node }: { node: ComponentNode }) {
  const { label, checked } = node.props;
  const id = node.id;

  return (
    <div style={node.styles} className="flex items-center gap-2">
      <Checkbox id={id} defaultChecked={checked} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}
