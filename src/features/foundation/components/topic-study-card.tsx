import { useTranslations } from "next-intl";
import type { Topic } from "@/content/types";

export function TopicStudyCard({ topic }: { topic: Topic }) {
  const t = useTranslations("topic");

  return (
    <section className="study-card" aria-labelledby="topic-value-heading">
      <h2 id="topic-value-heading">{t("whyThisMatters")}</h2>
      <p>{topic.whyItMatters}</p>
      <h2>{t("mainIdeas")}</h2>
      <ul>
        {topic.keyIdeas.map((idea) => (
          <li key={idea}>{idea}</li>
        ))}
      </ul>
      <h2>{t("practicePrompt")}</h2>
      <p>{topic.practicePrompt}</p>
      <h2>{t("professorNote")}</h2>
      <p>{topic.professorNote}</p>
    </section>
  );
}
