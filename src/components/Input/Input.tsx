import { forwardRef, useId } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import type { InputProps } from "./Input.types";

export const inputVariants = cva(
  [
    "flex w-full",
    "bg-transparent",
    "border border-input",
    "rounded-[var(--prism-radius-md)]",
    "px-3 py-2",
    "text-sm text-foreground",
    "placeholder:text-muted-foreground",
    "transition-colors duration-[var(--prism-duration)] ease-[var(--prism-ease)]",
    "focus-ring",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
  ].join(" "),
  {
    variants: {
      inputSize: {
        sm: "h-8 text-xs",
        md: "h-10 text-sm",
        lg: "h-12 text-base",
      },
    },
    defaultVariants: {
      inputSize: "md",
    },
  }
);

/**
 * Text input with label, validation state, and error messaging.
 * Accessible: `<label>` linked via `htmlFor`/`id`, `aria-invalid`, `aria-describedby` for error.
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, inputSize, id: propId, ...props }, ref) => {
    const generatedId = useId();
    const id = propId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    const hasError = Boolean(error);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            inputVariants({ inputSize }),
            hasError && "border-destructive focus-visible:outline-destructive",
            className
          )}
          aria-invalid={hasError || undefined}
          aria-describedby={
            hasError ? errorId : helperText ? helperId : undefined
          }
          {...props}
        />
        {hasError && (
          <p id={errorId} className="text-xs text-destructive" role="alert">
            {error}
          </p>
        )}
        {!hasError && helperText && (
          <p id={helperId} className="text-xs text-muted-foreground">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
