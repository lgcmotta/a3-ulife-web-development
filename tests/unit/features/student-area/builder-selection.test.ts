import { describe, expect, it } from "vitest";

import { learningTracks } from "@/content/tracks";
import {
  createEmptyDraft,
  getTrackSelectionState,
  isTopicSelected,
  loadBuilderState,
  resetBuilderToInitial,
  toggleTopicInDraft,
  toggleTrackInDraft,
  withDraft,
} from "@/features/student-area/server/builder-selection";
import { createMemoryStudentAreaStore } from "@/server/student-area/repository";
import { fixtureDraft, fixtureSavedPath, fixtureStudentId } from "../../fixtures/student-area";

describe("builder selection", () => {
  it("loads create mode from an empty local builder state", async () => {
    const store = createMemoryStudentAreaStore();

    await store.saveSavedPath(fixtureSavedPath);

    const state = await loadBuilderState({
      studentId: fixtureStudentId,
      catalog: learningTracks,
      store,
    });

    expect(state.mode).toBe("create");
    expect(state.savedPathId).toBeNull();
    expect(state.draft.trackGroups).toHaveLength(0);
    expect(state.initialDraft.trackGroups).toHaveLength(0);
    expect(state.canSave).toBe(false);
    expect(state.canClear).toBe(false);
    expect(state.canStartLearning).toBe(false);
  });

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

  it("keeps parent track partial when only one child topic is selected", () => {
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
    expect(isTopicSelected(selected, "programming-foundations", "problem-solving-basics")).toBe(true);
    expect(isTopicSelected(selected, "programming-foundations", "variables-and-flow")).toBe(false);
  });

  it("pre-populates edit mode from an explicit unfinished saved path ID", async () => {
    const store = createMemoryStudentAreaStore();

    await store.saveSavedPath(fixtureSavedPath);

    const state = await loadBuilderState({
      studentId: fixtureStudentId,
      catalog: learningTracks,
      store,
      editPathId: fixtureSavedPath.pathId,
    });

    expect(state.mode).toBe("edit");
    expect(state.savedPathId).toBe(fixtureSavedPath.pathId);
    expect(state.draft.draftId).toBe(fixtureSavedPath.pathId);
    expect(state.draft.trackGroups).toEqual(fixtureSavedPath.trackGroups);
    expect(state.canSave).toBe(false);
    expect(state.canStartLearning).toBe(true);
  });

  it("does not reload unsaved edit changes from storage after initial render", async () => {
    const store = createMemoryStudentAreaStore();

    await store.saveSavedPath(fixtureSavedPath);

    const state = await loadBuilderState({
      studentId: fixtureStudentId,
      catalog: learningTracks,
      store,
      editPathId: fixtureSavedPath.pathId,
    });
    const changed = withDraft(
      state,
      toggleTopicInDraft(
        state.draft,
        learningTracks,
        "programming-foundations",
        "variables-and-flow",
        true,
      ),
    );
    const reloaded = await loadBuilderState({
      studentId: fixtureStudentId,
      catalog: learningTracks,
      store,
      editPathId: fixtureSavedPath.pathId,
    });

    expect(changed.canSave).toBe(true);
    expect(changed.draft.trackGroups[0]?.topicItems).toHaveLength(2);
    expect(reloaded.draft.trackGroups).toEqual(fixtureSavedPath.trackGroups);
  });

  it("discard resets edit mode to the initial saved database state", async () => {
    const store = createMemoryStudentAreaStore();

    await store.saveSavedPath(fixtureSavedPath);

    const state = await loadBuilderState({
      studentId: fixtureStudentId,
      catalog: learningTracks,
      store,
      editPathId: fixtureSavedPath.pathId,
    });
    const dirtyState = withDraft(
      state,
      toggleTopicInDraft(
        state.draft,
        learningTracks,
        "programming-foundations",
        "variables-and-flow",
        true,
      ),
    );
    const reset = resetBuilderToInitial(dirtyState);

    expect(dirtyState.canSave).toBe(true);
    expect(reset.draft.trackGroups).toEqual(fixtureSavedPath.trackGroups);
    expect(reset.canSave).toBe(false);
    expect(reset.canStartLearning).toBe(true);
  });

  it("clear only changes the local builder state while keeping the saved path untouched", async () => {
    const store = createMemoryStudentAreaStore();

    await store.saveSavedPath(fixtureSavedPath);

    const state = await loadBuilderState({
      studentId: fixtureStudentId,
      catalog: learningTracks,
      store,
      editPathId: fixtureSavedPath.pathId,
    });
    const cleared = withDraft(state, createEmptyDraft(fixtureStudentId, fixtureSavedPath.pathId));

    expect(cleared.draft.trackGroups).toHaveLength(0);
    expect(cleared.canSave).toBe(false);
    expect(cleared.canClear).toBe(false);
    await expect(store.loadSavedPath(fixtureStudentId, fixtureSavedPath.pathId)).resolves.toEqual(
      fixtureSavedPath,
    );
  });

  it("discard in create mode returns to the empty initial builder state", async () => {
    const store = createMemoryStudentAreaStore();
    const state = await loadBuilderState({
      studentId: fixtureStudentId,
      catalog: learningTracks,
      store,
    });
    const dirtyState = withDraft(state, fixtureDraft);
    const reset = resetBuilderToInitial(dirtyState);

    expect(dirtyState.canSave).toBe(true);
    expect(reset.mode).toBe("create");
    expect(reset.draft.trackGroups).toHaveLength(0);
    expect(reset.canSave).toBe(false);
  });

  it("does not open completed saved paths for editing", async () => {
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

    await store.saveSavedPath(completedPath);

    const state = await loadBuilderState({
      studentId: fixtureStudentId,
      catalog: learningTracks,
      store,
      editPathId: completedPath.pathId,
    });

    expect(state.mode).toBe("create");
    expect(state.savedPathId).toBeNull();
    expect(state.draft.trackGroups).toHaveLength(0);
    expect(state.loadMessage).toMatch(/completed learning paths/i);
  });
});
