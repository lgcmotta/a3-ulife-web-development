import type { LearningTrack } from "@/content/types";
import { encodePublicId } from "@/server/ids/sqids";
import { studentCounters } from "@/server/student-area/keys";
import { countTopics, normalizePathGroups } from "@/server/student-area/path-validation";
import type { StudentAreaStore } from "@/server/student-area/repository";
import type {
  BuilderSelectionState,
  CurrentPathDraft,
  PathTopicItem,
  PathTrackGroup,
  SavedLearningPath,
} from "@/server/student-area/types";

export type BuilderState = {
  availableTracks: LearningTrack[];
  draft: CurrentPathDraft;
  activePath: SavedLearningPath | null;
  isEditingActivePath: boolean;
  canSave: boolean;
  canClear: boolean;
  canStartLearning: boolean;
  learningActionLabel: "Start Learning" | "Continue Learning";
};

export function createEmptyDraft(studentId: string, draftId: string): CurrentPathDraft {
  return {
    draftId,
    studentId,
    dirty: false,
    updatedAt: new Date().toISOString(),
    trackGroups: [],
  };
}

export function draftFromSavedPath(savedPath: SavedLearningPath): CurrentPathDraft {
  return {
    draftId: savedPath.pathId,
    studentId: savedPath.studentId,
    dirty: false,
    updatedAt: new Date().toISOString(),
    trackGroups: savedPath.trackGroups,
  };
}

function createTopicItem(trackSlug: string, topicSlug: string, order: number): PathTopicItem {
  return {
    trackSlug,
    topicSlug,
    order,
    completed: false,
    completedAt: null,
  };
}

function markDirty(draft: CurrentPathDraft, dirty = true): CurrentPathDraft {
  return {
    ...draft,
    dirty,
    updatedAt: new Date().toISOString(),
  };
}

export function toggleTrackInDraft(
  draft: CurrentPathDraft,
  catalog: LearningTrack[],
  trackSlug: string,
  selected: boolean,
) {
  const track = catalog.find((candidate) => candidate.slug === trackSlug);
  if (!track) {
    return draft;
  }

  const remaining = draft.trackGroups.filter((group) => group.trackSlug !== trackSlug);

  if (!selected) {
    return markDirty({ ...draft, trackGroups: normalizePathGroups(remaining) });
  }

  const group: PathTrackGroup = {
    trackSlug,
    order: remaining.length,
    topicItems: track.topics.map((topic, order) => createTopicItem(trackSlug, topic.slug, order)),
  };

  return markDirty({ ...draft, trackGroups: normalizePathGroups([...remaining, group]) });
}

export function toggleTopicInDraft(
  draft: CurrentPathDraft,
  catalog: LearningTrack[],
  trackSlug: string,
  topicSlug: string,
  selected: boolean,
) {
  const track = catalog.find((candidate) => candidate.slug === trackSlug);
  const topic = track?.topics.find((candidate) => candidate.slug === topicSlug);

  if (!track || !topic) {
    return draft;
  }

  const existingGroup = draft.trackGroups.find((group) => group.trackSlug === trackSlug);
  const otherGroups = draft.trackGroups.filter((group) => group.trackSlug !== trackSlug);
  const currentTopics = existingGroup?.topicItems.filter((item) => item.topicSlug !== topicSlug) ?? [];

  if (selected) {
    currentTopics.push(createTopicItem(trackSlug, topicSlug, currentTopics.length));
  }

  const nextGroups =
    currentTopics.length > 0
      ? [
          ...otherGroups,
          {
            trackSlug,
            order: existingGroup?.order ?? otherGroups.length,
            topicItems: currentTopics,
          },
        ]
      : otherGroups;

  return markDirty({ ...draft, trackGroups: normalizePathGroups(nextGroups) });
}

export function getTrackSelectionState(
  draft: CurrentPathDraft,
  trackSlug: string,
  catalog: LearningTrack[],
): BuilderSelectionState {
  const track = catalog.find((candidate) => candidate.slug === trackSlug);
  const group = draft.trackGroups.find((candidate) => candidate.trackSlug === trackSlug);

  if (!track || !group || group.topicItems.length === 0) {
    return "unselected";
  }

  return group.topicItems.length === track.topics.length ? "selected" : "partial";
}

export function isTopicSelected(draft: CurrentPathDraft, trackSlug: string, topicSlug: string) {
  return Boolean(
    draft.trackGroups
      .find((group) => group.trackSlug === trackSlug)
      ?.topicItems.some((topic) => topic.topicSlug === topicSlug),
  );
}

export async function loadBuilderState({
  studentId,
  catalog,
  store,
  editPathId,
}: {
  studentId: string;
  catalog: LearningTrack[];
  store: StudentAreaStore;
  editPathId?: string;
}): Promise<BuilderState> {
  const activePath = await store.loadActivePath(studentId);
  let draft = await store.loadDraft(studentId);
  const canEditActivePath = Boolean(
    editPathId &&
      activePath &&
      activePath.pathId === editPathId &&
      activePath.status !== "completed",
  );

  if (canEditActivePath && activePath && draft?.draftId !== activePath.pathId) {
    draft = draftFromSavedPath(activePath);
    await store.saveDraft(draft);
  }

  if (
    !canEditActivePath &&
    activePath &&
    (!draft || draft.draftId === activePath.pathId || !draft.dirty)
  ) {
    draft = createEmptyDraft(studentId, encodePublicId(await store.allocateId(studentCounters.path)));
    await store.saveDraft(draft);
  }

  if (!draft && activePath && canEditActivePath) {
    draft = draftFromSavedPath(activePath);
    await store.saveDraft(draft);
  }

  if (!draft) {
    draft = createEmptyDraft(studentId, encodePublicId(await store.allocateId(studentCounters.path)));
    await store.saveDraft(draft);
  }

  const topicCount = countTopics(draft.trackGroups);
  const isEditingActivePath = Boolean(
    activePath && activePath.status !== "completed" && draft.draftId === activePath.pathId,
  );

  return {
    availableTracks: catalog,
    draft,
    activePath,
    isEditingActivePath,
    canSave: draft.dirty && topicCount > 0,
    canClear: topicCount > 0,
    canStartLearning: isEditingActivePath && !draft.dirty && topicCount > 0,
    learningActionLabel: activePath?.status === "in-progress" ? "Continue Learning" : "Start Learning",
  };
}
