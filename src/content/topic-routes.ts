import { getLocalizedTopic, getLocalizedTrack, getLocalizedTracks } from "@/content/locales";
import { learningTracks } from "@/content/tracks";

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

export function findTopicRoute({ trackSlug, topicSlug }: TopicRouteParams, locale?: string) {
  const track = getLocalizedTrack(locale, trackSlug);
  const topic = getLocalizedTopic(locale, trackSlug, topicSlug);

  if (!track || !topic) {
    return null;
  }

  return { track, topic };
}

export function getLocalizedTopicRouteParams(locale?: string): TopicRouteParams[] {
  return getLocalizedTracks(locale).flatMap((track) =>
    track.topics.map((topic) => ({
      trackSlug: track.slug,
      topicSlug: topic.slug,
    })),
  );
}

export function topicHref(trackSlug: string, topicSlug: string) {
  return `/tracks/${trackSlug}/${topicSlug}`;
}
