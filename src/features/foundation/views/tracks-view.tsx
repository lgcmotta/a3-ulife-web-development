import { useLocale, useTranslations } from "next-intl";
import { getLocalizedTracks } from "@/content/locales";
import { TrackCard } from "@/features/foundation/components/track-card";
import Link from "next/link";
import { BookOpenCheck } from "lucide-react";
import { studentAreaRoutes } from "@/routes/navigation";
import { buttonVariants } from "@/ui/components/button";

export function TracksView() {
  const locale = useLocale();
  const t = useTranslations("tracks");
  const actions = useTranslations("actions");
  const learningTracks = getLocalizedTracks(locale);

  return (
    <section className="content-container page-section" aria-labelledby="tracks-heading">
      <div className="page-intro">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 id="tracks-heading">{t("heading")}</h1>
        <p>{t("intro")}</p>
        <Link className={buttonVariants()} href={studentAreaRoutes.history} prefetch={false}>
          {actions("startLearning")}
          <BookOpenCheck aria-hidden="true" size={18} />
        </Link>
      </div>
      <div className="tracks-grid" aria-label={t("listLabel")}>
        {learningTracks.map((track) => (
          <TrackCard key={track.slug} track={track} />
        ))}
      </div>
    </section>
  );
}
