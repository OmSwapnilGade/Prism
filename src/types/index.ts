/** Shared TypeScript types for Prism design system */

export type Theme = "light" | "dark" | "ocean" | "forest";

export const THEMES: { value: Theme; label: string }[] = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "ocean", label: "Ocean" },
  { value: "forest", label: "Forest" },
];


export interface ComponentProp {
  name: string;
  type: string;
  default?: string;
  required?: boolean;
  description: string;
}

export interface ComponentMeta {
  name: string;
  slug: string;
  description: string;
  props: ComponentProp[];
  usage: string;
}
