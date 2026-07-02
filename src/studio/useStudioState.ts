/**
 * Studio State Hook
 *
 * Central state management for the studio customizer.
 * Manages selected component, prop values, and generated JSX.
 */

import { useState, useCallback, useMemo } from "react";
import { getStudioSchema } from "./studioRegistry";
import { generateJsx } from "./generateJsx";
import type { StudioComponentSchema } from "./studioRegistry";

export interface StudioState {
  /** Currently selected component slug */
  selectedSlug: string | null;
  /** Current schema (derived from slug) */
  schema: StudioComponentSchema | null;
  /** Current prop values */
  propValues: Record<string, unknown>;
  /** Generated JSX string */
  generatedCode: string;
  /** Select a component by slug, resetting props to defaults */
  selectComponent: (slug: string) => void;
  /** Update a single prop value */
  setPropValue: (name: string, value: unknown) => void;
  /** Reset all props to their default values */
  resetProps: () => void;
}

/**
 * Extract default prop values from a schema.
 */
function getDefaults(schema: StudioComponentSchema): Record<string, unknown> {
  const defaults: Record<string, unknown> = {};
  for (const prop of schema.props) {
    if (prop.defaultValue !== undefined) {
      defaults[prop.name] = prop.defaultValue;
    }
  }
  // Include defaultChildren as the children prop
  if (schema.defaultChildren) {
    defaults["children"] = schema.defaultChildren;
  }
  return defaults;
}

export function useStudioState(initialSlug?: string): StudioState {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(
    initialSlug ?? "button"
  );
  const [propValues, setPropValues] = useState<Record<string, unknown>>(() => {
    const schema = getStudioSchema(initialSlug ?? "button");
    return schema ? getDefaults(schema) : {};
  });

  const schema = useMemo(
    () => (selectedSlug ? getStudioSchema(selectedSlug) ?? null : null),
    [selectedSlug]
  );

  const selectComponent = useCallback((slug: string) => {
    const newSchema = getStudioSchema(slug);
    if (!newSchema) return;
    setSelectedSlug(slug);
    setPropValues(getDefaults(newSchema));
  }, []);

  const setPropValue = useCallback((name: string, value: unknown) => {
    setPropValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const resetProps = useCallback(() => {
    if (!schema) return;
    setPropValues(getDefaults(schema));
  }, [schema]);

  const generatedCode = useMemo(() => {
    if (!schema) return "";
    return generateJsx({ schema, propValues });
  }, [schema, propValues]);

  return {
    selectedSlug,
    schema,
    propValues,
    generatedCode,
    selectComponent,
    setPropValue,
    resetProps,
  };
}
