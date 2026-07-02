/**
 * Studio Page
 *
 * Main page for Prism Studio — three-panel layout:
 *   Left:   Component picker
 *   Center: Live preview (top) + Code preview (bottom)
 *   Right:  Prop editor
 */

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { ComponentPicker } from "@/studio/ComponentPicker";
import { PropEditor } from "@/studio/PropEditor";
import { LivePreview } from "@/studio/LivePreview";
import { CodePreview } from "@/studio/CodePreview";
import { useStudioState } from "@/studio/useStudioState";

export function StudioPage() {
  const {
    selectedSlug,
    schema,
    propValues,
    generatedCode,
    selectComponent,
    setPropValue,
    resetProps,
  } = useStudioState("button");

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
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
              Customize components visually and copy the generated code
            </p>
          </div>
        </div>
      </motion.div>

      {/* Three-panel layout */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className={cn(
          "grid gap-4",
          "grid-cols-1 lg:grid-cols-[220px_1fr_280px]",
          "min-h-[calc(100vh-14rem)]"
        )}
      >
        {/* Left — Component Picker */}
        <div
          className={cn(
            "rounded-[var(--prism-radius-xl)]",
            "border border-border",
            "bg-card/50 p-4",
            "lg:max-h-[calc(100vh-14rem)] overflow-y-auto"
          )}
        >
          <div className="flex items-center gap-2 mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-muted-foreground"
              aria-hidden="true"
            >
              <rect width="7" height="7" x="3" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="3" rx="1" />
              <rect width="7" height="7" x="14" y="14" rx="1" />
              <rect width="7" height="7" x="3" y="14" rx="1" />
            </svg>
            <h2 className="text-sm font-semibold text-foreground">
              Components
            </h2>
          </div>
          <ComponentPicker
            selectedSlug={selectedSlug}
            onSelect={selectComponent}
          />
        </div>

        {/* Center — Preview + Code */}
        <div className="flex flex-col gap-4 min-w-0">
          {/* Live Preview */}
          <div
            className={cn(
              "flex-1",
              "rounded-[var(--prism-radius-xl)]",
              "border border-border",
              "bg-card/50 p-4"
            )}
          >
            <LivePreview
              slug={selectedSlug}
              propValues={propValues}
              componentName={schema?.name ?? ""}
            />
          </div>

          {/* Code Preview */}
          <div
            className={cn(
              "rounded-[var(--prism-radius-xl)]",
              "border border-border",
              "bg-card/50 p-4",
              "min-h-[200px] max-h-[320px]"
            )}
          >
            <CodePreview code={generatedCode} schema={schema} />
          </div>
        </div>

        {/* Right — Prop Editor */}
        <div
          className={cn(
            "rounded-[var(--prism-radius-xl)]",
            "border border-border",
            "bg-card/50 p-4",
            "lg:max-h-[calc(100vh-14rem)] overflow-y-auto"
          )}
        >
          {schema ? (
            <PropEditor
              schema={schema}
              propValues={propValues}
              onChange={setPropValue}
              onReset={resetProps}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <p className="text-sm text-muted-foreground">
                Select a component to edit its properties
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
