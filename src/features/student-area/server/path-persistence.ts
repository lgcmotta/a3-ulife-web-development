import type { LearningTrack } from "@/content/types";
import { getPathProgressSummary } from "@/features/student-area/server/path-progress";
import { validateSavedPathGroups } from "@/server/student-area/path-validation";
import type {
  LearningPathHistoryEntry,
  PathTopicItem,
  PathTrackGroup,
  SavedLearningPath,
} from "@/server/student-area/types";

function topicKey(trackSlug: string, topicSlug: string) {
  return `${trackSlug}:${topicSlug}`;
}

function mergeProgress(
  nextGroups: PathTrackGroup[],
  existingPath: SavedLearningPath | null,
): PathTrackGroup[] {
  const existingTopics = new Map<string, PathTopicItem>();

  for (const group of existingPath?.trackGroups ?? []) {
    for (const topic of group.topicItems) {
      existingTopics.set(topicKey(group.trackSlug, topic.topicSlug), topic);
    }
  }

  return nextGroups.map((group) => ({
    ...group,
    topicItems: group.topicItems.map((topic) => {
      const existing = existingTopics.get(topicKey(group.trackSlug, topic.topicSlug));

      return {
        ...topic,
        completed: existing?.completed ?? false,
        completedAt: existing?.completedAt ?? null,
      };
    }),
  }));
}

function keepLastActiveTopic(
  existingPath: SavedLearningPath | null,
  trackGroups: PathTrackGroup[],
) {
  if (!existingPath?.lastActiveTopicSlug) {
    return null;
  }

  const stillSelected = trackGroups.some((group) =>
    group.topicItems.some((topic) => topic.topicSlug === existingPath.lastActiveTopicSlug),
  );

  return stillSelected ? existingPath.lastActiveTopicSlug : null;
}

export function saveCompositionAsLearningPath({
  studentId,
  trackGroups,
  existingPath,
  pathId,
  catalog,
  now = new Date(),
}: {
  studentId: string;
  trackGroups: PathTrackGroup[];
  existingPath: SavedLearningPath | null;
  pathId: string;
  catalog: LearningTrack[];
  now?: Date;
}): SavedLearningPath {
  if (existingPath?.status === "completed") {
    throw new Error("Completed learning paths cannot be edited.");
  }

  const timestamp = now.toISOString();
  const normalized = validateSavedPathGroups(trackGroups, catalog);
  const mergedGroups = mergeProgress(normalized, existingPath);
  const progress = getPathProgressSummary({ trackGroups: mergedGroups });

  return {
    pathId: existingPath?.pathId ?? pathId,
    studentId,
    trackGroups: mergedGroups,
    status: progress.status,
    lastActiveTopicSlug: keepLastActiveTopic(existingPath, mergedGroups),
    createdAt: existingPath?.createdAt ?? timestamp,
    updatedAt: timestamp,
    completedAt: progress.status === "completed" ? (existingPath?.completedAt ?? timestamp) : null,
  };
}

export function createHistoryEntry({
  savedPath,
  historyId,
  catalog,
}: {
  savedPath: SavedLearningPath;
  historyId: string;
  catalog: LearningTrack[];
}): LearningPathHistoryEntry {
  const trackSummary = savedPath.trackGroups
    .map((group) => catalog.find((track) => track.slug === group.trackSlug)?.title ?? group.trackSlug)
    .join(", ");
  const progress = getPathProgressSummary(savedPath);

  return {
    historyId,
    studentId: savedPath.studentId,
    pathId: savedPath.pathId,
    savedAt: savedPath.updatedAt,
    trackSummary,
    topicCount: progress.topicCount,
    completedTopicCount: progress.completedTopicCount,
    status: progress.status,
  };
}

export function upsertHistoryEntry(
  history: LearningPathHistoryEntry[],
  entry: LearningPathHistoryEntry,
) {
  const exists = history.some((candidate) => candidate.pathId === entry.pathId);
  const nextHistory = exists
    ? history.map((candidate) => (candidate.pathId === entry.pathId ? entry : candidate))
    : [entry, ...history];

  return nextHistory.toSorted((left, right) => Date.parse(right.savedAt) - Date.parse(left.savedAt));
}

export function getLearningDestination(savedPath: SavedLearningPath) {
  for (const group of savedPath.trackGroups) {
    for (const topic of group.topicItems) {
      if (!topic.completed) {
        return `/tracks/learn/${savedPath.pathId}/${topic.topicSlug}`;
      }
    }
  }

  return `/tracks/learn/${savedPath.pathId}/complete`;
}

export type TopicNavigationState = {
  currentTopic: PathTopicItem | null;
  previousTopic: PathTopicItem | null;
  nextTopic: PathTopicItem | null;
  previousHref: string | null;
  nextHref: string | null;
  isCurrentTopicCompleted: boolean;
};

function orderedPathTopics(savedPath: Pick<SavedLearningPath, "trackGroups">) {
  return savedPath.trackGroups
    .toSorted((left, right) => left.order - right.order)
    .flatMap((group) => group.topicItems.toSorted((left, right) => left.order - right.order));
}

function learningTopicHref(pathId: string, topic: PathTopicItem | null) {
  return topic ? `/tracks/learn/${pathId}/${topic.topicSlug}` : null;
}

export function getTopicNavigationState(
  savedPath: SavedLearningPath,
  topicSlug: string,
): TopicNavigationState {
  const topics = orderedPathTopics(savedPath);
  const currentIndex = topics.findIndex((topic) => topic.topicSlug === topicSlug);
  const currentTopic = currentIndex >= 0 ? (topics[currentIndex] ?? null) : null;
  const previousTopic = currentIndex > 0 ? (topics[currentIndex - 1] ?? null) : null;
  const nextTopic =
    currentIndex >= 0 && currentIndex < topics.length - 1
      ? (topics[currentIndex + 1] ?? null)
      : null;

  return {
    currentTopic,
    previousTopic,
    nextTopic,
    previousHref: learningTopicHref(savedPath.pathId, previousTopic),
    nextHref: learningTopicHref(savedPath.pathId, nextTopic),
    isCurrentTopicCompleted: currentTopic?.completed ?? false,
  };
}
