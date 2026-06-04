import { describe, expect, it } from "vitest";

import { createMemoryStudentAreaStore, newStudentRecord } from "@/server/student-area/repository";
import { fixtureSavedPath, fixtureStudentId } from "../../fixtures/student-area";

describe("student area repository", () => {
  it("persists saved paths, history, and feedback independently", async () => {
    const store = createMemoryStudentAreaStore();
    const student = newStudentRecord(1, new Date("2026-06-03T10:00:00.000Z"));

    await store.saveStudent(student);
    await store.saveSavedPath(fixtureSavedPath);
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
    await expect(store.loadSavedPath(fixtureStudentId, fixtureSavedPath.pathId)).resolves.toEqual(
      fixtureSavedPath,
    );
    await expect(store.loadHistory(fixtureStudentId)).resolves.toHaveLength(1);
  });

  it("loads saved path snapshots without mutating stored data", async () => {
    const store = createMemoryStudentAreaStore();

    await store.saveSavedPath(fixtureSavedPath);

    const loaded = await store.loadSavedPath(fixtureStudentId, fixtureSavedPath.pathId);
    loaded!.trackGroups[0]!.topicItems[0]!.completed = true;

    await expect(store.loadSavedPath(fixtureStudentId, fixtureSavedPath.pathId)).resolves.toEqual(
      fixtureSavedPath,
    );
  });

  it("does not expose a learning path delete operation", () => {
    const store = createMemoryStudentAreaStore();

    expect("deleteSavedPath" in store).toBe(false);
    expect("deleteActivePath" in store).toBe(false);
    expect("deleteDraft" in store).toBe(false);
  });
});
