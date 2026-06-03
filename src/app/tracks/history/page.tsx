import type { Metadata } from "next";

import { getCurrentStudentOrRedirect } from "@/server/student-area/student-record";
import { StudentAreaShell } from "@/features/student-area/views/student-area-shell";
import { StudentHistoryView } from "@/features/student-area/views/student-history-view";

export const metadata: Metadata = {
  title: "Learning Path History",
  description: "Review saved personalized learning paths.",
};

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
