/**
 * Export Engine Types
 *
 * Describes the virtual file system that the export engine emits
 * before packing everything into a zip archive.
 */

/** A single virtual file with its relative path and text content */
export interface ExportFile {
  /** Path inside the project root, e.g. "src/components/Button/Button.tsx" */
  path: string;
  /** Full text content of the file */
  content: string;
}

/** A complete exportable project */
export interface ExportProject {
  /** Kebab-case project name used as the zip filename */
  name: string;
  /** All files to include in the archive */
  files: ExportFile[];
}
