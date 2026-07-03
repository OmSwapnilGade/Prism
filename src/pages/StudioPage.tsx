/**
 * Studio Page — Phase 2: Multi-Component Canvas
 *
 * Three-panel layout with dnd-kit drag-and-drop:
 *   Left:   Component picker (drag sources) + Tree view
 *   Center: Canvas (drop target) + Page code preview
 *   Right:  Prop editor (context-sensitive to selected node)
 */

import { useState, useMemo, useCallback } from "react";
import { motion } from "framer-motion";
import {
  DndContext,
  DragOverlay,
  useDraggable,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { cn } from "@/utils/cn";
import { useCanvasState } from "@/studio/useCanvasState";
import { CanvasRenderer } from "@/studio/CanvasRenderer";
import { TreeView } from "@/studio/TreeView";
import { PropEditor } from "@/studio/PropEditor";
import { ContainerPropEditor } from "@/studio/ContainerPropEditor";
import { CodePreview } from "@/studio/CodePreview";
import { studioRegistry } from "@/studio/studioRegistry";
import { getStudioSchema } from "@/studio/studioRegistry";
import { generatePageCode } from "@/studio/generatePageJsx";
import { isContainer, type CanvasNode } from "@/studio/canvasTypes";
import type { StudioComponentSchema } from "@/studio/studioRegistry";
import { useTheme } from "@/hooks/useTheme";
import { downloadProject } from "@/studio/export/downloadProject";

// ── Draggable picker item ───────────────────────────────────────────────

function DraggablePickerItem({
  component,
  onClickAdd,
}: {
  component: StudioComponentSchema;
  onClickAdd: (slug: string) => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: `drag-${component.slug}`,
    data: { type: "new-component", slug: component.slug },
  });

  return (
    <button
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      onClick={() => onClickAdd(component.slug)}
      className={cn(
        "w-full text-left px-3 py-2",
        "rounded-[var(--prism-radius-md)]",
        "transition-colors duration-[var(--prism-duration)]",
        "focus-ring cursor-grab active:cursor-grabbing",
        "text-foreground hover:bg-accent border border-transparent",
        "hover:border-border/50",
        isDragging && "opacity-50"
      )}
    >
      <span className="text-xs font-medium block">{component.name}</span>
      <span className="text-[10px] text-muted-foreground block line-clamp-1 mt-0.5">
        {component.description}
      </span>
    </button>
  );
}

// ── Container quick-add buttons ─────────────────────────────────────────

function ContainerButtons({
  onAdd,
}: {
  onAdd: (type: string) => void;
}) {
  return (
    <div className="flex gap-1.5">
      <button
        onClick={() => onAdd("stack")}
        className={cn(
          "flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5",
          "text-xs font-medium",
          "rounded-[var(--prism-radius-md)]",
          "border border-dashed border-border",
          "text-muted-foreground hover:text-foreground",
          "hover:border-foreground/30 hover:bg-accent",
          "transition-all duration-[var(--prism-duration)]",
          "cursor-pointer focus-ring"
        )}
      >
        <span>☰</span> Stack
      </button>
      <button
        onClick={() => onAdd("grid")}
        className={cn(
          "flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5",
          "text-xs font-medium",
          "rounded-[var(--prism-radius-md)]",
          "border border-dashed border-border",
          "text-muted-foreground hover:text-foreground",
          "hover:border-foreground/30 hover:bg-accent",
          "transition-all duration-[var(--prism-duration)]",
          "cursor-pointer focus-ring"
        )}
      >
        <span>⊞</span> Grid
      </button>
    </div>
  );
}

// ── Group labels for picker ─────────────────────────────────────────────

const groupLabels: Record<string, { label: string; icon: string }> = {
  actions: { label: "Actions", icon: "⚡" },
  forms: { label: "Form Controls", icon: "📝" },
  layout: { label: "Layout", icon: "📐" },
  feedback: { label: "Feedback", icon: "💬" },
};
const groupOrder = ["actions", "forms", "layout", "feedback"];

// ── Main Studio Page ────────────────────────────────────────────────────

