import { PageSchema, ComponentNode } from "@/lib/schema";

type ToolInput = Record<string, any>;

export function executeToolCall(
  schema: PageSchema,
  toolName: string,
  input: ToolInput
): { schema: PageSchema; result: string } {
  const newSchema = structuredClone(schema);

  switch (toolName) {
    case "update_css_variables":
      return updateCssVariables(newSchema, input);
    case "update_component":
      return updateComponent(newSchema, input);
    case "add_component":
      return addComponent(newSchema, input);
    case "remove_component":
      return removeComponent(newSchema, input);
    case "move_component":
      return moveComponent(newSchema, input);
    case "replace_subtree":
      return replaceSubtree(newSchema, input);
    default:
      return { schema, result: `Unknown tool: ${toolName}` };
  }
}

function updateCssVariables(
  schema: PageSchema,
  input: ToolInput
): { schema: PageSchema; result: string } {
  const vars = input.variables as Record<string, string>;
  Object.assign(schema.cssVariables, vars);
  const keys = Object.keys(vars).join(", ");
  return { schema, result: `Updated CSS variables: ${keys}` };
}

function updateComponent(
  schema: PageSchema,
  input: ToolInput
): { schema: PageSchema; result: string } {
  const node = findNode(schema.root, input.componentId);
  if (!node) {
    return { schema, result: `Component not found: ${input.componentId}` };
  }

  if (input.props) {
    Object.assign(node.props, input.props);
  }
  if (input.styles) {
    Object.assign(node.styles, input.styles);
  }

  return { schema, result: `Updated component: ${input.componentId}` };
}

function addComponent(
  schema: PageSchema,
  input: ToolInput
): { schema: PageSchema; result: string } {
  const parent = findNode(schema.root, input.parentId);
  if (!parent) {
    return { schema, result: `Parent not found: ${input.parentId}` };
  }

  const component = input.component as ComponentNode;
  const index = input.index as number | undefined;

  if (index !== undefined && index >= 0 && index <= parent.children.length) {
    parent.children.splice(index, 0, component);
  } else {
    parent.children.push(component);
  }

  return {
    schema,
    result: `Added component ${component.id} to ${input.parentId}`,
  };
}

function removeComponent(
  schema: PageSchema,
  input: ToolInput
): { schema: PageSchema; result: string } {
  const removed = removeNode(schema.root, input.componentId);
  if (!removed) {
    return { schema, result: `Component not found: ${input.componentId}` };
  }
  return { schema, result: `Removed component: ${input.componentId}` };
}

function moveComponent(
  schema: PageSchema,
  input: ToolInput
): { schema: PageSchema; result: string } {
  // Extract the node first
  const node = findNode(schema.root, input.componentId);
  if (!node) {
    return { schema, result: `Component not found: ${input.componentId}` };
  }

  const nodeCopy = structuredClone(node);
  removeNode(schema.root, input.componentId);

  const newParent = findNode(schema.root, input.newParentId);
  if (!newParent) {
    return { schema, result: `New parent not found: ${input.newParentId}` };
  }

  const index = input.index as number | undefined;
  if (
    index !== undefined &&
    index >= 0 &&
    index <= newParent.children.length
  ) {
    newParent.children.splice(index, 0, nodeCopy);
  } else {
    newParent.children.push(nodeCopy);
  }

  return {
    schema,
    result: `Moved ${input.componentId} to ${input.newParentId}`,
  };
}

function replaceSubtree(
  schema: PageSchema,
  input: ToolInput
): { schema: PageSchema; result: string } {
  const replaced = replaceNode(
    schema.root,
    input.componentId,
    input.newSubtree as ComponentNode
  );
  if (!replaced) {
    return { schema, result: `Component not found: ${input.componentId}` };
  }
  return { schema, result: `Replaced subtree: ${input.componentId}` };
}

// --- Tree traversal helpers ---

function findNode(
  node: ComponentNode,
  id: string
): ComponentNode | null {
  if (node.id === id) return node;
  for (const child of node.children) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
}

function removeNode(
  parent: ComponentNode,
  id: string
): boolean {
  const index = parent.children.findIndex((c) => c.id === id);
  if (index !== -1) {
    parent.children.splice(index, 1);
    return true;
  }
  for (const child of parent.children) {
    if (removeNode(child, id)) return true;
  }
  return false;
}

function replaceNode(
  parent: ComponentNode,
  id: string,
  newNode: ComponentNode
): boolean {
  if (parent.id === id) {
    // Can't replace root from within — handled by caller
    Object.assign(parent, newNode);
    return true;
  }
  const index = parent.children.findIndex((c) => c.id === id);
  if (index !== -1) {
    parent.children[index] = newNode;
    return true;
  }
  for (const child of parent.children) {
    if (replaceNode(child, id, newNode)) return true;
  }
  return false;
}
