import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { TracksView } from "@/features/foundation/views/tracks-view";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.pages.tracks");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function TracksPage() {
  return <TracksView />;
}
