/**
 * Code Preview
 *
 * Syntax-highlighted JSX code output with copy-to-clipboard.
 * Reuses the existing prism-react-renderer and useCopyToClipboard hook.
 */

import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "@/hooks/useTheme";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "@/utils/cn";
import type { StudioComponentSchema } from "./studioRegistry";

interface CodePreviewProps {
  code: string;
  schema?: StudioComponentSchema | null;
}

/** Build the import statement for the generated code */
function buildImportLine(schema: StudioComponentSchema): string {
  const names = schema.importNames.join(", ");
  return `import { ${names} } from "${schema.importPath}";`;
}

export function CodePreview({ code, schema }: CodePreviewProps) {
  const { theme } = useTheme();
  const { copied, copyToClipboard } = useCopyToClipboard();

  if (!code) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-sm text-muted-foreground">
          Add components to the canvas to see generated code
        </p>
      </div>
    );
  }

  const importLine = schema ? buildImportLine(schema) : "";
  const fullCode = schema ? `${importLine}\n\n${code}` : code;

  const prismTheme = theme === "light" ? themes.nightOwlLight : themes.nightOwl;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-foreground">
          Code
        </h3>
        <button
          onClick={() => copyToClipboard(fullCode)}
          className={cn(
            "flex items-center gap-1.5",
            "px-2.5 py-1.5 text-xs font-medium",
            "rounded-[var(--prism-radius-md)]",
            "border border-border",
            "transition-all duration-[var(--prism-duration)]",
            "focus-ring cursor-pointer",
            copied
              ? "bg-success/10 text-success border-success/25"
              : "bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-accent"
          )}
          id="studio-copy-code"
          aria-label={copied ? "Copied!" : "Copy code"}
        >
          {copied ? (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 6 9 17l-5-5" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect width="14" height="14" x="8" y="8" rx="2" />
                <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
              </svg>
              Copy
            </>
          )}
        </button>
      </div>

      {/* Code block */}
      <div className="flex-1 overflow-auto rounded-[var(--prism-radius-lg)] border border-border">
        <Highlight theme={prismTheme} code={fullCode.trim()} language="tsx">
          {({ style, tokens, getLineProps, getTokenProps }) => (
            <pre
              className="code-block p-4 overflow-x-auto !bg-code-bg text-sm h-full"
              style={{ ...style, backgroundColor: undefined }}
            >
              {tokens.map((line, i) => (
                <div key={i} {...getLineProps({ line })}>
                  <span className="inline-block w-6 text-right mr-3 text-muted-foreground/40 select-none text-xs">
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
    </div>
  );
}
