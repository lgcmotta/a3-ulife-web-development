import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import type { Topic } from "@/content/types";
import { buttonVariants } from "@/ui/components/button";

export function TopicNextAction({ topic }: { topic: Topic }) {
  const t = useTranslations("topic");

  return (
    <section className="next-action" aria-labelledby="next-study-heading">
      <div>
        <p className="eyebrow">{t("nextActionEyebrow")}</p>
        <h2 id="next-study-heading">{t("nextActionHeading")}</h2>
        <p>{topic.studyNext}</p>
      </div>
      <Link className={buttonVariants({ variant: "secondary" })} href="/tracks">
        {t("chooseAnotherTopic")}
        <ArrowRight aria-hidden="true" size={18} />
      </Link>
    </section>
  );
}
