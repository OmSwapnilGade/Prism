export interface TabItem {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface TabsProps {
  /** The tab items */
  items: TabItem[];
  /** Currently selected tab value */
  value: string;
  /** Callback when tab changes */
  onChange: (value: string) => void;
  /** Content for the selected tab */
  children: React.ReactNode;
}
