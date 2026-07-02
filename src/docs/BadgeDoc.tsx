import { componentRegistry } from "@/data/componentRegistry";
import { DocPage } from "@/docs/DocPage";
import { Badge } from "@/components/Badge/Badge";

const meta = componentRegistry.find((c) => c.slug === "badge")!;

export function BadgeDoc() {
  return (
    <DocPage
      meta={meta}
      preview={
        <div className="flex flex-wrap items-center gap-3">
          <Badge variant="success">Active</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="error">Failed</Badge>
          <Badge variant="info">New</Badge>
        </div>
      }
    />
  );
}
