"use client";

import { ComponentNode } from "@/lib/schema";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function AccordionComponent({ node }: { node: ComponentNode }) {
  const { items = [], type = "single" } = node.props;

  return (
    <div style={node.styles}>
      <Accordion type={type} collapsible={type === "single"}>
        {items.map((item: { title: string; content: string }, i: number) => (
          <AccordionItem key={i} value={`item-${i}`}>
            <AccordionTrigger>{item.title}</AccordionTrigger>
            <AccordionContent>{item.content}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
