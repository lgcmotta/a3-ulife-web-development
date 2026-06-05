import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { BookOpenCheck } from "lucide-react";
import { getLocalizedContent } from "@/content/locales";
import { Badge } from "@/ui/components/badge";
import { PrimaryActions } from "@/features/foundation/components/primary-actions";

export function HomeIntroduction() {
  const locale = useLocale();
  const t = useTranslations("home");
  const { diogenesProfile, homePrinciples } = getLocalizedContent(locale);

  return (
    <section className="hero-section" aria-labelledby="home-heading">
      <Image
        alt={t("heroImageAlt")}
        className="hero-image"
        fill
        priority
        src="/assets/images/diogenes-professor.png"
        sizes="100vw"
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <Badge className="hero-badge">
          <BookOpenCheck aria-hidden="true" size={16} />
          {diogenesProfile.role}
        </Badge>
        <h1 id="home-heading">Legado de Diogenes</h1>
        <p className="hero-lede">{diogenesProfile.introduction}</p>
        <p className="hero-support">{diogenesProfile.teachingTone}</p>
        <p className="hero-support">{diogenesProfile.promise}</p>
        <PrimaryActions />
      </div>
      <ul className="hero-principles" aria-label={t("principlesLabel")}>
        {homePrinciples.map((principle) => (
          <li key={principle}>{principle}</li>
        ))}
      </ul>
    </section>
  );
}
