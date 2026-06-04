"use server";

import { learningTracks } from "@/content/tracks";
import { resolveActionStudentId } from "@/features/student-area/actions/action-student";
import { createActionSuccess, friendlyActionError } from "@/features/student-area/actions/action-results";
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

  try {
    studentId = await resolveActionStudentId(studentId, store);
    const existingPath = state.savedPathId
      ? await store.loadSavedPath(studentId, state.savedPathId)
      : null;

    if (state.savedPathId && !existingPath) {
      throw new Error("The saved learning path could not be found.");
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
      "Learning path saved.",
      markSavedState(
        {
          ...state,
          availableTracks: learningTracks,
        },
        savedPath,
      ),
      "save",
    );
  } catch (error) {
    return friendlyActionError(error, "The learning path could not be saved. Please try again.");
  }
}
