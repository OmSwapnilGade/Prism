import type { ComponentMeta } from "@/types";

export const componentRegistry: ComponentMeta[] = [
  {
    name: "Button",
    slug: "button",
    description:
      "Primary interactive element with multiple variants, sizes, and states. Supports loading spinner and disabled state with full keyboard accessibility.",
    props: [
      {
        name: "variant",
        type: '"primary" | "secondary" | "danger" | "ghost"',
        default: '"primary"',
        required: false,
        description: "The visual style of the button.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        required: false,
        description: "The size of the button.",
      },
      {
        name: "loading",
        type: "boolean",
        default: "false",
        required: false,
        description:
          "Shows a loading spinner and disables the button.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        required: false,
        description: "Disables the button, preventing interaction.",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Content to render inside the button.",
      },
    ],
    usage: `<Button variant="primary" size="md">
  Click me
</Button>

<Button variant="danger" size="sm">
  Delete
</Button>

<Button variant="ghost" loading>
  Saving...
</Button>`,
  },
  {
    name: "Input",
    slug: "input",
    description:
      "Text input with optional label, validation state, error messaging, and helper text. Labels are auto-linked to inputs for accessibility.",
    props: [
      {
        name: "label",
        type: "string",
        required: false,
        description: "Label text displayed above the input.",
      },
      {
        name: "error",
        type: "string",
        required: false,
        description:
          "Error message. When set, applies error styling and aria-invalid.",
      },
      {
        name: "helperText",
        type: "string",
        required: false,
        description:
          "Helper text shown below the input when there is no error.",
      },
      {
        name: "inputSize",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        required: false,
        description: "The size of the input field.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        required: false,
        description: "Disables the input.",
      },
    ],
    usage: `<Input
  label="Email address"
  placeholder="you@example.com"
  helperText="We'll never share your email."
/>

<Input
  label="Username"
  error="Username is already taken"
  defaultValue="johndoe"
/>`,
  },
  {
    name: "Card",
    slug: "card",
    description:
      "Versatile container with header, content, and footer slots. Uses a composition pattern for flexible layouts.",
    props: [
      {
        name: "padding",
        type: '"none" | "sm" | "md" | "lg"',
        default: '"none"',
        required: false,
        description: "Padding applied to the entire card.",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Card content — use CardHeader, CardContent, CardFooter.",
      },
    ],
    usage: `<Card>
  <CardHeader>
    <h3 className="text-lg font-semibold">Card Title</h3>
    <p className="text-sm text-muted-foreground">
      Card description goes here
    </p>
  </CardHeader>
  <CardContent>
    <p>This is the main content area.</p>
  </CardContent>
  <CardFooter>
    <Button variant="primary" size="sm">Action</Button>
  </CardFooter>
</Card>`,
  },
  {
    name: "Badge",
    slug: "badge",
    description:
      "Small status indicator for labeling, categorizing, or showing state. Available in four semantic variants.",
    props: [
      {
        name: "variant",
        type: '"success" | "warning" | "error" | "info"',
        default: '"info"',
        required: false,
        description: "The semantic color variant of the badge.",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "The content of the badge (text or icon).",
      },
    ],
    usage: `<Badge variant="success">Active</Badge>
<Badge variant="warning">Pending</Badge>
<Badge variant="error">Failed</Badge>
<Badge variant="info">New</Badge>`,
  },
  {
    name: "Modal",
    slug: "modal",
    description:
      "Accessible dialog overlay with focus trap, Escape-to-close, and animated enter/exit transitions. Returns focus to the trigger element on close.",
    props: [
      {
        name: "open",
        type: "boolean",
        required: true,
        description: "Controls whether the modal is visible.",
      },
      {
        name: "onClose",
        type: "() => void",
        required: true,
        description: "Called when the modal requests to be closed.",
      },
      {
        name: "title",
        type: "string",
        required: true,
        description:
          "Accessible title displayed in the modal header. Used for aria-labelledby.",
      },
      {
        name: "description",
        type: "string",
        required: false,
        description: "Optional description shown below the title.",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Content rendered inside the modal body.",
      },
      {
        name: "footer",
        type: "ReactNode",
        required: false,
        description:
          "Optional footer content, typically action buttons.",
      },
    ],
    usage: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>
  Open Modal
</Button>

<Modal
  open={open}
  onClose={() => setOpen(false)}
  title="Confirm Action"
  description="This action cannot be undone."
  footer={
    <>
      <Button variant="ghost" onClick={() => setOpen(false)}>
        Cancel
      </Button>
      <Button variant="danger">Delete</Button>
    </>
  }
>
  <p>Are you sure you want to proceed?</p>
</Modal>`,
  },
  {
    name: "Textarea",
    slug: "textarea",
    description:
      "Multi-line text input with optional auto-resize, label, validation state, and error messaging. Height adjusts dynamically to fit content.",
    props: [
      {
        name: "label",
        type: "string",
        required: false,
        description: "Label text displayed above the textarea.",
      },
      {
        name: "error",
        type: "string",
        required: false,
        description: "Error message with error styling.",
      },
      {
        name: "helperText",
        type: "string",
        required: false,
        description: "Helper text shown when there's no error.",
      },
      {
        name: "autoResize",
        type: "boolean",
        default: "false",
        required: false,
        description: "Automatically adjusts height based on content.",
      },
      {
        name: "textareaSize",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        required: false,
        description: "The size of the textarea.",
      },
    ],
    usage: `<Textarea
  label="Message"
  placeholder="Type your message…"
  autoResize
  helperText="Markdown is supported."
/>

<Textarea
  label="Bio"
  error="Bio must be under 200 characters"
  defaultValue="This is too long..."
/>`,
  },
  {
    name: "Toggle",
    slug: "toggle",
    description:
      "Accessible toggle switch with smooth spring animation. Uses role=\"switch\" with aria-checked for proper semantics.",
    props: [
      {
        name: "checked",
        type: "boolean",
        required: true,
        description: "Controlled checked state.",
      },
      {
        name: "onChange",
        type: "(checked: boolean) => void",
        required: true,
        description: "Callback when the toggle is flipped.",
      },
      {
        name: "label",
        type: "string",
        required: false,
        description: "Accessible label rendered beside the toggle.",
      },
      {
        name: "size",
        type: '"sm" | "md" | "lg"',
        default: '"md"',
        required: false,
        description: "Size of the toggle switch.",
      },
      {
        name: "disabled",
        type: "boolean",
        default: "false",
        required: false,
        description: "Disables the toggle.",
      },
    ],
    usage: `const [enabled, setEnabled] = useState(false);

<Toggle
  checked={enabled}
  onChange={setEnabled}
  label="Enable notifications"
/>`,
  },
  {
    name: "Tabs",
    slug: "tabs",
    description:
      "Accessible tab component with animated active indicator. Supports keyboard navigation with arrow keys, Home, and End.",
    props: [
      {
        name: "items",
        type: "TabItem[]",
        required: true,
        description: "Array of tab items with value, label, and optional disabled.",
      },
      {
        name: "value",
        type: "string",
        required: true,
        description: "Currently selected tab value.",
      },
      {
        name: "onChange",
        type: "(value: string) => void",
        required: true,
        description: "Callback when a tab is selected.",
      },
      {
        name: "children",
        type: "ReactNode",
        required: true,
        description: "Content for the active tab panel.",
      },
    ],
    usage: `const [tab, setTab] = useState("preview");

<Tabs
  items={[
    { value: "preview", label: "Preview" },
    { value: "code", label: "Code" },
    { value: "api", label: "API" },
  ]}
  value={tab}
  onChange={setTab}
>
  {tab === "preview" && <p>Preview content</p>}
  {tab === "code" && <p>Code content</p>}
  {tab === "api" && <p>API content</p>}
</Tabs>`,
  },
  {
    name: "Dropdown Menu",
    slug: "dropdown-menu",
    description:
      "Accessible dropdown menu with keyboard navigation. Supports arrow keys, Enter to select, and Escape to close.",
    props: [
      {
        name: "trigger",
        type: "ReactNode",
        required: true,
        description: "The element that opens the menu on click.",
      },
      {
        name: "items",
        type: "DropdownItem[]",
        required: true,
        description: "Array of menu items with label, value, icon, disabled, and danger.",
      },
      {
        name: "onSelect",
        type: "(value: string) => void",
        required: true,
        description: "Callback when an item is selected.",
      },
      {
        name: "align",
        type: '"left" | "right"',
        default: '"left"',
        required: false,
        description: "Alignment of the menu relative to the trigger.",
      },
    ],
    usage: `<DropdownMenu
  trigger={<Button variant="secondary">Actions</Button>}
  items={[
    { label: "Edit", value: "edit" },
    { label: "Duplicate", value: "duplicate" },
    { label: "Delete", value: "delete", danger: true },
  ]}
  onSelect={(value) => console.log(value)}
/>`,
  },
  {
    name: "Tooltip",
    slug: "tooltip",
    description:
      "Informational tooltip that appears on hover or focus. Configurable placement and delay with smooth animation.",
    props: [
      {
        name: "children",
        type: "ReactElement",
        required: true,
        description: "The element that triggers the tooltip.",
      },
      {
        name: "content",
        type: "string",
        required: true,
        description: "The tooltip text.",
      },
      {
        name: "side",
        type: '"top" | "bottom" | "left" | "right"',
        default: '"top"',
        required: false,
        description: "Placement of the tooltip.",
      },
      {
        name: "delayMs",
        type: "number",
        default: "300",
        required: false,
        description: "Delay before the tooltip appears (ms).",
      },
    ],
    usage: `<Tooltip content="Save changes" side="top">
  <Button>Save</Button>
</Tooltip>

<Tooltip content="More info" side="right" delayMs={500}>
  <span>Hover me</span>
</Tooltip>`,
  },
  {
    name: "Toast",
    slug: "toast",
    description:
      "Non-blocking notification system. Supports multiple variants, auto-dismiss, and aria-live for screen readers. Uses a context provider pattern.",
    props: [
      {
        name: "title",
        type: "string",
        required: true,
        description: "The main notification message.",
      },
      {
        name: "description",
        type: "string",
        required: false,
        description: "Optional secondary message.",
      },
      {
        name: "variant",
        type: '"default" | "success" | "error" | "warning"',
        default: '"default"',
        required: false,
        description: "Visual variant of the toast.",
      },
      {
        name: "duration",
        type: "number",
        default: "5000",
        required: false,
        description: "Auto-dismiss duration in milliseconds.",
      },
    ],
    usage: `const { toast } = useToast();

<Button onClick={() => toast({
  title: "Changes saved",
  description: "Your profile has been updated.",
  variant: "success",
})}>
  Show Toast
</Button>`,
  },
];
