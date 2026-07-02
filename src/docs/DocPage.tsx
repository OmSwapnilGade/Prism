import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "@/hooks/useTheme";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import type { ComponentMeta } from "@/types";
import { cn } from "@/utils/cn";

// ── Reusable sub-components for every doc page ──────────────────────────

function PropsTable({ props }: { props: ComponentMeta["props"] }) {
  return (
    <div className="overflow-x-auto rounded-[var(--prism-radius-lg)] border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-3 text-left font-semibold text-foreground">
              Prop
            </th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">
              Type
            </th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">
              Default
            </th>
            <th className="px-4 py-3 text-left font-semibold text-foreground hidden sm:table-cell">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr
              key={prop.name}
              className="border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors"
            >
              <td className="px-4 py-3">
                <code className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded-[var(--prism-radius-sm)] text-primary">
                  {prop.name}
                </code>
                {prop.required && (
                  <span className="ml-1 text-destructive text-xs">*</span>
                )}
              </td>
              <td className="px-4 py-3">
                <code className="text-xs font-mono text-muted-foreground">
                  {prop.type}
                </code>
              </td>
              <td className="px-4 py-3 text-muted-foreground text-xs font-mono">
                {prop.default ?? "—"}
              </td>
              <td className="px-4 py-3 text-muted-foreground text-xs hidden sm:table-cell">
                {prop.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CodeSnippet({ code }: { code: string }) {
  const { theme } = useTheme();
  const { copied, copyToClipboard } = useCopyToClipboard();

  const prismTheme = theme === "dark" ? themes.nightOwl : themes.nightOwlLight;

  return (
    <div className="relative group">
      <button
        onClick={() => copyToClipboard(code)}
        className={cn(
          "absolute top-3 right-3 z-10",
          "px-2.5 py-1.5 text-xs font-medium",
          "rounded-[var(--prism-radius-md)]",
          "bg-muted/80 backdrop-blur-sm",
          "text-muted-foreground hover:text-foreground",
          "border border-border",
          "opacity-0 group-hover:opacity-100 focus:opacity-100",
          "transition-all duration-[var(--prism-duration)]",
          "focus-ring cursor-pointer"
        )}
        aria-label={copied ? "Copied!" : "Copy code"}
      >
        {copied ? (
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>
            Copied
          </span>
        ) : (
          <span className="flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect width="14" height="14" x="8" y="8" rx="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
            Copy
          </span>
        )}
      </button>
      <Highlight theme={prismTheme} code={code.trim()} language="tsx">
        {({ style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className="code-block p-4 overflow-x-auto !bg-code-bg"
            style={{ ...style, backgroundColor: undefined }}
          >
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line })}>
                <span className="inline-block w-8 text-right mr-4 text-muted-foreground/50 select-none text-xs">
                  {i + 1}
                </span>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}

// ── Shared Doc Page Layout ──────────────────────────────────────────────

interface DocPageProps {
  meta: ComponentMeta;
  preview: React.ReactNode;
}

export function DocPage({ meta, preview }: DocPageProps) {
  return (
    <div className="space-y-10">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {meta.name}
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">{meta.description}</p>
      </div>

      {/* Live Preview */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Preview
        </h2>
        <div
          className={cn(
            "rounded-[var(--prism-radius-xl)] border border-border",
            "bg-background p-8",
            "flex flex-wrap items-center justify-center gap-4"
          )}
        >
          {preview}
        </div>
      </section>

      {/* Usage */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Usage
        </h2>
        <CodeSnippet code={meta.usage} />
      </section>

      {/* Props Table */}
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-4">
          Props
        </h2>
        <PropsTable props={meta.props} />
      </section>
    </div>
  );
}

// ── Individual Doc Pages ────────────────────────────────────────────────

export { ButtonDoc } from "@/docs/ButtonDoc";
export { InputDoc } from "@/docs/InputDoc";
export { CardDoc } from "@/docs/CardDoc";
export { BadgeDoc } from "@/docs/BadgeDoc";
export { ModalDoc } from "@/docs/ModalDoc";
