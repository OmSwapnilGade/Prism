/**
 * Component Renderer
 *
 * Maps component slugs to real Prism components and renders them
 * with dynamic prop values from the studio state.
 *
 * Stateful components (Toggle) get self-contained wrappers that
 * manage their own controlled state.
 */

import { useState } from "react";
import { Button } from "@/components/Button/Button";
import { Badge } from "@/components/Badge/Badge";
import { Input } from "@/components/Input/Input";
import { Textarea } from "@/components/Textarea/Textarea";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/Card/Card";
import { Toggle } from "@/components/Toggle/Toggle";

interface RendererProps {
  slug: string;
  propValues: Record<string, unknown>;
}

// ── Toggle wrapper (needs controlled state) ─────────────────────────────

function ToggleRenderer({ propValues }: { propValues: Record<string, unknown> }) {
  const [checked, setChecked] = useState(false);

  return (
    <Toggle
      checked={checked}
      onChange={setChecked}
      label={propValues["label"] as string | undefined}
      size={propValues["size"] as "sm" | "md" | "lg" | undefined}
      disabled={propValues["disabled"] as boolean | undefined}
    />
  );
}

// ── Card wrapper (composed component) ───────────────────────────────────

function CardRenderer({ propValues }: { propValues: Record<string, unknown> }) {
  const padding = propValues["padding"] as "none" | "sm" | "md" | "lg" | undefined;
  const title = propValues["cardTitle"] as string | undefined;
  const description = propValues["cardDescription"] as string | undefined;
  const content = propValues["cardContent"] as string | undefined;
  const showFooter = propValues["showFooter"] as boolean;

  return (
    <Card padding={padding} className="w-full max-w-sm">
      {(title || description) && (
        <CardHeader>
          {title && (
            <h3 className="text-lg font-semibold">{title}</h3>
          )}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </CardHeader>
      )}
      {content && (
        <CardContent>
          <p>{content}</p>
        </CardContent>
      )}
      {showFooter && (
        <CardFooter>
          <Button variant="primary" size="sm">
            Action
          </Button>
        </CardFooter>
      )}
    </Card>
  );
}

// ── Main Renderer ───────────────────────────────────────────────────────

export function ComponentRenderer({ slug, propValues }: RendererProps) {
  switch (slug) {
    case "button":
      return (
        <Button
          variant={propValues["variant"] as "primary" | "secondary" | "danger" | "ghost" | undefined}
          size={propValues["size"] as "sm" | "md" | "lg" | undefined}
          loading={propValues["loading"] as boolean | undefined}
          disabled={propValues["disabled"] as boolean | undefined}
        >
          {(propValues["children"] as string) || "Button"}
        </Button>
      );

    case "badge":
      return (
        <Badge
          variant={propValues["variant"] as "success" | "warning" | "error" | "info" | undefined}
        >
          {(propValues["children"] as string) || "Badge"}
        </Badge>
      );

    case "input":
      return (
        <div className="w-full max-w-sm">
          <Input
            inputSize={propValues["inputSize"] as "sm" | "md" | "lg" | undefined}
            label={propValues["label"] as string | undefined}
            placeholder={propValues["placeholder"] as string | undefined}
            helperText={propValues["helperText"] as string | undefined}
            error={propValues["error"] as string | undefined}
            disabled={propValues["disabled"] as boolean | undefined}
          />
        </div>
      );

    case "textarea":
      return (
        <div className="w-full max-w-sm">
          <Textarea
            textareaSize={propValues["textareaSize"] as "sm" | "md" | "lg" | undefined}
            label={propValues["label"] as string | undefined}
            placeholder={propValues["placeholder"] as string | undefined}
            helperText={propValues["helperText"] as string | undefined}
            error={propValues["error"] as string | undefined}
            autoResize={propValues["autoResize"] as boolean | undefined}
            disabled={propValues["disabled"] as boolean | undefined}
          />
        </div>
      );

    case "card":
      return <CardRenderer propValues={propValues} />;

    case "toggle":
      return <ToggleRenderer propValues={propValues} />;

    default:
      return (
        <p className="text-muted-foreground text-sm">
          Component "{slug}" is not available in the studio yet.
        </p>
      );
  }
}
