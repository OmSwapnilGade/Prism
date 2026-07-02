import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import type { DropdownMenuProps } from "./DropdownMenu.types";

/**
 * Accessible dropdown menu with keyboard navigation.
 * Supports arrow keys, Enter/Space to select, Escape to close.
 * Uses `role="menu"` and `role="menuitem"`.
 */
export function DropdownMenu({
  trigger,
  items,
  onSelect,
  align = "left",
}: DropdownMenuProps) {
  const [open, setOpen] = useState(false);
  const [focusIdx, setFocusIdx] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Focus management
  useEffect(() => {
    if (open && focusIdx >= 0) {
      const btns = menuRef.current?.querySelectorAll<HTMLElement>(
        '[role="menuitem"]:not([aria-disabled="true"])'
      );
      btns?.[focusIdx]?.focus();
    }
  }, [open, focusIdx]);

  const enabledItems = items.filter((i) => !i.disabled);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open) {
        if (e.key === "ArrowDown" || e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen(true);
          setFocusIdx(0);
        }
        return;
      }

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setFocusIdx((prev) => (prev + 1) % enabledItems.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setFocusIdx(
            (prev) => (prev - 1 + enabledItems.length) % enabledItems.length
          );
          break;
        case "Home":
          e.preventDefault();
          setFocusIdx(0);
          break;
        case "End":
          e.preventDefault();
          setFocusIdx(enabledItems.length - 1);
          break;
        case "Enter":
        case " ":
          e.preventDefault();
          if (focusIdx >= 0 && focusIdx < enabledItems.length) {
            onSelect(enabledItems[focusIdx].value);
            setOpen(false);
          }
          break;
        case "Escape":
          e.preventDefault();
          setOpen(false);
          break;
      }
    },
    [open, focusIdx, enabledItems, onSelect]
  );

  return (
    <div ref={containerRef} className="relative inline-block" onKeyDown={handleKeyDown}>
      <div
        onClick={() => {
          setOpen(!open);
          if (!open) setFocusIdx(0);
        }}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        {trigger}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={menuRef}
            role="menu"
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute top-full mt-1.5 z-50",
              "min-w-[180px] py-1",
              "rounded-[var(--prism-radius-lg)]",
              "border border-border bg-popover",
              "shadow-lg",
              align === "right" ? "right-0" : "left-0"
            )}
          >
            {items.map((item, idx) => (
              <button
                key={item.value}
                role="menuitem"
                aria-disabled={item.disabled || undefined}
                tabIndex={-1}
                onClick={() => {
                  if (!item.disabled) {
                    onSelect(item.value);
                    setOpen(false);
                  }
                }}
                className={cn(
                  "flex items-center gap-2.5 w-full px-3 py-2 text-sm",
                  "transition-colors duration-[var(--prism-duration)]",
                  "cursor-pointer",
                  item.disabled && "opacity-50 cursor-not-allowed",
                  item.danger
                    ? "text-destructive hover:bg-destructive/10"
                    : "text-popover-foreground hover:bg-accent",
                  focusIdx === idx && !item.disabled && "bg-accent"
                )}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

DropdownMenu.displayName = "DropdownMenu";
