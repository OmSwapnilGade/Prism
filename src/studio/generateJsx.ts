/**
 * JSX Code Generator
 *
 * Pure function that takes a component schema + prop values and produces
 * a clean, idiomatic JSX string. Only includes non-default props.
 */

import type { StudioComponentSchema } from "./studioRegistry";

interface GenerateOptions {
  schema: StudioComponentSchema;
  propValues: Record<string, unknown>;
}

/**
 * Generate a clean JSX snippet from the current studio state.
 * - Omits props that match their default value
 * - Formats booleans as bare attributes
 * - Handles children as JSX content between tags
 */
export function generateJsx({ schema, propValues }: GenerateOptions): string {
  // Special handling for Card — it's a composed component
  if (schema.slug === "card") {
    return generateCardJsx(schema, propValues);
  }

  // Special handling for Toggle — needs controlled state boilerplate
  if (schema.slug === "toggle") {
    return generateToggleJsx(schema, propValues);
  }

  const componentName = schema.importNames[0];
  const children = propValues["children"] as string | undefined;
  const attrs = buildAttributes(schema, propValues, ["children"]);

  if (children) {
    if (attrs.length === 0) {
      return `<${componentName}>${children}</${componentName}>`;
    }
    const attrStr = formatAttributes(attrs);
    if (attrStr.length + componentName.length + children.length < 70) {
      return `<${componentName}${attrStr}>${children}</${componentName}>`;
    }
    return `<${componentName}\n${indentAttributes(attrs)}\n>\n  ${children}\n</${componentName}>`;
  }

  // Self-closing for void-content components (Input, Textarea)
  if (attrs.length === 0) {
    return `<${componentName} />`;
  }
  const attrStr = formatAttributes(attrs);
  if (attrStr.length + componentName.length < 70) {
    return `<${componentName}${attrStr} />`;
  }
  return `<${componentName}\n${indentAttributes(attrs)}\n/>`;
}

// ── Card-specific generator ─────────────────────────────────────────────

function generateCardJsx(
  schema: StudioComponentSchema,
  propValues: Record<string, unknown>
): string {
  const padding = propValues["padding"] as string | undefined;
  const title = (propValues["cardTitle"] as string) || "";
  const description = (propValues["cardDescription"] as string) || "";
  const content = (propValues["cardContent"] as string) || "";
  const showFooter = propValues["showFooter"] as boolean;

  const paddingDefault = schema.props.find((p) => p.name === "padding")?.defaultValue;
  const paddingAttr =
    padding && padding !== paddingDefault ? ` padding="${padding}"` : "";

  const lines: string[] = [];
  lines.push(`<Card${paddingAttr}>`);

  if (title || description) {
    lines.push(`  <CardHeader>`);
    if (title) {
      lines.push(`    <h3 className="text-lg font-semibold">${title}</h3>`);
    }
    if (description) {
      lines.push(`    <p className="text-sm text-muted-foreground">`);
      lines.push(`      ${description}`);
      lines.push(`    </p>`);
    }
    lines.push(`  </CardHeader>`);
  }

  if (content) {
    lines.push(`  <CardContent>`);
    lines.push(`    <p>${content}</p>`);
    lines.push(`  </CardContent>`);
  }

  if (showFooter) {
    lines.push(`  <CardFooter>`);
    lines.push(`    <Button variant="primary" size="sm">Action</Button>`);
    lines.push(`  </CardFooter>`);
  }

  lines.push(`</Card>`);
  return lines.join("\n");
}

// ── Toggle-specific generator ───────────────────────────────────────────

function generateToggleJsx(
  schema: StudioComponentSchema,
  propValues: Record<string, unknown>
): string {
  const attrs = buildAttributes(schema, propValues, []);
  const controlledAttrs = [
    { name: "checked", value: "{enabled}" },
    { name: "onChange", value: "{setEnabled}" },
    ...attrs,
  ];

  const attrStr = controlledAttrs.map((a) => `  ${a.name}=${a.value}`).join("\n");
  const boilerplate = `const [enabled, setEnabled] = useState(false);\n\n`;
  return boilerplate + `<Toggle\n${attrStr}\n/>`;
}

// ── Attribute helpers ───────────────────────────────────────────────────

interface Attribute {
  name: string;
  value: string;
}

/**
 * Build an array of JSX attributes, excluding defaults and specified skip keys.
 */
function buildAttributes(
  schema: StudioComponentSchema,
  propValues: Record<string, unknown>,
  skipKeys: string[]
): Attribute[] {
  const attrs: Attribute[] = [];

  for (const prop of schema.props) {
    if (skipKeys.includes(prop.name)) continue;

    const value = propValues[prop.name];
    const defaultVal = prop.defaultValue;

    // Skip if value matches default or is empty
    if (value === defaultVal) continue;
    if (value === undefined || value === null || value === "") continue;

    if (typeof value === "boolean") {
      if (value) {
        attrs.push({ name: prop.name, value: "" }); // bare attribute
      }
      // false booleans are omitted (they're the default)
    } else if (typeof value === "number") {
      attrs.push({ name: prop.name, value: `{${value}}` });
    } else {
      attrs.push({ name: prop.name, value: `"${value}"` });
    }
  }

  return attrs;
}

/** Format attributes for inline rendering */
function formatAttributes(attrs: Attribute[]): string {
  return attrs
    .map((a) => (a.value === "" ? ` ${a.name}` : ` ${a.name}=${a.value}`))
    .join("");
}

/** Format attributes for multi-line rendering */
function indentAttributes(attrs: Attribute[]): string {
  return attrs
    .map((a) => (a.value === "" ? `  ${a.name}` : `  ${a.name}=${a.value}`))
    .join("\n");
}
