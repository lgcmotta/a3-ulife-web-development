import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { AccessibilityView } from "@/features/foundation/views/accessibility-view";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.pages.accessibility");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function AccessibilityPage() {
  return <AccessibilityView />;
}
