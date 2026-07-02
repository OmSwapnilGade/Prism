import type { ThemeTokens } from "./tokens";

export const darkTheme: ThemeTokens = {
  name: "dark",
  label: "Dark",

  colors: {
    background: "oklch(0.145 0.02 265)",
    foreground: "oklch(0.925 0.005 260)",
    card: "oklch(0.195 0.025 265)",
    cardForeground: "oklch(0.925 0.005 260)",
    popover: "oklch(0.195 0.025 265)",
    popoverForeground: "oklch(0.925 0.005 260)",
    primary: "oklch(0.685 0.19 264)",
    primaryForeground: "oklch(0.145 0.02 265)",
    secondary: "oklch(0.24 0.025 265)",
    secondaryForeground: "oklch(0.875 0.005 260)",
    muted: "oklch(0.24 0.025 265)",
    mutedForeground: "oklch(0.6 0.02 260)",
    accent: "oklch(0.24 0.025 265)",
    accentForeground: "oklch(0.875 0.005 260)",
    destructive: "oklch(0.65 0.24 25)",
    destructiveForeground: "oklch(0.145 0.02 265)",
    success: "oklch(0.62 0.185 152)",
    successForeground: "oklch(0.145 0.02 265)",
    warning: "oklch(0.75 0.17 75)",
    warningForeground: "oklch(0.145 0.02 265)",
    info: "oklch(0.685 0.19 264)",
    infoForeground: "oklch(0.145 0.02 265)",
    border: "oklch(0.295 0.025 265)",
    input: "oklch(0.295 0.025 265)",
    ring: "oklch(0.685 0.19 264)",
  },

  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "0.75rem",
    xl: "1rem",
  },

  shadows: {
    sm: "0 1px 2px 0 oklch(0 0 0 / 0.3)",
    md: "0 4px 6px -1px oklch(0 0 0 / 0.4), 0 2px 4px -2px oklch(0 0 0 / 0.3)",
    lg: "0 10px 15px -3px oklch(0 0 0 / 0.5), 0 4px 6px -4px oklch(0 0 0 / 0.3)",
  },

  transitions: {
    duration: "200ms",
    ease: "cubic-bezier(0.4, 0, 0.2, 1)",
  },
};
