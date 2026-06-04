import { encodePublicId } from "@/server/ids/sqids";
import { getRedisClient } from "@/server/redis/client";
import { studentCounters, studentKeys } from "@/server/student-area/keys";
import type {
  AnonymousStudentRecord,
  BuilderFeedbackMessage,
  CurrentPathDraft,
  LearningPathHistoryEntry,
  SavedLearningPath,
} from "@/server/student-area/types";

export type StudentAreaStore = {
  allocateId(counterKey: string): Promise<number>;
  loadStudent(studentId: string): Promise<AnonymousStudentRecord | null>;
  saveStudent(record: AnonymousStudentRecord): Promise<void>;
  loadDraft(studentId: string): Promise<CurrentPathDraft | null>;
  saveDraft(draft: CurrentPathDraft): Promise<void>;
  deleteDraft(studentId: string): Promise<void>;
  loadActivePath(studentId: string): Promise<SavedLearningPath | null>;
  saveActivePath(path: SavedLearningPath): Promise<void>;
  deleteActivePath(studentId: string): Promise<void>;
  loadHistory(studentId: string): Promise<LearningPathHistoryEntry[]>;
  saveHistory(studentId: string, entries: LearningPathHistoryEntry[]): Promise<void>;
  saveFeedback(studentId: string, feedback: BuilderFeedbackMessage): Promise<void>;
  recoverSplitLearningData(studentId: string): Promise<void>;
  clearStudentLearningData(studentId: string): Promise<void>;
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
    await client.del(key);
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
    loadDraft(studentId) {
      return loadJson(studentKeys(studentId).draft);
    },
    saveDraft(draft) {
      return saveJson(studentKeys(draft.studentId).draft, draft);
    },
    async deleteDraft(studentId) {
      const client = await getRedisClient();
      await client.del(studentKeys(studentId).draft);
    },
    loadActivePath(studentId) {
      return loadJson(studentKeys(studentId).activePath);
    },
    saveActivePath(path) {
      return saveJson(studentKeys(path.studentId).activePath, path);
    },
    async deleteActivePath(studentId) {
      const client = await getRedisClient();
      await client.del(studentKeys(studentId).activePath);
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
    async recoverSplitLearningData(studentId) {
      const [student, activePath, draft, history] = await Promise.all([
        this.loadStudent(studentId),
        this.loadActivePath(studentId),
        this.loadDraft(studentId),
        this.loadHistory(studentId),
      ]);

      if (!student) {
        return;
      }

      const client = await getRedisClient();
      const historyKeys = await client.keys("student:*:paths:history");
      const candidates = await Promise.all(
        historyKeys.map(async (historyKey) => {
          const sourceStudentId = historyKey.split(":")[1];

          if (!sourceStudentId || sourceStudentId === studentId) {
            return null;
          }

          const sourceStudent = await this.loadStudent(sourceStudentId);
          const sourceHistory = await this.loadHistory(sourceStudentId);
          const sourceActivePath = await this.loadActivePath(sourceStudentId);

          if (!sourceStudent || sourceHistory.length === 0) {
            return null;
          }

          const createdDelta = Math.abs(
            Date.parse(sourceStudent.createdAt) - Date.parse(student.createdAt),
          );

          if (createdDelta > 10_000) {
            return null;
          }

          return {
            sourceStudentId,
            sourceHistory,
            sourceActivePath,
            sourceDraft: await this.loadDraft(sourceStudentId),
            latestSavedAt: Math.max(...sourceHistory.map((entry) => Date.parse(entry.savedAt))),
          };
        }),
      );
      const recovered = candidates
        .filter((candidate): candidate is NonNullable<typeof candidate> => Boolean(candidate))
        .toSorted((left, right) => right.latestSavedAt - left.latestSavedAt)[0];

      if (!recovered) {
        return;
      }

      if (!activePath && recovered.sourceActivePath) {
        await this.saveActivePath({
          ...recovered.sourceActivePath,
          studentId,
        });
      }

      if (!draft && recovered.sourceDraft) {
        await this.saveDraft({
          ...recovered.sourceDraft,
          studentId,
        });
      }

      const existingPathIds = new Set(history.map((entry) => entry.pathId));
      const recoveredHistory = recovered.sourceHistory
        .filter((entry) => !existingPathIds.has(entry.pathId))
        .map((entry) => ({
          ...entry,
          studentId,
        }));

      await this.saveHistory(
        studentId,
        [...recoveredHistory, ...history].toSorted(
          (left, right) => Date.parse(right.savedAt) - Date.parse(left.savedAt),
        ),
      );

      await client.del([
        studentKeys(recovered.sourceStudentId).draft,
        studentKeys(recovered.sourceStudentId).activePath,
        studentKeys(recovered.sourceStudentId).history,
      ]);
    },
    async clearStudentLearningData(studentId) {
      const client = await getRedisClient();
      const keys = studentKeys(studentId);
      await client.del([keys.draft, keys.activePath, keys.history, keys.feedback]);
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
      return (values.get(studentKeys(studentId).student) as AnonymousStudentRecord) ?? null;
    },
    async saveStudent(record) {
      values.set(studentKeys(record.studentId).student, structuredClone(record));
    },
    async loadDraft(studentId) {
      return (values.get(studentKeys(studentId).draft) as CurrentPathDraft) ?? null;
    },
    async saveDraft(draft) {
      values.set(studentKeys(draft.studentId).draft, structuredClone(draft));
    },
    async deleteDraft(studentId) {
      values.delete(studentKeys(studentId).draft);
    },
    async loadActivePath(studentId) {
      return (values.get(studentKeys(studentId).activePath) as SavedLearningPath) ?? null;
    },
    async saveActivePath(path) {
      values.set(studentKeys(path.studentId).activePath, structuredClone(path));
    },
    async deleteActivePath(studentId) {
      values.delete(studentKeys(studentId).activePath);
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
    async recoverSplitLearningData() {
      return;
    },
    async clearStudentLearningData(studentId) {
      const keys = studentKeys(studentId);
      values.delete(keys.draft);
      values.delete(keys.activePath);
      values.delete(keys.history);
      values.delete(keys.feedback);
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
