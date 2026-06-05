import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { getCurrentStudentOrRedirect } from "@/server/student-area/student-record";
import { StudentAreaShell } from "@/features/student-area/views/student-area-shell";
import { StudentHistoryView } from "@/features/student-area/views/student-history-view";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata.pages.history");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function LearningPathHistoryPage({
  searchParams,
}: {
  searchParams?: Promise<{ demoHistory?: string }>;
}) {
  const params = await searchParams;
  const nextPath = params?.demoHistory === "1" ? "/tracks/history?demoHistory=1" : "/tracks/history";
  const { student } = await getCurrentStudentOrRedirect(nextPath);

  return (
    <StudentAreaShell activePath="/tracks/history">
      <StudentHistoryView studentId={student.studentId} demo={params?.demoHistory === "1"} />
    </StudentAreaShell>
  );
}
