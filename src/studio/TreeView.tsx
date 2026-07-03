/**
 * Tree View
 *
 * Collapsible tree/outline showing the page structure.
 * Nodes can be selected, reordered, and deleted from here.
 */

import { useState } from "react";
import { cn } from "@/utils/cn";
import type { CanvasNode, NodeId } from "./canvasTypes";
import { isContainer } from "./canvasTypes";

interface TreeViewProps {
  nodes: CanvasNode[];
  selectedId: NodeId | null;
  onSelect: (id: NodeId) => void;
  onRemove: (id: NodeId) => void;
}

function TreeNode({
  node,
  selectedId,
  onSelect,
  onRemove,
  depth,
}: {
  node: CanvasNode;
  selectedId: NodeId | null;
  onSelect: (id: NodeId) => void;
  onRemove: (id: NodeId) => void;
  depth: number;
}) {
  const [expanded, setExpanded] = useState(true);
  const isSelected = selectedId === node.id;
  const container = isContainer(node.type);
  const hasChildren = node.children.length > 0;

  const typeIcon = container
    ? node.type === "grid"
      ? "⊞"
      : "☰"
    : "◆";

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1 px-2 py-1.5 rounded-[var(--prism-radius-sm)]",
          "cursor-pointer transition-colors duration-[var(--prism-duration)]",
          "group",
          isSelected
            ? "bg-primary/10 text-primary"
            : "text-foreground hover:bg-accent"
        )}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
        onClick={() => onSelect(node.id)}
      >
        {/* Expand/collapse toggle */}
        {container ? (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            className="w-4 h-4 flex items-center justify-center text-muted-foreground hover:text-foreground shrink-0 cursor-pointer"
            aria-label={expanded ? "Collapse" : "Expand"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={cn(
                "transition-transform duration-150",
                expanded ? "rotate-90" : ""
              )}
              aria-hidden="true"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        ) : (
          <span className="w-4 h-4 shrink-0" />
        )}

        {/* Icon */}
        <span className="text-xs shrink-0 w-4 text-center opacity-60">
          {typeIcon}
        </span>

        {/* Label */}
        <span className="text-xs font-medium truncate flex-1">
          {node.label}
        </span>

        {/* Type tag */}
        <span className="text-[10px] text-muted-foreground/60 font-mono shrink-0 hidden group-hover:inline">
          {node.type}
        </span>

        {/* Delete */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove(node.id);
          }}
          className="opacity-0 group-hover:opacity-100 w-4 h-4 flex items-center justify-center text-muted-foreground hover:text-destructive shrink-0 cursor-pointer transition-opacity"
          aria-label={`Delete ${node.label}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="10"
            height="10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>

      {/* Children */}
      {container && expanded && hasChildren && (
        <div>
          {node.children.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              selectedId={selectedId}
              onSelect={onSelect}
              onRemove={onRemove}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export function TreeView({
  nodes,
  selectedId,
  onSelect,
  onRemove,
}: TreeViewProps) {
  if (nodes.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <p className="text-xs text-muted-foreground">
          Canvas is empty
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0.5">
      {nodes.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          selectedId={selectedId}
          onSelect={onSelect}
          onRemove={onRemove}
          depth={0}
        />
      ))}
    </div>
  );
}
