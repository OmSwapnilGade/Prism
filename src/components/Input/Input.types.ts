import type { VariantProps } from "class-variance-authority";
import type { inputVariants } from "./Input";

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  /** Label text displayed above the input */
  label?: string;
  /** Error message displayed below the input. Also applies error styling. */
  error?: string;
  /** Optional helper text shown below the input when there's no error */
  helperText?: string;
}
