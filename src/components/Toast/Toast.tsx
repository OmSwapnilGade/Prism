import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cva } from "class-variance-authority";
import { cn } from "@/utils/cn";
import type { ToastData, ToastProps } from "./Toast.types";

export const toastVariants = cva(
  [
    "relative flex items-start gap-3 w-full max-w-sm p-4",
    "rounded-[var(--prism-radius-lg)]",
    "border shadow-lg",
    "transition-colors duration-[var(--prism-duration)]",
  ].join(" "),
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground border-border",
        success: "bg-success/10 text-success border-success/25",
        error: "bg-destructive/10 text-destructive border-destructive/25",
        warning: "bg-warning/10 text-warning border-warning/25",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

// ── Single Toast ────────────────────────────────────────────────────────

function Toast({ id, title, description, variant = "default", onDismiss }: ToastProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 50, scale: 0.95 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className={cn(toastVariants({ variant }))}
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold">{title}</p>
        {description && (
          <p className="mt-1 text-xs opacity-80">{description}</p>
        )}
      </div>
      <button
        onClick={() => onDismiss(id)}
        className="shrink-0 p-0.5 rounded-[var(--prism-radius-sm)] hover:bg-black/10 transition-colors focus-ring cursor-pointer"
        aria-label="Dismiss notification"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 6 6 18"/><path d="m6 6 12 12"/>
        </svg>
      </button>
    </motion.div>
  );
}

// ── Toast Context & Provider ────────────────────────────────────────────

interface ToastContextValue {
  toast: (data: Omit<ToastData, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastData[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timersRef.current.delete(id);
    }
  }, []);

  const toast = useCallback(
    (data: Omit<ToastData, "id">) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const duration = data.duration ?? 5000;

      setToasts((prev) => [...prev, { ...data, id }]);

      const timer = setTimeout(() => {
        dismiss(id);
      }, duration);
      timersRef.current.set(id, timer);
    },
    [dismiss]
  );

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => clearTimeout(timer));
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toast, dismiss }}>
      {children}

      {/* Toast container — uses aria-live for screen readers */}
      <div
        aria-live="polite"
        aria-label="Notifications"
        className="fixed bottom-4 right-4 z-[100] flex flex-col-reverse gap-2 max-w-sm"
      >
        <AnimatePresence mode="popLayout">
          {toasts.map((t) => (
            <Toast key={t.id} {...t} onDismiss={dismiss} />
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

/**
 * Hook to create toast notifications.
 * Must be used within a `<ToastProvider>`.
 */
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
