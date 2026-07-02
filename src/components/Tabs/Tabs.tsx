import { useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import type { TabsProps } from "./Tabs.types";

/**
 * Accessible tabs component with animated active indicator.
 * Supports keyboard navigation: arrow keys to move between tabs, Enter/Space to select.
 * Uses `role="tablist"`, `role="tab"`, and `role="tabpanel"`.
 */
export function Tabs({ items, value, onChange, children }: TabsProps) {
  const tabListRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const enabledItems = items.filter((i) => !i.disabled);
      const currentIdx = enabledItems.findIndex((i) => i.value === value);

      let nextIdx = currentIdx;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") {
        e.preventDefault();
        nextIdx = (currentIdx + 1) % enabledItems.length;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        nextIdx = (currentIdx - 1 + enabledItems.length) % enabledItems.length;
      } else if (e.key === "Home") {
        e.preventDefault();
        nextIdx = 0;
      } else if (e.key === "End") {
        e.preventDefault();
        nextIdx = enabledItems.length - 1;
      } else {
        return;
      }

      onChange(enabledItems[nextIdx].value);

      // Focus the new tab button
      const buttons = tabListRef.current?.querySelectorAll<HTMLElement>(
        '[role="tab"]:not([disabled])'
      );
      buttons?.[nextIdx]?.focus();
    },
    [items, value, onChange]
  );

  return (
    <div>
      <div
        ref={tabListRef}
        role="tablist"
        aria-orientation="horizontal"
        onKeyDown={handleKeyDown}
        className={cn(
          "inline-flex items-center gap-1",
          "bg-muted/50 p-1",
          "rounded-[var(--prism-radius-lg)]",
          "border border-border"
        )}
      >
        {items.map((item) => {
          const isActive = item.value === value;
          return (
            <button
              key={item.value}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${item.value}`}
              id={`tab-${item.value}`}
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              onClick={() => onChange(item.value)}
              className={cn(
                "relative px-4 py-1.5 text-sm font-medium",
                "rounded-[var(--prism-radius-md)]",
                "transition-colors duration-[var(--prism-duration)]",
                "focus-ring cursor-pointer",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-card rounded-[var(--prism-radius-md)] shadow-sm border border-border"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`panel-${value}`}
        aria-labelledby={`tab-${value}`}
        tabIndex={0}
        className="mt-4"
      >
        {children}
      </div>
    </div>
  );
}

Tabs.displayName = "Tabs";
