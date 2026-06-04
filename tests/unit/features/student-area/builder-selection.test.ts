import { describe, expect, it } from "vitest";

import { learningTracks } from "@/content/tracks";
import {
  createEmptyDraft,
  draftFromSavedPath,
  getTrackSelectionState,
  loadBuilderState,
  toggleTopicInDraft,
  toggleTrackInDraft,
} from "@/features/student-area/server/builder-selection";
import { createMemoryStudentAreaStore } from "@/server/student-area/repository";
import { fixtureDraft, fixtureSavedPath, fixtureStudentId } from "../../fixtures/student-area";

describe("builder selection", () => {
  it("selects and removes a full track with all child topics", () => {
    const draft = createEmptyDraft("abc1234", "draft01");
    const selected = toggleTrackInDraft(draft, learningTracks, "programming-foundations", true);

    expect(selected.trackGroups[0]?.topicItems).toHaveLength(3);
    expect(getTrackSelectionState(selected, "programming-foundations", learningTracks)).toBe(
      "selected",
    );

    const removed = toggleTrackInDraft(selected, learningTracks, "programming-foundations", false);
    expect(removed.trackGroups).toHaveLength(0);
  });

  it("keeps parent track partial when only one child is selected", () => {
    const draft = createEmptyDraft("abc1234", "draft01");
    const selected = toggleTopicInDraft(
      draft,
      learningTracks,
      "programming-foundations",
      "problem-solving-basics",
      true,
    );

    expect(selected.trackGroups[0]?.trackSlug).toBe("programming-foundations");
    expect(selected.trackGroups[0]?.topicItems).toHaveLength(1);
    expect(getTrackSelectionState(selected, "programming-foundations", learningTracks)).toBe(
      "partial",
    );
  });

  it("loads an empty clean draft after the active path is completed", async () => {
    const store = createMemoryStudentAreaStore();
    const completedPath = {
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

    await store.saveActivePath(completedPath);
    await store.saveDraft(draftFromSavedPath(completedPath));

    const state = await loadBuilderState({
      studentId: fixtureStudentId,
      catalog: learningTracks,
      store,
    });

    expect(state.draft.dirty).toBe(false);
    expect(state.draft.trackGroups).toHaveLength(0);
    expect(state.canSave).toBe(false);
    expect(state.canStartLearning).toBe(false);
  });

  it("loads a fresh empty draft on plain builder visits when an active path exists", async () => {
    const store = createMemoryStudentAreaStore();
    const cleanSavedDraft = {
      ...fixtureDraft,
      dirty: false,
    };

    await store.saveActivePath(fixtureSavedPath);
    await store.saveDraft(cleanSavedDraft);

    const state = await loadBuilderState({
      studentId: fixtureStudentId,
      catalog: learningTracks,
      store,
    });

    expect(state.draft.draftId).not.toBe(cleanSavedDraft.draftId);
    expect(state.draft.trackGroups).toHaveLength(0);
    expect(state.canClear).toBe(false);
    expect(state.canStartLearning).toBe(false);
  });

  it("pre-populates the builder only for an explicit unfinished edit path", async () => {
    const store = createMemoryStudentAreaStore();

    await store.saveActivePath(fixtureSavedPath);

    const state = await loadBuilderState({
      studentId: fixtureStudentId,
      catalog: learningTracks,
      store,
      editPathId: fixtureSavedPath.pathId,
    });

    expect(state.draft.draftId).toBe(fixtureSavedPath.pathId);
    expect(state.draft.trackGroups).toHaveLength(1);
    expect(state.isEditingActivePath).toBe(true);
    expect(state.canStartLearning).toBe(true);
  });

  it("keeps an existing edit draft when reloading an explicit unfinished edit path", async () => {
    const store = createMemoryStudentAreaStore();
    const dirtyEditDraft = {
      ...fixtureDraft,
      draftId: fixtureSavedPath.pathId,
      dirty: true,
    };

    await store.saveActivePath(fixtureSavedPath);
    await store.saveDraft(dirtyEditDraft);

    const state = await loadBuilderState({
      studentId: fixtureStudentId,
      catalog: learningTracks,
      store,
      editPathId: fixtureSavedPath.pathId,
    });

    expect(state.draft).toEqual(dirtyEditDraft);
    expect(state.canSave).toBe(true);
    expect(state.isEditingActivePath).toBe(true);
  });
});
