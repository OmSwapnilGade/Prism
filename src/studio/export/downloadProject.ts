/**
 * Download Project
 *
 * Thin wrapper around buildExportProject + FileSaver.
 * Call this from the Studio UI's Export button handler.
 */

import { saveAs } from "file-saver";
import type { CanvasNode } from "../canvasTypes";
import type { Theme } from "@/types";
import { buildExportProject } from "./buildExportProject";

/**
 * Builds and immediately downloads a complete Prism project zip.
 *
 * @param nodes   The root canvas nodes from useCanvasState
 * @param theme   The currently active Prism theme
 * @param name    Project name (used as the zip filename, kebab-cased automatically)
 */
export async function downloadProject(
  nodes: CanvasNode[],
  theme: Theme,
  name = "my-prism-page"
): Promise<void> {
  const safeName = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "my-prism-page";

  const blob = await buildExportProject(nodes, theme, safeName);
  saveAs(blob, `${safeName}.zip`);
}
