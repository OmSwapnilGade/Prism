/**
 * Generate Theme File
 *
 * Emits a complete index.css with the active Prism theme tokens baked in
 * as :root variables (no data-theme attribute needed), plus the full
 * Tailwind v4 @theme mapping and global utility classes.
 */

import type { ExportFile } from "./exportTypes";
import type { Theme } from "@/types";

// ── Theme CSS blocks ─────────────────────────────────────────────────────
// Each block is the verbatim content from index.css but extracted per-theme.
// In the exported project, the active theme is applied to :root so it works
// without any ThemeProvider or data-theme attribute.

const THEME_BLOCKS: Record<Theme, string> = {
  light: `  --prism-background: oklch(0.985 0.002 247);
  --prism-foreground: oklch(0.205 0.02 265);
  --prism-card: oklch(1 0 0);
  --prism-card-foreground: oklch(0.205 0.02 265);
  --prism-popover: oklch(1 0 0);
  --prism-popover-foreground: oklch(0.205 0.02 265);
  --prism-primary: oklch(0.551 0.215 264);
  --prism-primary-foreground: oklch(0.985 0.002 247);
  --prism-secondary: oklch(0.94 0.01 260);
  --prism-secondary-foreground: oklch(0.345 0.025 265);
  --prism-muted: oklch(0.94 0.01 260);
  --prism-muted-foreground: oklch(0.556 0.02 260);
  --prism-accent: oklch(0.94 0.01 260);
  --prism-accent-foreground: oklch(0.345 0.025 265);
  --prism-destructive: oklch(0.577 0.245 27);
  --prism-destructive-foreground: oklch(0.985 0.002 247);
  --prism-success: oklch(0.527 0.17 152);
  --prism-success-foreground: oklch(0.985 0.002 247);
  --prism-warning: oklch(0.68 0.17 75);
  --prism-warning-foreground: oklch(0.205 0.02 265);
  --prism-info: oklch(0.551 0.215 264);
  --prism-info-foreground: oklch(0.985 0.002 247);
  --prism-border: oklch(0.885 0.01 260);
  --prism-input: oklch(0.885 0.01 260);
  --prism-ring: oklch(0.551 0.215 264);
  --prism-radius-sm: 0.375rem;
  --prism-radius-md: 0.5rem;
  --prism-radius-lg: 0.75rem;
  --prism-radius-xl: 1rem;
  --prism-shadow-sm: 0 1px 2px 0 oklch(0.205 0.02 265 / 0.04);
  --prism-shadow-md: 0 4px 6px -1px oklch(0.205 0.02 265 / 0.07), 0 2px 4px -2px oklch(0.205 0.02 265 / 0.05);
  --prism-shadow-lg: 0 10px 15px -3px oklch(0.205 0.02 265 / 0.08), 0 4px 6px -4px oklch(0.205 0.02 265 / 0.05);
  --prism-duration: 200ms;
  --prism-ease: cubic-bezier(0.4, 0, 0.2, 1);
  --prism-code-bg: oklch(0.955 0.005 260);
  --prism-code-border: oklch(0.91 0.01 260);`,

  dark: `  --prism-background: oklch(0.145 0.02 265);
  --prism-foreground: oklch(0.925 0.005 260);
  --prism-card: oklch(0.195 0.025 265);
  --prism-card-foreground: oklch(0.925 0.005 260);
  --prism-popover: oklch(0.195 0.025 265);
  --prism-popover-foreground: oklch(0.925 0.005 260);
  --prism-primary: oklch(0.685 0.19 264);
  --prism-primary-foreground: oklch(0.145 0.02 265);
  --prism-secondary: oklch(0.24 0.025 265);
  --prism-secondary-foreground: oklch(0.875 0.005 260);
  --prism-muted: oklch(0.24 0.025 265);
  --prism-muted-foreground: oklch(0.6 0.02 260);
  --prism-accent: oklch(0.24 0.025 265);
  --prism-accent-foreground: oklch(0.875 0.005 260);
  --prism-destructive: oklch(0.65 0.24 25);
  --prism-destructive-foreground: oklch(0.145 0.02 265);
  --prism-success: oklch(0.62 0.185 152);
  --prism-success-foreground: oklch(0.145 0.02 265);
  --prism-warning: oklch(0.75 0.17 75);
  --prism-warning-foreground: oklch(0.145 0.02 265);
  --prism-info: oklch(0.685 0.19 264);
  --prism-info-foreground: oklch(0.145 0.02 265);
  --prism-border: oklch(0.295 0.025 265);
  --prism-input: oklch(0.295 0.025 265);
  --prism-ring: oklch(0.685 0.19 264);
  --prism-radius-sm: 0.375rem;
  --prism-radius-md: 0.5rem;
  --prism-radius-lg: 0.75rem;
  --prism-radius-xl: 1rem;
  --prism-shadow-sm: 0 1px 2px 0 oklch(0 0 0 / 0.3);
  --prism-shadow-md: 0 4px 6px -1px oklch(0 0 0 / 0.4), 0 2px 4px -2px oklch(0 0 0 / 0.3);
  --prism-shadow-lg: 0 10px 15px -3px oklch(0 0 0 / 0.5), 0 4px 6px -4px oklch(0 0 0 / 0.3);
  --prism-duration: 200ms;
  --prism-ease: cubic-bezier(0.4, 0, 0.2, 1);
  --prism-code-bg: oklch(0.175 0.02 265);
  --prism-code-border: oklch(0.265 0.025 265);`,

  ocean: `  --prism-background: oklch(0.155 0.03 230);
  --prism-foreground: oklch(0.92 0.01 210);
  --prism-card: oklch(0.195 0.035 228);
  --prism-card-foreground: oklch(0.92 0.01 210);
  --prism-popover: oklch(0.195 0.035 228);
  --prism-popover-foreground: oklch(0.92 0.01 210);
  --prism-primary: oklch(0.72 0.15 195);
  --prism-primary-foreground: oklch(0.155 0.03 230);
  --prism-secondary: oklch(0.24 0.035 225);
  --prism-secondary-foreground: oklch(0.88 0.01 210);
  --prism-muted: oklch(0.24 0.035 225);
  --prism-muted-foreground: oklch(0.6 0.03 215);
  --prism-accent: oklch(0.28 0.04 220);
  --prism-accent-foreground: oklch(0.88 0.01 210);
  --prism-destructive: oklch(0.65 0.22 25);
  --prism-destructive-foreground: oklch(0.155 0.03 230);
  --prism-success: oklch(0.65 0.18 165);
  --prism-success-foreground: oklch(0.155 0.03 230);
  --prism-warning: oklch(0.78 0.15 75);
  --prism-warning-foreground: oklch(0.155 0.03 230);
  --prism-info: oklch(0.72 0.15 195);
  --prism-info-foreground: oklch(0.155 0.03 230);
  --prism-border: oklch(0.3 0.035 225);
  --prism-input: oklch(0.3 0.035 225);
  --prism-ring: oklch(0.72 0.15 195);
  --prism-radius-sm: 0.375rem;
  --prism-radius-md: 0.625rem;
  --prism-radius-lg: 0.875rem;
  --prism-radius-xl: 1.25rem;
  --prism-shadow-sm: 0 1px 3px 0 oklch(0.1 0.03 230 / 0.4);
  --prism-shadow-md: 0 4px 8px -1px oklch(0.1 0.03 230 / 0.5), 0 2px 4px -2px oklch(0.1 0.03 230 / 0.4);
  --prism-shadow-lg: 0 12px 20px -4px oklch(0.1 0.03 230 / 0.55), 0 4px 8px -4px oklch(0.1 0.03 230 / 0.4);
  --prism-duration: 250ms;
  --prism-ease: cubic-bezier(0.25, 0.46, 0.45, 0.94);
  --prism-code-bg: oklch(0.175 0.03 228);
  --prism-code-border: oklch(0.27 0.035 225);`,

  forest: `  --prism-background: oklch(0.165 0.03 145);
  --prism-foreground: oklch(0.92 0.02 120);
  --prism-card: oklch(0.205 0.035 142);
  --prism-card-foreground: oklch(0.92 0.02 120);
  --prism-popover: oklch(0.205 0.035 142);
  --prism-popover-foreground: oklch(0.92 0.02 120);
  --prism-primary: oklch(0.7 0.16 145);
  --prism-primary-foreground: oklch(0.165 0.03 145);
  --prism-secondary: oklch(0.255 0.035 140);
  --prism-secondary-foreground: oklch(0.88 0.015 125);
  --prism-muted: oklch(0.255 0.035 140);
  --prism-muted-foreground: oklch(0.6 0.04 135);
  --prism-accent: oklch(0.3 0.04 138);
  --prism-accent-foreground: oklch(0.88 0.015 125);
  --prism-destructive: oklch(0.62 0.22 28);
  --prism-destructive-foreground: oklch(0.165 0.03 145);
  --prism-success: oklch(0.68 0.17 155);
  --prism-success-foreground: oklch(0.165 0.03 145);
  --prism-warning: oklch(0.76 0.15 80);
  --prism-warning-foreground: oklch(0.165 0.03 145);
  --prism-info: oklch(0.65 0.12 200);
  --prism-info-foreground: oklch(0.165 0.03 145);
  --prism-border: oklch(0.31 0.035 140);
  --prism-input: oklch(0.31 0.035 140);
  --prism-ring: oklch(0.7 0.16 145);
  --prism-radius-sm: 0.25rem;
  --prism-radius-md: 0.375rem;
  --prism-radius-lg: 0.625rem;
  --prism-radius-xl: 0.875rem;
  --prism-shadow-sm: 0 1px 3px 0 oklch(0.1 0.03 145 / 0.35);
  --prism-shadow-md: 0 4px 8px -1px oklch(0.1 0.03 145 / 0.45), 0 2px 4px -2px oklch(0.1 0.03 145 / 0.35);
  --prism-shadow-lg: 0 12px 20px -4px oklch(0.1 0.03 145 / 0.5), 0 4px 8px -4px oklch(0.1 0.03 145 / 0.35);
  --prism-duration: 200ms;
  --prism-ease: cubic-bezier(0.4, 0, 0.2, 1);
  --prism-code-bg: oklch(0.185 0.03 142);
  --prism-code-border: oklch(0.28 0.035 140);`,
};