export function StudioPage() {
  const canvas = useCanvasState();
  const { theme } = useTheme();
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [leftTab, setLeftTab] = useState<"components" | "tree">("components");
  const [showCode, setShowCode] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = useCallback(async () => {
    if (isExporting || canvas.nodes.length === 0) return;
    setIsExporting(true);
    try {
      await downloadProject(canvas.nodes, theme);
    } finally {
      setIsExporting(false);
    }
  }, [canvas.nodes, theme, isExporting]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  // Get schema for selected node (if it's a component, not a container)
  const selectedSchema = useMemo(() => {
    if (!canvas.selectedNode) return null;
    if (isContainer(canvas.selectedNode.type)) return null;
    return getStudioSchema(canvas.selectedNode.type) ?? null;
  }, [canvas.selectedNode]);

  // Generate page code
  const pageCode = useMemo(
    () => generatePageCode(canvas.nodes),
    [canvas.nodes]
  );

  // Group components for picker
  const grouped = useMemo(() => {
    const groups: Record<string, StudioComponentSchema[]> = {};
    for (const component of studioRegistry) {
      if (!groups[component.group]) groups[component.group] = [];
      groups[component.group].push(component);
    }
    return groups;
  }, []);

  // ── Drag handlers ───────────────────────────────────────────────────

  function handleDragStart(event: DragStartEvent) {
    const data = event.active.data.current;
    if (data?.type === "new-component") {
      setActiveSlug(data.slug as string);
    }
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveSlug(null);
    const { over, active } = event;
    if (!over) return;

    const data = active.data.current;
    if (data?.type !== "new-component") return;

    const slug = data.slug as string;
    const dropData = over.data.current;

    if (dropData?.type === "container" && dropData.containerId) {
      canvas.addToContainer(dropData.containerId as string, slug);
    } else {
      canvas.addToRoot(slug);
    }
  }

  // Click-to-add (fallback for no drag)
  function handleClickAdd(slug: string) {
    if (canvas.selectedNode && isContainer(canvas.selectedNode.type)) {
      canvas.addToContainer(canvas.selectedNode.id, slug);
    } else {
      canvas.addToRoot(slug);
    }
  }

  function handleAddContainer(type: string) {
    if (canvas.selectedNode && isContainer(canvas.selectedNode.type)) {
      canvas.addToContainer(canvas.selectedNode.id, type);
    } else {
      canvas.addToRoot(type);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="space-y-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-[var(--prism-radius-md)] bg-gradient-to-br from-[#818cf8] via-[#c084fc] to-[#fb7185] flex items-center justify-center shadow-sm">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z" />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-foreground">
                  Studio
                </h1>
                <p className="text-sm text-muted-foreground">
                  Build pages by dragging components onto the canvas
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowCode(!showCode)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium",
                  "rounded-[var(--prism-radius-md)]",
                  "border transition-all duration-[var(--prism-duration)]",
                  "focus-ring cursor-pointer",
                  showCode
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-secondary/50 text-muted-foreground border-border hover:text-foreground"
                )}
                id="studio-toggle-code"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
                </svg>
                Code
              </button>

              {/* Export button */}
              <button
                onClick={handleExport}
                disabled={canvas.nodes.length === 0 || isExporting}
                id="studio-export-project"
                title={canvas.nodes.length === 0 ? "Add components to export" : `Export as runnable project (${theme} theme)`}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium",
                  "rounded-[var(--prism-radius-md)]",
                  "border transition-all duration-[var(--prism-duration)]",
                  "focus-ring",
                  canvas.nodes.length === 0 || isExporting
                    ? "opacity-40 cursor-not-allowed border-border text-muted-foreground"
                    : "cursor-pointer bg-secondary/50 text-muted-foreground border-border hover:text-foreground hover:bg-accent hover:border-border/80"
                )}
              >
                {isExporting ? (
                  <>
                    <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                    </svg>
                    Exporting…
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Export
                  </>
                )}
              </button>

              {canvas.nodes.length > 0 && (
                <button
                  onClick={canvas.clearCanvas}
                  className={cn(
                    "px-3 py-1.5 text-xs font-medium",
                    "rounded-[var(--prism-radius-md)]",
                    "border border-border",
                    "text-muted-foreground hover:text-destructive hover:border-destructive/30",
                    "transition-all duration-[var(--prism-duration)]",
                    "focus-ring cursor-pointer"
                  )}
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </motion.div>

        {/* Three-panel layout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className={cn(
            "grid gap-3",
            "grid-cols-1 lg:grid-cols-[220px_1fr_260px]",
            "min-h-[calc(100vh-14rem)]"
          )}
        >
          {/* ── Left Panel: Picker + Tree ── */}
          <div
            className={cn(
              "rounded-[var(--prism-radius-xl)]",
              "border border-border",
              "bg-card/50",
              "flex flex-col",
              "lg:max-h-[calc(100vh-14rem)] overflow-hidden"
            )}
          >
            {/* Tab switcher */}
            <div className="flex border-b border-border">
              <button
                onClick={() => setLeftTab("components")}
                className={cn(
                  "flex-1 px-3 py-2.5 text-xs font-medium",
                  "transition-colors duration-[var(--prism-duration)]",
                  "cursor-pointer",
                  leftTab === "components"
                    ? "text-foreground border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Components
              </button>
              <button
                onClick={() => setLeftTab("tree")}
                className={cn(
                  "flex-1 px-3 py-2.5 text-xs font-medium",
                  "transition-colors duration-[var(--prism-duration)]",
                  "cursor-pointer",
                  leftTab === "tree"
                    ? "text-foreground border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Tree
                {canvas.nodes.length > 0 && (
                  <span className="ml-1 text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full">
                    {countNodes(canvas.nodes)}
                  </span>
                )}
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3">
              {leftTab === "components" ? (
                <div className="space-y-4">
                  {/* Container quick-add */}
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1 mb-2 flex items-center gap-1.5">
                      <span>📦</span> Containers
                    </span>
                    <div className="mt-2">
                      <ContainerButtons onAdd={handleAddContainer} />
                    </div>
                  </div>

                  {/* Component list */}
                  {groupOrder.map((group) => {
                    const components = grouped[group];
                    if (!components || components.length === 0) return null;
                    const { label, icon } = groupLabels[group];
                    return (
                      <div key={group}>
                        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1 mb-2 flex items-center gap-1.5">
                          <span>{icon}</span> {label}
                        </span>
                        <div className="space-y-0.5 mt-2">
                          {components.map((component) => (
                            <DraggablePickerItem
                              key={component.slug}
                              component={component}
                              onClickAdd={handleClickAdd}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <TreeView
                  nodes={canvas.nodes}
                  selectedId={canvas.selectedId}
                  onSelect={canvas.selectNode}
                  onRemove={canvas.removeNode}
                />
              )}
            </div>
          </div>

          {/* ── Center: Canvas + Code ── */}
          <div className="flex flex-col gap-3 min-w-0">
            {/* Canvas */}
            <div
              className={cn(
                "rounded-[var(--prism-radius-xl)]",
                "border border-border",
                "bg-card/50 p-3",
                showCode ? "flex-1" : "flex-[2]"
              )}
            >
              <CanvasRenderer
                nodes={canvas.nodes}
                selectedId={canvas.selectedId}
                onSelect={canvas.selectNode}
                onRemove={canvas.removeNode}
                rootDropId="canvas-root"
              />
            </div>

            {/* Code preview (collapsible) */}
            {showCode && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={cn(
                  "rounded-[var(--prism-radius-xl)]",
                  "border border-border",
                  "bg-card/50 p-4",
                  "min-h-[180px] max-h-[320px]"
                )}
              >
                <CodePreview code={pageCode} schema={null} />
              </motion.div>
            )}
          </div>

          {/* ── Right Panel: Prop Editor ── */}
          <div
            className={cn(
              "rounded-[var(--prism-radius-xl)]",
              "border border-border",
              "bg-card/50 p-4",
              "lg:max-h-[calc(100vh-14rem)] overflow-y-auto"
            )}
          >
            {canvas.selectedNode && isContainer(canvas.selectedNode.type) ? (
              <ContainerPropEditor
                node={canvas.selectedNode}
                onLayoutChange={(layout) =>
                  canvas.updateNodeLayout(canvas.selectedNode!.id, layout)
                }
                onRemove={() => canvas.removeNode(canvas.selectedNode!.id)}
                onRenameNode={(label) =>
                  canvas.renameNode(canvas.selectedNode!.id, label)
                }
              />
            ) : canvas.selectedNode && selectedSchema ? (
              <PropEditor
                schema={selectedSchema}
                propValues={canvas.selectedNode.props}
                onChange={(name, value) =>
                  canvas.updateNodeProps(canvas.selectedNode!.id, name, value)
                }
                onReset={() => {
                  // Reset props to schema defaults
                  const schema = getStudioSchema(canvas.selectedNode!.type);
                  if (schema) {
                    for (const prop of schema.props) {
                      if (prop.defaultValue !== undefined) {
                        canvas.updateNodeProps(
                          canvas.selectedNode!.id,
                          prop.name,
                          prop.defaultValue
                        );
                      }
                    }
                  }
                }}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-2">
                <div className="text-2xl opacity-30">🎯</div>
                <p className="text-sm text-muted-foreground text-center">
                  Select a component on the canvas to edit its properties
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Drag overlay */}
      <DragOverlay>
        {activeSlug && (
          <div className="px-4 py-2 rounded-[var(--prism-radius-md)] bg-primary text-primary-foreground text-xs font-medium shadow-lg">
            {getStudioSchema(activeSlug)?.name ?? activeSlug}
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}

// ── Helpers ─────────────────────────────────────────────────────────────

function countNodes(nodes: CanvasNode[]): number {
  let count = 0;
  for (const node of nodes) {
    count++;
    count += countNodes(node.children);
  }
  return count;
}


