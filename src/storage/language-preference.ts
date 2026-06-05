import {
  defaultLocale,
  isSupportedLocale,
  languagePreferenceCookie,
  languagePreferenceStorageKey,
  resolveLocale,
  type SupportedLocale,
} from "@/i18n/locales";

const languagePreferenceEvent = "legado-de-diogenes-language-change";
const cookieMaxAgeSeconds = 60 * 60 * 24 * 365;

function readLocalStorageValue(key: string) {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(key);
}

function readDocumentCookie(name: string) {
  if (typeof document === "undefined") {
    return null;
  }

  const cookie = document.cookie
    .split("; ")
    .find((entry) => entry.startsWith(`${name}=`));

  return cookie ? decodeURIComponent(cookie.split("=").slice(1).join("=")) : null;
}

export function readStoredLanguagePreference(): SupportedLocale | null {
  const storedLocale = readLocalStorageValue(languagePreferenceStorageKey);
  return isSupportedLocale(storedLocale) ? storedLocale : null;
}

export function readLanguageCookie(): SupportedLocale | null {
  const cookieLocale = readDocumentCookie(languagePreferenceCookie);
  return isSupportedLocale(cookieLocale) ? cookieLocale : null;
}

export function readAppliedLanguagePreference(): SupportedLocale {
  if (typeof document === "undefined") {
    return defaultLocale;
  }

  return resolveLocale(
    document.documentElement.dataset.language ?? document.documentElement.lang,
  );
}

export function getLanguagePreferenceSnapshot(): SupportedLocale {
  return readStoredLanguagePreference() ?? readLanguageCookie() ?? readAppliedLanguagePreference();
}

export function applyLanguagePreference(locale: SupportedLocale) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.lang = locale;
  document.documentElement.dataset.language = locale;
}

export function notifyLanguagePreferenceChange() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(languagePreferenceEvent));
}

export function writeLanguagePreference(locale: SupportedLocale) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(languagePreferenceStorageKey, locale);
  document.cookie = `${languagePreferenceCookie}=${encodeURIComponent(
    locale,
  )}; path=/; max-age=${cookieMaxAgeSeconds}; SameSite=Lax`;
}

export function subscribeToLanguagePreference(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleChange = () => {
    applyLanguagePreference(getLanguagePreferenceSnapshot());
    onStoreChange();
  };

  window.addEventListener("storage", handleChange);
  window.addEventListener(languagePreferenceEvent, handleChange);
  window.setTimeout(handleChange, 0);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(languagePreferenceEvent, handleChange);
  };
}
