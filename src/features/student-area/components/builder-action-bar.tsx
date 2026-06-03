"use client";

import { BookOpenCheck, Eraser, RotateCcw, Save } from "lucide-react";

import type { BuilderState } from "@/features/student-area/server/builder-selection";
import { Button } from "@/ui/components/button";

export function BuilderActionBar({
  state,
  onSave,
  onDiscard,
  onClear,
  onLearning,
  pending,
}: {
  state: BuilderState;
  onSave: () => void;
  onDiscard: () => void;
  onClear: () => void;
  onLearning: () => void;
  pending: boolean;
}) {
  const hasDraftContent = state.draft.trackGroups.length > 0;
  const canClear = Boolean(state.activePath) || hasDraftContent;

  return (
    <div className="builder-action-bar" aria-label="Builder actions">
      <Button disabled={!state.canSave || pending} onClick={onSave} type="button">
        <Save aria-hidden="true" size={18} />
        Save
      </Button>
      <Button
        disabled={!state.canStartLearning || pending}
        onClick={onLearning}
        type="button"
        variant="secondary"
      >
        <BookOpenCheck aria-hidden="true" size={18} />
        {state.learningActionLabel}
      </Button>
      <Button
        disabled={!state.draft.dirty || pending}
        onClick={onDiscard}
        type="button"
        variant="secondary"
      >
        <RotateCcw aria-hidden="true" size={18} />
        Discard Changes
      </Button>
      <Button disabled={!canClear || pending} onClick={onClear} type="button" variant="secondary">
        <Eraser aria-hidden="true" size={18} />
        Clear Learning Path
      </Button>
    </div>
  );
}
