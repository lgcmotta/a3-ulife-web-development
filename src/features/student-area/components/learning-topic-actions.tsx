import Link from "next/link";
import { useTranslations } from "next-intl";

import { completeTopicAction } from "@/features/student-area/actions/complete-topic-action";
import { Button, buttonVariants } from "@/ui/components/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/ui/components/pagination";
import { cn } from "@/ui/utils";

type LearningTopicActionsPlacement = "start" | "end";

export function LearningTopicActions({
  isCurrentTopicCompleted,
  nextHref,
  studentId,
  pathId,
  previousHref,
  topicSlug,
  placement,
}: {
  isCurrentTopicCompleted: boolean;
  nextHref: string | null;
  studentId: string;
  pathId: string;
  previousHref: string | null;
  topicSlug: string;
  placement: LearningTopicActionsPlacement;
}) {
  const t = useTranslations("studentArea.learning");
  const groupLabels: Record<LearningTopicActionsPlacement, string> = {
    start: t("topicActions"),
    end: t("endTopicActions"),
  };
  const completedDescriptionId = `topic-complete-state-${placement}`;

  return (
    <div
      aria-label={groupLabels[placement]}
      className={cn("learning-topic-actions", `learning-topic-actions-${placement}`)}
      role="group"
    >
      <Pagination
        aria-label={t("topicNavigation")}
        className="learning-topic-actions__pagination"
      >
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              aria-label={t("previousTopicLabel")}
              disabled={!previousHref}
              href={previousHref ?? undefined}
              prefetch={false}
              text={t("previousTopic")}
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              aria-label={t("nextTopicLabel")}
              disabled={!nextHref}
              href={nextHref ?? undefined}
              prefetch={false}
              text={t("nextTopic")}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
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
        {isCurrentTopicCompleted ? (
          <span className="sr-only" id={completedDescriptionId}>
            {t("topicAlreadyCompleted")}
          </span>
        ) : null}
        <Button
          aria-describedby={isCurrentTopicCompleted ? completedDescriptionId : undefined}
          className="learning-topic-actions__control"
          disabled={isCurrentTopicCompleted}
          type="submit"
        >
          {t("completeTopic")}
        </Button>
      </form>
    </div>
  );
}
