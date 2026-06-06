"use server";

import { getTranslations } from "next-intl/server";
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
  const t = await getTranslations("studentArea.feedback");

  try {
    studentId = await resolveActionStudentId(studentId, store);

    if (!pathId) {
      return createActionError(t("startBeforeSave"), "start-learning");
    }

    const savedPath = await store.loadSavedPath(studentId, pathId);

    if (!savedPath) {
      return createActionError(t("startBeforeSave"), "start-learning");
    }

    return createActionSuccess(t("openingNextTopic"), {
      url: getLearningDestination(savedPath),
    });
  } catch (error) {
    return friendlyActionError(error, t("learningOpenFailed"), { useErrorMessage: false });
  }
}
