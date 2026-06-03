import type { Metadata } from "next";
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
  const route = findTopicRoute(await params);

  if (!route) {
    return {
      title: "Topic not found",
    };
  }

  return {
    title: route.topic.title,
    description: route.topic.summary,
  };
}

export default async function TopicPage({ params }: TopicPageProps) {
  const route = findTopicRoute(await params);

  if (!route) {
    notFound();
  }

  return <TopicView topic={route.topic} track={route.track} />;
}
