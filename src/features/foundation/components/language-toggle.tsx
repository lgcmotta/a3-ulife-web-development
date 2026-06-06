"use client";

import { useLanguagePreference } from "@/features/foundation/components/preference-providers";
import { localeOptions, type SupportedLocale } from "@/i18n/locales";
import { cn } from "@/ui/utils";

export type LanguageToggleLabels = {
  groupLabel: string;
  optionLabels: Record<SupportedLocale, string>;
  selectedLabels: Record<SupportedLocale, string>;
  switchLabels: Record<SupportedLocale, string>;
};

const defaultLabels: LanguageToggleLabels = {
  groupLabel: "Language",
  optionLabels: {
    en: "English",
    "pt-BR": "Portuguese (Brazil)",
  },
  selectedLabels: {
    en: "English selected",
    "pt-BR": "Portuguese (Brazil) selected",
  },
  switchLabels: {
    en: "Switch to English",
    "pt-BR": "Switch to Portuguese (Brazil)",
  },
};

export function LanguageToggle({
  labels = defaultLabels,
}: {
  labels?: LanguageToggleLabels;
}) {
  const { selectedLocale, selectLocale } = useLanguagePreference();

  return (
    <div className="language-control" role="group" aria-label={labels.groupLabel}>
      {localeOptions.map((option) => {
        const languageLabel = labels.optionLabels[option.id];
        const selected = option.id === selectedLocale;

        return (
          <button
            aria-label={
              selected ? labels.selectedLabels[option.id] : labels.switchLabels[option.id]
            }
            aria-pressed={selected}
            className={cn("language-option", selected && "language-option-selected")}
            key={option.id}
            onClick={() => selectLocale(option.id)}
            type="button"
          >
            <span aria-hidden="true" className="language-flag">
              {option.flagGlyph}
            </span>
            <span className="sr-only">{languageLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
