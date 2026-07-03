/**
 * Canvas Types
 *
 * The JSON state tree that is the single source of truth for the
 * multi-component canvas. Every node is either a component or a
 * layout container (Stack / Grid).
 */

/** Unique identifier for canvas nodes */
export type NodeId = string;

/** Layout direction for Stack containers */
export type StackDirection = "vertical" | "horizontal";

/** Gap sizes */
export type GapSize = "none" | "sm" | "md" | "lg" | "xl";

/** Alignment options */
export type AlignItems = "start" | "center" | "end" | "stretch";

/** Grid column presets */
export type GridColumns = 1 | 2 | 3 | 4;

/** Layout metadata for container nodes */
export interface LayoutMeta {
  direction?: StackDirection;
  gap?: GapSize;
  align?: AlignItems;
  columns?: GridColumns;
  padding?: GapSize;
}

/** A single node in the canvas tree */
export interface CanvasNode {
  /** Unique ID */
  id: NodeId;
  /** Component type slug (e.g. "button", "stack", "grid") */
  type: string;
  /** Display label (shown in tree view) */
  label: string;
  /** Props for this instance */
  props: Record<string, unknown>;
  /** Child nodes (only for containers) */
  children: CanvasNode[];
  /** Layout metadata (only for containers) */
  layout?: LayoutMeta;
}

/** Container types that can accept children */
export const CONTAINER_TYPES = ["stack", "grid"] as const;
export type ContainerType = (typeof CONTAINER_TYPES)[number];

/** Check if a node type is a container */
export function isContainer(type: string): boolean {
  return (CONTAINER_TYPES as readonly string[]).includes(type);
}

/** Gap size to Tailwind class mapping */
export const gapClasses: Record<GapSize, string> = {
  none: "gap-0",
  sm: "gap-2",
  md: "gap-4",
  lg: "gap-6",
  xl: "gap-8",
};

/** Padding to Tailwind class mapping */
export const paddingClasses: Record<GapSize, string> = {
  none: "p-0",
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
};

/** Alignment to Tailwind class mapping */
export const alignClasses: Record<AlignItems, string> = {
  start: "items-start",
  center: "items-center",
  end: "items-end",
  stretch: "items-stretch",
};

/** Grid columns to Tailwind class mapping */
export const gridColClasses: Record<GridColumns, string> = {
  1: "grid-cols-1",
  2: "grid-cols-2",
  3: "grid-cols-3",
  4: "grid-cols-4",
};

/** Generate a unique node ID */
let _counter = 0;
export function createNodeId(): NodeId {
  _counter++;
  return `node-${Date.now()}-${_counter}`;
}
