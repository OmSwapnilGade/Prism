import { useState } from "react";
import { componentRegistry } from "@/data/componentRegistry";
import { DocPage } from "@/docs/DocPage";
import { Modal } from "@/components/Modal/Modal";
import { Button } from "@/components/Button/Button";

const meta = componentRegistry.find((c) => c.slug === "modal")!;

export function ModalDoc() {
  const [basicOpen, setBasicOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <>
      <DocPage
        meta={meta}
        preview={
          <div className="flex flex-wrap items-center gap-3">
            <Button onClick={() => setBasicOpen(true)}>Open Basic Modal</Button>
            <Button variant="danger" onClick={() => setConfirmOpen(true)}>
              Open Confirm Dialog
            </Button>
          </div>
        }
      />

      {/* Basic Modal */}
      <Modal
        open={basicOpen}
        onClose={() => setBasicOpen(false)}
        title="Welcome to Prism"
        description="This is a basic modal with a title, description, and body content."
      >
        <p className="text-sm text-muted-foreground">
          Try pressing <kbd className="px-1.5 py-0.5 bg-muted rounded-[var(--prism-radius-sm)] text-xs font-mono">Escape</kbd> to close,
          or <kbd className="px-1.5 py-0.5 bg-muted rounded-[var(--prism-radius-sm)] text-xs font-mono">Tab</kbd> to cycle through focusable elements.
          Focus is trapped within the dialog.
        </p>
      </Modal>

      {/* Confirm Dialog */}
      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Delete Component?"
        description="This action cannot be undone. The component and all its variants will be permanently removed."
        footer={
          <>
            <Button variant="ghost" onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={() => setConfirmOpen(false)}>
              Delete
            </Button>
          </>
        }
      >
        <p className="text-sm text-muted-foreground">
          You are about to delete <strong className="text-foreground">Button</strong> and all 4 of its
          variants. This will affect 12 pages across your documentation.
        </p>
      </Modal>
    </>
  );
}
