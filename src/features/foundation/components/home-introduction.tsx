import Image from "next/image";
import { useTranslations } from "next-intl";
import { BookOpenCheck } from "lucide-react";
import { homePrincipleOrder } from "@/content/catalog-structure";
import type { DiogenesProfile } from "@/content/types";
import { Badge } from "@/ui/components/badge";
import { PrimaryActions } from "@/features/foundation/components/primary-actions";

export function HomeIntroduction() {
  const t = useTranslations("home");
  const brand = useTranslations("brand");
  const rawHome = t.raw as (key: string) => unknown;
  const diogenesProfile = rawHome("diogenesProfile") as DiogenesProfile;
  const principles = rawHome("principles") as Record<
    (typeof homePrincipleOrder)[number],
    string
  >;
  const homePrinciples = homePrincipleOrder.map((key) => principles[key]);

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
        <h1 id="home-heading">{brand("name")}</h1>
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
