import type { ThemeTokens } from "./tokens";

export const lightTheme: ThemeTokens = {
  name: "light",
  label: "Light",

  colors: {
    background: "oklch(0.985 0.002 247)",
    foreground: "oklch(0.205 0.02 265)",
    card: "oklch(1 0 0)",
    cardForeground: "oklch(0.205 0.02 265)",
    popover: "oklch(1 0 0)",
    popoverForeground: "oklch(0.205 0.02 265)",
    primary: "oklch(0.551 0.215 264)",
    primaryForeground: "oklch(0.985 0.002 247)",
    secondary: "oklch(0.94 0.01 260)",
    secondaryForeground: "oklch(0.345 0.025 265)",
    muted: "oklch(0.94 0.01 260)",
    mutedForeground: "oklch(0.556 0.02 260)",
    accent: "oklch(0.94 0.01 260)",
    accentForeground: "oklch(0.345 0.025 265)",
    destructive: "oklch(0.577 0.245 27)",
    destructiveForeground: "oklch(0.985 0.002 247)",
    success: "oklch(0.527 0.17 152)",
    successForeground: "oklch(0.985 0.002 247)",
    warning: "oklch(0.68 0.17 75)",
    warningForeground: "oklch(0.205 0.02 265)",
    info: "oklch(0.551 0.215 264)",
    infoForeground: "oklch(0.985 0.002 247)",
    border: "oklch(0.885 0.01 260)",
    input: "oklch(0.885 0.01 260)",
    ring: "oklch(0.551 0.215 264)",
  },

  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
  },

  shadows: {
    sm: "0 1px 2px 0 oklch(0.205 0.02 265 / 0.04)",
    md: "0 4px 6px -1px oklch(0.205 0.02 265 / 0.07), 0 2px 4px -2px oklch(0.205 0.02 265 / 0.05)",
    lg: "0 10px 15px -3px oklch(0.205 0.02 265 / 0.08), 0 4px 6px -4px oklch(0.205 0.02 265 / 0.05)",
  },

  transitions: {
    duration: "200ms",
    ease: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};
