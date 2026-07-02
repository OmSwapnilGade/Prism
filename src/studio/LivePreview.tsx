/**
 * Live Preview
 *
 * Center panel in the studio — renders the real Prism component
 * with current prop values in a styled preview container.
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { ComponentRenderer } from "./ComponentRenderer";

interface LivePreviewProps {
  slug: string | null;
  propValues: Record<string, unknown>;
  componentName: string;
}

type PreviewBg = "default" | "card" | "dots";

const bgLabels: { value: PreviewBg; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "card", label: "Card" },
  { value: "dots", label: "Dots" },
];

export function LivePreview({ slug, propValues, componentName }: LivePreviewProps) {
  const [bg, setBg] = useState<PreviewBg>("default");

  if (!slug) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg font-medium text-muted-foreground">
            Select a component
          </p>
          <p className="text-sm text-muted-foreground/70 mt-1">
            Pick a component from the left panel to start customizing
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Preview header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <h2 className="text-sm font-semibold text-foreground">
            Preview
          </h2>
          <span className="text-xs text-muted-foreground font-mono bg-muted px-1.5 py-0.5 rounded-[var(--prism-radius-sm)]">
            {"<"}{componentName}{" />"}
          </span>
        </div>

        {/* Background toggle */}
        <div className="flex items-center gap-1 p-0.5 bg-secondary/50 rounded-[var(--prism-radius-md)] border border-border">
          {bgLabels.map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setBg(value)}
              className={cn(
                "px-2 py-1 text-xs font-medium",
                "rounded-[var(--prism-radius-sm)]",
                "transition-all duration-[var(--prism-duration)]",
                "cursor-pointer",
                bg === value
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
              id={`studio-preview-bg-${value}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Preview area */}
      <div
        className={cn(
          "flex-1 flex items-center justify-center",
          "rounded-[var(--prism-radius-xl)]",
          "border border-border",
          "min-h-[240px]",
          "transition-all duration-[var(--prism-duration)]",
          "overflow-hidden relative",
          bg === "default" && "bg-background",
          bg === "card" && "bg-card",
          bg === "dots" && "bg-background"
        )}
      >
        {/* Dot pattern background */}
        {bg === "dots" && (
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle, currentColor 1px, transparent 1px)",
              backgroundSize: "20px 20px",
            }}
            aria-hidden="true"
          />
        )}

        {/* Component preview */}
        <div className="relative z-10 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={slug}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <ComponentRenderer slug={slug} propValues={propValues} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
