import { getLocalizedTopic, getLocalizedTrack, getLocalizedTracks } from "@/content/locales";

export const learningTracks = getLocalizedTracks("en");

export function getTrack(trackSlug: string) {
  return getLocalizedTrack("en", trackSlug);
}

export function getTopic(trackSlug: string, topicSlug: string) {
  return getLocalizedTopic("en", trackSlug, topicSlug);
}
