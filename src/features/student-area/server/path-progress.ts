import type { CurrentPathDraft, PathStatus, SavedLearningPath } from "@/server/student-area/types";

export function getPathProgressSummary(path: Pick<SavedLearningPath | CurrentPathDraft, "trackGroups">) {
  const topicCount = path.trackGroups.reduce((count, group) => count + group.topicItems.length, 0);
  const completedTopicCount = path.trackGroups.reduce(
    (count, group) => count + group.topicItems.filter((topic) => topic.completed).length,
    0,
  );
  const status: PathStatus =
    completedTopicCount === 0
      ? "not-started"
      : completedTopicCount === topicCount
        ? "completed"
        : "in-progress";

  return {
    topicCount,
    completedTopicCount,
    status,
  };
}

export function completeSavedPathTopic({
  savedPath,
  topicSlug,
  now = new Date(),
}: {
  savedPath: SavedLearningPath;
  topicSlug: string;
  now?: Date;
}): SavedLearningPath {
  const timestamp = now.toISOString();
  let foundTopic = false;
  const trackGroups = savedPath.trackGroups.map((group) => ({
    ...group,
    topicItems: group.topicItems.map((topic) => {
      if (topic.topicSlug !== topicSlug) {
        return topic;
      }

      foundTopic = true;
      return {
        ...topic,
        completed: true,
        completedAt: timestamp,
      };
    }),
  }));
  const progress = getPathProgressSummary({ trackGroups });

  return {
    ...savedPath,
    trackGroups,
    status: progress.status,
    lastActiveTopicSlug: foundTopic ? topicSlug : savedPath.lastActiveTopicSlug,
    completedAt: progress.status === "completed" ? timestamp : null,
    updatedAt: foundTopic ? timestamp : savedPath.updatedAt,
  };
}
