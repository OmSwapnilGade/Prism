/**
 * Build Export Project
 *
 * Top-level orchestrator that walks the canvas state, assembles all
 * ExportFile entries from the sub-generators, packs them into a JSZip
 * archive, and returns the Blob ready for download.
 */

import JSZip from "jszip";
import type { CanvasNode } from "../canvasTypes";
import type { Theme } from "@/types";
import { collectUsedComponents } from "./collectUsedComponents";
import { generateComponentFiles } from "./generateComponentFiles";
import { generatePageFile } from "./generatePageFile";
import { generateThemeFile } from "./generateThemeFile";
import { generateScaffold, tsconfigNodeJson } from "./generateScaffold";
import type { ExportFile } from "./exportTypes";

/**
 * Assembles a complete runnable project from the current canvas state
 * and returns a zip Blob ready for download via FileSaver.
 *
 * @param nodes    The root canvas nodes from useCanvasState
 * @param theme    The currently active Prism theme
 * @param name     Kebab-case project name used as filename
 */
export async function buildExportProject(
  nodes: CanvasNode[],
  theme: Theme,
  name: string
): Promise<Blob> {
  // 1. Determine which components are actually used
  const usedSlugs = collectUsedComponents(nodes);

  // 2. Collect all file contents from sub-generators
  const files: ExportFile[] = [
    // Scaffold boilerplate
    ...generateScaffold(theme, name),
    tsconfigNodeJson(),

    // Active theme → src/index.css
    generateThemeFile(theme),

    // Component source files (only used ones) + cn utility
    ...generateComponentFiles(usedSlugs),

    // The assembled page
    generatePageFile(nodes),
  ];

  // 3. Pack into zip
  const zip = new JSZip();
  const root = zip.folder(name);
  if (!root) throw new Error("Failed to create zip root folder");

  for (const file of files) {
    root.file(file.path, file.content);
  }

  // 4. Generate and return blob
  const blob = await zip.generateAsync({
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });

  return blob;
}
