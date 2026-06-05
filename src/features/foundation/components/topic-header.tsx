import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowLeft } from "lucide-react";
import type { LearningTrack, Topic } from "@/content/types";

export function TopicHeader({
  topic,
  track,
}: {
  topic: Topic;
  track: LearningTrack;
}) {
  const t = useTranslations("topic");

  return (
    <header className="topic-header">
      <Link className="return-link" href="/tracks">
        <ArrowLeft aria-hidden="true" size={18} />
        {t("backToTracks")}
      </Link>
      <p className="eyebrow">{track.title}</p>
      <h1>{topic.title}</h1>
      <p>{topic.summary}</p>
    </header>
  );
}
