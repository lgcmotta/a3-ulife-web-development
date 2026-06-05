import Link from "next/link";
import { useTranslations } from "next-intl";

import type { SavedLearningPath } from "@/server/student-area/types";
import { buttonVariants } from "@/ui/components/button";

export function LearningCompleteView({ path }: { path: SavedLearningPath | null }) {
  const actions = useTranslations("actions");
  const t = useTranslations("studentArea.learning");

  if (!path) {
    return (
      <section className="content-container page-section" aria-labelledby="learning-complete-heading">
        <h1 id="learning-complete-heading">{t("pathUnavailable")}</h1>
        <p>{t("pathUnavailableBody")}</p>
        <Link className={buttonVariants()} href="/tracks/history" prefetch={false}>
          {actions("continue")}
        </Link>
      </section>
    );
  }

  return (
    <section className="content-container page-section" aria-labelledby="learning-complete-heading">
      <p className="eyebrow">{t("completeEyebrow")}</p>
      <h1 id="learning-complete-heading">{t("completeHeading")}</h1>
      <p>{t("completeBody")}</p>
      <Link className={buttonVariants()} href="/tracks/history" prefetch={false}>
        {actions("continue")}
      </Link>
    </section>
  );
}
