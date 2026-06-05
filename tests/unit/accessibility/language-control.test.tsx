import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LanguageToggle } from "@/features/foundation/components/language-toggle";
import { languagePreferenceStorageKey } from "@/i18n/locales";

const refreshMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: refreshMock,
  }),
}));

describe("LanguageToggle", () => {
  beforeEach(() => {
    refreshMock.mockClear();
  });

  it("defaults to English and exposes accessible selected state", () => {
    render(React.createElement(LanguageToggle));

    expect(screen.getByRole("group", { name: "Language" })).toBeTruthy();
    expect(
      screen.getByRole("button", { name: "English selected" }).getAttribute("aria-pressed"),
    ).toBe("true");
    expect(
      screen
        .getByRole("button", { name: "Switch to Portuguese (Brazil)" })
        .getAttribute("aria-pressed"),
    ).toBe("false");
  });

  it("writes Portuguese and English selections while refreshing the current route", async () => {
    const user = userEvent.setup();
    render(React.createElement(LanguageToggle));

    await user.click(screen.getByRole("button", { name: "Switch to Portuguese (Brazil)" }));

    expect(window.localStorage.getItem(languagePreferenceStorageKey)).toBe("pt-BR");
    expect(document.documentElement.lang).toBe("pt-BR");
    expect(document.documentElement.dataset.language).toBe("pt-BR");
    expect(refreshMock).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: "Switch to English" }));

    expect(window.localStorage.getItem(languagePreferenceStorageKey)).toBe("en");
    expect(document.documentElement.lang).toBe("en");
    expect(document.documentElement.dataset.language).toBe("en");
    expect(refreshMock).toHaveBeenCalledTimes(2);
  });
});
