import type { VisualTheme } from "@/content/types";

export const LEGACY_THEME_STORAGE_KEY = "legado-de-diogenes-theme";
export const BASE_THEME_STORAGE_KEY = "legado-de-diogenes-base-theme";
export const HIGH_CONTRAST_STORAGE_KEY = "legado-de-diogenes-high-contrast";

export type BaseThemeId = "light" | "dark";

export const contrastModes = ["normal", "high"] as const;

export type ContrastMode = (typeof contrastModes)[number];

export type ThemeCombination =
  | "light-normal"
  | "light-high"
  | "dark-normal"
  | "dark-high";

export type VisualPreference = {
  baseTheme: BaseThemeId;
  highContrast: boolean;
  contrast: ContrastMode;
  combination: ThemeCombination;
};

export const defaultBaseTheme: BaseThemeId = "light";
export const defaultHighContrast = false;

export const visualPreferences: Record<ThemeCombination, VisualPreference> = {
  "light-normal": {
    baseTheme: "light",
    highContrast: false,
    contrast: "normal",
    combination: "light-normal",
  },
  "light-high": {
    baseTheme: "light",
    highContrast: true,
    contrast: "high",
    combination: "light-high",
  },
  "dark-normal": {
    baseTheme: "dark",
    highContrast: false,
    contrast: "normal",
    combination: "dark-normal",
  },
  "dark-high": {
    baseTheme: "dark",
    highContrast: true,
    contrast: "high",
    combination: "dark-high",
  },
};

export const defaultVisualPreference = visualPreferences["light-normal"];

export const themes: VisualTheme[] = [
  {
    id: "light",
    label: "Light theme",
    purpose: "Balanced color-safe reading for normal presentation use",
    isDefault: true,
    baseTheme: "light",
    highContrast: false,
  },
  {
    id: "light-high",
    label: "Light high contrast",
    purpose: "Light surfaces with stronger borders, focus indicators, and action contrast",
    isDefault: false,
    baseTheme: "light",
    highContrast: true,
  },
  {
    id: "dark",
    label: "Dark theme",
    purpose: "Darker reading surfaces while preserving the same content and navigation",
    isDefault: false,
    baseTheme: "dark",
    highContrast: false,
  },
  {
    id: "dark-high",
    label: "Dark high contrast",
    purpose: "Dark surfaces with maximum separation for text, controls, and focus states",
    isDefault: false,
    baseTheme: "dark",
    highContrast: true,
  },
];

export type ThemeId = (typeof themes)[number]["id"];

export type ThemeTokenPair = {
  name: string;
  foreground: string;
  background: string;
  minimumRatio: number;
};

export type ThemeTokenSet = {
  combination: ThemeCombination;
  pairs: ThemeTokenPair[];
};

