import { forwardRef, useId, useRef, useCallback, useEffect } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import type { TextareaProps } from "./Textarea.types";

export const textareaVariants = cva(
  [
    "flex w-full min-h-[80px]",
    "bg-transparent",
    "border border-input",
    "rounded-[var(--prism-radius-md)]",
    "px-3 py-2",
    "text-sm text-foreground",
    "placeholder:text-muted-foreground",
    "transition-colors duration-[var(--prism-duration)] ease-[var(--prism-ease)]",
    "focus-ring",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "resize-y",
  ].join(" "),
  {
    variants: {
      textareaSize: {
        sm: "text-xs min-h-[60px]",
        md: "text-sm min-h-[80px]",
        lg: "text-base min-h-[120px]",
      },
    },
    defaultVariants: {
      textareaSize: "md",
    },
  }
);

/**
 * Multi-line text input with optional auto-resize, label, and validation.
 * Auto-resize adjusts height to fit content without scroll.
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, label, error, helperText, textareaSize, autoResize, id: propId, onChange, ...props },
    forwardedRef
  ) => {
    const generatedId = useId();
    const id = propId || generatedId;
    const errorId = `${id}-error`;
    const helperId = `${id}-helper`;
    const hasError = Boolean(error);
    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    const resize = useCallback(() => {
      const el = internalRef.current;
      if (el && autoResize) {
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      }
    }, [autoResize]);

    useEffect(() => {
      resize();
    }, [resize]);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      resize();
      onChange?.(e);
    };

    const setRef = (el: HTMLTextAreaElement | null) => {
      internalRef.current = el;
      if (typeof forwardedRef === "function") {
        forwardedRef(el);
      } else if (forwardedRef) {
        forwardedRef.current = el;
      }
    };

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-foreground">
            {label}
          </label>
        )}
        <textarea
          ref={setRef}
          id={id}
          className={cn(
            textareaVariants({ textareaSize }),
            autoResize && "resize-none overflow-hidden",
            hasError && "border-destructive focus-visible:outline-destructive",
            className
          )}
          aria-invalid={hasError || undefined}
          aria-describedby={hasError ? errorId : helperText ? helperId : undefined}
          onChange={handleChange}
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

Textarea.displayName = "Textarea";
