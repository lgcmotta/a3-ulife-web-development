import {
  accessibilityHelpSectionOrder,
  heuristicFindingOrder,
  homePrincipleOrder,
  informationArchitectureOrder,
  personaOrder,
  topicKeyIdeaOrder,
  trackStructure,
} from "@/content/catalog-structure";
import type {
  AccessibilityHelpSection,
  HeuristicEvaluationFinding,
  InformationArchitectureArtifact,
  LearningTrack,
  PersonaArtifact,
  Topic,
} from "@/content/types";
import { getMessagesForLocale, type AppMessages } from "@/i18n/messages";
import { resolveLocale, type SupportedLocale } from "@/i18n/locales";
import type { TopicSlug, TrackSlug } from "@/content/catalog-structure";

type LocalizedContent = {
  diogenesProfile: AppMessages["home"]["diogenesProfile"];
  homePrinciples: string[];
  accessibilityHelpSections: AccessibilityHelpSection[];
  learningTracks: LearningTrack[];
  personas: PersonaArtifact[];
  informationArchitecture: InformationArchitectureArtifact;
  heuristicFindings: HeuristicEvaluationFinding[];
};

function orderedValues(values: object, keys: readonly string[]): string[] {
  const record = values as Record<string, string>;

  return keys.map((key) => record[key]);
}

function buildTopic(
  messages: AppMessages,
  trackSlug: TrackSlug,
  topicSlug: TopicSlug,
): Topic {
  const topic = messages.topics.items[topicSlug];

  return {
    slug: topicSlug,
    trackSlug,
    title: topic.title,
    summary: topic.summary,
    whyItMatters: topic.whyItMatters,
    studyNext: topic.studyNext,
    keyIdeas: orderedValues(topic.keyIdeas, topicKeyIdeaOrder[topicSlug]),
    practicePrompt: topic.practicePrompt,
    professorNote: topic.professorNote,
  };
}

function buildTracks(messages: AppMessages): LearningTrack[] {
  return trackStructure.map((track) => {
    const trackMessages = messages.tracks.items[track.slug];

    return {
      slug: track.slug,
      title: trackMessages.title,
      summary: trackMessages.summary,
      description: trackMessages.description,
      recommendedFor: trackMessages.recommendedFor,
      outcome: trackMessages.outcome,
      topics: track.topics.map((topicSlug) =>
        buildTopic(messages, track.slug, topicSlug),
      ),
    };
  });
}

function buildAccessibilityHelpSections(
  messages: AppMessages,
): AccessibilityHelpSection[] {
  return accessibilityHelpSectionOrder.map((sectionId, index) => {
    const section = messages.accessibility.helpSections[sectionId];

    return {
      title: section.title,
      content: section.content,
      appliesTo: section.appliesTo,
      order: index + 1,
    };
  });
}

function buildPersonas(messages: AppMessages): PersonaArtifact[] {
  return personaOrder.map((personaId) => {
    const persona = messages.evidence.personas[personaId];

    return {
      name: persona.name,
      studentStage: persona.studentStage,
      goals: orderedValues(persona.goals, [
        "understandFirst",
        "shortExplanations",
        "mobileUse",
      ]),
      needs: orderedValues(persona.needs, [
        "plainLabels",
        "predictableNavigation",
        "readableMobile",
        "nextAction",
      ]),
      frustrations: orderedValues(persona.frustrations, [
        "unorderedTopics",
        "assumedVocabulary",
        "changingNavigation",
      ]),
      scenario: persona.scenario,
    };
  });
}

function buildInformationArchitecture(
  messages: AppMessages,
): InformationArchitectureArtifact {
  const informationArchitecture = messages.evidence.informationArchitecture;

  return {
    mainAreas: orderedValues(
      informationArchitecture.mainAreas,
      informationArchitectureOrder.mainAreas,
    ),
    navigationRelationships: orderedValues(
      informationArchitecture.navigationRelationships,
      informationArchitectureOrder.navigationRelationships,
    ),
    contentHierarchy: orderedValues(
      informationArchitecture.contentHierarchy,
      informationArchitectureOrder.contentHierarchy,
    ),
    wireframeNotes: orderedValues(
      informationArchitecture.wireframeNotes,
      informationArchitectureOrder.wireframeNotes,
    ),
  };
}

function buildHeuristicFindings(
  messages: AppMessages,
): HeuristicEvaluationFinding[] {
  return heuristicFindingOrder.map((findingId) => {
    const finding = messages.evidence.heuristicFindings[findingId];

    return {
      heuristic: finding.heuristic,
      finding: finding.finding,
      severity: finding.severity as HeuristicEvaluationFinding["severity"],
      decision: finding.decision as HeuristicEvaluationFinding["decision"],
      iterationNote: finding.iterationNote,
    };
  });
}

function buildLocalizedContent(locale: SupportedLocale): LocalizedContent {
  const messages = getMessagesForLocale(locale);

  return {
    diogenesProfile: messages.home.diogenesProfile,
    homePrinciples: orderedValues(messages.home.principles, homePrincipleOrder),
    accessibilityHelpSections: buildAccessibilityHelpSections(messages),
    learningTracks: buildTracks(messages),
    personas: buildPersonas(messages),
    informationArchitecture: buildInformationArchitecture(messages),
    heuristicFindings: buildHeuristicFindings(messages),
  };
}

export const localizedContent = {
  en: buildLocalizedContent("en"),
  "pt-BR": buildLocalizedContent("pt-BR"),
} satisfies Record<SupportedLocale, LocalizedContent>;

export function getLocalizedContent(locale: unknown) {
  return localizedContent[resolveLocale(locale)];
}

export function getLocalizedTracks(locale: unknown) {
  return getLocalizedContent(locale).learningTracks;
}

export function getLocalizedTrack(locale: unknown, trackSlug: string) {
  return getLocalizedTracks(locale).find((track) => track.slug === trackSlug);
}

export function getLocalizedTopic(locale: unknown, trackSlug: string, topicSlug: string) {
  return getLocalizedTrack(locale, trackSlug)?.topics.find((topic) => topic.slug === topicSlug);
}
