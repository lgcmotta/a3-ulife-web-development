import type { VisualTheme } from "@/content/types";

export const THEME_STORAGE_KEY = "legado-de-diogenes-theme";

export const themes: VisualTheme[] = [
  {
    id: "default",
    label: "Default theme",
    purpose: "Balanced color-safe reading for normal presentation use",
    isDefault: true,
  },
  {
    id: "high-contrast",
    label: "High-contrast theme",
    purpose: "Stronger contrast for students who need clearer visual separation",
    isDefault: false,
  },
];

export type ThemeId = (typeof themes)[number]["id"];

export const defaultTheme: ThemeId = "default";

export function isThemeId(value: string | null | undefined): value is ThemeId {
  return themes.some((theme) => theme.id === value);
}

export function resolveTheme(value: string | null | undefined): ThemeId {
  return isThemeId(value) ? value : defaultTheme;
}

export function getThemeLabel(themeId: ThemeId) {
  return themes.find((theme) => theme.id === themeId)?.label ?? "Default theme";
}
