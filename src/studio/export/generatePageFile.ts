/**
 * Generate Page File
 *
 * Emits the assembled Page.tsx from the canvas node tree.
 * Uses the existing generatePageCode() engine, then rewrites import paths
 * from @/components/... to relative ../components/... so the exported project
 * works with the @/ alias configured in vite.config.ts.
 *
 * NOTE: We keep @/ aliases in the output since vite.config.ts in the exported
 * project is configured with the same path alias.
 */

import type { ExportFile } from "./exportTypes";
import type { CanvasNode } from "../canvasTypes";
import { generatePageCode } from "../generatePageJsx";

/**
 * Returns a single ExportFile for src/pages/Page.tsx,
 * containing the fully assembled page from the canvas state.
 */
export function generatePageFile(nodes: CanvasNode[]): ExportFile {
  const code = generatePageCode(nodes);
  return {
    path: "src/pages/Page.tsx",
    content: code,
  };
}
