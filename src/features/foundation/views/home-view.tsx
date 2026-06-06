import { useLocale, useTranslations } from "next-intl";
import { getLocalizedTracks } from "@/content/locales";
import { HomeIntroduction } from "@/features/foundation/components/home-introduction";

export function HomeView() {
  const locale = useLocale();
  const t = useTranslations("home.preview");
  const learningTracks = getLocalizedTracks(locale);

  return (
    <>
      <HomeIntroduction />
      <section className="content-band" aria-labelledby="foundation-preview-heading">
        <div className="content-container preview-grid">
          <div>
            <p className="eyebrow">{t("eyebrow")}</p>
            <h2 id="foundation-preview-heading">{t("heading")}</h2>
          </div>
          <p>{t("body")}</p>
        </div>
      </section>
      <section className="content-container track-strip" aria-label={t("trackPreviewLabel")}>
        {learningTracks.map((track) => (
          <article className="compact-track" key={track.slug}>
            <h3>{track.title}</h3>
            <p>{track.summary}</p>
          </article>
        ))}
      </section>
    </>
  );
}
