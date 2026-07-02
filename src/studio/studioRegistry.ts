/**
 * Studio Component Registry
 *
 * Structured schema for each component that drives the auto-generated
 * prop editor in Prism Studio. Each prop is categorized and mapped to
 * a specific form control type.
 *
 * Phase 1: Manually maintained, mirroring data from componentRegistry.ts
 * Phase 2+: Auto-generated from CVA source via AST parsing
 */

// ── Schema Types ────────────────────────────────────────────────────────

export type PropCategory = "variant" | "content" | "boolean" | "size";
export type PropControl = "select" | "text" | "textarea" | "toggle" | "number";

export interface StudioPropSchema {
  /** Prop name as it appears in code */
  name: string;
  /** Human-readable label for the form */
  label: string;
  /** Brief description shown as helper text */
  description: string;
  /** What kind of prop this is */
  category: PropCategory;
  /** Which form control to render */
  control: PropControl;
  /** Available options for select controls */
  options?: string[];
  /** Default value */
  defaultValue?: string | boolean | number;
  /** Whether this prop is required */
  required?: boolean;
}

export interface StudioComponentSchema {
  /** URL-safe identifier */
  slug: string;
  /** Display name */
  name: string;
  /** Brief description */
  description: string;
  /** Editable props */
  props: StudioPropSchema[];
  /** Default text content for children */
  defaultChildren?: string;
  /** Import path for code generation */
  importPath: string;
  /** Named exports to import */
  importNames: string[];
  /** Component category for grouping in picker */
  group: "actions" | "forms" | "layout" | "feedback";
}

// ── Component Schemas ───────────────────────────────────────────────────

const buttonSchema: StudioComponentSchema = {
  slug: "button",
  name: "Button",
  description: "Primary interactive element with variants, sizes, and states.",
  group: "actions",
  importPath: "@/components/Button/Button",
  importNames: ["Button"],
  defaultChildren: "Click me",
  props: [
    {
      name: "variant",
      label: "Variant",
      description: "Visual style of the button.",
      category: "variant",
      control: "select",
      options: ["primary", "secondary", "danger", "ghost"],
      defaultValue: "primary",
    },
    {
      name: "size",
      label: "Size",
      description: "Button size.",
      category: "size",
      control: "select",
      options: ["sm", "md", "lg"],
      defaultValue: "md",
    },
    {
      name: "loading",
      label: "Loading",
      description: "Shows a loading spinner and disables the button.",
      category: "boolean",
      control: "toggle",
      defaultValue: false,
    },
    {
      name: "disabled",
      label: "Disabled",
      description: "Disables the button, preventing interaction.",
      category: "boolean",
      control: "toggle",
      defaultValue: false,
    },
    {
      name: "children",
      label: "Label",
      description: "Text content inside the button.",
      category: "content",
      control: "text",
      defaultValue: "Click me",
      required: true,
    },
  ],
};

const badgeSchema: StudioComponentSchema = {
  slug: "badge",
  name: "Badge",
  description: "Small status indicator with semantic color variants.",
  group: "feedback",
  importPath: "@/components/Badge/Badge",
  importNames: ["Badge"],
  defaultChildren: "Status",
  props: [
    {
      name: "variant",
      label: "Variant",
      description: "Semantic color variant.",
      category: "variant",
      control: "select",
      options: ["success", "warning", "error", "info"],
      defaultValue: "info",
    },
    {
      name: "children",
      label: "Text",
      description: "Badge text content.",
      category: "content",
      control: "text",
      defaultValue: "Status",
      required: true,
    },
  ],
};

const inputSchema: StudioComponentSchema = {
  slug: "input",
  name: "Input",
  description: "Text input with label, validation, and error messaging.",
  group: "forms",
  importPath: "@/components/Input/Input",
  importNames: ["Input"],
  props: [
    {
      name: "inputSize",
      label: "Size",
      description: "Input field size.",
      category: "size",
      control: "select",
      options: ["sm", "md", "lg"],
      defaultValue: "md",
    },
    {
      name: "label",
      label: "Label",
      description: "Label text displayed above the input.",
      category: "content",
      control: "text",
      defaultValue: "Label",
    },
    {
      name: "placeholder",
      label: "Placeholder",
      description: "Placeholder text inside the input.",
      category: "content",
      control: "text",
      defaultValue: "Enter text…",
    },
    {
      name: "helperText",
      label: "Helper text",
      description: "Helper text below the input.",
      category: "content",
      control: "text",
    },
    {
      name: "error",
      label: "Error message",
      description: "Error message with error styling.",
      category: "content",
      control: "text",
    },
    {
      name: "disabled",
      label: "Disabled",
      description: "Disables the input.",
      category: "boolean",
      control: "toggle",
      defaultValue: false,
    },
  ],
};

