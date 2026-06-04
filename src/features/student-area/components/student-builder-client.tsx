"use client";

import { useState, useTransition } from "react";

import { learningTracks } from "@/content/tracks";
import { startOrContinueLearningAction } from "@/features/student-area/actions/learning-navigation-actions";
import { saveBuilderCompositionAction } from "@/features/student-area/actions/student-path-actions";
import { BuilderActionBar } from "@/features/student-area/components/builder-action-bar";
import { BuilderConfirmationDialog } from "@/features/student-area/components/builder-confirmation-dialogs";
import { CurrentPathPanel } from "@/features/student-area/components/current-path-panel";
import { showStudentFeedback } from "@/features/student-area/components/student-feedback";
import { TrackTopicTree } from "@/features/student-area/components/track-topic-tree";
import {
  createEmptyDraft,
  resetBuilderToInitial,
  toggleTopicInDraft,
  toggleTrackInDraft,
  withDraft,
  type BuilderState,
} from "@/features/student-area/server/builder-selection";
import { movePathItem } from "@/features/student-area/server/path-reorder";
import type {
  BuilderFeedbackMessage,
  PathContextAction,
  PathItemLevel,
} from "@/server/student-area/types";

function createLocalFeedback(
  kind: BuilderFeedbackMessage["kind"],
  message: string,
  relatedAction: string,
) {
  return {
    messageId: crypto.randomUUID(),
    kind,
    message,
    relatedAction,
  } satisfies BuilderFeedbackMessage;
}

function trackTitle(trackSlug: string) {
  return learningTracks.find((track) => track.slug === trackSlug)?.title ?? "The selected track";
}

function topicTitle(trackSlug: string, topicSlug: string) {
  return (
    learningTracks
      .find((track) => track.slug === trackSlug)
      ?.topics.find((topic) => topic.slug === topicSlug)?.title ?? "The selected topic"
  );
}

export function StudentBuilderClient({
  studentId,
  initialState,
}: {
  studentId: string;
  initialState: BuilderState;
}) {
  const [state, setState] = useState(initialState);
  const [dialog, setDialog] = useState<"discard" | "clear" | null>(null);
  const [isPending, startTransition] = useTransition();

  function updateDraft(nextDraft: BuilderState["draft"], feedback: BuilderFeedbackMessage) {
    setState((current) => withDraft(current, nextDraft));
    showStudentFeedback(feedback);
  }

  function applyTrackToggle(trackSlug: string, selected: boolean) {
    const nextDraft = toggleTrackInDraft(state.draft, state.availableTracks, trackSlug, selected);
    updateDraft(
      nextDraft,
      createLocalFeedback(
        "success",
        `${trackTitle(trackSlug)} was ${selected ? "added to" : "removed from"} your current path.`,
        "toggle-track",
      ),
    );
  }

  function applyTopicToggle(trackSlug: string, topicSlug: string, selected: boolean) {
    const nextDraft = toggleTopicInDraft(
      state.draft,
      state.availableTracks,
      trackSlug,
      topicSlug,
      selected,
    );
    updateDraft(
      nextDraft,
      createLocalFeedback(
        "success",
        `${topicTitle(trackSlug, topicSlug)} was ${selected ? "added to" : "removed from"} your current path.`,
        "toggle-topic",
      ),
    );
  }

  function applyItemAction(
    level: PathItemLevel,
    trackSlug: string,
    topicSlug: string | undefined,
    action: PathContextAction,
  ) {
    if (action === "remove") {
      const nextDraft =
        level === "track"
          ? toggleTrackInDraft(state.draft, state.availableTracks, trackSlug, false)
          : toggleTopicInDraft(state.draft, state.availableTracks, trackSlug, topicSlug ?? "", false);
      updateDraft(nextDraft, createLocalFeedback("success", "Item removed from your current path.", action));
      return;
    }

    const result = movePathItem({
      draft: state.draft,
      level,
      trackSlug,
      topicSlug,
      direction: action === "move-up" ? "up" : "down",
    });

    if (!result.ok) {
      showStudentFeedback(createLocalFeedback("error", result.feedback, "blocked-reorder"));
      return;
    }

    updateDraft(result.draft, createLocalFeedback("success", result.feedback, action));
  }

  function applySave() {
    startTransition(async () => {
      const result = await saveBuilderCompositionAction(studentId, state, state.draft.trackGroups);
      showStudentFeedback(result.feedback);

      if (result.ok) {
        setState(result.data);
      }
    });
  }

  function applyDiscard() {
    const nextState = resetBuilderToInitial(state);
    setState(nextState);
    setDialog(null);
    showStudentFeedback(
      createLocalFeedback("success", "Unsaved changes discarded.", "discard"),
    );
  }

  function applyClear() {
    const nextDraft = createEmptyDraft(studentId, state.savedPathId ?? "new-path");
    setState((current) => withDraft(current, nextDraft));
    setDialog(null);
    showStudentFeedback(
      createLocalFeedback("success", "Builder selections cleared. Saved paths are unchanged until Save.", "clear"),
    );
  }

  function applyLearningNavigation() {
    startTransition(async () => {
      const result = await startOrContinueLearningAction(studentId, state.savedPathId);
      showStudentFeedback(result.feedback);

      if (result.ok) {
        window.location.assign(result.data.url);
      }
    });
  }

  return (
    <>
      {state.loadMessage ? <p role="status">{state.loadMessage}</p> : null}
      <BuilderActionBar
        state={state}
        pending={isPending}
        onSave={applySave}
        onDiscard={() => setDialog("discard")}
        onClear={() => setDialog("clear")}
        onLearning={applyLearningNavigation}
      />
      <div aria-busy={isPending} className="builder-layout">
        <TrackTopicTree
          tracks={state.availableTracks}
          draft={state.draft}
          onToggleTrack={applyTrackToggle}
          onToggleTopic={applyTopicToggle}
        />
        <CurrentPathPanel draft={state.draft} onItemAction={applyItemAction} />
      </div>
      <BuilderConfirmationDialog
        open={dialog === "discard"}
        title="Discard changes"
        description={
          state.mode === "edit"
            ? "This returns the builder to the last saved learning path. Unsaved changes will be lost."
            : "This returns the builder to an empty learning path. Unsaved selections will be lost."
        }
        confirmLabel="Discard Changes"
        onOpenChange={(open) => setDialog(open ? "discard" : null)}
        onConfirm={applyDiscard}
      />
      <BuilderConfirmationDialog
        open={dialog === "clear"}
        title="Clear learning path"
        description="This clears only the builder selections on this page. Saved paths and progress stay unchanged unless you save a new composition."
        confirmLabel="Clear Learning Path"
        onOpenChange={(open) => setDialog(open ? "clear" : null)}
        onConfirm={applyClear}
      />
    </>
  );
}
