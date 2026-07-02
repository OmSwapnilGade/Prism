export interface ToggleProps {
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
