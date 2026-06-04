"use server";

import { redirect } from "next/navigation";

import { learningTracks } from "@/content/tracks";
import { resolveActionStudentId } from "@/features/student-area/actions/action-student";
import { completeSavedPathTopic } from "@/features/student-area/server/path-progress";
import {
  createHistoryEntry,
  getLearningDestination,
} from "@/features/student-area/server/path-persistence";
import { encodePublicId } from "@/server/ids/sqids";
import { studentCounters } from "@/server/student-area/keys";
import { createRedisStudentAreaStore } from "@/server/student-area/repository";

export async function completeTopicAction(studentId: string, pathId: string, topicSlug: string) {
  const store = createRedisStudentAreaStore();
  studentId = await resolveActionStudentId(studentId, store);
  const path = await store.loadActivePath(studentId);

  if (!path || path.pathId !== pathId) {
    redirect("/tracks/builder");
  }

  const savedPath = completeSavedPathTopic({ savedPath: path, topicSlug });
  const history = await store.loadHistory(studentId);
  let foundHistoryEntry = false;
  const nextHistory = history.map((entry) => {
    if (entry.pathId !== savedPath.pathId) {
      return entry;
    }

    foundHistoryEntry = true;
    return {
      ...createHistoryEntry({
        savedPath,
        historyId: entry.historyId,
        catalog: learningTracks,
      }),
      savedAt: entry.savedAt,
    };
  });

  if (!foundHistoryEntry) {
    nextHistory.unshift(
      createHistoryEntry({
        savedPath,
        historyId: encodePublicId(await store.allocateId(studentCounters.history)),
        catalog: learningTracks,
      }),
    );
  }

  await store.saveActivePath(savedPath);
  await store.saveHistory(studentId, nextHistory);
  redirect(getLearningDestination(savedPath));
}
