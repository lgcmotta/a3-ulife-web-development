import { useTranslations } from "next-intl";
import {
  accessibilityHelpSectionOrder,
  heuristicFindingOrder,
  informationArchitectureOrder,
  personaOrder,
} from "@/content/catalog-structure";
import { themes } from "@/accessibility/theme";

export function AccessibilityView() {
  const t = useTranslations("accessibility");
  const evidence = useTranslations("evidence");
  const rawAccessibility = t.raw as (key: string) => unknown;
  const rawEvidence = evidence.raw as (key: string) => unknown;
  const helpSections = rawAccessibility("helpSections") as Record<
    (typeof accessibilityHelpSectionOrder)[number],
    { title: string; content: string; appliesTo: string }
  >;
  const personas = rawEvidence("personas") as Record<
    (typeof personaOrder)[number],
    { scenario: string }
  >;
  const informationArchitecture = rawEvidence("informationArchitecture") as {
    mainAreas: Record<(typeof informationArchitectureOrder.mainAreas)[number], string>;
  };
  const heuristicFindings = rawEvidence("heuristicFindings") as Record<
    (typeof heuristicFindingOrder)[number],
    { iterationNote: string }
  >;
  const accessibilityHelpSections = accessibilityHelpSectionOrder.map(
    (sectionId) => helpSections[sectionId],
  );
  const persona = personas[personaOrder[0]];
  const mainAreas = informationArchitectureOrder.mainAreas.map(
    (areaId) => informationArchitecture.mainAreas[areaId],
  );
  const firstHeuristicFinding = heuristicFindings[heuristicFindingOrder[0]];

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
            <p>{persona.scenario}</p>
          </article>
          <article>
            <h3>{t("informationArchitectureHeading")}</h3>
            <ul>
              {mainAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </article>
          <article>
            <h3>{t("heuristicIterationHeading")}</h3>
            <p>{firstHeuristicFinding.iterationNote}</p>
          </article>
        </div>
      </section>
    </section>
  );
}
