/**
 * Canvas Renderer
 *
 * Renders the canvas JSON tree as real Prism components.
 * Each node can be selected. Container nodes (Stack/Grid) are rendered
 * as flex/grid layouts and act as drop targets.
 */

import { motion } from "framer-motion";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/utils/cn";
import { ComponentRenderer } from "./ComponentRenderer";
import type { CanvasNode, NodeId } from "./canvasTypes";
import {
  isContainer,
  gapClasses,
  paddingClasses,
  alignClasses,
  gridColClasses,
} from "./canvasTypes";

interface CanvasRendererProps {
  nodes: CanvasNode[];
  selectedId: NodeId | null;
  onSelect: (id: NodeId | null) => void;
  onRemove: (id: NodeId) => void;
  rootDropId: string;
}

// ── Single Node ─────────────────────────────────────────────────────────

function CanvasNodeItem({
  node,
  selectedId,
  onSelect,
  onRemove,
  depth,
}: {
  node: CanvasNode;
  selectedId: NodeId | null;
  onSelect: (id: NodeId | null) => void;
  onRemove: (id: NodeId) => void;
  depth: number;
}) {
  const isSelected = selectedId === node.id;
  const container = isContainer(node.type);

  // Make containers droppable
  const { setNodeRef, isOver } = useDroppable({
    id: `drop-${node.id}`,
    data: { containerId: node.id, type: "container" },
    disabled: !container,
  });

  if (container) {
    return (
      <div
        ref={setNodeRef}
        onClick={(e) => {
          e.stopPropagation();
          onSelect(node.id);
        }}
        className={cn(
          "relative rounded-[var(--prism-radius-lg)]",
          "border-2 border-dashed transition-all duration-[var(--prism-duration)]",
          "min-h-[80px]",
          isSelected
            ? "border-primary/60 bg-primary/5"
            : "border-border/60 hover:border-border bg-transparent",
          isOver && "border-primary/40 bg-primary/5",
          // Layout classes
          node.type === "grid" ? "grid" : "flex",
          node.type === "stack" &&
            (node.layout?.direction === "horizontal"
              ? "flex-row"
              : "flex-col"),
          node.layout?.gap ? gapClasses[node.layout.gap] : "gap-4",
          node.layout?.padding ? paddingClasses[node.layout.padding] : "p-4",
          node.layout?.align ? alignClasses[node.layout.align] : "",
          node.type === "grid" && node.layout?.columns
            ? gridColClasses[node.layout.columns]
            : ""
        )}
      >
        {/* Container label */}
        <div
          className={cn(
            "absolute -top-2.5 left-3 px-2 py-0 text-[10px] font-semibold uppercase tracking-wide",
            "rounded-[var(--prism-radius-sm)]",
            isSelected
              ? "bg-primary text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}
        >
          {node.label}
        </div>

        {/* Delete button */}
        {isSelected && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(node.id);
            }}
            className="absolute -top-2.5 right-3 px-1.5 py-0 text-[10px] font-medium bg-destructive text-destructive-foreground rounded-[var(--prism-radius-sm)] cursor-pointer hover:bg-destructive/80 transition-colors"
            aria-label="Delete container"
          >
            ✕
          </button>
        )}

        {/* Children */}
        {node.children.length === 0 ? (
          <div className="flex items-center justify-center min-h-[60px] text-xs text-muted-foreground/50 select-none">
            Drop components here
          </div>
        ) : (
          node.children.map((child) => (
            <CanvasNodeItem
              key={child.id}
              node={child}
              selectedId={selectedId}
              onSelect={onSelect}
              onRemove={onRemove}
              depth={depth + 1}
            />
          ))
        )}
      </div>
    );
  }

  // Regular component node
  return (
    <motion.div
      layout
      onClick={(e) => {
        e.stopPropagation();
        onSelect(node.id);
      }}
      className={cn(
        "relative rounded-[var(--prism-radius-md)]",
        "border-2 transition-all duration-[var(--prism-duration)]",
        "cursor-pointer group",
        isSelected
          ? "border-primary/60 bg-primary/5 shadow-sm"
          : "border-transparent hover:border-border/50"
      )}
    >
      {/* Selection overlay label */}
      {isSelected && (
        <div className="absolute -top-2.5 left-3 flex items-center gap-1.5 z-10">
          <span className="px-2 py-0 text-[10px] font-semibold uppercase tracking-wide bg-primary text-primary-foreground rounded-[var(--prism-radius-sm)]">
            {node.label}
          </span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(node.id);
            }}
            className="px-1.5 py-0 text-[10px] font-medium bg-destructive text-destructive-foreground rounded-[var(--prism-radius-sm)] cursor-pointer hover:bg-destructive/80 transition-colors"
            aria-label="Delete component"
          >
            ✕
          </button>
        </div>
      )}

      {/* Actual component */}
      <div className="p-3 pointer-events-none">
        <ComponentRenderer slug={node.type} propValues={node.props} />
      </div>
    </motion.div>
  );
}

// ── Main Canvas ─────────────────────────────────────────────────────────

export function CanvasRenderer({
  nodes,
  selectedId,
  onSelect,
  onRemove,
  rootDropId,
}: CanvasRendererProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: rootDropId,
    data: { containerId: null, type: "root" },
  });

  return (
    <div
      ref={setNodeRef}
      onClick={() => onSelect(null)}
      className={cn(
        "flex-1 min-h-[400px] rounded-[var(--prism-radius-xl)]",
        "border-2 border-dashed transition-all duration-[var(--prism-duration)]",
        "p-6 space-y-4",
        "overflow-y-auto",
        isOver
          ? "border-primary/40 bg-primary/5"
          : "border-border/40 bg-background",
        nodes.length === 0 && "flex items-center justify-center"
      )}
    >
      {nodes.length === 0 ? (
        <div className="text-center select-none">
          <div className="text-3xl mb-3 opacity-30">📐</div>
          <p className="text-sm font-medium text-muted-foreground">
            Empty canvas
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Drag components from the left panel or click to add
          </p>
        </div>
      ) : (
        nodes.map((node) => (
          <CanvasNodeItem
            key={node.id}
            node={node}
            selectedId={selectedId}
            onSelect={onSelect}
            onRemove={onRemove}
            depth={0}
          />
        ))
      )}
    </div>
  );
}
