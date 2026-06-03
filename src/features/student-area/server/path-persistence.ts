import type { LearningTrack } from "@/content/types";
import { getPathProgressSummary } from "@/features/student-area/server/path-progress";
import { validateSavedPathGroups } from "@/server/student-area/path-validation";
import type {
  CurrentPathDraft,
  LearningPathHistoryEntry,
  SavedLearningPath,
} from "@/server/student-area/types";

export function saveDraftAsActivePath({
  draft,
  existingPath,
  pathId,
  now = new Date(),
}: {
  draft: CurrentPathDraft;
  existingPath: SavedLearningPath | null;
  pathId: string;
  now?: Date;
}): SavedLearningPath {
  const timestamp = now.toISOString();
  const trackGroups = validateSavedPathGroups(draft.trackGroups);
  const progress = getPathProgressSummary({ trackGroups });

  return {
    pathId: existingPath?.pathId ?? pathId,
    studentId: draft.studentId,
    trackGroups,
    status: progress.status,
    lastActiveTopicSlug: existingPath?.lastActiveTopicSlug ?? null,
    createdAt: existingPath?.createdAt ?? timestamp,
    updatedAt: timestamp,
    completedAt: progress.status === "completed" ? timestamp : null,
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
