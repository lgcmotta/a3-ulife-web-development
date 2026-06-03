import { getTopic, getTrack, learningTracks } from "@/content/tracks";

export type TopicRouteParams = {
  trackSlug: string;
  topicSlug: string;
};

export function getTopicRouteParams(): TopicRouteParams[] {
  return learningTracks.flatMap((track) =>
    track.topics.map((topic) => ({
      trackSlug: track.slug,
      topicSlug: topic.slug,
    })),
  );
}

export function findTopicRoute({ trackSlug, topicSlug }: TopicRouteParams) {
  const track = getTrack(trackSlug);
  const topic = getTopic(trackSlug, topicSlug);

  if (!track || !topic) {
    return null;
  }

  return { track, topic };
}

export function topicHref(trackSlug: string, topicSlug: string) {
  return `/tracks/${trackSlug}/${topicSlug}`;
}
