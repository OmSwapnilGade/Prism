import { componentRegistry } from "@/data/componentRegistry";
import { DocPage } from "@/docs/DocPage";
import { Textarea } from "@/components/Textarea/Textarea";

const meta = componentRegistry.find((c) => c.slug === "textarea")!;

export function TextareaDoc() {
  return (
    <DocPage
      meta={meta}
      preview={
        <div className="flex flex-col gap-6 w-full max-w-md">
          <Textarea
            label="Message"
            placeholder="Type your message here…"
            helperText="Supports auto-resize to fit content."
            autoResize
          />
          <Textarea
            label="Bio"
            error="Bio must be under 200 characters"
            defaultValue="This is a bio that is way too long and triggers a validation error."
          />
          <Textarea label="Disabled field" disabled placeholder="Cannot edit this" />
        </div>
      }
    />
  );
}
