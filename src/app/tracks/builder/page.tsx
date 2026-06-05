import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getCurrentStudentOrRedirect } from "@/server/student-area/student-record";
import { StudentAreaShell } from "@/features/student-area/views/student-area-shell";
import { StudentBuilderView } from "@/features/student-area/views/student-builder-view";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.pages.builder");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LearningPathBuilderPage({
  searchParams,
}: {
  searchParams?: Promise<{ edit?: string }>;
}) {
  const params = await searchParams;
  const nextPath = params?.edit ? `/tracks/builder?edit=${params.edit}` : "/tracks/builder";
  const { student } = await getCurrentStudentOrRedirect(nextPath);

  return (
    <StudentAreaShell activePath="/tracks/builder">
      <StudentBuilderView studentId={student.studentId} editPathId={params?.edit} />
    </StudentAreaShell>
  );
}