export const themeTokenSets: ThemeTokenSet[] = [
  {
    combination: "light-normal",
    pairs: [
      { name: "page", foreground: "#15211c", background: "#fbfaf7", minimumRatio: 4.5 },
      { name: "muted", foreground: "#40524b", background: "#fbfaf7", minimumRatio: 4.5 },
      { name: "surface", foreground: "#15211c", background: "#ffffff", minimumRatio: 4.5 },
      {
        name: "surface-strong",
        foreground: "#15211c",
        background: "#eef4f1",
        minimumRatio: 4.5,
      },
      { name: "action", foreground: "#ffffff", background: "#0f5e52", minimumRatio: 4.5 },
      {
        name: "action-hover",
        foreground: "#ffffff",
        background: "#0a493f",
        minimumRatio: 4.5,
      },
      { name: "control", foreground: "#15211c", background: "#ffffff", minimumRatio: 4.5 },
      {
        name: "control-selected",
        foreground: "#ffffff",
        background: "#0f5e52",
        minimumRatio: 4.5,
      },
      { name: "disabled", foreground: "#52625c", background: "#e7eeea", minimumRatio: 4.5 },
      { name: "focus", foreground: "#8f2f1d", background: "#ffffff", minimumRatio: 3 },
    ],
  },
  {
    combination: "light-high",
    pairs: [
      { name: "page", foreground: "#050505", background: "#ffffff", minimumRatio: 4.5 },
      { name: "muted", foreground: "#111111", background: "#ffffff", minimumRatio: 4.5 },
      { name: "surface", foreground: "#050505", background: "#ffffff", minimumRatio: 4.5 },
      {
        name: "surface-strong",
        foreground: "#050505",
        background: "#f1f1f1",
        minimumRatio: 4.5,
      },
      { name: "action", foreground: "#ffffff", background: "#003f8f", minimumRatio: 4.5 },
      {
        name: "action-hover",
        foreground: "#ffffff",
        background: "#002b62",
        minimumRatio: 4.5,
      },
      { name: "control", foreground: "#050505", background: "#ffffff", minimumRatio: 4.5 },
      {
        name: "control-selected",
        foreground: "#ffffff",
        background: "#001f5c",
        minimumRatio: 4.5,
      },
      { name: "disabled", foreground: "#333333", background: "#e7e7e7", minimumRatio: 4.5 },
      { name: "focus", foreground: "#005fcc", background: "#ffffff", minimumRatio: 3 },
    ],
  },
  {
    combination: "dark-normal",
    pairs: [
      { name: "page", foreground: "#f4fbf7", background: "#101714", minimumRatio: 4.5 },
      { name: "muted", foreground: "#c3d1ca", background: "#101714", minimumRatio: 4.5 },
      { name: "surface", foreground: "#f4fbf7", background: "#17231f", minimumRatio: 4.5 },
      {
        name: "surface-strong",
        foreground: "#f4fbf7",
        background: "#22342e",
        minimumRatio: 4.5,
      },
      { name: "action", foreground: "#06211d", background: "#62d6c6", minimumRatio: 4.5 },
      {
        name: "action-hover",
        foreground: "#031a16",
        background: "#7be7d7",
        minimumRatio: 4.5,
      },
      { name: "control", foreground: "#f4fbf7", background: "#17231f", minimumRatio: 4.5 },
      {
        name: "control-selected",
        foreground: "#06211d",
        background: "#b7e4dd",
        minimumRatio: 4.5,
      },
      { name: "disabled", foreground: "#c0ccc7", background: "#2c3834", minimumRatio: 4.5 },
      { name: "focus", foreground: "#ffcc33", background: "#101714", minimumRatio: 3 },
    ],
  },
  {
    combination: "dark-high",
    pairs: [
      { name: "page", foreground: "#ffffff", background: "#000000", minimumRatio: 4.5 },
      { name: "muted", foreground: "#f2f2f2", background: "#000000", minimumRatio: 4.5 },
      { name: "surface", foreground: "#ffffff", background: "#000000", minimumRatio: 4.5 },
      {
        name: "surface-strong",
        foreground: "#ffffff",
        background: "#111111",
        minimumRatio: 4.5,
      },
      { name: "action", foreground: "#000000", background: "#ffd400", minimumRatio: 4.5 },
      {
        name: "action-hover",
        foreground: "#000000",
        background: "#ffe66d",
        minimumRatio: 4.5,
      },
      { name: "control", foreground: "#ffffff", background: "#000000", minimumRatio: 4.5 },
      {
        name: "control-selected",
        foreground: "#000000",
        background: "#ffffff",
        minimumRatio: 4.5,
      },
      { name: "disabled", foreground: "#dddddd", background: "#222222", minimumRatio: 4.5 },
      { name: "focus", foreground: "#005fcc", background: "#ffffff", minimumRatio: 3 },
    ],
  },
];

export function isBaseThemeId(value: string | null | undefined): value is BaseThemeId {
  return value === "light" || value === "dark";
}

export function isContrastMode(value: string | null | undefined): value is ContrastMode {
  return value === "normal" || value === "high";
}

export function resolveBaseTheme(value: string | null | undefined): BaseThemeId {
  return isBaseThemeId(value) ? value : defaultBaseTheme;
}

export function resolveHighContrast(value: string | boolean | null | undefined): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  if (value === "true" || value === "high") {
    return true;
  }

  if (value === "false" || value === "normal") {
    return false;
  }

  return defaultHighContrast;
}

export function getContrastMode(highContrast: boolean): ContrastMode {
  return highContrast ? "high" : "normal";
}

export function getThemeCombination(
  baseTheme: BaseThemeId,
  highContrast: boolean,
): ThemeCombination {
  return `${baseTheme}-${getContrastMode(highContrast)}` as ThemeCombination;
}

export function resolveVisualPreference(input?: {
  baseTheme?: string | null;
  highContrast?: string | boolean | null;
  contrast?: string | null;
}): VisualPreference {
  const baseTheme = resolveBaseTheme(input?.baseTheme);
  const highContrast =
    input?.contrast === "high" || input?.contrast === "normal"
      ? input.contrast === "high"
      : resolveHighContrast(input?.highContrast);

  return visualPreferences[getThemeCombination(baseTheme, highContrast)];
}
