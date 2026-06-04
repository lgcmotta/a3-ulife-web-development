import { encodePublicId } from "@/server/ids/sqids";
import { getRedisClient } from "@/server/redis/client";
import { studentCounters, studentKeys } from "@/server/student-area/keys";
import type {
  AnonymousStudentRecord,
  BuilderFeedbackMessage,
  LearningPathHistoryEntry,
  SavedLearningPath,
} from "@/server/student-area/types";

export type StudentAreaStore = {
  allocateId(counterKey: string): Promise<number>;
  loadStudent(studentId: string): Promise<AnonymousStudentRecord | null>;
  saveStudent(record: AnonymousStudentRecord): Promise<void>;
  loadSavedPath(studentId: string, pathId: string): Promise<SavedLearningPath | null>;
  saveSavedPath(path: SavedLearningPath): Promise<void>;
  loadHistory(studentId: string): Promise<LearningPathHistoryEntry[]>;
  saveHistory(studentId: string, entries: LearningPathHistoryEntry[]): Promise<void>;
  saveFeedback(studentId: string, feedback: BuilderFeedbackMessage): Promise<void>;
};

async function loadJson<T>(key: string): Promise<T | null> {
  const client = await getRedisClient();
  const value = await client.get(key);

  if (!value) {
    return null;
  }

  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

async function saveJson(key: string, value: unknown) {
  const client = await getRedisClient();
  await client.set(key, JSON.stringify(value));
}

export function createRedisStudentAreaStore(): StudentAreaStore {
  return {
    async allocateId(counterKey) {
      const client = await getRedisClient();
      return client.incr(counterKey);
    },
    loadStudent(studentId) {
      return loadJson(studentKeys(studentId).student);
    },
    saveStudent(record) {
      return saveJson(studentKeys(record.studentId).student, record);
    },
    loadSavedPath(studentId, pathId) {
      return loadJson(studentKeys(studentId).savedPath(pathId));
    },
    saveSavedPath(path) {
      return saveJson(studentKeys(path.studentId).savedPath(path.pathId), path);
    },
    async loadHistory(studentId) {
      return (await loadJson<LearningPathHistoryEntry[]>(studentKeys(studentId).history)) ?? [];
    },
    saveHistory(studentId, entries) {
      return saveJson(studentKeys(studentId).history, entries);
    },
    saveFeedback(studentId, feedback) {
      return saveJson(studentKeys(studentId).feedback, feedback);
    },
  };
}

export function createMemoryStudentAreaStore(): StudentAreaStore {
  const values = new Map<string, unknown>();
  const counters = new Map<string, number>();

  return {
    async allocateId(counterKey) {
      const next = (counters.get(counterKey) ?? 0) + 1;
      counters.set(counterKey, next);
      return next;
    },
    async loadStudent(studentId) {
      return (
        structuredClone(values.get(studentKeys(studentId).student) as AnonymousStudentRecord | undefined) ??
        null
      );
    },
    async saveStudent(record) {
      values.set(studentKeys(record.studentId).student, structuredClone(record));
    },
    async loadSavedPath(studentId, pathId) {
      return (
        structuredClone(
          values.get(studentKeys(studentId).savedPath(pathId)) as SavedLearningPath | undefined,
        ) ?? null
      );
    },
    async saveSavedPath(path) {
      values.set(studentKeys(path.studentId).savedPath(path.pathId), structuredClone(path));
    },
    async loadHistory(studentId) {
      return structuredClone(
        (values.get(studentKeys(studentId).history) as LearningPathHistoryEntry[] | undefined) ?? [],
      );
    },
    async saveHistory(studentId, entries) {
      values.set(studentKeys(studentId).history, structuredClone(entries));
    },
    async saveFeedback(studentId, feedback) {
      values.set(studentKeys(studentId).feedback, structuredClone(feedback));
    },
  };
}

export function newStudentRecord(numericId: number, now = new Date()) {
  const timestamp = now.toISOString();

  return {
    studentId: encodePublicId(numericId),
    numericId,
    createdAt: timestamp,
    lastSeenAt: timestamp,
  } satisfies AnonymousStudentRecord;
}

export async function allocateStudentRecord(store: StudentAreaStore) {
  return newStudentRecord(await store.allocateId(studentCounters.student));
}
