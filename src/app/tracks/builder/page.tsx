import type { Metadata } from "next";

import { getCurrentStudentOrRedirect } from "@/server/student-area/student-record";
import { StudentAreaShell } from "@/features/student-area/views/student-area-shell";
import { StudentBuilderView } from "@/features/student-area/views/student-builder-view";

export const metadata: Metadata = {
  title: "Learning Path Builder",
  description: "Build a personalized sequence of learning tracks and topics.",
};

export default async function LearningPathBuilderPage() {
  const { student } = await getCurrentStudentOrRedirect("/tracks/builder");

  return (
    <StudentAreaShell activePath="/tracks/builder">
      <StudentBuilderView studentId={student.studentId} />
    </StudentAreaShell>
  );
}
