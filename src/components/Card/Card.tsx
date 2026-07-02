import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
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
 * Uses composition pattern: `<Card>`, `<CardHeader>`, `<CardContent>`, `<CardFooter>`.
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
      className={cn(
        "flex flex-col gap-1.5 p-6 pb-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

export const CardContent = forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("p-6", className)}
      {...props}
    >
      {children}
    </div>
  )
);
CardContent.displayName = "CardContent";

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center p-6 pt-0",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = "CardFooter";
