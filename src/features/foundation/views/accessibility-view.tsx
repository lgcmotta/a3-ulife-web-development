import { accessibilityHelpSections } from "@/content/accessibility-help";
import { informationArchitecture } from "@/content/evidence/information-architecture";
import { heuristicFindings } from "@/content/evidence/heuristic-evaluation";
import { personas } from "@/content/evidence/personas";
import { themes } from "@/accessibility/theme";

export function AccessibilityView() {
  return (
    <section className="content-container page-section" aria-labelledby="accessibility-heading">
      <div className="page-intro">
        <p className="eyebrow">Accessibility help</p>
        <h1 id="accessibility-heading">Navigate the foundation independently</h1>
        <p>
          This page explains the core structure and the accessibility behaviors
          planned into the first version of Legado de Diogenes.
        </p>
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
        <h2 id="themes-heading">Supported visual themes</h2>
        <ul className="evidence-list">
          {themes.map((theme) => (
            <li key={theme.id}>
              <strong>{theme.label}:</strong> {theme.purpose}
            </li>
          ))}
        </ul>
      </section>
      <section className="evidence-section" aria-labelledby="assignment-evidence-heading">
        <p className="eyebrow">Assignment evidence</p>
        <h2 id="assignment-evidence-heading">Design decisions prepared for review</h2>
        <div className="evidence-grid">
          <article>
            <h3>Persona</h3>
            <p>{personas[0].scenario}</p>
          </article>
          <article>
            <h3>Information architecture</h3>
            <ul>
              {informationArchitecture.mainAreas.map((area) => (
                <li key={area}>{area}</li>
              ))}
            </ul>
          </article>
          <article>
            <h3>Heuristic iteration</h3>
            <p>{heuristicFindings[0].iterationNote}</p>
          </article>
        </div>
      </section>
    </section>
  );
}
