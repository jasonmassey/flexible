import Anthropic from "@anthropic-ai/sdk";

export const tools: Anthropic.Tool[] = [
  {
    name: "update_css_variables",
    description:
      "Update one or more CSS variables for the page. Use this for theming changes like colors, fonts, spacing, and border radius. This is the fastest way to make visual changes across the entire page.",
    input_schema: {
      type: "object" as const,
      properties: {
        variables: {
          type: "object",
          description:
            "An object of CSS variable names to values. Keys should include the -- prefix, e.g. { '--color-primary': '#ff0000' }",
          additionalProperties: { type: "string" },
        },
      },
      required: ["variables"],
    },
  },
  {
    name: "update_component",
    description:
      "Update the props and/or styles of a single component by its ID. Use this for targeted changes to one element — changing text, colors, layout properties, etc.",
    input_schema: {
      type: "object" as const,
      properties: {
        componentId: {
          type: "string",
          description: "The ID of the component to update",
        },
        props: {
          type: "object",
          description:
            "New props to merge into the component (partial update). Only include props you want to change.",
        },
        styles: {
          type: "object",
          description:
            "New styles to merge into the component (partial update). Use camelCase CSS properties.",
        },
      },
      required: ["componentId"],
    },
  },
  {
    name: "add_component",
    description:
      "Add a new component as a child of an existing component. You can specify the position (index) within the parent's children array.",
    input_schema: {
      type: "object" as const,
      properties: {
        parentId: {
          type: "string",
          description: "The ID of the parent component to add the child to",
        },
        component: {
          type: "object",
          description:
            "The full component node to add. Must include id, type, props, styles, and children fields.",
          properties: {
            id: { type: "string" },
            type: { type: "string" },
            props: { type: "object" },
            styles: { type: "object" },
            children: { type: "array" },
          },
          required: ["id", "type", "props", "styles", "children"],
        },
        index: {
          type: "number",
          description:
            "Position to insert at (0-based). If omitted, appends to the end.",
        },
      },
      required: ["parentId", "component"],
    },
  },
  {
    name: "remove_component",
    description:
      "Remove a component from the tree by its ID. This also removes all of its children.",
    input_schema: {
      type: "object" as const,
      properties: {
        componentId: {
          type: "string",
          description: "The ID of the component to remove",
        },
      },
      required: ["componentId"],
    },
  },
  {
    name: "move_component",
    description:
      "Move a component to a new parent and/or position. The component is removed from its current location and inserted at the specified position in the new parent.",
    input_schema: {
      type: "object" as const,
      properties: {
        componentId: {
          type: "string",
          description: "The ID of the component to move",
        },
        newParentId: {
          type: "string",
          description: "The ID of the new parent component",
        },
        index: {
          type: "number",
          description:
            "Position in the new parent's children array. If omitted, appends to the end.",
        },
      },
      required: ["componentId", "newParentId"],
    },
  },
  {
    name: "replace_subtree",
    description:
      "Replace a component and all its children with a new subtree. Use this for wholesale section replacements when many changes are needed at once.",
    input_schema: {
      type: "object" as const,
      properties: {
        componentId: {
          type: "string",
          description: "The ID of the component to replace",
        },
        newSubtree: {
          type: "object",
          description:
            "The new component subtree. Must include id, type, props, styles, and children fields.",
          properties: {
            id: { type: "string" },
            type: { type: "string" },
            props: { type: "object" },
            styles: { type: "object" },
            children: { type: "array" },
          },
          required: ["id", "type", "props", "styles", "children"],
        },
      },
      required: ["componentId", "newSubtree"],
    },
  },
];
