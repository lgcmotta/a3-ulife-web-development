import type { Metadata } from "next";

import { getCurrentStudentOrRedirect } from "@/server/student-area/student-record";
import { StudentAreaShell } from "@/features/student-area/views/student-area-shell";
import { StudentBuilderView } from "@/features/student-area/views/student-builder-view";

export const metadata: Metadata = {
  title: "Learning Path Builder",
  description: "Build a personalized sequence of learning tracks and topics.",
};

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
