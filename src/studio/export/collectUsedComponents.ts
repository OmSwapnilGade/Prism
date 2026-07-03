/**
 * Collect Used Components
 *
 * Walks the canvas node tree and returns the set of component
 * slugs actually used (excluding container types stack/grid).
 */

import type { CanvasNode } from "../canvasTypes";
import { isContainer } from "../canvasTypes";

/**
 * Returns a Set of component slugs present anywhere in the canvas tree.
 * Container nodes (stack, grid) are excluded since they compile down to
 * plain <div> elements and have no standalone component file.
 */
export function collectUsedComponents(nodes: CanvasNode[]): Set<string> {
  const slugs = new Set<string>();
  walk(nodes, slugs);
  return slugs;
}

function walk(nodes: CanvasNode[], acc: Set<string>): void {
  for (const node of nodes) {
    if (!isContainer(node.type)) {
      acc.add(node.type);
    }
    if (node.children.length > 0) {
      walk(node.children, acc);
    }
  }
}
