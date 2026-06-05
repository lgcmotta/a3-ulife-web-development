import { useTranslations } from "next-intl";
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
  const actions = useTranslations("actions");
  const builder = useTranslations("studentArea.builder");
  const learningActionLabel =
    state.learningActionLabel === "Continue Learning"
      ? actions("continueLearning")
      : actions("startLearning");

  return (
    <div className="builder-action-bar" aria-label={builder("actionsLabel")}>
      <Button disabled={!state.canSave || pending} onClick={onSave} type="button">
        <Save aria-hidden="true" size={18} />
        {actions("save")}
      </Button>
      <Button
        disabled={!state.canStartLearning || pending}
        onClick={onLearning}
        type="button"
        variant="secondary"
      >
        <BookOpenCheck aria-hidden="true" size={18} />
        {learningActionLabel}
      </Button>
      <Button
        disabled={!state.draft.dirty || pending}
        onClick={onDiscard}
        type="button"
        variant="secondary"
      >
        <RotateCcw aria-hidden="true" size={18} />
        {builder("discard")}
      </Button>
      <Button disabled={!state.canClear || pending} onClick={onClear} type="button" variant="secondary">
        <Eraser aria-hidden="true" size={18} />
        {builder("clear")}
      </Button>
    </div>
  );
}
