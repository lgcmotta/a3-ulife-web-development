import { describe, expect, it } from "vitest";

import { createMemoryStudentAreaStore, newStudentRecord } from "@/server/student-area/repository";
import { fixtureDraft, fixtureSavedPath, fixtureStudentId } from "../../fixtures/student-area";

describe("student area repository", () => {
  it("persists draft, active path, history, and feedback independently", async () => {
    const store = createMemoryStudentAreaStore();
    const student = newStudentRecord(1, new Date("2026-06-03T10:00:00.000Z"));

    await store.saveStudent(student);
    await store.saveDraft(fixtureDraft);
    await store.saveActivePath(fixtureSavedPath);
    await store.saveHistory(fixtureStudentId, [
      {
        historyId: "hist001",
        studentId: fixtureStudentId,
        pathId: fixtureSavedPath.pathId,
        savedAt: fixtureSavedPath.updatedAt,
        trackSummary: "Programming Foundations",
        topicCount: 1,
        completedTopicCount: 0,
        status: "not-started",
      },
    ]);
    await store.saveFeedback(fixtureStudentId, {
      messageId: "msg001",
      kind: "success",
      message: "Saved.",
      relatedAction: "save",
    });

    await expect(store.loadStudent(student.studentId)).resolves.toEqual(student);
    await expect(store.loadDraft(fixtureStudentId)).resolves.toEqual(fixtureDraft);
    await expect(store.loadActivePath(fixtureStudentId)).resolves.toEqual(fixtureSavedPath);
    await expect(store.loadHistory(fixtureStudentId)).resolves.toHaveLength(1);
  });
});
