import Link from "next/link";

import { completeTopicAction } from "@/features/student-area/actions/complete-topic-action";
import { Button, buttonVariants } from "@/ui/components/button";
import { cn } from "@/ui/utils";

type LearningTopicActionsPlacement = "start" | "end";

const groupLabels: Record<LearningTopicActionsPlacement, string> = {
  start: "Topic actions",
  end: "End of topic actions",
};

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
        Return to Builder
      </Link>
      <form action={completeTopicAction.bind(null, studentId, pathId, topicSlug)}>
        <Button className="learning-topic-actions__control" type="submit">
          Complete Topic
        </Button>
      </form>
    </div>
  );
}
