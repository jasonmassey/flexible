"use client";

import { useState, useEffect } from "react";
import { ThinkingStep } from "@/lib/schema";

// Human-readable tool name labels
const toolLabels: Record<string, string> = {
  update_css_variables: "Update theme",
  update_component: "Update component",
  add_component: "Add component",
  remove_component: "Remove component",
  move_component: "Move component",
  replace_subtree: "Replace section",
};

function formatToolName(name: string): string {
  return toolLabels[name] || name;
}

function formatInput(input: Record<string, any>): string {
  if (input.variables) {
    const keys = Object.keys(input.variables);
    return keys.length <= 3
      ? keys.join(", ")
      : `${keys.slice(0, 3).join(", ")} +${keys.length - 3} more`;
  }
  if (input.componentId) return input.componentId;
  if (input.parentId) return `into ${input.parentId}`;
  return "";
}

export function ThinkingBlock({
  steps,
  isLive,
}: {
  steps: ThinkingStep[];
  isLive: boolean;
}) {
  const [expanded, setExpanded] = useState(isLive);

  // Auto-expand while live, auto-collapse when done
  useEffect(() => {
    setExpanded(isLive);
  }, [isLive]);

  if (steps.length === 0) return null;

  const toolCallCount = steps.filter((s) => s.type === "tool_call").length;
  const errorCount = steps.filter(
    (s) => s.type === "error" || (s.type === "tool_result" && !s.success)
  ).length;

  const summary = errorCount > 0
    ? `${toolCallCount} tool${toolCallCount !== 1 ? "s" : ""} used, ${errorCount} error${errorCount !== 1 ? "s" : ""}`
    : `${toolCallCount} tool${toolCallCount !== 1 ? "s" : ""} used`;

  return (
    <div
      style={{
        fontSize: "0.75rem",
        borderRadius: "0.5rem",
        border: "1px solid #e2e8f0",
        backgroundColor: "#f8fafc",
        overflow: "hidden",
      }}
    >
      {/* Summary header — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.375rem",
          width: "100%",
          padding: "0.5rem 0.75rem",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: errorCount > 0 ? "#dc2626" : "#64748b",
          fontSize: "0.75rem",
          fontFamily: "inherit",
          textAlign: "left",
        }}
      >
        <span
          style={{
            display: "inline-block",
            transform: expanded ? "rotate(90deg)" : "rotate(0deg)",
            transition: "transform 0.15s ease",
            fontSize: "0.625rem",
          }}
        >
          &#9654;
        </span>
        {isLive ? (
          <span style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span style={{ marginLeft: "0.25rem" }}>Working...</span>
          </span>
        ) : (
          summary
        )}
      </button>

      {/* Expanded step list */}
      {expanded && (
        <div
          style={{
            borderTop: "1px solid #e2e8f0",
            padding: "0.375rem 0.75rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.25rem",
          }}
        >
          {steps.map((step, i) => (
            <StepLine key={i} step={step} />
          ))}
        </div>
      )}
    </div>
  );
}

function StepLine({ step }: { step: ThinkingStep }) {
  if (step.type === "tool_call") {
    const detail = step.input ? formatInput(step.input) : "";
    return (
      <div style={{ color: "#6366f1", display: "flex", gap: "0.375rem" }}>
        <span style={{ opacity: 0.6 }}>&#9656;</span>
        <span>
          {formatToolName(step.name || "")}
          {detail && (
            <span style={{ color: "#94a3b8", marginLeft: "0.25rem" }}>
              {detail}
            </span>
          )}
        </span>
      </div>
    );
  }

  if (step.type === "tool_result") {
    return (
      <div
        style={{
          color: step.success ? "#16a34a" : "#dc2626",
          display: "flex",
          gap: "0.375rem",
          paddingLeft: "0.25rem",
        }}
      >
        <span>{step.success ? "\u2713" : "\u2717"}</span>
        <span>{step.result}</span>
      </div>
    );
  }

  if (step.type === "error") {
    return (
      <div
        style={{
          color: "#dc2626",
          display: "flex",
          gap: "0.375rem",
          backgroundColor: "#fef2f2",
          padding: "0.25rem 0.375rem",
          borderRadius: "0.25rem",
        }}
      >
        <span>!</span>
        <span>{step.message}</span>
      </div>
    );
  }

  return null;
}
