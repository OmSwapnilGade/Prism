import { useCallback } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const MAX_RECENT = 5;

/**
 * Tracks recently viewed component slugs in localStorage.
 * Returns the list and a function to record a new visit.
 */
export function useRecentlyViewed() {
  const [recent, setRecent] = useLocalStorage<string[]>(
    "prism-recently-viewed",
    []
  );

  const recordVisit = useCallback(
    (slug: string) => {
      setRecent((prev) => {
        const filtered = prev.filter((s) => s !== slug);
        return [slug, ...filtered].slice(0, MAX_RECENT);
      });
    },
    [setRecent]
  );

  return { recent, recordVisit };
}