const textareaSchema: StudioComponentSchema = {
  slug: "textarea",
  name: "Textarea",
  description: "Multi-line text input with optional auto-resize.",
  group: "forms",
  importPath: "@/components/Textarea/Textarea",
  importNames: ["Textarea"],
  props: [
    {
      name: "textareaSize",
      label: "Size",
      description: "Textarea size.",
      category: "size",
      control: "select",
      options: ["sm", "md", "lg"],
      defaultValue: "md",
    },
    {
      name: "label",
      label: "Label",
      description: "Label text above the textarea.",
      category: "content",
      control: "text",
      defaultValue: "Message",
    },
    {
      name: "placeholder",
      label: "Placeholder",
      description: "Placeholder text.",
      category: "content",
      control: "text",
      defaultValue: "Type here…",
    },
    {
      name: "helperText",
      label: "Helper text",
      description: "Helper text below the textarea.",
      category: "content",
      control: "text",
    },
    {
      name: "error",
      label: "Error message",
      description: "Error message with error styling.",
      category: "content",
      control: "text",
    },
    {
      name: "autoResize",
      label: "Auto-resize",
      description: "Automatically adjusts height to fit content.",
      category: "boolean",
      control: "toggle",
      defaultValue: false,
    },
    {
      name: "disabled",
      label: "Disabled",
      description: "Disables the textarea.",
      category: "boolean",
      control: "toggle",
      defaultValue: false,
    },
  ],
};

const cardSchema: StudioComponentSchema = {
  slug: "card",
  name: "Card",
  description: "Container with header, content, and footer slots.",
  group: "layout",
  importPath: "@/components/Card/Card",
  importNames: ["Card", "CardHeader", "CardContent", "CardFooter"],
  props: [
    {
      name: "padding",
      label: "Padding",
      description: "Padding applied to the card.",
      category: "variant",
      control: "select",
      options: ["none", "sm", "md", "lg"],
      defaultValue: "none",
    },
    {
      name: "cardTitle",
      label: "Title",
      description: "Card header title text.",
      category: "content",
      control: "text",
      defaultValue: "Card Title",
    },
    {
      name: "cardDescription",
      label: "Description",
      description: "Card header description text.",
      category: "content",
      control: "text",
      defaultValue: "Card description goes here.",
    },
    {
      name: "cardContent",
      label: "Content",
      description: "Main content area text.",
      category: "content",
      control: "textarea",
      defaultValue: "This is the main content area of the card.",
    },
    {
      name: "showFooter",
      label: "Show footer",
      description: "Display the card footer with an action button.",
      category: "boolean",
      control: "toggle",
      defaultValue: true,
    },
  ],
};

const toggleSchema: StudioComponentSchema = {
  slug: "toggle",
  name: "Toggle",
  description: "Accessible toggle switch with spring animation.",
  group: "forms",
  importPath: "@/components/Toggle/Toggle",
  importNames: ["Toggle"],
  props: [
    {
      name: "size",
      label: "Size",
      description: "Toggle size.",
      category: "size",
      control: "select",
      options: ["sm", "md", "lg"],
      defaultValue: "md",
    },
    {
      name: "label",
      label: "Label",
      description: "Accessible label beside the toggle.",
      category: "content",
      control: "text",
      defaultValue: "Enable feature",
    },
    {
      name: "disabled",
      label: "Disabled",
      description: "Disables the toggle.",
      category: "boolean",
      control: "toggle",
      defaultValue: false,
    },
  ],
};

// ── Exported Registry ───────────────────────────────────────────────────

export const studioRegistry: StudioComponentSchema[] = [
  buttonSchema,
  badgeSchema,
  inputSchema,
  textareaSchema,
  cardSchema,
  toggleSchema,
];

/** Look up a component schema by slug */
export function getStudioSchema(slug: string): StudioComponentSchema | undefined {
  return studioRegistry.find((s) => s.slug === slug);
}
