"use client";

import { ComponentNode } from "@/lib/schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export function DialogComponent({ node }: { node: ComponentNode }) {
  const { trigger, title, description, content } = node.props;

  return (
    <div style={node.styles}>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">{trigger}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            {description && <DialogDescription>{description}</DialogDescription>}
          </DialogHeader>
          {content && <p>{content}</p>}
        </DialogContent>
      </Dialog>
    </div>
  );
}
