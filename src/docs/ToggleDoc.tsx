import { useState } from "react";
import { componentRegistry } from "@/data/componentRegistry";
import { DocPage } from "@/docs/DocPage";
import { Toggle } from "@/components/Toggle/Toggle";

const meta = componentRegistry.find((c) => c.slug === "toggle")!;

export function ToggleDoc() {
  const [basic, setBasic] = useState(false);
  const [sm, setSm] = useState(true);
  const [lg, setLg] = useState(false);

  return (
    <DocPage
      meta={meta}
      preview={
        <div className="flex flex-col gap-6">
          <Toggle
            checked={basic}
            onChange={setBasic}
            label="Enable notifications"
          />
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium text-muted-foreground">Sizes</h3>
            <div className="flex flex-wrap items-center gap-6">
              <Toggle size="sm" checked={sm} onChange={setSm} label="Small" />
              <Toggle size="md" checked={basic} onChange={setBasic} label="Medium" />
              <Toggle size="lg" checked={lg} onChange={setLg} label="Large" />
            </div>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium text-muted-foreground">Disabled</h3>
            <div className="flex flex-wrap items-center gap-6">
              <Toggle checked={true} onChange={() => {}} disabled label="Disabled (on)" />
              <Toggle checked={false} onChange={() => {}} disabled label="Disabled (off)" />
            </div>
          </div>
        </div>
      }
    />
  );
}
