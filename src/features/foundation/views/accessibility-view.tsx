import { useLocale, useTranslations } from "next-intl";
import { getLocalizedContent } from "@/content/locales";
import { themes } from "@/accessibility/theme";

export function AccessibilityView() {
  const locale = useLocale();
  const t = useTranslations("accessibility");
  const {
    accessibilityHelpSections,
    informationArchitecture,
    heuristicFindings,
    personas,
  } = getLocalizedContent(locale);

  return (
    <section className="content-container page-section" aria-labelledby="accessibility-heading">
      <div className="page-intro">
        <p className="eyebrow">{t("eyebrow")}</p>
        <h1 id="accessibility-heading">{t("heading")}</h1>
        <p>{t("intro")}</p>
      </div>
      <div className="help-grid">
        {accessibilityHelpSections.map((section) => (
          <article className="help-panel" key={section.title}>
            <p className="eyebrow">{section.appliesTo}</p>
            <h2>{section.title}</h2>
            <p>{section.content}</p>
          </article>
        ))}
      </div>
      <section className="evidence-section" aria-labelledby="themes-heading">
        <h2 id="themes-heading">{t("themesHeading")}</h2>
        <ul className="evidence-list">
          {themes.map((theme) => (
            <li key={theme.id}>
              <strong>{t(`themeModes.${theme.id}.label`)}:</strong>{" "}
              {t(`themeModes.${theme.id}.purpose`)}
            </li>
          ))}
        </ul>
      </section>
      <section className="evidence-section" aria-labelledby="assignment-evidence-heading">
        <p className="eyebrow">{t("assignmentEyebrow")}</p>
        <h2 id="assignment-evidence-heading">{t("assignmentHeading")}</h2>
        <div className="evidence-grid">
          <article>
            <h3>{t("personaHeading")}</h3>
            <p>{personas[0].scenario}</p>
          </article>
          <article>
            <h3>{t("informationArchitectureHeading")}</h3>
            <ul>
              {informationArchitecture.mainAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </article>
          <article>
            <h3>{t("heuristicIterationHeading")}</h3>
            <p>{heuristicFindings[0].iterationNote}</p>
          </article>
        </div>
      </section>
    </section>
  );
}
