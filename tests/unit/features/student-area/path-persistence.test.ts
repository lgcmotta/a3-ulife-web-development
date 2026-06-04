import { describe, expect, it } from "vitest";

import { learningTracks } from "@/content/tracks";
import {
  createHistoryEntry,
  getLearningDestination,
  getEditableExistingPath,
  saveDraftAsActivePath,
} from "@/features/student-area/server/path-persistence";
import { completeSavedPathTopic, getPathProgressSummary } from "@/features/student-area/server/path-progress";
import { fixtureDraft, fixtureStudentId } from "../../fixtures/student-area";

describe("path persistence", () => {
  it("saves a valid draft as an active path and history entry", () => {
    const saved = saveDraftAsActivePath({
      draft: fixtureDraft,
      existingPath: null,
      pathId: "path001",
      now: new Date("2026-06-03T10:00:00.000Z"),
    });
    const history = createHistoryEntry({
      savedPath: saved,
      historyId: "hist001",
      catalog: learningTracks,
    });

    expect(saved.studentId).toBe(fixtureStudentId);
    expect(saved.status).toBe("not-started");
    expect(history.trackSummary).toBe("Programming Foundations");
    expect(history.topicCount).toBe(1);
  });

  it("routes learning to the first uncompleted topic or completion screen", () => {
    const saved = saveDraftAsActivePath({
      draft: fixtureDraft,
      existingPath: null,
      pathId: "path001",
      now: new Date("2026-06-03T10:00:00.000Z"),
    });

    expect(getLearningDestination(saved)).toBe("/tracks/learn/path001/problem-solving-basics");

    const completed = {
      ...saved,
      status: "completed" as const,
      trackGroups: saved.trackGroups.map((group) => ({
        ...group,
        topicItems: group.topicItems.map((topic) => ({ ...topic, completed: true })),
      })),
    };

    expect(getLearningDestination(completed)).toBe("/tracks/learn/path001/complete");
  });

  it("updates final-topic completion status and progress counts", () => {
    const saved = saveDraftAsActivePath({
      draft: fixtureDraft,
      existingPath: null,
      pathId: "path001",
      now: new Date("2026-06-03T10:00:00.000Z"),
    });

    const updated = completeSavedPathTopic({
      savedPath: saved,
      topicSlug: "problem-solving-basics",
      now: new Date("2026-06-03T10:30:00.000Z"),
    });
    const progress = getPathProgressSummary(updated);

    expect(updated.status).toBe("completed");
    expect(updated.completedAt).toBe("2026-06-03T10:30:00.000Z");
    expect(progress).toMatchObject({
      topicCount: 1,
      completedTopicCount: 1,
      status: "completed",
    });
  });

  it("does not reuse completed paths when saving a new builder draft", () => {
    const completed = {
      ...saveDraftAsActivePath({
        draft: fixtureDraft,
        existingPath: null,
        pathId: "path001",
        now: new Date("2026-06-03T10:00:00.000Z"),
      }),
      status: "completed" as const,
      completedAt: "2026-06-03T10:30:00.000Z",
    };

    expect(getEditableExistingPath(fixtureDraft, completed)).toBeNull();

    const next = saveDraftAsActivePath({
      draft: fixtureDraft,
      existingPath: getEditableExistingPath(fixtureDraft, completed),
      pathId: "path002",
      now: new Date("2026-06-03T11:00:00.000Z"),
    });

    expect(next.pathId).toBe("path002");
  });
});
