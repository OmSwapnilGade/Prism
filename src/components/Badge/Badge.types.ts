import type { VariantProps } from "class-variance-authority";
import type { badgeVariants } from "./Badge";

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  children: React.ReactNode;
}
