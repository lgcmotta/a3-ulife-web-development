import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import type { ComponentProps } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { LanguagePreferenceProvider } from "@/features/foundation/components/preference-providers";
import { LanguageToggle } from "@/features/foundation/components/language-toggle";
import { languagePreferenceStorageKey, type SupportedLocale } from "@/i18n/locales";
import { readLanguageCookie } from "@/storage/language-preference";
import ptBRMessages from "@/i18n/messages/pt-BR";

const refreshMock = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    refresh: refreshMock,
  }),
}));

function renderLanguageToggle({
  initialLocale = "en",
  labels,
}: {
  initialLocale?: SupportedLocale;
  labels?: ComponentProps<typeof LanguageToggle>["labels"];
} = {}) {
  render(
    <LanguagePreferenceProvider initialLocale={initialLocale}>
      <LanguageToggle labels={labels} />
    </LanguagePreferenceProvider>,
  );
}

describe("LanguageToggle", () => {
  beforeEach(() => {
    refreshMock.mockClear();
    window.localStorage.clear();
    document.documentElement.lang = "en";
    delete document.documentElement.dataset.language;
  });

  it("defaults to English and exposes accessible selected state", () => {
    renderLanguageToggle();

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
    renderLanguageToggle();

    await user.click(screen.getByRole("button", { name: "Switch to Portuguese (Brazil)" }));

    expect(window.localStorage.getItem(languagePreferenceStorageKey)).toBe("pt-BR");
    expect(readLanguageCookie()).toBe("pt-BR");
    expect(document.documentElement.lang).toBe("pt-BR");
    expect(document.documentElement.dataset.language).toBe("pt-BR");
    expect(refreshMock).toHaveBeenCalledTimes(1);

    await user.click(screen.getByRole("button", { name: "Switch to English" }));

    expect(window.localStorage.getItem(languagePreferenceStorageKey)).toBe("en");
    expect(readLanguageCookie()).toBe("en");
    expect(document.documentElement.lang).toBe("en");
    expect(document.documentElement.dataset.language).toBe("en");
    expect(refreshMock).toHaveBeenCalledTimes(2);
  });

  it("migrates stored browser language into the cookie-backed provider state", async () => {
    window.localStorage.setItem(languagePreferenceStorageKey, "pt-BR");

    renderLanguageToggle();

    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: "Portuguese (Brazil) selected" }).getAttribute(
          "aria-pressed",
        ),
      ).toBe("true");
    });
    await waitFor(() => {
      expect(readLanguageCookie()).toBe("pt-BR");
      expect(refreshMock).toHaveBeenCalledTimes(1);
    });
  });

  it("accepts labels from the relocated composed Portuguese catalog", () => {
    const languageMessages = ptBRMessages.preferences.language;

    renderLanguageToggle({
      labels: {
        groupLabel: languageMessages.label,
        optionLabels: {
          en: languageMessages.english,
          "pt-BR": languageMessages.portugueseBrazil,
        },
        selectedLabels: {
          en: languageMessages.selected.replace("{language}", languageMessages.english),
          "pt-BR": languageMessages.selected.replace(
            "{language}",
            languageMessages.portugueseBrazil,
          ),
        },
        switchLabels: {
          en: languageMessages.switchTo.replace("{language}", languageMessages.english),
          "pt-BR": languageMessages.switchTo.replace(
            "{language}",
            languageMessages.portugueseBrazil,
          ),
        },
      },
    });

    expect(screen.getByRole("group", { name: "Idioma" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Ingles selecionado" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Mudar para Portugues (Brasil)" })).toBeTruthy();
  });
});
