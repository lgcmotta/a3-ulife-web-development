import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { LearningCompleteView } from "@/features/student-area/views/learning-complete-view";
import { getCurrentStudentOrRedirect } from "@/server/student-area/student-record";
import { createRedisStudentAreaStore } from "@/server/student-area/repository";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.pages.learningComplete");

  return {
    title: t("title"),
    description: t("description"),
  };
}

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
