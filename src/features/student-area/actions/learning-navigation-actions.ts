"use server";

import { resolveActionStudentId } from "@/features/student-area/actions/action-student";
import {
  createActionError,
  createActionSuccess,
  friendlyActionError,
} from "@/features/student-area/actions/action-results";
import { getLearningDestination } from "@/features/student-area/server/path-persistence";
import { createRedisStudentAreaStore } from "@/server/student-area/repository";

export async function startOrContinueLearningAction(studentId: string) {
  const store = createRedisStudentAreaStore();

  try {
    studentId = await resolveActionStudentId(studentId, store);
    const draft = await store.loadDraft(studentId);
    const activePath = await store.loadActivePath(studentId);

    if (!activePath) {
      return createActionError("Save a learning path before starting.", "start-learning");
    }

    if (draft?.dirty) {
      return createActionError("Save or discard changes before continuing.", "continue-learning");
    }

    return createActionSuccess("Opening your next topic.", {
      url: getLearningDestination(activePath),
    });
  } catch (error) {
    return friendlyActionError(error, "Learning could not be opened. Please try again.");
  }
}
