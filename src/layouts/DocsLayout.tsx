import { useState, useRef, useEffect } from "react";
import { Outlet, NavLink, Link, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/hooks/useTheme";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { componentRegistry } from "@/data/componentRegistry";
import { CommandPalette } from "@/components/CommandPalette/CommandPalette";
import { THEMES } from "@/types";
import { cn } from "@/utils/cn";

function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("keydown", handler);
      return () => document.removeEventListener("keydown", handler);
    }
  }, [open]);

  const currentLabel = THEMES.find((t) => t.value === theme)?.label ?? theme;

  const themeIcons: Record<string, React.ReactNode> = {
    light: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
      </svg>
    ),
    dark: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
      </svg>
    ),
    ocean: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/><path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
      </svg>
    ),
    forest: (
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"/><path d="M12 22v-3"/>
      </svg>
    ),
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex items-center gap-2 h-8 px-3",
          "rounded-[var(--prism-radius-md)]",
          "text-sm font-medium",
          "border border-border bg-secondary/50",
          "text-muted-foreground hover:text-foreground",
          "hover:bg-accent",
          "transition-colors duration-[var(--prism-duration)]",
          "focus-ring cursor-pointer"
        )}
        aria-label="Select theme"
        aria-expanded={open}
        aria-haspopup="listbox"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={theme}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="flex items-center"
          >
            {themeIcons[theme]}
          </motion.span>
        </AnimatePresence>
        <span className="hidden sm:inline">{currentLabel}</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={cn("transition-transform", open && "rotate-180")}>
          <path d="m6 9 6 6 6-6"/>
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute right-0 top-full mt-1.5 z-50",
              "w-40 py-1",
              "rounded-[var(--prism-radius-lg)]",
              "border border-border bg-popover",
              "shadow-lg"
            )}
            role="listbox"
            aria-label="Theme options"
          >
            {THEMES.map((t) => (
              <button
                key={t.value}
                role="option"
                aria-selected={theme === t.value}
                onClick={() => {
                  setTheme(t.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex items-center gap-2.5 w-full px-3 py-2 text-sm",
                  "transition-colors duration-[var(--prism-duration)]",
                  "cursor-pointer",
                  theme === t.value
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-popover-foreground hover:bg-accent"
                )}
              >
                {themeIcons[t.value]}
                {t.label}
                {theme === t.value && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-auto" aria-hidden="true">
                    <path d="M20 6 9 17l-5-5"/>
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div className="w-8 h-8 rounded-[var(--prism-radius-md)] bg-gradient-to-br from-[#818cf8] via-[#a78bfa] to-[#f472b6] flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
        <svg width="16" height="16" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path d="M10 22V10h5.5a4.5 4.5 0 0 1 0 9H10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      <span className="font-bold text-lg tracking-tight text-foreground">
        Prism
      </span>
    </Link>
  );
}

function SearchBox({ onSearch }: { onSearch: (query: string) => void }) {
  return (
    <div className="px-3 py-2">
      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground" aria-hidden="true">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
        </svg>
        <input
          type="search"
          placeholder="Search components…"
          onChange={(e) => onSearch(e.target.value)}
          className={cn(
            "w-full h-8 pl-8 pr-3 text-xs",
            "bg-secondary/50 border border-border",
            "rounded-[var(--prism-radius-md)]",
            "text-foreground placeholder:text-muted-foreground",
            "transition-colors duration-[var(--prism-duration)]",
            "focus-ring"
          )}
          aria-label="Search components"
        />
      </div>
    </div>
  );
}

function Sidebar({ onClose }: { onClose?: () => void }) {
  const [query, setQuery] = useState("");
  const { recent } = useRecentlyViewed();

  const filtered = componentRegistry.filter((c) =>
    c.name.toLowerCase().includes(query.toLowerCase())
  );

  const recentComponents = recent
    .map((slug) => componentRegistry.find((c) => c.slug === slug))
    .filter(Boolean);

  return (
    <nav className="flex flex-col gap-1" aria-label="Component navigation">
      <SearchBox onSearch={setQuery} />

      {/* Playground link */}
      <div className="px-3">
        <NavLink
          to="/playground"
          onClick={onClose}
          className={({ isActive }) =>
            cn(
              "flex items-center gap-2 px-3 py-2 rounded-[var(--prism-radius-md)] text-sm font-medium",
              "transition-colors duration-[var(--prism-duration)]",
              "focus-ring",
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-accent"
            )
          }
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
          </svg>
          Playground
        </NavLink>
      </div>

      {/* Recently viewed */}
      {!query && recentComponents.length > 0 && (
        <>
          <div className="px-3 mt-2">
            <span className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground inline-block">
              Recently Viewed
            </span>
          </div>
          {recentComponents.map((component) => (
            <div className="px-3" key={`recent-${component!.slug}`}>
              <NavLink
                to={`/docs/${component!.slug}`}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-[var(--prism-radius-md)] text-xs font-medium",
                    "transition-colors duration-[var(--prism-duration)]",
                    "focus-ring",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground/60" aria-hidden="true">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
                {component!.name}
              </NavLink>
            </div>
          ))}
        </>
      )}

      {/* All Components */}
      <div className="px-3 mt-2">
        <span className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground inline-block">
          Components
        </span>
      </div>
      {filtered.length === 0 ? (
        <p className="px-6 py-4 text-xs text-muted-foreground">
          No components found.
        </p>
      ) : (
        filtered.map((component) => (
          <div className="px-3" key={component.slug}>
            <NavLink
              to={`/docs/${component.slug}`}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center px-3 py-2 rounded-[var(--prism-radius-md)] text-sm font-medium",
                  "transition-colors duration-[var(--prism-duration)]",
                  "focus-ring",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )
              }
            >
              {component.name}
            </NavLink>
          </div>
        ))
      )}
    </nav>
  );
}

/**
 * Responsive docs layout with collapsible sidebar, header with command palette,
 * theme selector, search, recently viewed, and animated page transitions.
 */
export function DocsLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="flex items-center justify-between h-14 px-4 lg:px-6 max-w-screen-2xl mx-auto">
          <div className="flex items-center gap-4">
            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 rounded-[var(--prism-radius-md)] hover:bg-accent text-muted-foreground hover:text-foreground transition-colors focus-ring cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
              aria-expanded={mobileOpen}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {mobileOpen ? (
                  <><path d="M18 6 6 18"/><path d="m6 6 12 12"/></>
                ) : (
                  <><path d="M4 12h16"/><path d="M4 6h16"/><path d="M4 18h16"/></>
                )}
              </svg>
            </button>
            <Logo />
          </div>

          <div className="flex items-center gap-2">
            <CommandPalette />
            <ThemeSelector />
          </div>
        </div>
      </header>

      <div className="flex max-w-screen-2xl mx-auto">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex flex-col w-56 shrink-0 border-r border-border sticky top-14 h-[calc(100vh-3.5rem)] overflow-y-auto py-4">
          <Sidebar />
        </aside>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMobileOpen(false)}
                aria-hidden="true"
              />
              <motion.aside
                className="fixed left-0 top-14 z-30 w-64 h-[calc(100vh-3.5rem)] bg-background border-r border-border py-4 overflow-y-auto lg:hidden"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Sidebar onClose={() => setMobileOpen(false)} />
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 min-w-0 px-4 py-8 lg:px-12 lg:py-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
