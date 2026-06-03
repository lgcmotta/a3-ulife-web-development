import { learningTracks } from "@/content/tracks";
import type { CurrentPathDraft, SavedLearningPath } from "@/server/student-area/types";

export const fixtureStudentId = "abc1234";
export const fixturePathId = "path001";

export const fixtureCatalog = learningTracks;

export const fixtureDraft: CurrentPathDraft = {
  draftId: "draft01",
  studentId: fixtureStudentId,
  dirty: true,
  updatedAt: "2026-06-03T10:00:00.000Z",
  trackGroups: [
    {
      trackSlug: "programming-foundations",
      order: 0,
      topicItems: [
        {
          topicSlug: "problem-solving-basics",
          trackSlug: "programming-foundations",
          order: 0,
          completed: false,
          completedAt: null,
        },
      ],
    },
  ],
};

export const fixtureSavedPath: SavedLearningPath = {
  pathId: fixturePathId,
  studentId: fixtureStudentId,
  status: "not-started",
  lastActiveTopicSlug: null,
  createdAt: "2026-06-03T10:05:00.000Z",
  updatedAt: "2026-06-03T10:05:00.000Z",
  completedAt: null,
  trackGroups: fixtureDraft.trackGroups,
};
