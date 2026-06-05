import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { LearningSectionView } from "@/features/student-area/views/learning-section-view";
import { getCurrentStudentOrRedirect } from "@/server/student-area/student-record";
import { createRedisStudentAreaStore } from "@/server/student-area/repository";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.pages.learningSection");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function TopicLearningPage({
  params,
}: {
  params: Promise<{ pathId: string; topicSlug: string }>;
}) {
  const { pathId, topicSlug } = await params;
  const { student } = await getCurrentStudentOrRedirect(
    `/tracks/learn/${pathId}/${topicSlug}`,
  );
  const path = await createRedisStudentAreaStore().loadSavedPath(student.studentId, pathId);

  return (
    <LearningSectionView
      studentId={student.studentId}
      path={path}
      topicSlug={topicSlug}
    />
  );
}
