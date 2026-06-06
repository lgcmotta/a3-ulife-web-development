import { getLocalizedTracks } from "@/content/locales";

export function getAvailableTracks(locale?: string) {
  return getLocalizedTracks(locale);
}

export function findAvailableTrack(trackSlug: string, locale?: string) {
  return getAvailableTracks(locale).find((track) => track.slug === trackSlug) ?? null;
}

export function findAvailableTopic(trackSlug: string, topicSlug: string, locale?: string) {
  return (
    findAvailableTrack(trackSlug, locale)?.topics.find((topic) => topic.slug === topicSlug) ?? null
  );
}

export function findTopicBySlug(topicSlug: string, locale?: string) {
  for (const track of getAvailableTracks(locale)) {
    const topic = track.topics.find((candidate) => candidate.slug === topicSlug);

    if (topic) {
      return { track, topic };
    }
  }

  return null;
}
