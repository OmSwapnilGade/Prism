import { componentRegistry } from "@/data/componentRegistry";
import { DocPage } from "@/docs/DocPage";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/Card/Card";
import { Button } from "@/components/Button/Button";
import { Badge } from "@/components/Badge/Badge";

const meta = componentRegistry.find((c) => c.slug === "card")!;

export function CardDoc() {
  return (
    <DocPage
      meta={meta}
      preview={
        <div className="grid gap-6 w-full sm:grid-cols-2">
          {/* Full card with all slots */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Project Alpha</h3>
                <Badge variant="success">Active</Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                A next-generation design system
              </p>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                This card demonstrates all three slots: header, content, and
                footer working together in harmony.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="primary" size="sm">
                View Details
              </Button>
            </CardFooter>
          </Card>

          {/* Simple card with padding */}
          <Card padding="md">
            <h3 className="text-lg font-semibold mb-2">Quick Stats</h3>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-primary">2,847</span>
              <span className="text-sm text-muted-foreground">
                components rendered
              </span>
            </div>
          </Card>
        </div>
      }
    />
  );
}
