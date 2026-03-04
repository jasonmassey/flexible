"use client";

import { ComponentNode } from "@/lib/schema";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabsComponent({ node }: { node: ComponentNode }) {
  const { tabs = [], defaultValue } = node.props;
  const defaultTab = defaultValue ?? (tabs.length > 0 ? tabs[0].label : undefined);

  return (
    <div style={node.styles}>
      <Tabs defaultValue={defaultTab}>
        <TabsList>
          {tabs.map((tab: { label: string; content: string }) => (
            <TabsTrigger key={tab.label} value={tab.label}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tabs.map((tab: { label: string; content: string }) => (
          <TabsContent key={tab.label} value={tab.label}>
            {tab.content}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
