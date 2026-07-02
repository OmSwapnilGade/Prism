import { useEffect } from "react";
import { useParams, Navigate } from "react-router";
import { componentRegistry } from "@/data/componentRegistry";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { ButtonDoc } from "@/docs/ButtonDoc";
import { InputDoc } from "@/docs/InputDoc";
import { CardDoc } from "@/docs/CardDoc";
import { BadgeDoc } from "@/docs/BadgeDoc";
import { ModalDoc } from "@/docs/ModalDoc";
import { TextareaDoc } from "@/docs/TextareaDoc";
import { ToggleDoc } from "@/docs/ToggleDoc";
import { TabsDoc } from "@/docs/TabsDoc";
import { DropdownMenuDoc } from "@/docs/DropdownMenuDoc";
import { TooltipDoc } from "@/docs/TooltipDoc";
import { ToastDoc } from "@/docs/ToastDoc";

const docComponents: Record<string, React.ComponentType> = {
  button: ButtonDoc,
  input: InputDoc,
  card: CardDoc,
  badge: BadgeDoc,
  modal: ModalDoc,
  textarea: TextareaDoc,
  toggle: ToggleDoc,
  tabs: TabsDoc,
  "dropdown-menu": DropdownMenuDoc,
  tooltip: TooltipDoc,
  toast: ToastDoc,
};

/**
 * Dynamic route page that renders the correct doc component based on the URL slug.
 * Records each visit for "Recently Viewed" tracking.
 * Redirects to docs index if the slug doesn't match any registered component.
 */
export function ComponentDocPage() {
  const { slug } = useParams<{ slug: string }>();
  const { recordVisit } = useRecentlyViewed();

  useEffect(() => {
    if (slug) {
      recordVisit(slug);
    }
  }, [slug, recordVisit]);

  if (!slug || !componentRegistry.find((c) => c.slug === slug)) {
    return <Navigate to="/docs" replace />;
  }

  const DocComponent = docComponents[slug];
  if (!DocComponent) {
    return <Navigate to="/docs" replace />;
  }

  return <DocComponent />;
}
