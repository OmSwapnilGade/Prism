import type { VariantProps } from "class-variance-authority";
import type { buttonVariants } from "./Button";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Show a loading spinner and disable the button */
  loading?: boolean;
  /** Content to render inside the button */
  children: React.ReactNode;
}
