/**
 * Container Prop Editor
 *
 * Layout property editor for Stack and Grid containers.
 * Edits direction, gap, alignment, columns, and padding.
 */

import { cn } from "@/utils/cn";
import type { CanvasNode, LayoutMeta, StackDirection, GapSize, AlignItems, GridColumns } from "./canvasTypes";

interface ContainerPropEditorProps {
  node: CanvasNode;
  onLayoutChange: (layout: Partial<LayoutMeta>) => void;
  onRemove: () => void;
  onRenameNode: (label: string) => void;
}

function SegmentedControl<T extends string | number>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (value: T) => void;
}) {
  return (
    <div className="py-3 border-b border-border/50 last:border-b-0">
      <p className="text-sm font-medium text-foreground mb-2">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <button
            key={String(opt.value)}
            onClick={() => onChange(opt.value)}
            className={cn(
              "px-2.5 py-1 text-xs font-medium",
              "rounded-[var(--prism-radius-md)]",
              "border transition-all duration-[var(--prism-duration)]",
              "focus-ring cursor-pointer",
              value === opt.value
                ? "bg-primary text-primary-foreground border-primary shadow-sm"
                : "bg-secondary/50 text-muted-foreground border-border hover:text-foreground hover:border-foreground/20"
            )}
            aria-pressed={value === opt.value}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const directionOptions: { value: StackDirection; label: string }[] = [
  { value: "vertical", label: "Vertical" },
  { value: "horizontal", label: "Horizontal" },
];

const gapOptions: { value: GapSize; label: string }[] = [
  { value: "none", label: "None" },
  { value: "sm", label: "S" },
  { value: "md", label: "M" },
  { value: "lg", label: "L" },
  { value: "xl", label: "XL" },
];

const alignOptions: { value: AlignItems; label: string }[] = [
  { value: "start", label: "Start" },
  { value: "center", label: "Center" },
  { value: "end", label: "End" },
  { value: "stretch", label: "Stretch" },
];

const colOptions: { value: GridColumns; label: string }[] = [
  { value: 1, label: "1" },
  { value: 2, label: "2" },
  { value: 3, label: "3" },
  { value: 4, label: "4" },
];

export function ContainerPropEditor({
  node,
  onLayoutChange,
  onRemove,
  onRenameNode,
}: ContainerPropEditorProps) {
  const layout = node.layout ?? {};
  const isGrid = node.type === "grid";

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">
          Layout
        </h3>
        <button
          onClick={onRemove}
          className={cn(
            "text-xs font-medium text-destructive",
            "hover:text-destructive/80",
            "transition-colors duration-[var(--prism-duration)]",
            "cursor-pointer focus-ring",
            "px-2 py-1 rounded-[var(--prism-radius-sm)]",
            "hover:bg-destructive/10"
          )}
        >
          Delete
        </button>
      </div>

      {/* Container type badge */}
      <div className="flex items-center gap-2 mb-3 pb-3 border-b border-border/50">
        <span className="text-[10px] font-semibold uppercase tracking-wide text-warning/80 bg-warning/10 px-2 py-0.5 rounded">
          {node.type}
        </span>
        <input
          type="text"
          value={node.label}
          onChange={(e) => onRenameNode(e.target.value)}
          className={cn(
            "flex-1 h-7 px-2 text-xs font-medium",
            "bg-transparent border border-border",
            "rounded-[var(--prism-radius-sm)]",
            "text-foreground",
            "transition-colors duration-[var(--prism-duration)]",
            "focus-ring"
          )}
        />
      </div>

      {/* Layout controls */}
      <div className="flex-1 overflow-y-auto -mx-1 px-1">
        {!isGrid && (
          <SegmentedControl
            label="Direction"
            value={layout.direction ?? "vertical"}
            options={directionOptions}
            onChange={(v) => onLayoutChange({ direction: v })}
          />
        )}

        {isGrid && (
          <SegmentedControl
            label="Columns"
            value={layout.columns ?? 2}
            options={colOptions}
            onChange={(v) => onLayoutChange({ columns: v })}
          />
        )}

        <SegmentedControl
          label="Gap"
          value={layout.gap ?? "md"}
          options={gapOptions}
          onChange={(v) => onLayoutChange({ gap: v })}
        />

        <SegmentedControl
          label="Alignment"
          value={layout.align ?? "stretch"}
          options={alignOptions}
          onChange={(v) => onLayoutChange({ align: v })}
        />

        <SegmentedControl
          label="Padding"
          value={layout.padding ?? "md"}
          options={gapOptions}
          onChange={(v) => onLayoutChange({ padding: v })}
        />
      </div>
    </div>
  );
}
