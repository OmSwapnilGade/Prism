import { useId } from "react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import type { ToggleProps } from "./Toggle.types";

const sizeMap = {
  sm: { track: "w-8 h-4", thumb: "w-3 h-3", translate: 16 },
  md: { track: "w-11 h-6", thumb: "w-4.5 h-4.5", translate: 20 },
  lg: { track: "w-14 h-7", thumb: "w-5.5 h-5.5", translate: 28 },
};

/**
 * Accessible toggle switch with smooth Framer Motion animation.
 * Uses `role="switch"` with `aria-checked` for proper semantics.
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
          className={cn(
            "block rounded-full bg-white shadow-sm",
            thumb
          )}
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
