import type { LearningTrack, Topic } from "@/content/types";
import { TopicHeader } from "@/features/foundation/components/topic-header";
import { TopicStudyCard } from "@/features/foundation/components/topic-study-card";
import { TopicNextAction } from "@/features/foundation/components/topic-next-action";

export function TopicView({
  topic,
  track,
}: {
  topic: Topic;
  track: LearningTrack;
}) {
  return (
    <article className="content-container topic-page">
      <TopicHeader topic={topic} track={track} />
      <TopicStudyCard topic={topic} />
      <TopicNextAction topic={topic} />
    </article>
  );
}
