"use server";

import { redirect } from "next/navigation";

import { learningTracks } from "@/content/tracks";
import { resolveActionStudentId } from "@/features/student-area/actions/action-student";
import { completeSavedPathTopic } from "@/features/student-area/server/path-progress";
import {
  createHistoryEntry,
  getLearningDestination,
  upsertHistoryEntry,
} from "@/features/student-area/server/path-persistence";
import { encodePublicId } from "@/server/ids/sqids";
import { studentCounters } from "@/server/student-area/keys";
import { createRedisStudentAreaStore } from "@/server/student-area/repository";

export async function completeTopicAction(studentId: string, pathId: string, topicSlug: string) {
  const store = createRedisStudentAreaStore();
  studentId = await resolveActionStudentId(studentId, store);
  const path = await store.loadSavedPath(studentId, pathId);

  if (!path) {
    redirect("/tracks/history");
  }

  const savedPath = completeSavedPathTopic({ savedPath: path, topicSlug });
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
  redirect(getLearningDestination(savedPath));
}
