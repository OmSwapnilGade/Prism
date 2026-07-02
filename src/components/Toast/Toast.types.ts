// Toast typings

export interface ToastData {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "success" | "error" | "warning";
  duration?: number;
}

export interface ToastProps extends ToastData {
  onDismiss: (id: string) => void;
}
