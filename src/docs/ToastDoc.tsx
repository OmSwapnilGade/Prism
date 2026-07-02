import { componentRegistry } from "@/data/componentRegistry";
import { DocPage } from "@/docs/DocPage";
import { Button } from "@/components/Button/Button";
import { useToast } from "@/components/Toast/Toast";

const meta = componentRegistry.find((c) => c.slug === "toast")!;

export function ToastDoc() {
  const { toast } = useToast();

  return (
    <DocPage
      meta={meta}
      preview={
        <div className="flex flex-wrap items-center gap-4">
          <Button
            onClick={() =>
              toast({
                title: "Draft saved",
                description: "Your draft has been saved to the server.",
              })
            }
          >
            Default
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              toast({
                title: "Profile updated successfully",
                description: "Your profile is now live for everyone to see.",
                variant: "success",
              })
            }
          >
            Success
          </Button>

          <Button
            variant="danger"
            onClick={() =>
              toast({
                title: "Failed to delete item",
                description: "The item could not be deleted. Please try again.",
                variant: "error",
              })
            }
          >
            Error
          </Button>

          <Button
            variant="ghost"
            onClick={() =>
              toast({
                title: "Storage limit nearing",
                description: "You have used 90% of your storage quota.",
                variant: "warning",
                duration: 8000,
              })
            }
          >
            Warning
          </Button>
        </div>
      }
    />
  );
}
