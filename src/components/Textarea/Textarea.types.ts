import type { VariantProps } from "class-variance-authority";
import type { textareaVariants } from "./Textarea";

export interface TextareaProps
  extends Omit<React.TextareaHTMLAttributes<HTMLTextAreaElement>, "size">,
    VariantProps<typeof textareaVariants> {
  /** Label text displayed above the textarea */
  label?: string;
  /** Error message displayed below the textarea */
  error?: string;
  /** Helper text shown when there's no error */
  helperText?: string;
  /** Enable auto-resize based on content */
  autoResize?: boolean;
}
