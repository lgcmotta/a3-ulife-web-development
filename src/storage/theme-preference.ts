import {
  BASE_THEME_STORAGE_KEY,
  defaultBaseTheme,
  defaultHighContrast,
  HIGH_CONTRAST_STORAGE_KEY,
  isBaseThemeId,
  LEGACY_THEME_STORAGE_KEY,
  resolveVisualPreference,
  type BaseThemeId,
  type VisualPreference,
} from "@/accessibility/theme";

const THEME_PREFERENCE_EVENT = "legado-de-diogenes-theme-change";

function readLocalStorageValue(key: string) {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage.getItem(key);
}

export function readStoredBaseThemePreference(): BaseThemeId | null {
  const storedTheme = readLocalStorageValue(BASE_THEME_STORAGE_KEY);
  return isBaseThemeId(storedTheme) ? storedTheme : null;
}

export function readStoredHighContrastPreference(): boolean | null {
  const storedContrast = readLocalStorageValue(HIGH_CONTRAST_STORAGE_KEY);

  if (storedContrast === "true") {
    return true;
  }

  if (storedContrast === "false") {
    return false;
  }

  return null;
}

export function readLegacyThemePreference(): VisualPreference | null {
  const legacyTheme = readLocalStorageValue(LEGACY_THEME_STORAGE_KEY);

  if (legacyTheme === "high-contrast") {
    return resolveVisualPreference({
      baseTheme: defaultBaseTheme,
      highContrast: true,
    });
  }

  if (legacyTheme === "default") {
    return resolveVisualPreference({
      baseTheme: defaultBaseTheme,
      highContrast: defaultHighContrast,
    });
  }

  return null;
}

export function readStoredThemePreference(): VisualPreference | null {
  const storedBaseTheme = readLocalStorageValue(BASE_THEME_STORAGE_KEY);
  const storedHighContrast = readLocalStorageValue(HIGH_CONTRAST_STORAGE_KEY);
  const hasIndependentPreference = storedBaseTheme !== null || storedHighContrast !== null;

  if (hasIndependentPreference) {
    return resolveVisualPreference({
      baseTheme: storedBaseTheme,
      highContrast: storedHighContrast,
    });
  }

  return readLegacyThemePreference();
}

export function readAppliedThemePreference(): VisualPreference {
  if (typeof document === "undefined") {
    return resolveVisualPreference();
  }

  return resolveVisualPreference({
    baseTheme: document.documentElement.dataset.theme,
    contrast: document.documentElement.dataset.contrast,
  });
}

export function getThemePreferenceSnapshot(): VisualPreference {
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
  window.setTimeout(handleChange, 0);

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

export function writeThemePreference(preference: VisualPreference) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(BASE_THEME_STORAGE_KEY, preference.baseTheme);
  window.localStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, String(preference.highContrast));
  window.localStorage.removeItem(LEGACY_THEME_STORAGE_KEY);
}

export function writeBaseThemePreference(baseTheme: BaseThemeId) {
  const currentPreference = getThemePreferenceSnapshot();
  writeThemePreference(
    resolveVisualPreference({
      baseTheme,
      highContrast: currentPreference.highContrast,
    }),
  );
}

export function writeHighContrastPreference(highContrast: boolean) {
  const currentPreference = getThemePreferenceSnapshot();
  writeThemePreference(
    resolveVisualPreference({
      baseTheme: currentPreference.baseTheme,
      highContrast,
    }),
  );
}

export function applyThemePreference(preference: VisualPreference) {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.dataset.theme = preference.baseTheme;
  document.documentElement.dataset.contrast = preference.contrast;
}
