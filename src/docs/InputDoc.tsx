import { componentRegistry } from "@/data/componentRegistry";
import { DocPage } from "@/docs/DocPage";
import { Input } from "@/components/Input/Input";

const meta = componentRegistry.find((c) => c.slug === "input")!;

export function InputDoc() {
  return (
    <DocPage
      meta={meta}
      preview={
        <div className="flex flex-col gap-6 w-full max-w-md">
          <Input
            label="Email address"
            placeholder="you@example.com"
            helperText="We'll never share your email."
          />
          <Input
            label="Username"
            error="Username is already taken"
            defaultValue="johndoe"
          />
          <Input label="Disabled field" disabled placeholder="Cannot edit" />
          <div className="flex gap-3">
            <Input label="Small" inputSize="sm" placeholder="sm" />
            <Input label="Large" inputSize="lg" placeholder="lg" />
          </div>
        </div>
      }
    />
  );
}
