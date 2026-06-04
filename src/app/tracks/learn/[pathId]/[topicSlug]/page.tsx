import type { Metadata } from "next";

import { LearningSectionView } from "@/features/student-area/views/learning-section-view";
import { getCurrentStudentOrRedirect } from "@/server/student-area/student-record";
import { createRedisStudentAreaStore } from "@/server/student-area/repository";

export const metadata: Metadata = {
  title: "Learning Section",
  description: "Study a selected topic in the personalized learning path.",
};

export default async function TopicLearningPage({
  params,
}: {
  params: Promise<{ pathId: string; topicSlug: string }>;
}) {
  const { pathId, topicSlug } = await params;
  const { student } = await getCurrentStudentOrRedirect(
    `/tracks/learn/${pathId}/${topicSlug}`,
  );
  const path = await createRedisStudentAreaStore().loadActivePath(student.studentId);

  return (
    <LearningSectionView
      studentId={student.studentId}
      path={path?.pathId === pathId ? path : null}
      topicSlug={topicSlug}
    />
  );
}
