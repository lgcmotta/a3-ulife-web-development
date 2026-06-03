import type { Metadata } from "next";
import { AccessibilityView } from "@/features/foundation/views/accessibility-view";

export const metadata: Metadata = {
  title: "Accessibility Help",
  description:
    "Learn how to navigate Legado de Diogenes with keyboard, screen reader structure, and visual theme support.",
};

export default function AccessibilityPage() {
  return <AccessibilityView />;
}
