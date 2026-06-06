"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import {
  resolveVisualPreference,
  type BaseThemeId,
  type VisualPreference,
} from "@/accessibility/theme";
import type { SupportedLocale } from "@/i18n/locales";
import {
  applyLanguagePreference,
  getLanguagePreferenceSnapshot,
  notifyLanguagePreferenceChange,
  subscribeToLanguagePreference,
  writeLanguagePreference,
} from "@/storage/language-preference";
import {
  applyThemePreference,
  getThemePreferenceSnapshot,
  notifyThemePreferenceChange,
  subscribeToThemePreference,
  writeThemePreference,
} from "@/storage/theme-preference";

type ThemePreferenceContextValue = {
  preference: VisualPreference;
  setBaseTheme: (baseTheme: BaseThemeId) => void;
  setHighContrast: (highContrast: boolean) => void;
};

type LanguagePreferenceContextValue = {
  selectedLocale: SupportedLocale;
  selectLocale: (locale: SupportedLocale) => void;
};

const ThemePreferenceContext = createContext<ThemePreferenceContextValue | null>(null);
const LanguagePreferenceContext = createContext<LanguagePreferenceContextValue | null>(null);

export function PreferenceProviders({
  children,
  initialLocale,
  initialThemePreference,
}: {
  children: ReactNode;
  initialLocale: SupportedLocale;
  initialThemePreference: VisualPreference;
}) {
  return (
    <ThemePreferenceProvider initialThemePreference={initialThemePreference}>
      <LanguagePreferenceProvider initialLocale={initialLocale}>
        {children}
      </LanguagePreferenceProvider>
    </ThemePreferenceProvider>
  );
}

export function ThemePreferenceProvider({
  children,
  initialThemePreference,
}: {
  children: ReactNode;
  initialThemePreference: VisualPreference;
}) {
  const getServerThemePreferenceSnapshot = useCallback(
    () => initialThemePreference,
    [initialThemePreference],
  );
  const preference = useSyncExternalStore(
    subscribeToThemePreference,
    getThemePreferenceSnapshot,
    getServerThemePreferenceSnapshot,
  );

  const persistThemePreference = useCallback((nextPreference: VisualPreference) => {
    writeThemePreference(nextPreference);
    applyThemePreference(nextPreference);
    notifyThemePreferenceChange();
  }, []);

  const setBaseTheme = useCallback(
    (baseTheme: BaseThemeId) => {
      const currentPreference = getThemePreferenceSnapshot();

      if (baseTheme === currentPreference.baseTheme) {
        return;
      }

      persistThemePreference(
        resolveVisualPreference({
          baseTheme,
          highContrast: currentPreference.highContrast,
        }),
      );
    },
    [persistThemePreference],
  );

  const setHighContrast = useCallback(
    (highContrast: boolean) => {
      const currentPreference = getThemePreferenceSnapshot();

      if (highContrast === currentPreference.highContrast) {
        return;
      }

      persistThemePreference(
        resolveVisualPreference({
          baseTheme: currentPreference.baseTheme,
          highContrast,
        }),
      );
    },
    [persistThemePreference],
  );

  const value = useMemo(
    () => ({
      preference,
      setBaseTheme,
      setHighContrast,
    }),
    [preference, setBaseTheme, setHighContrast],
  );

  return (
    <ThemePreferenceContext.Provider value={value}>
      {children}
    </ThemePreferenceContext.Provider>
  );
}

export function LanguagePreferenceProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: SupportedLocale;
}) {
  const router = useRouter();
  const getServerLanguagePreferenceSnapshot = useCallback(() => initialLocale, [initialLocale]);
  const selectedLocale = useSyncExternalStore(
    subscribeToLanguagePreference,
    getLanguagePreferenceSnapshot,
    getServerLanguagePreferenceSnapshot,
  );
  const selectedLocaleRef = useRef(initialLocale);

  const selectLocale = useCallback(
    (locale: SupportedLocale) => {
      if (locale === selectedLocale) {
        return;
      }

      writeLanguagePreference(locale);
      applyLanguagePreference(locale);
      notifyLanguagePreferenceChange();
    },
    [selectedLocale],
  );

  useEffect(() => {
    if (selectedLocale !== selectedLocaleRef.current) {
      selectedLocaleRef.current = selectedLocale;
      router.refresh();
    }
  }, [router, selectedLocale]);

  const value = useMemo(
    () => ({
      selectedLocale,
      selectLocale,
    }),
    [selectLocale, selectedLocale],
  );

  return (
    <LanguagePreferenceContext.Provider value={value}>
      {children}
    </LanguagePreferenceContext.Provider>
  );
}

export function useThemePreference() {
  const context = useContext(ThemePreferenceContext);

  if (!context) {
    throw new Error("useThemePreference must be used within ThemePreferenceProvider");
  }

  return context;
}

export function useLanguagePreference() {
  const context = useContext(LanguagePreferenceContext);

  if (!context) {
    throw new Error("useLanguagePreference must be used within LanguagePreferenceProvider");
  }

  return context;
}
