import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { findTopicRoute, getTopicRouteParams } from "@/content/topic-routes";
import { TopicView } from "@/features/foundation/views/topic-view";

type TopicPageProps = {
  params: Promise<{
    trackSlug: string;
    topicSlug: string;
  }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getTopicRouteParams();
}

export async function generateMetadata({
  params,
}: TopicPageProps): Promise<Metadata> {
  const locale = await getLocale();
  const route = findTopicRoute(await params, locale);

  if (!route) {
    const t = await getTranslations("metadata.pages.topicNotFound");

    return {
      title: t("title"),
    };
  }

  return {
    title: route.topic.title,
    description: route.topic.summary,
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const locale = await getLocale();
  const route = findTopicRoute(await params, locale);

  if (!route) {
    notFound();
  }

  return <TopicView topic={route.topic} track={route.track} />;
}
