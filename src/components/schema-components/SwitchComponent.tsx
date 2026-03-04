"use client";

import { ComponentNode } from "@/lib/schema";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export function SwitchComponent({ node }: { node: ComponentNode }) {
  const { label, checked } = node.props;
  const id = node.id;

  return (
    <div style={node.styles} className="flex items-center gap-2">
      <Switch id={id} defaultChecked={checked} />
      <Label htmlFor={id}>{label}</Label>
    </div>
  );
}
