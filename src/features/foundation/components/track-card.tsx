import type { LearningTrack } from "@/content/types";
import { Badge } from "@/ui/components/badge";
import { TopicLinkList } from "@/features/foundation/components/topic-link-list";

export function TrackCard({ track }: { track: LearningTrack }) {
  return (
    <article className="track-card" aria-labelledby={`${track.slug}-heading`}>
      <div className="track-card-header">
        <Badge>{track.topics.length} topics</Badge>
        <p>{track.recommendedFor}</p>
      </div>
      <h2 id={`${track.slug}-heading`}>{track.title}</h2>
      <p className="track-summary">{track.summary}</p>
      <p>{track.description}</p>
      <p>
        <strong>Expected outcome:</strong> {track.outcome}
      </p>
      <TopicLinkList topics={track.topics} />
    </article>
  );
}
