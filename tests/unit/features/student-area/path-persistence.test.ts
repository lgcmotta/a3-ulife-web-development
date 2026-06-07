import { describe, expect, it } from "vitest";

import { learningTracks } from "@/content/tracks";
import {
  createHistoryEntry,
  getLearningDestination,
  getTopicNavigationState,
  saveCompositionAsLearningPath,
  upsertHistoryEntry,
} from "@/features/student-area/server/path-persistence";
import { completeSavedPathTopic, getPathProgressSummary } from "@/features/student-area/server/path-progress";
import {
  fixtureDraft,
  fixtureSavedPath,
  fixtureSavedPathWithGroups,
  fixtureStudentId,
  fixtureTrackGroup,
} from "../../fixtures/student-area";

describe("path persistence", () => {
  it("creates a saved learning path and history entry from local builder composition", () => {
    const saved = saveCompositionAsLearningPath({
      studentId: fixtureStudentId,
      trackGroups: fixtureDraft.trackGroups,
      existingPath: null,
      pathId: "path001",
      catalog: learningTracks,
      now: new Date("2026-06-03T10:00:00.000Z"),
    });
    const history = createHistoryEntry({
      savedPath: saved,
      historyId: "hist001",
      catalog: learningTracks,
    });

    expect(saved.pathId).toBe("path001");
    expect(saved.studentId).toBe(fixtureStudentId);
    expect(saved.status).toBe("not-started");
    expect(history).toMatchObject({
      pathId: "path001",
      trackSummary: "Programming Foundations",
      topicCount: 1,
      completedTopicCount: 0,
    });
  });

  it("updates an existing saved path ID without creating a duplicate history row", () => {
    const saved = saveCompositionAsLearningPath({
      studentId: fixtureStudentId,
      trackGroups: fixtureDraft.trackGroups,
      existingPath: fixtureSavedPath,
      pathId: "path999",
      catalog: learningTracks,
      now: new Date("2026-06-03T11:00:00.000Z"),
    });
    const existingHistory = [
      createHistoryEntry({
        savedPath: fixtureSavedPath,
        historyId: "hist001",
        catalog: learningTracks,
      }),
    ];
    const history = upsertHistoryEntry(
      existingHistory,
      createHistoryEntry({ savedPath: saved, historyId: "hist002", catalog: learningTracks }),
    );

    expect(saved.pathId).toBe(fixtureSavedPath.pathId);
    expect(history).toHaveLength(1);
    expect(history[0]).toMatchObject({
      historyId: "hist002",
      pathId: fixtureSavedPath.pathId,
      savedAt: "2026-06-03T11:00:00.000Z",
    });
  });

  it("preserves retained progress, initializes new topics, and removes dropped topic progress", () => {
    const existing = fixtureSavedPathWithGroups({
      status: "in-progress",
      lastActiveTopicSlug: "problem-solving-basics",
      trackGroups: [
        fixtureTrackGroup({
          topicSlugs: ["problem-solving-basics", "variables-and-flow"],
          completedTopicSlugs: ["problem-solving-basics"],
        }),
      ],
    });
    const saved = saveCompositionAsLearningPath({
      studentId: fixtureStudentId,
      trackGroups: [
        fixtureTrackGroup({ topicSlugs: ["problem-solving-basics"] }),
        {
          trackSlug: "web-and-accessibility",
          order: 1,
          topicItems: [
            {
              topicSlug: "semantic-structure",
              trackSlug: "web-and-accessibility",
              order: 0,
              completed: false,
              completedAt: null,
            },
          ],
        },
      ],
      existingPath: existing,
      pathId: "path999",
      catalog: learningTracks,
      now: new Date("2026-06-03T11:00:00.000Z"),
    });

    expect(saved.pathId).toBe(fixtureSavedPath.pathId);
    expect(saved.trackGroups.flatMap((group) => group.topicItems.map((topic) => topic.topicSlug))).toEqual([
      "problem-solving-basics",
      "semantic-structure",
    ]);
    expect(saved.trackGroups[0]?.topicItems[0]).toMatchObject({
      topicSlug: "problem-solving-basics",
      completed: true,
      completedAt: "2026-06-03T10:30:00.000Z",
    });
    expect(saved.trackGroups[1]?.topicItems[0]).toMatchObject({
      topicSlug: "semantic-structure",
      completed: false,
      completedAt: null,
    });
    expect(saved.lastActiveTopicSlug).toBe("problem-solving-basics");
    expect(JSON.stringify(saved.trackGroups)).not.toContain("variables-and-flow");
  });

  it("routes learning to the first uncompleted topic or completion screen", () => {
    const saved = saveCompositionAsLearningPath({
      studentId: fixtureStudentId,
      trackGroups: fixtureDraft.trackGroups,
      existingPath: null,
      pathId: "path001",
      catalog: learningTracks,
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

  it("derives previous and next hrefs for a middle topic", () => {
    const saved = fixtureSavedPathWithGroups({
      pathId: "path001",
      trackGroups: [
        fixtureTrackGroup({
          topicSlugs: ["problem-solving-basics", "variables-and-flow", "debugging-habits"],
        }),
      ],
    });

    const navigation = getTopicNavigationState(saved, "variables-and-flow");

    expect(navigation.currentTopic?.topicSlug).toBe("variables-and-flow");
    expect(navigation.previousTopic?.topicSlug).toBe("problem-solving-basics");
    expect(navigation.nextTopic?.topicSlug).toBe("debugging-habits");
    expect(navigation.previousHref).toBe("/tracks/learn/path001/problem-solving-basics");
    expect(navigation.nextHref).toBe("/tracks/learn/path001/debugging-habits");
    expect(navigation.isCurrentTopicCompleted).toBe(false);
  });

  it("derives boundary hrefs for first, last, and single-topic paths", () => {
    const saved = fixtureSavedPathWithGroups({
      pathId: "path001",
      trackGroups: [
        fixtureTrackGroup({
          topicSlugs: ["problem-solving-basics", "variables-and-flow", "debugging-habits"],
        }),
      ],
    });
    const singleTopic = fixtureSavedPathWithGroups({
      pathId: "path002",
      trackGroups: [fixtureTrackGroup({ topicSlugs: ["semantic-structure"] })],
    });

    expect(getTopicNavigationState(saved, "problem-solving-basics")).toMatchObject({
      previousHref: null,
      nextHref: "/tracks/learn/path001/variables-and-flow",
    });
    expect(getTopicNavigationState(saved, "debugging-habits")).toMatchObject({
      previousHref: "/tracks/learn/path001/variables-and-flow",
      nextHref: null,
    });
    expect(getTopicNavigationState(singleTopic, "semantic-structure")).toMatchObject({
      previousHref: null,
      nextHref: null,
    });
  });

  it("reports completed current topic without mutating saved path data", () => {
    const saved = fixtureSavedPathWithGroups({
      pathId: "path001",
      status: "in-progress",
      trackGroups: [
        fixtureTrackGroup({
          topicSlugs: ["problem-solving-basics", "variables-and-flow"],
          completedTopicSlugs: ["problem-solving-basics"],
        }),
      ],
    });
    const before = JSON.stringify(saved);

    const navigation = getTopicNavigationState(saved, "problem-solving-basics");

    expect(navigation.isCurrentTopicCompleted).toBe(true);
    expect(navigation.currentTopic?.completed).toBe(true);
    expect(JSON.stringify(saved)).toBe(before);
  });

  it("updates final-topic completion status and progress counts", () => {
    const saved = saveCompositionAsLearningPath({
      studentId: fixtureStudentId,
      trackGroups: fixtureDraft.trackGroups,
      existingPath: null,
      pathId: "path001",
      catalog: learningTracks,
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

  it("does not allow builder saves to rewrite completed paths", () => {
    const completed = {
      ...fixtureSavedPath,
      status: "completed" as const,
      completedAt: "2026-06-03T10:30:00.000Z",
    };

    expect(() =>
      saveCompositionAsLearningPath({
        studentId: fixtureStudentId,
        trackGroups: fixtureDraft.trackGroups,
        existingPath: completed,
        pathId: completed.pathId,
        catalog: learningTracks,
      }),
    ).toThrow(/completed learning paths/i);
  });
});
