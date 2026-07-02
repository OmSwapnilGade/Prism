/**
 * Typed token definitions for Prism themes.
 * Each theme must implement this full contract.
 */

export interface ThemeTokens {
  name: string;
  label: string;

  colors: {
    background: string;
    foreground: string;
    card: string;
    cardForeground: string;
    popover: string;
    popoverForeground: string;
    primary: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    muted: string;
    mutedForeground: string;
    accent: string;
    accentForeground: string;
    destructive: string;
    destructiveForeground: string;
    success: string;
    successForeground: string;
    warning: string;
    warningForeground: string;
    info: string;
    infoForeground: string;
    border: string;
    input: string;
    ring: string;
  };

  radius: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };

  shadows: {
    sm: string;
    md: string;
    lg: string;
  };

  transitions: {
    duration: string;
    ease: string;
  };
}
