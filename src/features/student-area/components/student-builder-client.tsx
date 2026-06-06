"use client";

import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";

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

export function StudentBuilderClient({
  studentId,
  initialState,
}: {
  studentId: string;
  initialState: BuilderState;
}) {
  const t = useTranslations("studentArea.builder");
  const [state, setState] = useState(initialState);
  const [dialog, setDialog] = useState<"discard" | "clear" | null>(null);
  const [isPending, startTransition] = useTransition();

  function updateDraft(nextDraft: BuilderState["draft"], feedback: BuilderFeedbackMessage) {
    setState((current) => withDraft(current, nextDraft));
    showStudentFeedback(feedback);
  }

  function trackTitle(trackSlug: string) {
    return state.availableTracks.find((track) => track.slug === trackSlug)?.title ?? t("trackFallback");
  }

  function topicTitle(trackSlug: string, topicSlug: string) {
    return (
      state.availableTracks
        .find((track) => track.slug === trackSlug)
        ?.topics.find((topic) => topic.slug === topicSlug)?.title ?? t("topicFallback")
    );
  }

  function applyTrackToggle(trackSlug: string, selected: boolean) {
    const nextDraft = toggleTrackInDraft(state.draft, state.availableTracks, trackSlug, selected);
    updateDraft(
      nextDraft,
      createLocalFeedback(
        "success",
        t(selected ? "trackAdded" : "trackRemoved", { track: trackTitle(trackSlug) }),
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
        t(selected ? "topicAdded" : "topicRemoved", { topic: topicTitle(trackSlug, topicSlug) }),
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
      updateDraft(nextDraft, createLocalFeedback("success", t("itemRemoved"), action));
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
      const boundaryKey =
        level === "track"
          ? action === "move-up"
            ? "trackAlreadyFirst"
            : "trackAlreadyLast"
          : action === "move-up"
            ? "topicAlreadyFirst"
            : "topicAlreadyLast";
      showStudentFeedback(createLocalFeedback("error", t(boundaryKey), "blocked-reorder"));
      return;
    }

    updateDraft(
      result.draft,
      createLocalFeedback(
        "success",
        t(level === "track" ? "trackOrderUpdated" : "topicOrderUpdated"),
        action,
      ),
    );
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
      createLocalFeedback("success", t("discarded"), "discard"),
    );
  }

  function applyClear() {
    const nextDraft = createEmptyDraft(studentId, state.savedPathId ?? "new-path");
    setState((current) => withDraft(current, nextDraft));
    setDialog(null);
    showStudentFeedback(
      createLocalFeedback("success", t("cleared"), "clear"),
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
        <CurrentPathPanel
          draft={state.draft}
          tracks={state.availableTracks}
          onItemAction={applyItemAction}
        />
      </div>
      <BuilderConfirmationDialog
        open={dialog === "discard"}
        title={t("dialogs.discardTitle")}
        description={
          state.mode === "edit"
            ? t("dialogs.discardEditDescription")
            : t("dialogs.discardCreateDescription")
        }
        confirmLabel={t("discard")}
        onOpenChange={(open) => setDialog(open ? "discard" : null)}
        onConfirm={applyDiscard}
      />
      <BuilderConfirmationDialog
        open={dialog === "clear"}
        title={t("dialogs.clearTitle")}
        description={t("dialogs.clearDescription")}
        confirmLabel={t("clear")}
        onOpenChange={(open) => setDialog(open ? "clear" : null)}
        onConfirm={applyClear}
      />
    </>
  );
}
