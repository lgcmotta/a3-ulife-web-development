import type { LearningTrack } from "@/content/types";
import type { PathTrackGroup } from "@/server/student-area/types";

export function normalizePathGroups(groups: PathTrackGroup[]) {
  return groups
    .map((group) => ({
      ...group,
      topicItems: group.topicItems
        .filter((topic) => topic.trackSlug === group.trackSlug)
        .map((topic, order) => ({ ...topic, order })),
    }))
    .filter((group) => group.topicItems.length > 0)
    .map((group, order) => ({ ...group, order }));
}

export function validateSavedPathGroups(groups: PathTrackGroup[], catalog?: LearningTrack[]) {
  for (const group of groups) {
    const catalogTrack = catalog?.find((track) => track.slug === group.trackSlug);

    if (catalog && !catalogTrack) {
      throw new Error("A selected track is not available in the learning catalog.");
    }

    for (const topic of group.topicItems) {
      if (topic.trackSlug !== group.trackSlug) {
        throw new Error("A topic must stay inside its parent track.");
      }

      if (catalogTrack && !catalogTrack.topics.some((candidate) => candidate.slug === topic.topicSlug)) {
        throw new Error("A selected topic is not available in the learning catalog.");
      }
    }
  }

  const normalized = normalizePathGroups(groups);
  const topicCount = countTopics(normalized);

  if (topicCount === 0) {
    throw new Error("A learning path needs at least one topic before it can be saved.");
  }

  return normalized;
}

export function countTopics(groups: PathTrackGroup[]) {
  return groups.reduce((count, group) => count + group.topicItems.length, 0);
}

export function countCompletedTopics(groups: PathTrackGroup[]) {
  return groups.reduce(
    (count, group) => count + group.topicItems.filter((topic) => topic.completed).length,
    0,
  );
}
