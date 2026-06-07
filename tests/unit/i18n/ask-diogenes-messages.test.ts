import { describe, expect, it } from "vitest";
import enMessages from "@/i18n/messages/en";
import ptBRMessages from "@/i18n/messages/pt-BR";

const requiredPromptIds = [
  "platformOrientation",
  "learningTracks",
  "topicStudy",
  "progressFeedback",
  "accessibilityLanguage",
] as const;

const forbiddenTerms = [
  "apiKey",
  "chatbotApi",
  "model",
  "provider",
  "redis",
  "storageKey",
];

function flattenKeys(value: unknown, prefix = ""): string[] {
  if (typeof value !== "object" || value === null) {
    return [prefix];
  }

  return Object.entries(value).flatMap(([key, childValue]) =>
    flattenKeys(childValue, prefix ? `${prefix}.${key}` : key),
  );
}

describe("Ask Diogenes message contract", () => {
  it("keeps required prompt IDs aligned across locales", () => {
    const enPromptIds = Object.keys(enMessages.askDiogenes.prompts).toSorted();
    const ptBRPromptIds = Object.keys(ptBRMessages.askDiogenes.prompts).toSorted();

    expect(enPromptIds).toEqual([...requiredPromptIds].toSorted());
    expect(ptBRPromptIds).toEqual(enPromptIds);
  });

  it("keeps English and Portuguese Ask Diogenes key shapes aligned", () => {
    expect(flattenKeys(ptBRMessages.askDiogenes).toSorted()).toEqual(
      flattenKeys(enMessages.askDiogenes).toSorted(),
    );
  });

  it("keeps assistant scripts local and deterministic", () => {
    const serializedCatalogs = JSON.stringify([
      enMessages.askDiogenes,
      ptBRMessages.askDiogenes,
    ]).toLowerCase();

    for (const term of forbiddenTerms) {
      expect(serializedCatalogs).not.toContain(term.toLowerCase());
    }
  });
});
