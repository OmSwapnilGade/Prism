export interface TooltipProps {
  /** The element that triggers the tooltip on hover/focus */
  children: React.ReactElement;
  /** The tooltip text */
  content: string;
  /** Placement relative to the trigger */
  side?: "top" | "bottom" | "left" | "right";
  /** Delay before showing (ms) */
  delayMs?: number;
}
