import type { LearningTrack } from "@/content/types";
import { countTopics, normalizePathGroups } from "@/server/student-area/path-validation";
import type { StudentAreaStore } from "@/server/student-area/repository";
import type {
  BuilderMode,
  BuilderSelectionState,
  CurrentPathDraft,
  PathTopicItem,
  PathTrackGroup,
  SavedLearningPath,
} from "@/server/student-area/types";

export type BuilderState = {
  availableTracks: LearningTrack[];
  draft: CurrentPathDraft;
  initialDraft: CurrentPathDraft;
  savedPathId: string | null;
  mode: BuilderMode;
  loadMessage: string | null;
  canSave: boolean;
  canClear: boolean;
  canStartLearning: boolean;
  learningActionLabel: "Start Learning" | "Continue Learning";
};

export function createEmptyDraft(studentId: string, draftId = "new-path"): CurrentPathDraft {
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
    trackGroups: normalizePathGroups(savedPath.trackGroups),
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

function markEdited(draft: CurrentPathDraft): CurrentPathDraft {
  return {
    ...draft,
    dirty: true,
    updatedAt: new Date().toISOString(),
  };
}

export function arePathGroupsEqual(left: PathTrackGroup[], right: PathTrackGroup[]) {
  const normalizeForCompare = (groups: PathTrackGroup[]) =>
    normalizePathGroups(groups).map((group) => ({
      trackSlug: group.trackSlug,
      topicItems: group.topicItems.map((topic) => topic.topicSlug),
    }));

  return JSON.stringify(normalizeForCompare(left)) === JSON.stringify(normalizeForCompare(right));
}

export function withDraft(state: BuilderState, draft: CurrentPathDraft): BuilderState {
  const normalizedDraft = {
    ...draft,
    trackGroups: normalizePathGroups(draft.trackGroups),
  };
  const dirty = !arePathGroupsEqual(normalizedDraft.trackGroups, state.initialDraft.trackGroups);
  const nextDraft = {
    ...normalizedDraft,
    dirty,
  };
  const topicCount = countTopics(nextDraft.trackGroups);

  return {
    ...state,
    draft: nextDraft,
    canSave: dirty && topicCount > 0,
    canClear: topicCount > 0,
    canStartLearning: Boolean(state.savedPathId) && !dirty && topicCount > 0,
  };
}

export function resetBuilderToInitial(state: BuilderState): BuilderState {
  return withDraft(state, {
    ...state.initialDraft,
    updatedAt: new Date().toISOString(),
  });
}

export function markSavedState(state: BuilderState, savedPath: SavedLearningPath): BuilderState {
  const cleanDraft = draftFromSavedPath(savedPath);
  const nextState: BuilderState = {
    ...state,
    draft: cleanDraft,
    initialDraft: cleanDraft,
    savedPathId: savedPath.pathId,
    mode: "edit",
    loadMessage: null,
    learningActionLabel: savedPath.status === "in-progress" ? "Continue Learning" : "Start Learning",
  };

  return withDraft(nextState, cleanDraft);
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
    return markEdited({ ...draft, trackGroups: normalizePathGroups(remaining) });
  }

  const group: PathTrackGroup = {
    trackSlug,
    order: remaining.length,
    topicItems: track.topics.map((topic, order) => createTopicItem(trackSlug, topic.slug, order)),
  };

  return markEdited({ ...draft, trackGroups: normalizePathGroups([...remaining, group]) });
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

  return markEdited({ ...draft, trackGroups: normalizePathGroups(nextGroups) });
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

function createState({
  catalog,
  initialDraft,
  savedPath,
  mode,
  loadMessage = null,
}: {
  catalog: LearningTrack[];
  initialDraft: CurrentPathDraft;
  savedPath: SavedLearningPath | null;
  mode: BuilderMode;
  loadMessage?: string | null;
}): BuilderState {
  const topicCount = countTopics(initialDraft.trackGroups);
  const state: BuilderState = {
    availableTracks: catalog,
    draft: initialDraft,
    initialDraft,
    savedPathId: savedPath?.pathId ?? null,
    mode,
    loadMessage,
    canSave: false,
    canClear: topicCount > 0,
    canStartLearning: Boolean(savedPath) && topicCount > 0,
    learningActionLabel: savedPath?.status === "in-progress" ? "Continue Learning" : "Start Learning",
  };

  return withDraft(state, initialDraft);
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
  if (!editPathId) {
    const emptyDraft = createEmptyDraft(studentId);
    return createState({
      catalog,
      initialDraft: emptyDraft,
      savedPath: null,
      mode: "create",
    });
  }

  const savedPath = await store.loadSavedPath(studentId, editPathId);

  if (!savedPath) {
    const emptyDraft = createEmptyDraft(studentId);
    return createState({
      catalog,
      initialDraft: emptyDraft,
      savedPath: null,
      mode: "create",
      loadMessage: "This saved learning path could not be found. A new empty builder is ready.",
    });
  }

  if (savedPath.status === "completed") {
    const emptyDraft = createEmptyDraft(studentId);
    return createState({
      catalog,
      initialDraft: emptyDraft,
      savedPath: null,
      mode: "create",
      loadMessage: "Completed learning paths are kept in history and cannot be edited.",
    });
  }

  return createState({
    catalog,
    initialDraft: draftFromSavedPath(savedPath),
    savedPath,
    mode: "edit",
  });
}
