import { describe, expect, it } from "vitest";
import { defaultTheme, resolveTheme, themes } from "@/accessibility/theme";
import {
  getThemePreferenceSnapshot,
  readAppliedThemePreference,
  readStoredThemePreference,
} from "@/storage/theme-preference";

describe("theme helpers", () => {
  it("defines default and high-contrast visual themes", () => {
    expect(themes.map((theme) => theme.id)).toEqual(["default", "high-contrast"]);
    expect(defaultTheme).toBe("default");
  });

  it("falls back to the default theme for unknown values", () => {
    expect(resolveTheme("high-contrast")).toBe("high-contrast");
    expect(resolveTheme("unknown")).toBe("default");
    expect(resolveTheme(null)).toBe("default");
  });

  it("reads stored theme preference only from local storage", () => {
    expect(readStoredThemePreference()).toBeNull();

    window.localStorage.setItem("legado-de-diogenes-theme", "high-contrast");

    expect(readStoredThemePreference()).toBe("high-contrast");
  });

  it("reads applied theme preference from document theme", () => {
    expect(readAppliedThemePreference()).toBe(defaultTheme);

    document.documentElement.dataset.theme = "high-contrast";

    expect(readAppliedThemePreference()).toBe("high-contrast");
  });

  it("prefers stored theme over applied theme for client snapshots", () => {
    document.documentElement.dataset.theme = "default";
    window.localStorage.setItem("legado-de-diogenes-theme", "high-contrast");

    expect(getThemePreferenceSnapshot()).toBe("high-contrast");
  });
});
