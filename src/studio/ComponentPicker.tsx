/**
 * Component Picker
 *
 * Left panel in the studio — shows available components grouped
 * by category with search filtering and selection state.
 */

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { studioRegistry } from "./studioRegistry";
import type { StudioComponentSchema } from "./studioRegistry";

interface ComponentPickerProps {
  selectedSlug: string | null;
  onSelect: (slug: string) => void;
}

const groupLabels: Record<string, { label: string; icon: string }> = {
  actions: { label: "Actions", icon: "⚡" },
  forms: { label: "Form Controls", icon: "📝" },
  layout: { label: "Layout", icon: "📐" },
  feedback: { label: "Feedback", icon: "💬" },
};

const groupOrder = ["actions", "forms", "layout", "feedback"];

export function ComponentPicker({ selectedSlug, onSelect }: ComponentPickerProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query) return studioRegistry;
    const q = query.toLowerCase();
    return studioRegistry.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q)
    );
  }, [query]);

  const grouped = useMemo(() => {
    const groups: Record<string, StudioComponentSchema[]> = {};
    for (const component of filtered) {
      if (!groups[component.group]) {
        groups[component.group] = [];
      }
      groups[component.group].push(component);
    }
    return groups;
  }, [filtered]);

  return (
    <div className="flex flex-col gap-3 h-full">
      {/* Search */}
      <div className="relative">
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
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        <input
          type="search"
          placeholder="Search components…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={cn(
            "w-full h-9 pl-9 pr-3 text-sm",
            "bg-secondary/50 border border-border",
            "rounded-[var(--prism-radius-md)]",
            "text-foreground placeholder:text-muted-foreground",
            "transition-colors duration-[var(--prism-duration)]",
            "focus-ring"
          )}
          aria-label="Search components"
          id="studio-component-search"
        />
      </div>

      {/* Component list */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {groupOrder.map((group) => {
          const components = grouped[group];
          if (!components || components.length === 0) return null;
          const { label, icon } = groupLabels[group];

          return (
            <div key={group}>
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1 mb-2 flex items-center gap-1.5">
                <span>{icon}</span>
                {label}
              </span>
              <div className="space-y-1 mt-2">
                {components.map((component) => (
                  <motion.button
                    key={component.slug}
                    onClick={() => onSelect(component.slug)}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(
                      "w-full text-left px-3 py-2.5",
                      "rounded-[var(--prism-radius-md)]",
                      "transition-colors duration-[var(--prism-duration)]",
                      "focus-ring cursor-pointer",
                      "group",
                      selectedSlug === component.slug
                        ? "bg-primary/10 text-primary border border-primary/20"
                        : "text-foreground hover:bg-accent border border-transparent"
                    )}
                    id={`studio-pick-${component.slug}`}
                    aria-pressed={selectedSlug === component.slug}
                  >
                    <span className="text-sm font-medium block">
                      {component.name}
                    </span>
                    <span
                      className={cn(
                        "text-xs mt-0.5 block line-clamp-1",
                        selectedSlug === component.slug
                          ? "text-primary/70"
                          : "text-muted-foreground"
                      )}
                    >
                      {component.description}
                    </span>
                  </motion.button>
                ))}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            No components found.
          </p>
        )}
      </div>
    </div>
  );
}
