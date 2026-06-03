"use client";

import { useState, useTransition } from "react";

import {
  applyContextMenuAction,
  clearLearningPathAction,
  discardChangesAction,
  saveDraftAction,
  toggleTopicAction,
  toggleTrackAction,
} from "@/features/student-area/actions/student-path-actions";
import { startOrContinueLearningAction } from "@/features/student-area/actions/learning-navigation-actions";
import { BuilderActionBar } from "@/features/student-area/components/builder-action-bar";
import { BuilderConfirmationDialog } from "@/features/student-area/components/builder-confirmation-dialogs";
import { CurrentPathPanel } from "@/features/student-area/components/current-path-panel";
import { showStudentFeedback } from "@/features/student-area/components/student-feedback";
import { TrackTopicTree } from "@/features/student-area/components/track-topic-tree";
import type { BuilderState } from "@/features/student-area/server/builder-selection";
import type { PathContextAction, PathItemLevel } from "@/server/student-area/types";

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

  function applyTrackToggle(trackSlug: string, selected: boolean) {
    startTransition(async () => {
      const result = await toggleTrackAction(studentId, trackSlug, selected);
      showStudentFeedback(result.feedback);

      if (result.ok) {
        setState(result.data);
      }
    });
  }

  function applyTopicToggle(trackSlug: string, topicSlug: string, selected: boolean) {
    startTransition(async () => {
      const result = await toggleTopicAction(studentId, trackSlug, topicSlug, selected);
      showStudentFeedback(result.feedback);

      if (result.ok) {
        setState(result.data);
      }
    });
  }

  function applyItemAction(
    level: PathItemLevel,
    trackSlug: string,
    topicSlug: string | undefined,
    action: PathContextAction,
  ) {
    startTransition(async () => {
      const result = await applyContextMenuAction(studentId, level, trackSlug, topicSlug, action);
      showStudentFeedback(result.feedback);

      if (result.ok) {
        setState(result.data);
      }
    });
  }

  function applySave() {
    startTransition(async () => {
      const result = await saveDraftAction(studentId);
      showStudentFeedback(result.feedback);

      if (result.ok) {
        setState(result.data);
      }
    });
  }

  function applyDiscard() {
    startTransition(async () => {
      const result = await discardChangesAction(studentId);
      showStudentFeedback(result.feedback);
      setDialog(null);

      if (result.ok) {
        setState(result.data);
      }
    });
  }

  function applyClear() {
    startTransition(async () => {
      const result = await clearLearningPathAction(studentId);
      showStudentFeedback(result.feedback);
      setDialog(null);

      if (result.ok) {
        setState(result.data);
      }
    });
  }

  function applyLearningNavigation() {
    startTransition(async () => {
      const result = await startOrContinueLearningAction(studentId);
      showStudentFeedback(result.feedback);

      if (result.ok) {
        window.location.assign(result.data.url);
      }
    });
  }

  return (
    <>
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
        description="This returns the builder to the last saved learning path. Unsaved changes will be lost."
        confirmLabel="Discard Changes"
        onOpenChange={(open) => setDialog(open ? "discard" : null)}
        onConfirm={applyDiscard}
      />
      <BuilderConfirmationDialog
        open={dialog === "clear"}
        title="Clear learning path"
        description="This clears the saved path and topic progress for this browser student."
        confirmLabel="Clear Learning Path"
        onOpenChange={(open) => setDialog(open ? "clear" : null)}
        onConfirm={applyClear}
      />
    </>
  );
}
