export interface DropdownItem {
  label: string;
  value: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
}

export interface DropdownMenuProps {
  /** The trigger element */
  trigger: React.ReactNode;
  /** Menu items */
  items: DropdownItem[];
  /** Callback when an item is selected */
  onSelect: (value: string) => void;
  /** Alignment relative to trigger */
  align?: "left" | "right";
}
