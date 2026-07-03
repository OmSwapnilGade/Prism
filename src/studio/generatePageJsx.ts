/**
 * Page Code Generator
 *
 * Walks the canvas JSON tree and emits a complete Page.tsx file
 * with proper imports, layout containers, and component instances.
 */

import type { CanvasNode } from "./canvasTypes";
import { isContainer, gapClasses, paddingClasses, alignClasses, gridColClasses } from "./canvasTypes";
import { getStudioSchema } from "./studioRegistry";
import { generateJsx } from "./generateJsx";

/**
 * Generate a complete Page.tsx file from the canvas tree.
 */
export function generatePageCode(nodes: CanvasNode[]): string {
  if (nodes.length === 0) {
    return `export function Page() {\n  return (\n    <div>\n      {/* Empty page — add components in Prism Studio */}\n    </div>\n  );\n}\n`;
  }

  // Collect all imports needed
  const imports = collectImports(nodes);
  const needsState = hasToggle(nodes);

  // Build import lines
  const importLines: string[] = [];
  if (needsState) {
    importLines.push(`import { useState } from "react";`);
  }
  for (const [path, names] of Object.entries(imports)) {
    const sorted = [...names].sort();
    importLines.push(`import { ${sorted.join(", ")} } from "${path}";`);
  }

  // Build JSX body
  const jsxBody = nodes.map((node) => renderNode(node, 2)).join("\n");

  // Build state declarations
  const stateLines = needsState
    ? `  const [enabled, setEnabled] = useState(false);\n\n`
    : "";

  const code = [
    ...importLines,
    "",
    `export function Page() {`,
    stateLines + `  return (`,
    `    <div className="space-y-4">`,
    jsxBody,
    `    </div>`,
    `  );`,
    `}`,
    "",
  ].join("\n");

  return code;
}

// ── Import collector ────────────────────────────────────────────────────

function collectImports(nodes: CanvasNode[]): Record<string, Set<string>> {
  const imports: Record<string, Set<string>> = {};

  function add(path: string, names: string[]) {
    if (!imports[path]) imports[path] = new Set();
    for (const name of names) {
      imports[path].add(name);
    }
  }

  function walk(nodeList: CanvasNode[]) {
    for (const node of nodeList) {
      if (!isContainer(node.type)) {
        const schema = getStudioSchema(node.type);
        if (schema) {
          add(schema.importPath, schema.importNames);
        }
      }
      if (node.children.length > 0) {
        walk(node.children);
      }
    }
  }

  walk(nodes);
  return imports;
}

/** Check if any node in the tree is a toggle (needs useState) */
function hasToggle(nodes: CanvasNode[]): boolean {
  for (const node of nodes) {
    if (node.type === "toggle") return true;
    if (hasToggle(node.children)) return true;
  }
  return false;
}

// ── Node renderer ───────────────────────────────────────────────────────

function renderNode(node: CanvasNode, indent: number): string {
  const pad = " ".repeat(indent);

  if (isContainer(node.type)) {
    return renderContainer(node, indent);
  }

  // Regular component — reuse single-component generator
  const schema = getStudioSchema(node.type);
  if (!schema) {
    return `${pad}{/* Unknown component: ${node.type} */}`;
  }

  const jsx = generateJsx({ schema, propValues: node.props });
  // Indent each line of the generated JSX
  const lines = jsx.split("\n");
  return lines.map((line) => `${pad}${line}`).join("\n");
}

function renderContainer(node: CanvasNode, indent: number): string {
  const pad = " ".repeat(indent);
  const layout = node.layout ?? {};

  // Build className for container
  const classes: string[] = [];

  if (node.type === "grid") {
    classes.push("grid");
    if (layout.columns) classes.push(gridColClasses[layout.columns]);
  } else {
    classes.push("flex");
    classes.push(layout.direction === "horizontal" ? "flex-row" : "flex-col");
  }

  if (layout.gap) classes.push(gapClasses[layout.gap]);
  if (layout.padding) classes.push(paddingClasses[layout.padding]);
  if (layout.align) classes.push(alignClasses[layout.align]);

  const className = classes.join(" ");
  const childIndent = indent + 2;

  if (node.children.length === 0) {
    return `${pad}<div className="${className}" />`;
  }

  const childJsx = node.children
    .map((child) => renderNode(child, childIndent))
    .join("\n");

  return [
    `${pad}<div className="${className}">`,
    childJsx,
    `${pad}</div>`,
  ].join("\n");
}
