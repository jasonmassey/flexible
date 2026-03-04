export interface ComponentNode {
  id: string;
  type: string;
  props: Record<string, any>;
  styles: Record<string, string>;
  children: ComponentNode[];
}

export interface PageSchema {
  id: string;
  meta: {
    title: string;
    description: string;
  };
  cssVariables: Record<string, string>;
  root: ComponentNode;
}

export interface ThinkingStep {
  type: "tool_call" | "tool_result" | "error";
  name?: string;
  input?: Record<string, any>;
  result?: string;
  success?: boolean;
  message?: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  thinking?: ThinkingStep[];
  timestamp: number;
}
