import {
  defaultTheme,
  isThemeId,
  THEME_STORAGE_KEY,
  type ThemeId,
} from "@/accessibility/theme";

const THEME_PREFERENCE_EVENT = "legado-de-diogenes-theme-change";

export function readStoredThemePreference(): ThemeId | null {
  if (typeof window === "undefined") {
    return null;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isThemeId(storedTheme) ? storedTheme : null;
}

export function readAppliedThemePreference(): ThemeId {
  if (typeof document === "undefined") {
    return defaultTheme;
  }

  return isThemeId(document.documentElement.dataset.theme)
    ? document.documentElement.dataset.theme
    : defaultTheme;
}

export function getThemePreferenceSnapshot(): ThemeId {
  return readStoredThemePreference() ?? readAppliedThemePreference();
}

export function subscribeToThemePreference(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => undefined;
  }

  const handleChange = () => {
    applyThemePreference(getThemePreferenceSnapshot());
    onStoreChange();
  };

  window.addEventListener("storage", handleChange);
  window.addEventListener(THEME_PREFERENCE_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(THEME_PREFERENCE_EVENT, handleChange);
  };
}

export function notifyThemePreferenceChange() {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(new Event(THEME_PREFERENCE_EVENT));
}

export function writeThemePreference(themeId: ThemeId) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(THEME_STORAGE_KEY, themeId);
}

export function applyThemePreference(themeId: ThemeId) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.theme = themeId;
}
