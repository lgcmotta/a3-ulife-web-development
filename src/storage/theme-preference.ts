import {
  defaultTheme,
  isThemeId,
  THEME_STORAGE_KEY,
  type ThemeId,
} from "@/accessibility/theme";

export function readThemePreference(): ThemeId {
  if (typeof window === "undefined") {
    return defaultTheme;
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return isThemeId(storedTheme) ? storedTheme : defaultTheme;
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
