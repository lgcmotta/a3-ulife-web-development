import { getPathProgressSummary } from "@/features/student-area/server/path-progress";
import { getLearningDestination } from "@/features/student-area/server/path-persistence";
import type {
  LearningPathHistoryEntry,
  PathStatus,
  SavedLearningPath,
} from "@/server/student-area/types";

const statusLabels: Record<PathStatus, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  completed: "Completed",
};

export type PresentedHistoryRow = {
  historyId: string;
  pathId: string;
  savedLabel: string;
  trackSummary: string;
  progressLabel: string;
  statusLabel: string;
  resumeTarget: string | null;
  editTarget: string | null;
};

export function presentHistoryRows(
  entries: LearningPathHistoryEntry[],
  savedPaths: SavedLearningPath[] = [],
): PresentedHistoryRow[] {
  const savedPathById = new Map(savedPaths.map((path) => [path.pathId, path]));

  return entries
    .toSorted((left, right) => Date.parse(right.savedAt) - Date.parse(left.savedAt))
    .map((entry) => {
      const savedPath = savedPathById.get(entry.pathId) ?? null;
      const progress = savedPath
        ? getPathProgressSummary(savedPath)
        : {
            topicCount: entry.topicCount,
            completedTopicCount: entry.completedTopicCount,
            status: entry.status,
          };
      const canResumeOrEdit = Boolean(savedPath && progress.status !== "completed");

      return {
        historyId: entry.historyId,
        pathId: entry.pathId,
        savedLabel: new Intl.DateTimeFormat("en", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(new Date(entry.savedAt)),
        trackSummary: entry.trackSummary,
        progressLabel: `${progress.completedTopicCount} of ${progress.topicCount} topics complete`,
        statusLabel: statusLabels[progress.status],
        resumeTarget: canResumeOrEdit && savedPath ? getLearningDestination(savedPath) : null,
        editTarget: canResumeOrEdit ? `/tracks/builder?edit=${entry.pathId}` : null,
      };
    });
}
