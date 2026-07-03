/**
 * Canvas State Hook
 *
 * Manages the JSON tree that is the single source of truth for the
 * multi-component canvas. Provides CRUD operations on nodes,
 * selection state, and tree traversal helpers.
 */

import { useState, useCallback, useMemo } from "react";
import type {
  CanvasNode,
  NodeId,
  LayoutMeta,
} from "./canvasTypes";
import { createNodeId, isContainer } from "./canvasTypes";
import { getStudioSchema } from "./studioRegistry";

// ── Helpers ─────────────────────────────────────────────────────────────

/** Get default props for a component from its schema */
function getDefaultProps(type: string): Record<string, unknown> {
  const schema = getStudioSchema(type);
  if (!schema) return {};
  const defaults: Record<string, unknown> = {};
  for (const prop of schema.props) {
    if (prop.defaultValue !== undefined) {
      defaults[prop.name] = prop.defaultValue;
    }
  }
  if (schema.defaultChildren) {
    defaults["children"] = schema.defaultChildren;
  }
  return defaults;
}

/** Default layout for new containers */
function getDefaultLayout(type: string): LayoutMeta {
  if (type === "grid") {
    return { columns: 2, gap: "md", padding: "md", align: "stretch" };
  }
  return { direction: "vertical", gap: "md", padding: "md", align: "stretch" };
}

/** Create a new canvas node */
export function createNode(type: string, label?: string): CanvasNode {
  return {
    id: createNodeId(),
    type,
    label: label ?? (getStudioSchema(type)?.name ?? type),
    props: isContainer(type) ? {} : getDefaultProps(type),
    children: [],
    layout: isContainer(type) ? getDefaultLayout(type) : undefined,
  };
}

/** Deep-find a node by ID */
function findNode(nodes: CanvasNode[], id: NodeId): CanvasNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    const found = findNode(node.children, id);
    if (found) return found;
  }
  return null;
}

/** Deep-find the parent of a node */
function findParent(
  nodes: CanvasNode[],
  id: NodeId
): { parent: CanvasNode | null; index: number } {
  for (const node of nodes) {
    const idx = node.children.findIndex((c) => c.id === id);
    if (idx !== -1) return { parent: node, index: idx };
    const found = findParent(node.children, id);
    if (found.parent) return found;
  }
  return { parent: null, index: -1 };
}

/** Deep-clone and update a node in the tree */
function updateNodeInTree(
  nodes: CanvasNode[],
  id: NodeId,
  updater: (node: CanvasNode) => CanvasNode
): CanvasNode[] {
  return nodes.map((node) => {
    if (node.id === id) return updater(node);
    return {
      ...node,
      children: updateNodeInTree(node.children, id, updater),
    };
  });
}

/** Remove a node from the tree */
function removeNodeFromTree(nodes: CanvasNode[], id: NodeId): CanvasNode[] {
  return nodes
    .filter((node) => node.id !== id)
    .map((node) => ({
      ...node,
      children: removeNodeFromTree(node.children, id),
    }));
}

/** Insert a node into a container at a given index */
function insertIntoContainer(
  nodes: CanvasNode[],
  containerId: NodeId,
  newNode: CanvasNode,
  index: number
): CanvasNode[] {
  return nodes.map((node) => {
    if (node.id === containerId) {
      const children = [...node.children];
      children.splice(index, 0, newNode);
      return { ...node, children };
    }
    return {
      ...node,
      children: insertIntoContainer(node.children, containerId, newNode, index),
    };
  });
}

// ── State Hook ──────────────────────────────────────────────────────────

export interface CanvasState {
  /** Root-level nodes on the canvas */
  nodes: CanvasNode[];
  /** Currently selected node ID */
  selectedId: NodeId | null;
  /** Currently selected node (derived) */
  selectedNode: CanvasNode | null;

  /** Add a new component to the canvas root */
  addToRoot: (type: string) => void;
  /** Add a new component inside a container */
  addToContainer: (containerId: NodeId, type: string, index?: number) => void;
  /** Select a node */
  selectNode: (id: NodeId | null) => void;
  /** Update props on a node */
  updateNodeProps: (id: NodeId, name: string, value: unknown) => void;
  /** Update layout metadata on a container node */
  updateNodeLayout: (id: NodeId, layout: Partial<LayoutMeta>) => void;
  /** Remove a node */
  removeNode: (id: NodeId) => void;
  /** Move a node to a new location */
  moveNode: (nodeId: NodeId, newParentId: NodeId | null, index: number) => void;
  /** Reset the entire canvas */
  clearCanvas: () => void;
  /** Rename a node label */
  renameNode: (id: NodeId, label: string) => void;
}

export function useCanvasState(): CanvasState {
  const [nodes, setNodes] = useState<CanvasNode[]>([]);
  const [selectedId, setSelectedId] = useState<NodeId | null>(null);

  const selectedNode = useMemo(
    () => (selectedId ? findNode(nodes, selectedId) : null),
    [nodes, selectedId]
  );

  const addToRoot = useCallback((type: string) => {
    const node = createNode(type);
    setNodes((prev) => [...prev, node]);
    setSelectedId(node.id);
  }, []);

  const addToContainer = useCallback(
    (containerId: NodeId, type: string, index?: number) => {
      const node = createNode(type);
      setNodes((prev) => {
        const container = findNode(prev, containerId);
        const insertIdx = index ?? container?.children.length ?? 0;
        return insertIntoContainer(prev, containerId, node, insertIdx);
      });
      setSelectedId(node.id);
    },
    []
  );

  const selectNode = useCallback((id: NodeId | null) => {
    setSelectedId(id);
  }, []);

  const updateNodeProps = useCallback(
    (id: NodeId, name: string, value: unknown) => {
      setNodes((prev) =>
        updateNodeInTree(prev, id, (node) => ({
          ...node,
          props: { ...node.props, [name]: value },
        }))
      );
    },
    []
  );

  const updateNodeLayout = useCallback(
    (id: NodeId, layout: Partial<LayoutMeta>) => {
      setNodes((prev) =>
        updateNodeInTree(prev, id, (node) => ({
          ...node,
          layout: { ...node.layout, ...layout },
        }))
      );
    },
    []
  );

  const removeNode = useCallback(
    (id: NodeId) => {
      setNodes((prev) => removeNodeFromTree(prev, id));
      if (selectedId === id) setSelectedId(null);
    },
    [selectedId]
  );

  const moveNode = useCallback(
    (nodeId: NodeId, newParentId: NodeId | null, index: number) => {
      setNodes((prev) => {
        const node = findNode(prev, nodeId);
        if (!node) return prev;
        // Remove from old position
        let updated = removeNodeFromTree(prev, nodeId);
        // Insert into new position
        if (newParentId === null) {
          // Insert at root
          const cloned = [...updated];
          cloned.splice(index, 0, node);
          return cloned;
        }
        return insertIntoContainer(updated, newParentId, node, index);
      });
    },
    []
  );

  const clearCanvas = useCallback(() => {
    setNodes([]);
    setSelectedId(null);
  }, []);

  const renameNode = useCallback((id: NodeId, label: string) => {
    setNodes((prev) =>
      updateNodeInTree(prev, id, (node) => ({ ...node, label }))
    );
  }, []);

  return {
    nodes,
    selectedId,
    selectedNode,
    addToRoot,
    addToContainer,
    selectNode,
    updateNodeProps,
    updateNodeLayout,
    removeNode,
    moveNode,
    clearCanvas,
    renameNode,
  };
}

export { findParent };
