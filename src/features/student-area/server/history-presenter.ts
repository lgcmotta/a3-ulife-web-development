import { getPathProgressSummary } from "@/features/student-area/server/path-progress";
import { getLearningDestination } from "@/features/student-area/server/path-persistence";
import type { LearningTrack } from "@/content/types";
import { learningTracks } from "@/content/tracks";
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

export type HistoryPresenterOptions = {
  locale?: string;
  catalog?: LearningTrack[];
  labels?: {
    progress: (completed: number, total: number) => string;
    statuses: Record<PathStatus, string>;
  };
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
  options: HistoryPresenterOptions = {},
): PresentedHistoryRow[] {
  const savedPathById = new Map(savedPaths.map((path) => [path.pathId, path]));
  const catalog = options.catalog ?? learningTracks;
  const labels = options.labels ?? {
    progress: (completed: number, total: number) => `${completed} of ${total} topics complete`,
    statuses: statusLabels,
  };

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
      const trackSummary = savedPath
        ? savedPath.trackGroups
            .map((group) => catalog.find((track) => track.slug === group.trackSlug)?.title)
            .filter((title): title is string => Boolean(title))
            .join(", ") || entry.trackSummary
        : entry.trackSummary;

      return {
        historyId: entry.historyId,
        pathId: entry.pathId,
        savedLabel: new Intl.DateTimeFormat(options.locale ?? "en", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }).format(new Date(entry.savedAt)),
        trackSummary,
        progressLabel: labels.progress(progress.completedTopicCount, progress.topicCount),
        statusLabel: labels.statuses[progress.status],
        resumeTarget: canResumeOrEdit && savedPath ? getLearningDestination(savedPath) : null,
        editTarget: canResumeOrEdit ? `/tracks/builder?edit=${entry.pathId}` : null,
      };
    });
}
