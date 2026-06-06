import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createElement } from "react";
import { describe, expect, it } from "vitest";
import {
  BASE_THEME_STORAGE_KEY,
  HIGH_CONTRAST_STORAGE_KEY,
  visualPreferences,
  type VisualPreference,
} from "@/accessibility/theme";
import { ThemePreferenceProvider } from "@/features/foundation/components/preference-providers";
import { ThemeToggle } from "@/features/foundation/components/theme-toggle";
import { applyThemePreference, readThemeCookie } from "@/storage/theme-preference";

function renderThemeToggle(
  initialThemePreference: VisualPreference = visualPreferences["light-normal"],
) {
  applyThemePreference(initialThemePreference);

  render(
    createElement(
      ThemePreferenceProvider,
      { initialThemePreference },
      createElement(ThemeToggle),
    ),
  );
}

describe("ThemeToggle", () => {
  it("exposes accessible labels and states for the base theme and contrast controls", () => {
    renderThemeToggle(visualPreferences["dark-high"]);

    expect(screen.queryByRole("radio", { name: "Light" })).toBeNull();
    expect(screen.queryByRole("radio", { name: "Dark" })).toBeNull();
    expect(screen.getByRole("switch", { name: /dark theme/i }).getAttribute("aria-checked")).toBe(
      "true",
    );
    expect(screen.getByRole("switch", { name: /high contrast/i }).getAttribute("aria-checked")).toBe(
      "true",
    );
  });

  it("changes high contrast without changing the selected base theme", async () => {
    const user = userEvent.setup();
    renderThemeToggle(visualPreferences["dark-normal"]);

    const toggle = screen.getByRole("switch", { name: /high contrast/i });
    toggle.focus();
    await user.keyboard("[Space]");

    expect(window.localStorage.getItem(BASE_THEME_STORAGE_KEY)).toBe("dark");
    expect(window.localStorage.getItem(HIGH_CONTRAST_STORAGE_KEY)).toBe("true");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(document.documentElement.dataset.contrast).toBe("high");
    expect(readThemeCookie()).toBe(visualPreferences["dark-high"]);
    expect(document.activeElement).toBe(toggle);
  });

  it("changes base theme without changing high contrast", async () => {
    const user = userEvent.setup();
    renderThemeToggle(visualPreferences["light-high"]);

    await user.click(screen.getByRole("switch", { name: /light theme/i }));

    expect(window.localStorage.getItem(BASE_THEME_STORAGE_KEY)).toBe("dark");
    expect(window.localStorage.getItem(HIGH_CONTRAST_STORAGE_KEY)).toBe("true");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(document.documentElement.dataset.contrast).toBe("high");
    expect(readThemeCookie()).toBe(visualPreferences["dark-high"]);
    expect(screen.getByRole("switch", { name: /dark theme/i }).getAttribute("aria-checked")).toBe(
      "true",
    );
    expect(screen.getByRole("switch", { name: /high contrast/i }).getAttribute("aria-checked")).toBe(
      "true",
    );
  });

  it("toggles base theme with keyboard while preserving focusable state semantics", async () => {
    const user = userEvent.setup();
    renderThemeToggle();

    const toggle = screen.getByRole("switch", { name: /light theme/i });
    toggle.focus();
    await user.keyboard("[Space]");

    expect(window.localStorage.getItem(BASE_THEME_STORAGE_KEY)).toBe("dark");
    expect(toggle.getAttribute("aria-checked")).toBe("true");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(readThemeCookie()).toBe(visualPreferences["dark-normal"]);
    expect(document.activeElement).toBe(toggle);
    expect(screen.getByRole("switch", { name: /dark theme/i })).toBe(toggle);
  });

  it("preserves stored high contrast when base theme changes before migration completes", () => {
    window.localStorage.setItem(BASE_THEME_STORAGE_KEY, "light");
    window.localStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, "true");

    renderThemeToggle();

    fireEvent.click(screen.getByRole("switch", { name: /light theme/i }));

    expect(window.localStorage.getItem(BASE_THEME_STORAGE_KEY)).toBe("dark");
    expect(window.localStorage.getItem(HIGH_CONTRAST_STORAGE_KEY)).toBe("true");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(document.documentElement.dataset.contrast).toBe("high");
    expect(readThemeCookie()).toBe(visualPreferences["dark-high"]);
  });

  it("toggles contrast with pointer input while preserving focusable state semantics", async () => {
    const user = userEvent.setup();
    renderThemeToggle();

    const toggle = screen.getByRole("switch", { name: /high contrast/i });

    await user.click(toggle);

    expect(toggle.getAttribute("aria-checked")).toBe("true");
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(document.documentElement.dataset.contrast).toBe("high");
    expect(readThemeCookie()).toBe(visualPreferences["light-high"]);
  });

  it("migrates stored browser preferences into the cookie-backed provider state", async () => {
    window.localStorage.setItem(BASE_THEME_STORAGE_KEY, "dark");
    window.localStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, "true");

    renderThemeToggle();

    await waitFor(() => {
      expect(screen.getByRole("switch", { name: /dark theme/i }).getAttribute("aria-checked")).toBe(
        "true",
      );
    });
    expect(screen.getByRole("switch", { name: /high contrast/i }).getAttribute("aria-checked")).toBe(
      "true",
    );
    await waitFor(() => {
      expect(readThemeCookie()).toBe(visualPreferences["dark-high"]);
    });
  });
});
