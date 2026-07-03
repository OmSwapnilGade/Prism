/**
 * Generate Component Files
 *
 * For each component slug used on the canvas, emits the full
 * Prism four-part file set (ComponentName.tsx + ComponentName.types.ts).
 *
 * Component sources are embedded as template-string constants so this
 * module works purely at runtime in the browser (no FS reads needed).
 *
 * Import paths rewrite: `@/utils/cn` → `../../utils/cn` etc.
 */

import type { ExportFile } from "./exportTypes";

// ── Source templates ─────────────────────────────────────────────────────
// Each component pair is stored verbatim, with @/ aliases already rewritten
// to relative paths that work in the exported project's src/ tree.

// ── utils/cn ────────────────────────────────────────────────────────────

const CN_UTIL = `import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines class names using clsx and resolves Tailwind conflicts with twMerge.
 * This is the single utility for all className composition in Prism.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
`;

// ── Button ───────────────────────────────────────────────────────────────

const BUTTON_TYPES = `import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "./Button";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Show a loading spinner and disable the button */
  loading?: boolean;
  /** Content to render inside the button */
  children: React.ReactNode;
}
`;

const BUTTON_TSX = `import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
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
 * Accessible: uses native <button>, aria-disabled, aria-busy for loading state.
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
`;

// ── Badge ────────────────────────────────────────────────────────────────

const BADGE_TYPES = `import type { VariantProps } from "class-variance-authority";
import type { badgeVariants } from "./Badge";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}
`;

const BADGE_TSX = `import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
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
        success: "bg-success/15 text-success border-success/25",
        warning: "bg-warning/15 text-warning border-warning/25",
        error: "bg-destructive/15 text-destructive border-destructive/25",
        info: "bg-info/15 text-info border-info/25",
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
`;

// ── Input ────────────────────────────────────────────────────────────────

const INPUT_TYPES = `import type { VariantProps } from "class-variance-authority";
import type { inputVariants } from "./Input";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  /** Label text displayed above the input */
  label?: string;
  /** Error message that triggers error styling */
  error?: string;
  /** Helper text shown below the input */
  helperText?: string;
}
`;

const INPUT_TSX = `import { forwardRef, useId } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
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
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, inputSize, id: propId, ...props }, ref) => {
    const generatedId = useId();
    const id = propId || generatedId;
    const errorId = \`\${id}-error\`;
    const helperId = \`\${id}-helper\`;
    const hasError = Boolean(error);

    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label htmlFor={id} className="text-sm font-medium text-foreground">
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
`;

// ── Textarea ─────────────────────────────────────────────────────────────

const TEXTAREA_TYPES = `import type { VariantProps } from "class-variance-authority";
import type { textareaVariants } from "./Textarea";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    VariantProps<typeof textareaVariants> {
  /** Label text displayed above the textarea */
  label?: string;
  /** Error message that triggers error styling */
  error?: string;
  /** Helper text shown below the textarea */
  helperText?: string;
  /** Automatically adjusts height to fit content */
  autoResize?: boolean;
}
`;

const TEXTAREA_TSX = `import { forwardRef, useId, useRef, useCallback, useEffect } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
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
 */
export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    { className, label, error, helperText, textareaSize, autoResize, id: propId, onChange, ...props },
    forwardedRef
  ) => {
    const generatedId = useId();
    const id = propId || generatedId;
    const errorId = \`\${id}-error\`;
    const helperId = \`\${id}-helper\`;
    const hasError = Boolean(error);
    const internalRef = useRef<HTMLTextAreaElement | null>(null);

    const resize = useCallback(() => {
      const el = internalRef.current;
      if (el && autoResize) {
        el.style.height = "auto";
        el.style.height = \`\${el.scrollHeight}px\`;
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
`;

// ── Card ─────────────────────────────────────────────────────────────────

const CARD_TYPES = `import type { VariantProps } from "class-variance-authority";
import type { cardVariants } from "./Card";

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  children: React.ReactNode;
}

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}
`;

const CARD_TSX = `import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../utils/cn";
import type {
  CardProps,
  CardHeaderProps,
  CardContentProps,
  CardFooterProps,
} from "./Card.types";

export const cardVariants = cva(
  [
    "rounded-[var(--prism-radius-lg)]",
    "border border-border",
    "bg-card text-card-foreground",
    "shadow-sm",
    "transition-all duration-[var(--prism-duration)] ease-[var(--prism-ease)]",
  ].join(" "),
  {
    variants: {
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
      },
    },
    defaultVariants: {
      padding: "none",
    },
  }
);

/**
 * Container with header/content/footer slots.
 * Uses composition pattern: <Card>, <CardHeader>, <CardContent>, <CardFooter>.
 */
export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, padding, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(cardVariants({ padding }), className)}
      {...props}
    >
      {children}
    </div>
  )
);
Card.displayName = "Card";

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col gap-1.5 p-6 pb-0", className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("p-6", className)} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = "CardFooter";
`;

