import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import type { ButtonProps } from "./Button.types";

export const buttonVariants = cva(
  [
    "relative inline-flex items-center justify-center gap-2",
    "font-medium whitespace-nowrap",
    "rounded-[var(--prism-radius-md)]",
    "transition-all duration-[var(--prism-duration)] ease-[var(--prism-ease)]",
    "focus-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    "cursor-pointer",
  ].join(" "),
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        danger:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        ghost:
          "text-foreground hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-8 px-3 text-xs rounded-[var(--prism-radius-sm)]",
        md: "h-10 px-4 text-sm",
        lg: "h-12 px-6 text-base",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

/**
 * Primary interactive element. Supports 4 variants, 3 sizes, loading/disabled states.
 * Accessible: uses native `<button>`, `aria-disabled`, `aria-busy` for loading state.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, loading, disabled, children, ...props }, ref) => {
    const isDisabled = !!(disabled || loading);

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-busy={loading || undefined}
        {...props}
      >
        <motion.div
          className="absolute inset-0 z-0 rounded-inherit"
          whileHover={isDisabled ? undefined : { scale: 1.02 }}
          whileTap={isDisabled ? undefined : { scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
        />
        <span className="relative z-10 flex items-center gap-2">
          {loading && <Spinner />}
          {children}
        </span>
      </button>
    );
  }
);

Button.displayName = "Button";
