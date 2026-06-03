"use server";

import { learningTracks } from "@/content/tracks";
import { resolveActionStudentId } from "@/features/student-area/actions/action-student";
import { createActionSuccess, friendlyActionError } from "@/features/student-area/actions/action-results";
import {
  loadBuilderState,
  toggleTopicInDraft,
  toggleTrackInDraft,
} from "@/features/student-area/server/builder-selection";
import { completePathItem, resetPathItem } from "@/features/student-area/server/path-progress";
import {
  createHistoryEntry,
  saveDraftAsActivePath,
} from "@/features/student-area/server/path-persistence";
import { movePathItem } from "@/features/student-area/server/path-reorder";
import { encodePublicId } from "@/server/ids/sqids";
import { studentCounters } from "@/server/student-area/keys";
import { createRedisStudentAreaStore } from "@/server/student-area/repository";
import type { PathContextAction, PathItemLevel } from "@/server/student-area/types";

export async function toggleTrackAction(studentId: string, trackSlug: string, selected: boolean) {
  const store = createRedisStudentAreaStore();

  try {
    studentId = await resolveActionStudentId(studentId, store);
    const state = await loadBuilderState({ studentId, catalog: learningTracks, store });
    const draft = toggleTrackInDraft(state.draft, learningTracks, trackSlug, selected);
    await store.saveDraft(draft);
    const nextState = await loadBuilderState({ studentId, catalog: learningTracks, store });
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
) {
  const store = createRedisStudentAreaStore();

  try {
    studentId = await resolveActionStudentId(studentId, store);
    const state = await loadBuilderState({ studentId, catalog: learningTracks, store });
    const draft = toggleTopicInDraft(state.draft, learningTracks, trackSlug, topicSlug, selected);
    await store.saveDraft(draft);
    const nextState = await loadBuilderState({ studentId, catalog: learningTracks, store });
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
) {
  const store = createRedisStudentAreaStore();

  try {
    studentId = await resolveActionStudentId(studentId, store);
    const state = await loadBuilderState({ studentId, catalog: learningTracks, store });
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
    const nextState = await loadBuilderState({ studentId, catalog: learningTracks, store });
    return createActionSuccess(message, nextState, action);
  } catch (error) {
    return friendlyActionError(error, "The current path could not be updated. Please try again.");
  }
}

export async function saveDraftAction(studentId: string) {
  const store = createRedisStudentAreaStore();

  try {
    studentId = await resolveActionStudentId(studentId, store);
    const state = await loadBuilderState({ studentId, catalog: learningTracks, store });
    const activePath = saveDraftAsActivePath({
      draft: state.draft,
      existingPath: state.activePath,
      pathId: encodePublicId(await store.allocateId(studentCounters.path)),
    });
    const history = await store.loadHistory(studentId);
    const historyEntry = createHistoryEntry({
      savedPath: activePath,
      historyId: encodePublicId(await store.allocateId(studentCounters.history)),
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
    await store.saveHistory(studentId, [historyEntry, ...history]);

    const nextState = await loadBuilderState({ studentId, catalog: learningTracks, store });
    return createActionSuccess("Learning path saved.", nextState, "save");
  } catch (error) {
    return friendlyActionError(error, "The learning path could not be saved. Please try again.");
  }
}

export async function discardChangesAction(studentId: string) {
  const store = createRedisStudentAreaStore();

  try {
    studentId = await resolveActionStudentId(studentId, store);
    const activePath = await store.loadActivePath(studentId);
    const draft = activePath && activePath.status !== "completed"
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
    studentId = await resolveActionStudentId(studentId, store);
    await store.clearStudentLearningData(studentId);
    const nextState = await loadBuilderState({ studentId, catalog: learningTracks, store });
    return createActionSuccess("Learning path cleared.", nextState, "clear");
  } catch (error) {
    return friendlyActionError(error, "The learning path could not be cleared. Please try again.");
  }
}
