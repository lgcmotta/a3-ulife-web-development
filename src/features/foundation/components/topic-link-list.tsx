import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Topic } from "@/content/types";
import { topicHref } from "@/content/topic-routes";

export function TopicLinkList({ topics }: { topics: Topic[] }) {
  return (
    <ul className="topic-link-list">
      {topics.map((topic) => (
        <li key={topic.slug}>
          <Link href={topicHref(topic.trackSlug, topic.slug)}>
            <span>{topic.title}</span>
            <ArrowRight aria-hidden="true" size={16} />
          </Link>
        </li>
      ))}
    </ul>
  );
}
