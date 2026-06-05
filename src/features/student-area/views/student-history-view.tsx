import { getLocale, getTranslations } from "next-intl/server";
import { getLocalizedTracks } from "@/content/locales";
import { EmptyHistoryState } from "@/features/student-area/components/empty-history-state";
import { LearningPathHistoryTable } from "@/features/student-area/components/learning-path-history-table";
import { presentHistoryRows } from "@/features/student-area/server/history-presenter";
import { createRedisStudentAreaStore } from "@/server/student-area/repository";
import type { LearningPathHistoryEntry, SavedLearningPath } from "@/server/student-area/types";

const demoHistory: LearningPathHistoryEntry[] = [
  {
    historyId: "demo001",
    studentId: "demo000",
    pathId: "demo001",
    savedAt: "2026-06-03T10:05:00.000Z",
    trackSummary: "Programming Foundations",
    topicCount: 3,
    completedTopicCount: 0,
    status: "not-started",
  },
];

function isSavedLearningPath(path: SavedLearningPath | null): path is SavedLearningPath {
  return path !== null;
}

export async function StudentHistoryView({
  studentId,
  demo = false,
}: {
  studentId: string;
  demo?: boolean;
}) {
  const locale = await getLocale();
  const t = await getTranslations("studentArea.history");
  const catalog = getLocalizedTracks(locale);
  const presenterOptions = {
    locale,
    catalog,
    labels: {
      progress: (completed: number, total: number) =>
        t("progressLabel", { completed, total }),
      statuses: {
        "not-started": t("statuses.notStarted"),
        "in-progress": t("statuses.inProgress"),
        completed: t("statuses.completed"),
      },
    },
  };
  let rows = presentHistoryRows(demo ? demoHistory : [], [], presenterOptions);
  let error: string | null = null;

  if (!demo) {
    try {
      const store = createRedisStudentAreaStore();
      const history = await store.loadHistory(studentId);
      const savedPaths = (
        await Promise.all(history.map((entry) => store.loadSavedPath(studentId, entry.pathId)))
      ).filter(isSavedLearningPath);

      rows = presentHistoryRows(history, savedPaths, presenterOptions);
    } catch {
      error = t("unavailable");
    }
  }

  return (
    <section aria-labelledby="history-heading" className="student-panel">
      <h2 id="history-heading">{t("heading")}</h2>
      {error ? <p role="status">{error}</p> : null}
      {rows.length > 0 ? <LearningPathHistoryTable rows={rows} /> : <EmptyHistoryState />}
    </section>
  );
}