// ── Toggle ───────────────────────────────────────────────────────────────

const TOGGLE_TYPES = `export interface ToggleProps {
  /** Controlled checked state */
  checked: boolean;
  /** Callback on toggle */
  onChange: (checked: boolean) => void;
  /** Accessible label */
  label?: string;
  /** Disables the toggle */
  disabled?: boolean;
  /** Size variant */
  size?: "sm" | "md" | "lg";
}
`;

const TOGGLE_TSX = `import { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "../../utils/cn";
import type { ToggleProps } from "./Toggle.types";

const sizeMap = {
  sm: { track: "w-8 h-4", thumb: "w-3 h-3", translate: 16 },
  md: { track: "w-11 h-6", thumb: "w-4.5 h-4.5", translate: 20 },
  lg: { track: "w-14 h-7", thumb: "w-5.5 h-5.5", translate: 28 },
};

/**
 * Accessible toggle switch with smooth Framer Motion animation.
 * Uses role="switch" with aria-checked for proper semantics.
 */
export function Toggle({
  checked,
  onChange,
  label,
  disabled = false,
  size = "md",
}: ToggleProps) {
  const id = useId();
  const { track, thumb, translate } = sizeMap[size];

  return (
    <div className="flex items-center gap-3">
      <button
        id={id}
        role="switch"
        aria-checked={checked}
        aria-label={label && !label ? label : undefined}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex shrink-0 items-center rounded-full",
          "transition-colors duration-[var(--prism-duration)] ease-[var(--prism-ease)]",
          "focus-ring cursor-pointer",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          track,
          checked ? "bg-primary" : "bg-input"
        )}
      >
        <motion.span
          className={cn("block rounded-full bg-white shadow-sm", thumb)}
          initial={false}
          animate={{ x: checked ? translate : 2 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          aria-hidden="true"
        />
      </button>
      {label && (
        <label
          htmlFor={id}
          className={cn(
            "text-sm font-medium text-foreground cursor-pointer",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {label}
        </label>
      )}
    </div>
  );
}

Toggle.displayName = "Toggle";
`;

// ── Registry ─────────────────────────────────────────────────────────────

interface ComponentEntry {
  dir: string;                // e.g. "Button"
  tsxName: string;            // e.g. "Button.tsx"
  typesName: string;          // e.g. "Button.types.ts"
  tsxContent: string;
  typesContent: string;
}

const COMPONENT_MAP: Record<string, ComponentEntry> = {
  button: {
    dir: "Button",
    tsxName: "Button.tsx",
    typesName: "Button.types.ts",
    tsxContent: BUTTON_TSX,
    typesContent: BUTTON_TYPES,
  },
  badge: {
    dir: "Badge",
    tsxName: "Badge.tsx",
    typesName: "Badge.types.ts",
    tsxContent: BADGE_TSX,
    typesContent: BADGE_TYPES,
  },
  input: {
    dir: "Input",
    tsxName: "Input.tsx",
    typesName: "Input.types.ts",
    tsxContent: INPUT_TSX,
    typesContent: INPUT_TYPES,
  },
  textarea: {
    dir: "Textarea",
    tsxName: "Textarea.tsx",
    typesName: "Textarea.types.ts",
    tsxContent: TEXTAREA_TSX,
    typesContent: TEXTAREA_TYPES,
  },
  card: {
    dir: "Card",
    tsxName: "Card.tsx",
    typesName: "Card.types.ts",
    tsxContent: CARD_TSX,
    typesContent: CARD_TYPES,
  },
  toggle: {
    dir: "Toggle",
    tsxName: "Toggle.tsx",
    typesName: "Toggle.types.ts",
    tsxContent: TOGGLE_TSX,
    typesContent: TOGGLE_TYPES,
  },
};

// ── Public API ────────────────────────────────────────────────────────────

/**
 * Returns ExportFile entries for each used component plus the shared cn utility.
 * Always includes cn.ts since every component depends on it.
 */
export function generateComponentFiles(slugs: Set<string>): ExportFile[] {
  const files: ExportFile[] = [
    { path: "src/utils/cn.ts", content: CN_UTIL },
  ];

  for (const slug of slugs) {
    const entry = COMPONENT_MAP[slug];
    if (!entry) continue; // unknown slug — skip gracefully

    const base = `src/components/${entry.dir}`;
    files.push({ path: `${base}/${entry.tsxName}`, content: entry.tsxContent });
    files.push({ path: `${base}/${entry.typesName}`, content: entry.typesContent });
  }

  return files;
}
