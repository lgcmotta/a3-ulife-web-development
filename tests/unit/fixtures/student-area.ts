import { learningTracks } from "@/content/tracks";
import type {
  CurrentPathDraft,
  PathStatus,
  PathTopicItem,
  PathTrackGroup,
  SavedLearningPath,
} from "@/server/student-area/types";

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

export function fixtureTopicItem({
  trackSlug = "programming-foundations",
  topicSlug,
  order,
  completed = false,
  completedAt = null,
}: {
  trackSlug?: string;
  topicSlug: string;
  order: number;
  completed?: boolean;
  completedAt?: string | null;
}): PathTopicItem {
  return {
    topicSlug,
    trackSlug,
    order,
    completed,
    completedAt,
  };
}

export function fixtureTrackGroup({
  trackSlug = "programming-foundations",
  topicSlugs,
  order = 0,
  completedTopicSlugs = [],
  completedAt = "2026-06-03T10:30:00.000Z",
}: {
  trackSlug?: string;
  topicSlugs: string[];
  order?: number;
  completedTopicSlugs?: string[];
  completedAt?: string;
}): PathTrackGroup {
  return {
    trackSlug,
    order,
    topicItems: topicSlugs.map((topicSlug, topicOrder) =>
      fixtureTopicItem({
        trackSlug,
        topicSlug,
        order: topicOrder,
        completed: completedTopicSlugs.includes(topicSlug),
        completedAt: completedTopicSlugs.includes(topicSlug) ? completedAt : null,
      }),
    ),
  };
}

export function fixtureSavedPathWithGroups({
  trackGroups,
  pathId = fixturePathId,
  status = "not-started",
  lastActiveTopicSlug = null,
  completedAt = null,
}: {
  trackGroups: PathTrackGroup[];
  pathId?: string;
  status?: PathStatus;
  lastActiveTopicSlug?: string | null;
  completedAt?: string | null;
}): SavedLearningPath {
  return {
    ...fixtureSavedPath,
    pathId,
    status,
    lastActiveTopicSlug,
    completedAt,
    trackGroups,
  };
}
