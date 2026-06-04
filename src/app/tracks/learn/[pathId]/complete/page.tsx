import type { Metadata } from "next";

import { LearningCompleteView } from "@/features/student-area/views/learning-complete-view";
import { getCurrentStudentOrRedirect } from "@/server/student-area/student-record";
import { createRedisStudentAreaStore } from "@/server/student-area/repository";

export const metadata: Metadata = {
  title: "Learning Path Complete",
  description: "Completion screen for a personalized learning path.",
};

export default async function LearningPathCompletePage({
  params,
}: {
  params: Promise<{ pathId: string }>;
}) {
  const { pathId } = await params;
  const { student } = await getCurrentStudentOrRedirect(`/tracks/learn/${pathId}/complete`);
  const path = await createRedisStudentAreaStore().loadSavedPath(student.studentId, pathId);

  return <LearningCompleteView path={path} />;
}
