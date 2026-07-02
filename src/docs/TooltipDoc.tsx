import { componentRegistry } from "@/data/componentRegistry";
import { DocPage } from "@/docs/DocPage";
import { Tooltip } from "@/components/Tooltip/Tooltip";
import { Button } from "@/components/Button/Button";

const meta = componentRegistry.find((c) => c.slug === "tooltip")!;

export function TooltipDoc() {
  return (
    <DocPage
      meta={meta}
      preview={
        <div className="flex flex-col items-center gap-12 w-full my-8">
          <div className="flex gap-8">
            <Tooltip content="Tooltip on Top" side="top">
              <Button variant="secondary">Top</Button>
            </Tooltip>
            
            <Tooltip content="Tooltip on Bottom" side="bottom">
              <Button variant="secondary">Bottom</Button>
            </Tooltip>
          </div>

          <div className="flex gap-8">
            <Tooltip content="Tooltip on Left" side="left">
              <Button variant="secondary">Left</Button>
            </Tooltip>

            <Tooltip content="Tooltip on Right" side="right">
              <Button variant="secondary">Right</Button>
            </Tooltip>
          </div>

          <div className="mt-8">
            <Tooltip content="This took 1 second to appear" delayMs={1000}>
              <span className="text-sm font-medium border-b border-dashed border-muted-foreground/50 cursor-help">
                Hover me for 1 second
              </span>
            </Tooltip>
          </div>
        </div>
      }
    />
  );
}
