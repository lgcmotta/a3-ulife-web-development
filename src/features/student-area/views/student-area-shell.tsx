import type { ReactNode } from "react";

import { StudentFeedback } from "@/features/student-area/components/student-feedback";
import { StudentTabs } from "@/features/student-area/components/student-tabs";

export function StudentAreaShell({
  activePath,
  children,
}: {
  activePath: "/tracks/history" | "/tracks/builder";
  children: ReactNode;
}) {
  return (
    <section className="content-container page-section" aria-labelledby="student-area-heading">
      <div className="page-intro">
        <p className="eyebrow">Student area</p>
        <h1 id="student-area-heading">Personalized learning paths</h1>
        <p>
          Review saved paths, build a focused sequence of topics, and return to learning
          sections without creating an account.
        </p>
      </div>
      <StudentTabs activePath={activePath} />
      <StudentFeedback />
      {children}
    </section>
  );
}
