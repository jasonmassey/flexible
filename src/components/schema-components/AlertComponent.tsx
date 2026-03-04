"use client";

import { ComponentNode } from "@/lib/schema";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export function AlertComponent({ node }: { node: ComponentNode }) {
  const { title, description, variant = "default" } = node.props;

  return (
    <div style={node.styles}>
      <Alert variant={variant}>
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </div>
  );
}