const SHARED_CSS_TAIL = `
/* ---- Map tokens into Tailwind v4 @theme ---- */
@theme {
  --font-sans: "Inter", ui-sans-serif, system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, monospace;

  --color-background: var(--prism-background);
  --color-foreground: var(--prism-foreground);
  --color-card: var(--prism-card);
  --color-card-foreground: var(--prism-card-foreground);
  --color-popover: var(--prism-popover);
  --color-popover-foreground: var(--prism-popover-foreground);
  --color-primary: var(--prism-primary);
  --color-primary-foreground: var(--prism-primary-foreground);
  --color-secondary: var(--prism-secondary);
  --color-secondary-foreground: var(--prism-secondary-foreground);
  --color-muted: var(--prism-muted);
  --color-muted-foreground: var(--prism-muted-foreground);
  --color-accent: var(--prism-accent);
  --color-accent-foreground: var(--prism-accent-foreground);
  --color-destructive: var(--prism-destructive);
  --color-destructive-foreground: var(--prism-destructive-foreground);
  --color-success: var(--prism-success);
  --color-success-foreground: var(--prism-success-foreground);
  --color-warning: var(--prism-warning);
  --color-warning-foreground: var(--prism-warning-foreground);
  --color-info: var(--prism-info);
  --color-info-foreground: var(--prism-info-foreground);
  --color-border: var(--prism-border);
  --color-input: var(--prism-input);
  --color-ring: var(--prism-ring);

  --radius-sm: var(--prism-radius-sm);
  --radius-md: var(--prism-radius-md);
  --radius-lg: var(--prism-radius-lg);
  --radius-xl: var(--prism-radius-xl);

  --shadow-sm: var(--prism-shadow-sm);
  --shadow-md: var(--prism-shadow-md);
  --shadow-lg: var(--prism-shadow-lg);

  --animate-duration: var(--prism-duration);
  --animate-ease: var(--prism-ease);

  --color-code-bg: var(--prism-code-bg);
  --color-code-border: var(--prism-code-border);
}

/* ---- Global Resets ---- */
* {
  border-color: var(--prism-border);
}

body {
  font-family: var(--font-sans);
  background-color: var(--prism-background);
  color: var(--prism-foreground);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* ---- Focus ring utility ---- */
.focus-ring {
  outline: none;
}
.focus-ring:focus-visible {
  outline: 2px solid var(--prism-ring);
  outline-offset: 2px;
  border-radius: var(--prism-radius-sm);
}

/* ---- Scrollbar styling ---- */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: transparent;
}
::-webkit-scrollbar-thumb {
  background-color: var(--prism-muted-foreground);
  border-radius: 4px;
  opacity: 0.5;
}

/* ---- Spinner ---- */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.animate-spin {
  animation: spin 0.6s linear infinite;
}
`;

/**
 * Emits src/index.css with the active theme baked into :root,
 * the full @theme mapping, and shared utilities.
 */
export function generateThemeFile(theme: Theme): ExportFile {
  const themeBlock = THEME_BLOCKS[theme] ?? THEME_BLOCKS.dark;

  const content = `@import "tailwindcss";

/* ============================================================
   PRISM DESIGN SYSTEM — Theme: ${theme}
   Generated by Prism Studio
   ============================================================ */

:root {
${themeBlock}
}
${SHARED_CSS_TAIL}`;

  return {
    path: "src/index.css",
    content,
  };
}
