import { describe, expect, it, vi } from "vitest";
import { BASE_THEME_STORAGE_KEY, HIGH_CONTRAST_STORAGE_KEY } from "@/accessibility/theme";
import {
  applyLanguagePreference,
  getLanguagePreferenceSnapshot,
  notifyLanguagePreferenceChange,
  readAppliedLanguagePreference,
  readLanguageCookie,
  readStoredLanguagePreference,
  subscribeToLanguagePreference,
  writeLanguagePreference,
} from "@/storage/language-preference";
import { languagePreferenceStorageKey } from "@/i18n/locales";

describe("language preference", () => {
  it("falls back to English when no supported preference exists", () => {
    window.localStorage.setItem(languagePreferenceStorageKey, "pt");
    document.documentElement.lang = "fr";
    document.documentElement.dataset.language = "br";

    expect(readStoredLanguagePreference()).toBeNull();
    expect(readLanguageCookie()).toBeNull();
    expect(readAppliedLanguagePreference()).toBe("en");
    expect(getLanguagePreferenceSnapshot()).toBe("en");
  });

  it("writes cookie, client snapshot, and DOM language without changing theme preferences", () => {
    window.localStorage.setItem(BASE_THEME_STORAGE_KEY, "dark");
    window.localStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, "true");

    writeLanguagePreference("pt-BR");
    applyLanguagePreference("pt-BR");

    expect(window.localStorage.getItem(languagePreferenceStorageKey)).toBe("pt-BR");
    expect(readLanguageCookie()).toBe("pt-BR");
    expect(document.documentElement.lang).toBe("pt-BR");
    expect(document.documentElement.dataset.language).toBe("pt-BR");
    expect(window.localStorage.getItem(BASE_THEME_STORAGE_KEY)).toBe("dark");
    expect(window.localStorage.getItem(HIGH_CONTRAST_STORAGE_KEY)).toBe("true");
  });

  it("notifies subscribers after language changes", () => {
    const listener = vi.fn();
    const unsubscribe = subscribeToLanguagePreference(listener);

    writeLanguagePreference("en");
    applyLanguagePreference("en");
    notifyLanguagePreferenceChange();

    expect(listener).toHaveBeenCalled();
    unsubscribe();
  });
});
