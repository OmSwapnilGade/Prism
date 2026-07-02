import { useState, useRef, cloneElement, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import type { TooltipProps } from "./Tooltip.types";

const positionClasses = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

const animOrigin = {
  top: { y: 4 },
  bottom: { y: -4 },
  left: { x: 4 },
  right: { x: -4 },
};

/**
 * Tooltip that appears on hover/focus with configurable side and delay.
 * Uses `role="tooltip"` and `aria-describedby`.
 */
export function Tooltip({
  children,
  content,
  side = "top",
  delayMs = 300,
}: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tooltipId = useRef(`tooltip-${Math.random().toString(36).slice(2, 8)}`).current;

  const show = useCallback(() => {
    timeoutRef.current = setTimeout(() => setVisible(true), delayMs);
  }, [delayMs]);

  const hide = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setVisible(false);
  }, []);

  const trigger = cloneElement(children as React.ReactElement<any>, {
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
    "aria-describedby": visible ? tooltipId : undefined,
  });

  return (
    <div className="relative inline-flex">
      {trigger}
      <AnimatePresence>
        {visible && (
          <motion.div
            id={tooltipId}
            role="tooltip"
            initial={{ opacity: 0, ...animOrigin[side] }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, ...animOrigin[side] }}
            transition={{ duration: 0.15 }}
            className={cn(
              "absolute z-50 pointer-events-none",
              "px-2.5 py-1.5 text-xs font-medium",
              "rounded-[var(--prism-radius-md)]",
              "bg-foreground text-background",
              "shadow-md whitespace-nowrap",
              positionClasses[side]
            )}
          >
            {content}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

Tooltip.displayName = "Tooltip";
