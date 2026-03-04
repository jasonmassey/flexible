"use client";

import { ComponentNode } from "@/lib/schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export function SelectComponent({ node }: { node: ComponentNode }) {
  const { placeholder, options = [], label } = node.props;
  const id = node.id;

  return (
    <div style={node.styles}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Select>
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt: { label: string; value: string }) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
