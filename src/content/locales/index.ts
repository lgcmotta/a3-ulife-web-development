import {
  accessibilityHelpSections as enAccessibilityHelpSections,
} from "@/content/locales/en/accessibility-help";
import {
  diogenesProfile as enDiogenesProfile,
  homePrinciples as enHomePrinciples,
} from "@/content/locales/en/diogenes";
import {
  heuristicFindings as enHeuristicFindings,
} from "@/content/locales/en/evidence/heuristic-evaluation";
import {
  informationArchitecture as enInformationArchitecture,
} from "@/content/locales/en/evidence/information-architecture";
import { personas as enPersonas } from "@/content/locales/en/evidence/personas";
import { learningTracks as enLearningTracks } from "@/content/locales/en/tracks";
import {
  accessibilityHelpSections as ptBRAccessibilityHelpSections,
} from "@/content/locales/pt-BR/accessibility-help";
import {
  diogenesProfile as ptBRDiogenesProfile,
  homePrinciples as ptBRHomePrinciples,
} from "@/content/locales/pt-BR/diogenes";
import {
  heuristicFindings as ptBRHeuristicFindings,
} from "@/content/locales/pt-BR/evidence/heuristic-evaluation";
import {
  informationArchitecture as ptBRInformationArchitecture,
} from "@/content/locales/pt-BR/evidence/information-architecture";
import { personas as ptBRPersonas } from "@/content/locales/pt-BR/evidence/personas";
import { learningTracks as ptBRLearningTracks } from "@/content/locales/pt-BR/tracks";
import { resolveLocale, type SupportedLocale } from "@/i18n/locales";

const enContent = {
  diogenesProfile: enDiogenesProfile,
  homePrinciples: enHomePrinciples,
  accessibilityHelpSections: enAccessibilityHelpSections,
  learningTracks: enLearningTracks,
  personas: enPersonas,
  informationArchitecture: enInformationArchitecture,
  heuristicFindings: enHeuristicFindings,
};

export const localizedContent = {
  en: enContent,
  "pt-BR": {
    diogenesProfile: ptBRDiogenesProfile,
    homePrinciples: ptBRHomePrinciples,
    accessibilityHelpSections: ptBRAccessibilityHelpSections,
    learningTracks: ptBRLearningTracks,
    personas: ptBRPersonas,
    informationArchitecture: ptBRInformationArchitecture,
    heuristicFindings: ptBRHeuristicFindings,
  },
} satisfies Record<SupportedLocale, typeof enContent>;

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
