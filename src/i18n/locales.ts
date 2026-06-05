export const supportedLocales = ["en", "pt-BR"] as const;

export type SupportedLocale = (typeof supportedLocales)[number];

export const defaultLocale = "en" satisfies SupportedLocale;

export const languagePreferenceCookie = "legado-de-diogenes-language";
export const languagePreferenceStorageKey = "legado-de-diogenes-language";

export type LocaleOption = {
  id: SupportedLocale;
  labelKey: "english" | "portugueseBrazil";
  flagGlyph: string;
  htmlLang: SupportedLocale;
  isDefault: boolean;
};

export const localeOptions: LocaleOption[] = [
  {
    id: "en",
    labelKey: "english",
    flagGlyph: "🇺🇸",
    htmlLang: "en",
    isDefault: true,
  },
  {
    id: "pt-BR",
    labelKey: "portugueseBrazil",
    flagGlyph: "🇧🇷",
    htmlLang: "pt-BR",
    isDefault: false,
  },
];

export function isSupportedLocale(value: unknown): value is SupportedLocale {
  return typeof value === "string" && supportedLocales.includes(value as SupportedLocale);
}

export function resolveLocale(value: unknown): SupportedLocale {
  return isSupportedLocale(value) ? value : defaultLocale;
}
