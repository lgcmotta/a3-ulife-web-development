"use server";

import { resolveActionStudentId } from "@/features/student-area/actions/action-student";
import {
  createActionError,
  createActionSuccess,
  friendlyActionError,
} from "@/features/student-area/actions/action-results";
import { getLearningDestination } from "@/features/student-area/server/path-persistence";
import { createRedisStudentAreaStore } from "@/server/student-area/repository";

export async function startOrContinueLearningAction(studentId: string, pathId: string | null) {
  const store = createRedisStudentAreaStore();

  try {
    studentId = await resolveActionStudentId(studentId, store);

    if (!pathId) {
      return createActionError("Save a learning path before starting.", "start-learning");
    }

    const savedPath = await store.loadSavedPath(studentId, pathId);

    if (!savedPath) {
      return createActionError("Save a learning path before starting.", "start-learning");
    }

    return createActionSuccess("Opening your next topic.", {
      url: getLearningDestination(savedPath),
    });
  } catch (error) {
    return friendlyActionError(error, "Learning could not be opened. Please try again.");
  }
}
