import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { HomeView } from "@/features/foundation/views/home-view";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.pages.home");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function HomePage() {
  return <HomeView />;
}
