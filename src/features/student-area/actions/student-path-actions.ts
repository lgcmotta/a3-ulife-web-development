"use server";

import { getLocale, getTranslations } from "next-intl/server";
import { getLocalizedTracks } from "@/content/locales";
import { learningTracks } from "@/content/tracks";
import { resolveActionStudentId } from "@/features/student-area/actions/action-student";
import {
  createActionError,
  createActionSuccess,
  friendlyActionError,
} from "@/features/student-area/actions/action-results";
import { markSavedState, type BuilderState } from "@/features/student-area/server/builder-selection";
import {
  createHistoryEntry,
  saveCompositionAsLearningPath,
  upsertHistoryEntry,
} from "@/features/student-area/server/path-persistence";
import { encodePublicId } from "@/server/ids/sqids";
import { studentCounters } from "@/server/student-area/keys";
import { createRedisStudentAreaStore } from "@/server/student-area/repository";
import type { PathTrackGroup } from "@/server/student-area/types";

export async function saveBuilderCompositionAction(
  studentId: string,
  state: BuilderState,
  trackGroups: PathTrackGroup[],
) {
  const store = createRedisStudentAreaStore();
  const locale = await getLocale();
  const t = await getTranslations("studentArea.feedback");
  const localizedTracks = getLocalizedTracks(locale);

  try {
    studentId = await resolveActionStudentId(studentId, store);
    const existingPath = state.savedPathId
      ? await store.loadSavedPath(studentId, state.savedPathId)
      : null;

    if (state.savedPathId && !existingPath) {
      return createActionError(t("savedMissing"), "save");
    }

    const pathId = existingPath?.pathId ?? encodePublicId(await store.allocateId(studentCounters.path));
    const savedPath = saveCompositionAsLearningPath({
      studentId,
      trackGroups,
      existingPath,
      pathId,
      catalog: learningTracks,
    });
    const history = await store.loadHistory(studentId);
    const existingHistoryEntry = history.find((entry) => entry.pathId === savedPath.pathId);
    const historyEntry = createHistoryEntry({
      savedPath,
      historyId:
        existingHistoryEntry?.historyId ?? encodePublicId(await store.allocateId(studentCounters.history)),
      catalog: learningTracks,
    });

    await store.saveSavedPath(savedPath);
    await store.saveHistory(studentId, upsertHistoryEntry(history, historyEntry));

    return createActionSuccess(
      t("saved"),
      markSavedState(
        {
          ...state,
          availableTracks: localizedTracks,
        },
        savedPath,
      ),
      "save",
    );
  } catch (error) {
    return friendlyActionError(error, t("saveFailed"), { useErrorMessage: false });
  }
}
