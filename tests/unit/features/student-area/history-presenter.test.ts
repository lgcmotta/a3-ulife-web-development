import { describe, expect, it } from "vitest";

import { presentHistoryRows } from "@/features/student-area/server/history-presenter";
import { fixtureSavedPath } from "../../fixtures/student-area";

describe("history presenter", () => {
  it("formats status and progress as readable table text", () => {
    const rows = presentHistoryRows([
      {
        historyId: "hist001",
        studentId: "abc1234",
        pathId: "path001",
        savedAt: "2026-06-03T10:05:00.000Z",
        trackSummary: "Programming Foundations",
        topicCount: 3,
        completedTopicCount: 1,
        status: "in-progress",
      },
    ]);

    expect(rows[0]).toMatchObject({
      savedLabel: "Jun 3, 2026",
      trackSummary: "Programming Foundations",
      progressLabel: "1 of 3 topics complete",
      statusLabel: "In progress",
    });
  });

  it("uses the current active path when the saved history snapshot is stale", () => {
    const activePath = {
      ...fixtureSavedPath,
      status: "completed" as const,
      completedAt: "2026-06-03T10:30:00.000Z",
      trackGroups: fixtureSavedPath.trackGroups.map((group) => ({
        ...group,
        topicItems: group.topicItems.map((topic) => ({
          ...topic,
          completed: true,
          completedAt: "2026-06-03T10:30:00.000Z",
        })),
      })),
    };
    const rows = presentHistoryRows(
      [
        {
          historyId: "hist001",
          studentId: activePath.studentId,
          pathId: activePath.pathId,
          savedAt: "2026-06-03T10:05:00.000Z",
          trackSummary: "Programming Foundations",
          topicCount: 1,
          completedTopicCount: 0,
          status: "not-started",
        },
      ],
      activePath,
    );

    expect(rows[0]).toMatchObject({
      progressLabel: "1 of 1 topics complete",
      statusLabel: "Completed",
      resumeTarget: null,
      editTarget: null,
    });
  });

  it("adds resume and edit targets for unfinished active paths", () => {
    const activePath = {
      ...fixtureSavedPath,
      status: "in-progress" as const,
      trackGroups: fixtureSavedPath.trackGroups.map((group) => ({
        ...group,
        topicItems: [
          { ...group.topicItems[0]!, completed: true, completedAt: "2026-06-03T10:20:00.000Z" },
          {
            topicSlug: "variables-and-flow",
            trackSlug: "programming-foundations",
            order: 1,
            completed: false,
            completedAt: null,
          },
        ],
      })),
    };

    const rows = presentHistoryRows(
      [
        {
          historyId: "hist001",
          studentId: activePath.studentId,
          pathId: activePath.pathId,
          savedAt: "2026-06-03T10:05:00.000Z",
          trackSummary: "Programming Foundations",
          topicCount: 2,
          completedTopicCount: 0,
          status: "not-started",
        },
      ],
      activePath,
    );

    expect(rows[0]).toMatchObject({
      progressLabel: "1 of 2 topics complete",
      statusLabel: "In progress",
      resumeTarget: "/tracks/learn/path001/variables-and-flow",
      editTarget: "/tracks/builder?edit=path001",
    });
  });
});
