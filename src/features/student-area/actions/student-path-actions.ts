"use server";

import { learningTracks } from "@/content/tracks";
import { resolveActionStudentId } from "@/features/student-area/actions/action-student";
import { createActionSuccess, friendlyActionError } from "@/features/student-area/actions/action-results";
import {
  loadBuilderState,
  toggleTopicInDraft,
  toggleTrackInDraft,
  type BuilderState,
} from "@/features/student-area/server/builder-selection";
import { completePathItem, resetPathItem } from "@/features/student-area/server/path-progress";
import {
  createHistoryEntry,
  getEditableExistingPath,
  saveDraftAsActivePath,
} from "@/features/student-area/server/path-persistence";
import { movePathItem } from "@/features/student-area/server/path-reorder";
import { encodePublicId } from "@/server/ids/sqids";
import { studentCounters } from "@/server/student-area/keys";
import { countTopics } from "@/server/student-area/path-validation";
import { createRedisStudentAreaStore } from "@/server/student-area/repository";
import type { CurrentPathDraft, PathContextAction, PathItemLevel } from "@/server/student-area/types";

async function resolveStudentForPathAction(
  studentId: string,
  store: ReturnType<typeof createRedisStudentAreaStore>,
) {
  const resolvedStudentId = await resolveActionStudentId(studentId, store);
  await store.recoverSplitLearningData(resolvedStudentId);
  return resolvedStudentId;
}

async function loadActionBuilderState({
  studentId,
  store,
  editPathId,
}: {
  studentId: string;
  store: ReturnType<typeof createRedisStudentAreaStore>;
  editPathId?: string;
}) {
  if (editPathId) {
    return loadBuilderState({ studentId, catalog: learningTracks, store, editPathId });
  }

  const [activePath, draft] = await Promise.all([
    store.loadActivePath(studentId),
    store.loadDraft(studentId),
  ]);
  const inferredEditPathId =
    activePath && activePath.status !== "completed" && draft?.draftId === activePath.pathId
      ? activePath.pathId
      : undefined;

  return loadBuilderState({
    studentId,
    catalog: learningTracks,
    store,
    editPathId: inferredEditPathId,
  });
}

function stateFromSavedDraft(state: BuilderState, draft: CurrentPathDraft): BuilderState {
  const topicCount = countTopics(draft.trackGroups);

  return {
    availableTracks: state.availableTracks,
    draft,
    activePath: state.activePath,
    isEditingActivePath: state.isEditingActivePath,
    canSave: draft.dirty && topicCount > 0,
    canClear: topicCount > 0,
    canStartLearning: state.isEditingActivePath && !draft.dirty && topicCount > 0,
    learningActionLabel: state.learningActionLabel,
  };
}

export async function toggleTrackAction(
  studentId: string,
  trackSlug: string,
  selected: boolean,
  editPathId?: string,
) {
  const store = createRedisStudentAreaStore();

  try {
    studentId = await resolveStudentForPathAction(studentId, store);
    const state = await loadActionBuilderState({ studentId, store, editPathId });
    const draft = toggleTrackInDraft(state.draft, learningTracks, trackSlug, selected);
    await store.saveDraft(draft);
    const nextState = stateFromSavedDraft(state, draft);
    const trackTitle =
      learningTracks.find((track) => track.slug === trackSlug)?.title ?? "The selected track";

    return createActionSuccess(
      `${trackTitle} was ${selected ? "added to" : "removed from"} your current path.`,
      nextState,
      "toggle-track",
    );
  } catch (error) {
    return friendlyActionError(error, "The track could not be updated. Please try again.");
  }
}

export async function toggleTopicAction(
  studentId: string,
  trackSlug: string,
  topicSlug: string,
  selected: boolean,
  editPathId?: string,
) {
  const store = createRedisStudentAreaStore();

  try {
    studentId = await resolveStudentForPathAction(studentId, store);
    const state = await loadActionBuilderState({ studentId, store, editPathId });
    const draft = toggleTopicInDraft(state.draft, learningTracks, trackSlug, topicSlug, selected);
    await store.saveDraft(draft);
    const nextState = stateFromSavedDraft(state, draft);
    const topicTitle =
      learningTracks
        .find((track) => track.slug === trackSlug)
        ?.topics.find((topic) => topic.slug === topicSlug)?.title ?? "The selected topic";

    return createActionSuccess(
      `${topicTitle} was ${selected ? "added to" : "removed from"} your current path.`,
      nextState,
      "toggle-topic",
    );
  } catch (error) {
    return friendlyActionError(error, "The topic could not be updated. Please try again.");
  }
}

