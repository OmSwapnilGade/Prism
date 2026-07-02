import { componentRegistry } from "@/data/componentRegistry";
import { DocPage } from "@/docs/DocPage";
import { DropdownMenu } from "@/components/DropdownMenu/DropdownMenu";
import { Button } from "@/components/Button/Button";
import { useToast } from "@/components/Toast/Toast";

const meta = componentRegistry.find((c) => c.slug === "dropdown-menu")!;

export function DropdownMenuDoc() {
  const { toast } = useToast();

  const handleSelect = (value: string) => {
    toast({
      title: "Action selected",
      description: `You selected the "${value}" action.`,
    });
  };

  return (
    <DocPage
      meta={meta}
      preview={
        <div className="flex flex-wrap items-center justify-center gap-20 w-full h-40">
          <DropdownMenu
            trigger={<Button variant="secondary">Open Menu</Button>}
            onSelect={handleSelect}
            items={[
              { label: "Profile", value: "profile" },
              { label: "Billing", value: "billing" },
              { label: "Settings", value: "settings" },
              { label: "Team (coming soon)", value: "team", disabled: true },
              { label: "Delete Account", value: "delete", danger: true },
            ]}
          />

          <DropdownMenu
            align="right"
            trigger={<Button variant="ghost">Right Aligned</Button>}
            onSelect={handleSelect}
            items={[
              { label: "Duplicate", value: "duplicate" },
              { label: "Archive", value: "archive" },
              { label: "Share", value: "share" },
            ]}
          />
        </div>
      }
    />
  );
}
