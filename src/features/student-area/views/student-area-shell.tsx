import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

import { StudentFeedback } from "@/features/student-area/components/student-feedback";
import { StudentTabs } from "@/features/student-area/components/student-tabs";

export function StudentAreaShell({
  activePath,
  children,
}: {
  activePath: "/tracks/history" | "/tracks/builder";
  children: ReactNode;
}) {
  const t = useTranslations("studentArea.shell");
  const tabs = useTranslations("studentArea.tabs");

  return (
    <section className="content-container page-section" aria-labelledby="student-area-heading">
      <div className="page-intro">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 id="student-area-heading">{t("heading")}</h1>
        <p>{t("intro")}</p>
      </div>
      <StudentTabs
        activePath={activePath}
        labels={{
          navLabel: tabs("navLabel"),
          listLabel: tabs("listLabel"),
          history: tabs("history"),
          builder: tabs("builder"),
        }}
      />
      <StudentFeedback />
      {children}
    </section>
  );
}
