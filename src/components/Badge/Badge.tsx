import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import type { BadgeProps } from "./Badge.types";

export const badgeVariants = cva(
  [
    "inline-flex items-center",
    "rounded-full",
    "px-2.5 py-0.5",
    "text-xs font-semibold",
    "transition-colors duration-[var(--prism-duration)] ease-[var(--prism-ease)]",
    "border",
  ].join(" "),
  {
    variants: {
      variant: {
        success:
          "bg-success/15 text-success border-success/25",
        warning:
          "bg-warning/15 text-warning border-warning/25",
        error:
          "bg-destructive/15 text-destructive border-destructive/25",
        info:
          "bg-info/15 text-info border-info/25",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
);

/**
 * Small status indicator. Supports success/warning/error/info variants.
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    >
      {children}
    </span>
  )
);

Badge.displayName = "Badge";
