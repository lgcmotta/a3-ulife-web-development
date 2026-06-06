import Link from "next/link";
import { useTranslations } from "next-intl";

import { completeTopicAction } from "@/features/student-area/actions/complete-topic-action";
import { Button, buttonVariants } from "@/ui/components/button";
import { cn } from "@/ui/utils";

type LearningTopicActionsPlacement = "start" | "end";

export function LearningTopicActions({
  studentId,
  pathId,
  topicSlug,
  placement,
}: {
  studentId: string;
  pathId: string;
  topicSlug: string;
  placement: LearningTopicActionsPlacement;
}) {
  const t = useTranslations("studentArea.learning");
  const groupLabels: Record<LearningTopicActionsPlacement, string> = {
    start: t("topicActions"),
    end: t("endTopicActions"),
  };

  return (
    <div
      aria-label={groupLabels[placement]}
      className={cn("learning-topic-actions", `learning-topic-actions-${placement}`)}
      role="group"
    >
      <Link
        className={cn(
          buttonVariants({ variant: "secondary" }),
          "learning-topic-actions__control",
        )}
        href={`/tracks/builder?edit=${pathId}`}
        prefetch={false}
      >
        {t("returnToBuilder")}
      </Link>
      <form action={completeTopicAction.bind(null, studentId, pathId, topicSlug)}>
        <Button className="learning-topic-actions__control" type="submit">
          {t("completeTopic")}
        </Button>
      </form>
    </div>
  );
}
