/**
 * Prop Editor
 *
 * Auto-generated form panel that renders appropriate controls
 * based on the component's StudioPropSchema definitions.
 */

import { cn } from "@/utils/cn";
import { Toggle } from "@/components/Toggle/Toggle";
import type { StudioComponentSchema, StudioPropSchema } from "./studioRegistry";

interface PropEditorProps {
  schema: StudioComponentSchema;
  propValues: Record<string, unknown>;
  onChange: (name: string, value: unknown) => void;
  onReset: () => void;
}

// ── Individual Controls ─────────────────────────────────────────────────

function SelectControl({
  prop,
  value,
  onChange,
}: {
  prop: StudioPropSchema;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {prop.options?.map((option) => (
        <button
          key={option}
          onClick={() => onChange(option)}
          className={cn(
            "px-2.5 py-1 text-xs font-medium",
            "rounded-[var(--prism-radius-md)]",
            "border transition-all duration-[var(--prism-duration)]",
            "focus-ring cursor-pointer",
            value === option
              ? "bg-primary text-primary-foreground border-primary shadow-sm"
              : "bg-secondary/50 text-muted-foreground border-border hover:text-foreground hover:border-foreground/20"
          )}
          aria-pressed={value === option}
          id={`studio-prop-${prop.name}-${option}`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

function TextControl({
  prop,
  value,
  onChange,
}: {
  prop: StudioPropSchema;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={prop.description}
      className={cn(
        "w-full h-8 px-3 text-sm",
        "bg-transparent border border-border",
        "rounded-[var(--prism-radius-md)]",
        "text-foreground placeholder:text-muted-foreground",
        "transition-colors duration-[var(--prism-duration)]",
        "focus-ring"
      )}
      id={`studio-prop-${prop.name}`}
    />
  );
}

function TextareaControl({
  prop,
  value,
  onChange,
}: {
  prop: StudioPropSchema;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={prop.description}
      rows={3}
      className={cn(
        "w-full px-3 py-2 text-sm",
        "bg-transparent border border-border",
        "rounded-[var(--prism-radius-md)]",
        "text-foreground placeholder:text-muted-foreground",
        "transition-colors duration-[var(--prism-duration)]",
        "focus-ring resize-y"
      )}
      id={`studio-prop-${prop.name}`}
    />
  );
}

function ToggleControl({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <Toggle
      checked={value}
      onChange={onChange}
      size="sm"
    />
  );
}

// ── Prop Row ────────────────────────────────────────────────────────────

function PropRow({
  prop,
  value,
  onChange,
}: {
  prop: StudioPropSchema;
  value: unknown;
  onChange: (name: string, value: unknown) => void;
}) {
  const handleChange = (val: unknown) => onChange(prop.name, val);

  return (
    <div
      className={cn(
        "flex items-start gap-3 py-3",
        "border-b border-border/50 last:border-b-0"
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5">
          <label
            htmlFor={`studio-prop-${prop.name}`}
            className="text-sm font-medium text-foreground"
          >
            {prop.label}
          </label>
          {prop.category === "variant" && (
            <span className="text-[10px] font-semibold uppercase tracking-wide text-primary/70 bg-primary/10 px-1.5 py-0.5 rounded">
              variant
            </span>
          )}
          {prop.category === "size" && (
            <span className="text-[10px] font-semibold uppercase tracking-wide text-info/70 bg-info/10 px-1.5 py-0.5 rounded">
              size
            </span>
          )}
        </div>

        {prop.control === "toggle" ? (
          <div className="flex items-center justify-between">
            <p className="text-xs text-muted-foreground">{prop.description}</p>
            <ToggleControl
              value={!!value}
              onChange={handleChange}
            />
          </div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground mb-2">
              {prop.description}
            </p>
            {prop.control === "select" && (
              <SelectControl
                prop={prop}
                value={(value as string) ?? ""}
                onChange={handleChange}
              />
            )}
            {prop.control === "text" && (
              <TextControl
                prop={prop}
                value={(value as string) ?? ""}
                onChange={handleChange}
              />
            )}
            {prop.control === "textarea" && (
              <TextareaControl
                prop={prop}
                value={(value as string) ?? ""}
                onChange={handleChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ── Main Prop Editor ────────────────────────────────────────────────────

export function PropEditor({
  schema,
  propValues,
  onChange,
  onReset,
}: PropEditorProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-foreground">
          Properties
        </h3>
        <button
          onClick={onReset}
          className={cn(
            "text-xs font-medium text-muted-foreground",
            "hover:text-foreground",
            "transition-colors duration-[var(--prism-duration)]",
            "cursor-pointer focus-ring",
            "px-2 py-1 rounded-[var(--prism-radius-sm)]",
            "hover:bg-accent"
          )}
          id="studio-reset-props"
        >
          Reset
        </button>
      </div>

      {/* Props list */}
      <div className="flex-1 overflow-y-auto -mx-1 px-1">
        {schema.props.map((prop) => (
          <PropRow
            key={prop.name}
            prop={prop}
            value={propValues[prop.name]}
            onChange={onChange}
          />
        ))}
      </div>
    </div>
  );
}
