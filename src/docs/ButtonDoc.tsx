import { componentRegistry } from "@/data/componentRegistry";
import { DocPage } from "@/docs/DocPage";
import { Button } from "@/components/Button/Button";

const meta = componentRegistry.find((c) => c.slug === "button")!;

export function ButtonDoc() {
  return (
    <DocPage
      meta={meta}
      preview={
        <div className="flex flex-col gap-6 w-full">
          {/* Variants */}
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger">Danger</Button>
            <Button variant="ghost">Ghost</Button>
          </div>

          {/* Sizes */}
          <div className="flex flex-wrap items-center gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>

          {/* States */}
          <div className="flex flex-wrap items-center gap-3">
            <Button loading>Loading</Button>
            <Button disabled>Disabled</Button>
          </div>
        </div>
      }
    />
  );
}
