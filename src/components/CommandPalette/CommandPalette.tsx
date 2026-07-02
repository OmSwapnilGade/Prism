import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { componentRegistry } from "@/data/componentRegistry";
import { THEMES } from "@/types";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/utils/cn";

interface CommandItem {
  id: string;
  label: string;
  category: string;
  action: () => void;
  icon?: React.ReactNode;
}

const searchIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
  </svg>
);

const componentIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
  </svg>
);

const themeIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/>
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/>
  </svg>
);

/**
 * Keyboard-accessible command palette (Cmd+K / Ctrl+K).
 * Provides instant navigation to any component doc page and theme switching.
 */
export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { setTheme } = useTheme();

  // Build command list
  const allCommands: CommandItem[] = useMemo(() => {
    const componentCmds: CommandItem[] = componentRegistry.map((c) => ({
      id: `comp-${c.slug}`,
      label: c.name,
      category: "Components",
      icon: componentIcon,
      action: () => {
        navigate(`/docs/${c.slug}`);
        setOpen(false);
      },
    }));

    const themeCmds: CommandItem[] = THEMES.map((t) => ({
      id: `theme-${t.value}`,
      label: `Switch to ${t.label}`,
      category: "Theme",
      icon: themeIcon,
      action: () => {
        setTheme(t.value);
        setOpen(false);
      },
    }));

    const navCmds: CommandItem[] = [
      {
        id: "nav-home",
        label: "Home",
        category: "Navigation",
        icon: searchIcon,
        action: () => { navigate("/"); setOpen(false); },
      },
      {
        id: "nav-docs",
        label: "All Components",
        category: "Navigation",
        icon: searchIcon,
        action: () => { navigate("/docs"); setOpen(false); },
      },
      {
        id: "nav-playground",
        label: "Playground",
        category: "Navigation",
        icon: searchIcon,
        action: () => { navigate("/playground"); setOpen(false); },
      },
    ];

    return [...navCmds, ...componentCmds, ...themeCmds];
  }, [navigate, setTheme]);

  // Filtered list
  const filtered = useMemo(() => {
    if (!query.trim()) return allCommands;
    const q = query.toLowerCase();
    return allCommands.filter(
      (cmd) =>
        cmd.label.toLowerCase().includes(q) ||
        cmd.category.toLowerCase().includes(q)
    );
  }, [query, allCommands]);

  // Reset selection when filtered changes
  useEffect(() => {
    setSelectedIdx(0);
  }, [filtered]);

  // Keyboard shortcut to open
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setQuery("");
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Scroll selected item into view
  useEffect(() => {
    if (open && listRef.current) {
      const items = listRef.current.querySelectorAll('[role="option"]');
      items[selectedIdx]?.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIdx, open]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIdx((prev) => Math.min(prev + 1, filtered.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIdx((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          e.preventDefault();
          if (filtered[selectedIdx]) {
            filtered[selectedIdx].action();
          }
          break;
      }
    },
    [filtered, selectedIdx]
  );

  // Group items by category
  const grouped = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {};
    for (const item of filtered) {
      if (!groups[item.category]) groups[item.category] = [];
      groups[item.category].push(item);
    }
    return groups;
  }, [filtered]);

  let runningIdx = -1;

  return (
    <>
      {/* Trigger button */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "hidden md:flex items-center gap-2 h-8 px-3",
          "rounded-[var(--prism-radius-md)]",
          "text-xs font-medium",
          "border border-border bg-secondary/50",
          "text-muted-foreground hover:text-foreground",
          "hover:bg-accent",
          "transition-colors duration-[var(--prism-duration)]",
          "focus-ring cursor-pointer",
          "min-w-[180px]"
        )}
        aria-label="Open command palette (Ctrl+K)"
      >
        {searchIcon}
        <span className="flex-1 text-left">Search…</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 px-1.5 py-0.5 text-[10px] font-mono bg-muted rounded border border-border">
          ⌘K
        </kbd>
      </button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              aria-hidden="true"
            />
            <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh] px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
                className={cn(
                  "w-full max-w-lg",
                  "rounded-[var(--prism-radius-xl)]",
                  "border border-border bg-popover",
                  "shadow-2xl overflow-hidden"
                )}
                role="dialog"
                aria-label="Command palette"
                onKeyDown={handleKeyDown}
              >
                {/* Search input */}
                <div className="flex items-center gap-3 px-4 border-b border-border">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground shrink-0" aria-hidden="true">
                    <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
                  </svg>
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type a command or search…"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1 h-12 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                    role="combobox"
                    aria-expanded={true}
                    aria-controls="command-list"
                    aria-activedescendant={filtered[selectedIdx]?.id}
                  />
                  <kbd className="text-[10px] font-mono text-muted-foreground px-1.5 py-0.5 bg-muted rounded border border-border">
                    ESC
                  </kbd>
                </div>

                {/* Results list */}
                <div
                  ref={listRef}
                  id="command-list"
                  role="listbox"
                  className="max-h-[320px] overflow-y-auto p-2"
                >
                  {filtered.length === 0 ? (
                    <p className="py-8 text-center text-sm text-muted-foreground">
                      No results found.
                    </p>
                  ) : (
                    Object.entries(grouped).map(([category, items]) => (
                      <div key={category}>
                        <p className="px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {category}
                        </p>
                        {items.map((item) => {
                          runningIdx++;
                          const isSelected = runningIdx === selectedIdx;
                          const currentIdx = runningIdx;
                          return (
                            <button
                              key={item.id}
                              id={item.id}
                              role="option"
                              aria-selected={isSelected}
                              onClick={() => item.action()}
                              onMouseEnter={() => setSelectedIdx(currentIdx)}
                              className={cn(
                                "flex items-center gap-3 w-full px-3 py-2 text-sm",
                                "rounded-[var(--prism-radius-md)]",
                                "transition-colors duration-100",
                                "cursor-pointer",
                                isSelected
                                  ? "bg-primary/10 text-primary"
                                  : "text-popover-foreground hover:bg-accent"
                              )}
                            >
                              <span className="text-muted-foreground">{item.icon}</span>
                              {item.label}
                            </button>
                          );
                        })}
                      </div>
                    ))
                  )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between px-4 py-2 border-t border-border text-[10px] text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <kbd className="px-1 py-0.5 bg-muted rounded border border-border font-mono">↑↓</kbd>
                      Navigate
                    </span>
                    <span className="flex items-center gap-1">
                      <kbd className="px-1 py-0.5 bg-muted rounded border border-border font-mono">↵</kbd>
                      Select
                    </span>
                  </div>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1 py-0.5 bg-muted rounded border border-border font-mono">Esc</kbd>
                    Close
                  </span>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
