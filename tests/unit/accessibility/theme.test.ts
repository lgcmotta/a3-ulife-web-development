import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { contrastRatio, hexToRgb } from "../../accessibility/contrast-helpers";
import {
  BASE_THEME_STORAGE_KEY,
  defaultBaseTheme,
  defaultHighContrast,
  HIGH_CONTRAST_STORAGE_KEY,
  LEGACY_THEME_STORAGE_KEY,
  resolveHighContrast,
  resolveTheme,
  resolveVisualPreference,
  themeTokenSets,
  themes,
  visualPreferences,
} from "@/accessibility/theme";
import {
  applyThemePreference,
  getThemePreferenceSnapshot,
  readAppliedThemePreference,
  readLegacyThemePreference,
  readStoredBaseThemePreference,
  readStoredHighContrastPreference,
  readStoredThemePreference,
} from "@/storage/theme-preference";

describe("theme helpers", () => {
  it("defines light, light high contrast, dark, and dark high contrast themes", () => {
    expect(themes.map((theme) => theme.id)).toEqual(["light", "light-high", "dark", "dark-high"]);
    expect(defaultBaseTheme).toBe("light");
    expect(defaultHighContrast).toBe(false);
  });

  it("falls back to the readable default for unknown values", () => {
    expect(resolveTheme("dark-high")).toBe("dark-high");
    expect(resolveTheme("unknown")).toBe("light");
    expect(resolveTheme(null)).toBe("light");
    expect(resolveHighContrast("high")).toBe(true);
    expect(resolveHighContrast("not-valid")).toBe(false);
  });

  it("resolves the four approved visual combinations", () => {
    expect(resolveVisualPreference()).toBe(visualPreferences["light-normal"]);
    expect(resolveVisualPreference({ baseTheme: "light", highContrast: true })).toBe(
      visualPreferences["light-high"],
    );
    expect(resolveVisualPreference({ baseTheme: "dark", highContrast: false })).toBe(
      visualPreferences["dark-normal"],
    );
    expect(resolveVisualPreference({ baseTheme: "dark", contrast: "high" })).toBe(
      visualPreferences["dark-high"],
    );
  });

  it("declares readable semantic token pairs for every visual combination", () => {
    expect(themeTokenSets.map((tokenSet) => tokenSet.combination)).toEqual([
      "light-normal",
      "light-high",
      "dark-normal",
      "dark-high",
    ]);

    for (const tokenSet of themeTokenSets) {
      for (const pair of tokenSet.pairs) {
        expect(
          contrastRatio(hexToRgb(pair.foreground), hexToRgb(pair.background)),
          `${tokenSet.combination} ${pair.name}`,
        ).toBeGreaterThanOrEqual(pair.minimumRatio);
      }
    }
  });

  it("does not declare white-on-white or black-on-black semantic pairs", () => {
    for (const tokenSet of themeTokenSets) {
      for (const pair of tokenSet.pairs) {
        expect(pair.foreground.toLowerCase(), `${tokenSet.combination} ${pair.name}`).not.toBe(
          pair.background.toLowerCase(),
        );
      }
    }
  });

  it("reads stored independent base theme and high contrast preferences", () => {
    expect(readStoredBaseThemePreference()).toBeNull();
    expect(readStoredHighContrastPreference()).toBeNull();
    expect(readStoredThemePreference()).toBeNull();

    window.localStorage.setItem(BASE_THEME_STORAGE_KEY, "dark");
    window.localStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, "true");

    expect(readStoredBaseThemePreference()).toBe("dark");
    expect(readStoredHighContrastPreference()).toBe(true);
    expect(readStoredThemePreference()).toBe(visualPreferences["dark-high"]);
  });

  it("uses readable defaults when independent stored values are invalid", () => {
    document.documentElement.dataset.theme = "dark";
    document.documentElement.dataset.contrast = "high";
    window.localStorage.setItem(BASE_THEME_STORAGE_KEY, "not-a-theme");
    window.localStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, "not-a-contrast");

    expect(readStoredBaseThemePreference()).toBeNull();
    expect(readStoredHighContrastPreference()).toBeNull();
    expect(readStoredThemePreference()).toBe(visualPreferences["light-normal"]);
    expect(getThemePreferenceSnapshot()).toBe(visualPreferences["light-normal"]);
  });

  it("falls back from the legacy theme key when independent keys are missing", () => {
    window.localStorage.setItem(LEGACY_THEME_STORAGE_KEY, "high-contrast");

    expect(readLegacyThemePreference()).toBe(visualPreferences["light-high"]);
    expect(readStoredThemePreference()).toBe(visualPreferences["light-high"]);

    window.localStorage.setItem(LEGACY_THEME_STORAGE_KEY, "default");

    expect(readStoredThemePreference()).toBe(visualPreferences["light-normal"]);
  });

  it("prefers independent stored preferences over legacy and applied attributes", () => {
    document.documentElement.dataset.theme = "light";
    document.documentElement.dataset.contrast = "normal";
    window.localStorage.setItem(LEGACY_THEME_STORAGE_KEY, "high-contrast");
    window.localStorage.setItem(BASE_THEME_STORAGE_KEY, "dark");
    window.localStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, "false");

    expect(getThemePreferenceSnapshot()).toBe(visualPreferences["dark-normal"]);
  });

  it("reads and applies root visual attributes without using legacy values", () => {
    expect(readAppliedThemePreference()).toBe(visualPreferences["light-normal"]);

    applyThemePreference(visualPreferences["dark-high"]);

    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(document.documentElement.dataset.contrast).toBe("high");
    expect(readAppliedThemePreference()).toBe(visualPreferences["dark-high"]);
  });

  it("documents all four combinations and the original white-on-white defect", () => {
    const evidence = readFileSync(
      join(process.cwd(), "specs/006-theme-contrast-modes/accessibility-evidence.md"),
      "utf8",
    );

    expect(evidence).toMatch(/Light high contrast/i);
    expect(evidence).toMatch(/Dark high contrast/i);
    expect(evidence).toMatch(/white-on-white/i);
    expect(evidence).toMatch(/High contrast remains independent/i);
  });
});
