import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { BASE_THEME_STORAGE_KEY, HIGH_CONTRAST_STORAGE_KEY } from "@/accessibility/theme";
import { ThemeToggle } from "@/features/foundation/components/theme-toggle";

describe("ThemeToggle", () => {
  it("exposes accessible labels and states for the base theme and contrast controls", () => {
    window.localStorage.setItem(BASE_THEME_STORAGE_KEY, "dark");
    window.localStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, "true");

    render(React.createElement(ThemeToggle));

    expect(screen.getByRole("group", { name: /base theme/i })).toBeTruthy();
    expect((screen.getByRole("radio", { name: "Light" }) as HTMLInputElement).checked).toBe(
      false,
    );
    expect((screen.getByRole("radio", { name: "Dark" }) as HTMLInputElement).checked).toBe(true);
    expect(screen.getByRole("switch", { name: /high contrast/i }).getAttribute("aria-checked")).toBe(
      "true",
    );
  });

  it("changes high contrast without changing the selected base theme", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(BASE_THEME_STORAGE_KEY, "dark");
    window.localStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, "false");

    render(React.createElement(ThemeToggle));

    const toggle = screen.getByRole("switch", { name: /high contrast/i });
    toggle.focus();
    await user.keyboard("[Space]");

    expect(window.localStorage.getItem(BASE_THEME_STORAGE_KEY)).toBe("dark");
    expect(window.localStorage.getItem(HIGH_CONTRAST_STORAGE_KEY)).toBe("true");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(document.documentElement.dataset.contrast).toBe("high");
    expect(document.activeElement).toBe(toggle);
  });

  it("changes base theme without changing high contrast", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem(BASE_THEME_STORAGE_KEY, "light");
    window.localStorage.setItem(HIGH_CONTRAST_STORAGE_KEY, "true");

    render(React.createElement(ThemeToggle));

    await user.click(screen.getByRole("radio", { name: "Dark" }));

    expect(window.localStorage.getItem(BASE_THEME_STORAGE_KEY)).toBe("dark");
    expect(window.localStorage.getItem(HIGH_CONTRAST_STORAGE_KEY)).toBe("true");
    expect(document.documentElement.dataset.theme).toBe("dark");
    expect(document.documentElement.dataset.contrast).toBe("high");
    expect((screen.getByRole("radio", { name: "Dark" }) as HTMLInputElement).checked).toBe(true);
    expect(screen.getByRole("switch", { name: /high contrast/i }).getAttribute("aria-checked")).toBe(
      "true",
    );
  });

  it("toggles contrast with pointer input while preserving focusable state semantics", async () => {
    const user = userEvent.setup();
    render(React.createElement(ThemeToggle));

    const toggle = screen.getByRole("switch", { name: /high contrast/i });

    await user.click(toggle);

    expect(toggle.getAttribute("aria-checked")).toBe("true");
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(document.documentElement.dataset.contrast).toBe("high");
  });
});
