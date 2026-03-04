"use client";

import { ComponentNode } from "@/lib/schema";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";

export function SliderComponent({ node }: { node: ComponentNode }) {
  const { min = 0, max = 100, step = 1, defaultValue = 50, label } = node.props;
  const id = node.id;

  return (
    <div style={node.styles}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Slider id={id} min={min} max={max} step={step} defaultValue={[defaultValue]} />
    </div>
  );
}