export async function applyContextMenuAction(
  studentId: string,
  level: PathItemLevel,
  trackSlug: string,
  topicSlug: string | undefined,
  action: PathContextAction,
  editPathId?: string,
) {
  const store = createRedisStudentAreaStore();

  try {
    studentId = await resolveStudentForPathAction(studentId, store);
    const state = await loadActionBuilderState({ studentId, store, editPathId });
    let draft = state.draft;
    let message = "Current path updated.";

    if (action === "remove") {
      draft =
        level === "track"
          ? toggleTrackInDraft(draft, learningTracks, trackSlug, false)
          : toggleTopicInDraft(draft, learningTracks, trackSlug, topicSlug ?? "", false);
      message = "Item removed from your current path.";
    }

    if (action === "move-up" || action === "move-down") {
      const result = movePathItem({
        draft,
        level,
        trackSlug,
        topicSlug,
        direction: action === "move-up" ? "up" : "down",
      });

      if (!result.ok) {
        return createActionSuccess(result.feedback, state, "blocked-reorder");
      }

      draft = result.draft;
      message = result.feedback;
    }

    if (action === "complete") {
      draft = completePathItem({ draft, level, trackSlug, topicSlug });
      message = "Completion state updated.";
    }

    if (action === "reset") {
      draft = resetPathItem({ draft, level, trackSlug, topicSlug });
      message = "Completion state reset.";
    }

    await store.saveDraft(draft);
    const nextState = stateFromSavedDraft(state, draft);
    return createActionSuccess(message, nextState, action);
  } catch (error) {
    return friendlyActionError(error, "The current path could not be updated. Please try again.");
  }
}

export async function saveDraftAction(studentId: string, editPathId?: string) {
  const store = createRedisStudentAreaStore();

  try {
    studentId = await resolveStudentForPathAction(studentId, store);
    const state = await loadActionBuilderState({ studentId, store, editPathId });
    const existingEditablePath = getEditableExistingPath(state.draft, state.activePath);
    const activePath = saveDraftAsActivePath({
      draft: state.draft,
      existingPath: existingEditablePath,
      pathId: encodePublicId(await store.allocateId(studentCounters.path)),
    });
    const history = await store.loadHistory(studentId);
    const existingHistoryEntry = history.find((entry) => entry.pathId === activePath.pathId);
    const historyEntry = createHistoryEntry({
      savedPath: activePath,
      historyId:
        existingHistoryEntry?.historyId ?? encodePublicId(await store.allocateId(studentCounters.history)),
      catalog: learningTracks,
    });
    const cleanDraft = {
      ...state.draft,
      dirty: false,
      updatedAt: activePath.updatedAt,
      trackGroups: activePath.trackGroups,
    };

    await store.saveActivePath(activePath);
    await store.saveDraft(cleanDraft);
    await store.saveHistory(
      studentId,
      existingHistoryEntry
        ? history.map((entry) => (entry.pathId === activePath.pathId ? historyEntry : entry))
        : [historyEntry, ...history],
    );

    const topicCount = activePath.trackGroups.reduce(
      (count, group) => count + group.topicItems.length,
      0,
    );
    const nextState = {
      availableTracks: learningTracks,
      draft: cleanDraft,
      activePath,
      isEditingActivePath: Boolean(existingEditablePath),
      canSave: false,
      canClear: Boolean(existingEditablePath) && topicCount > 0,
      canStartLearning: topicCount > 0,
      learningActionLabel:
        activePath.status === "in-progress" ? ("Continue Learning" as const) : ("Start Learning" as const),
    };
    return createActionSuccess("Learning path saved.", nextState, "save");
  } catch (error) {
    return friendlyActionError(error, "The learning path could not be saved. Please try again.");
  }
}

export async function discardChangesAction(studentId: string) {
  const store = createRedisStudentAreaStore();

  try {
    studentId = await resolveStudentForPathAction(studentId, store);
    const activePath = await store.loadActivePath(studentId);
    const currentDraft = await store.loadDraft(studentId);
    const draft = activePath &&
        activePath.status !== "completed" &&
        currentDraft?.draftId === activePath.pathId
      ? {
          draftId: activePath.pathId,
          studentId,
          dirty: false,
          updatedAt: new Date().toISOString(),
          trackGroups: activePath.trackGroups,
        }
      : {
          draftId: encodePublicId(await store.allocateId(studentCounters.path)),
          studentId,
          dirty: false,
          updatedAt: new Date().toISOString(),
          trackGroups: [],
        };

    await store.saveDraft(draft);
    const nextState = await loadBuilderState({ studentId, catalog: learningTracks, store });
    return createActionSuccess("Unsaved changes discarded.", nextState, "discard");
  } catch (error) {
    return friendlyActionError(error, "Changes could not be discarded. Please try again.");
  }
}

export async function clearLearningPathAction(studentId: string) {
  const store = createRedisStudentAreaStore();

  try {
    studentId = await resolveStudentForPathAction(studentId, store);
    const [activePath, draft, history] = await Promise.all([
      store.loadActivePath(studentId),
      store.loadDraft(studentId),
      store.loadHistory(studentId),
    ]);
    const isEditingActivePath = Boolean(
      activePath && activePath.status !== "completed" && draft?.draftId === activePath.pathId,
    );

    if (isEditingActivePath && activePath) {
      await store.deleteActivePath(studentId);
      await store.saveHistory(
        studentId,
        history.filter((entry) => entry.pathId !== activePath.pathId),
      );
    }

    await store.deleteDraft(studentId);
    const nextState = await loadBuilderState({ studentId, catalog: learningTracks, store });
    return createActionSuccess("Learning path cleared.", nextState, "clear");
  } catch (error) {
    return friendlyActionError(error, "The learning path could not be cleared. Please try again.");
  }
}
