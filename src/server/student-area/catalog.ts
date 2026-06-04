import { learningTracks } from "@/content/tracks";

export function getAvailableTracks() {
  return learningTracks;
}

export function findAvailableTrack(trackSlug: string) {
  return learningTracks.find((track) => track.slug === trackSlug) ?? null;
}

export function findAvailableTopic(trackSlug: string, topicSlug: string) {
  return (
    findAvailableTrack(trackSlug)?.topics.find((topic) => topic.slug === topicSlug) ?? null
  );
}

export function findTopicBySlug(topicSlug: string) {
  for (const track of learningTracks) {
    const topic = track.topics.find((candidate) => candidate.slug === topicSlug);

    if (topic) {
      return { track, topic };
    }
  }

  return null;
}
