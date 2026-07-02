export interface ModalProps {
  /** Whether the modal is open (controlled) */
  open: boolean;
  /** Callback when the modal requests to be closed */
  onClose: () => void;
  /** Accessible title for the modal, used with aria-labelledby */
  title: string;
  /** Optional description shown below the title */
  description?: string;
  /** Content rendered inside the modal body */
  children: React.ReactNode;
  /** Optional footer content (actions, buttons) */
  footer?: React.ReactNode;
}
