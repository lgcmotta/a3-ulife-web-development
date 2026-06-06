import React from "react";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { describe, expect, it } from "vitest";
import ptBRMessages from "@/i18n/messages/pt-BR";

function RepresentativeTranslatedControl() {
  const t = useTranslations("preferences.language");
  const language = t("portugueseBrazil");

  return (
    <button aria-label={t("switchTo", { language })} type="button">
      {language}
    </button>
  );
}

describe("representative translation rendering", () => {
  it("renders visible and assistive labels from the selected catalog", () => {
    render(
      <NextIntlClientProvider locale="pt-BR" messages={ptBRMessages}>
        <RepresentativeTranslatedControl />
      </NextIntlClientProvider>,
    );

    expect(
      screen.getByRole("button", { name: "Mudar para Portugues (Brasil)" }).textContent,
    ).toBe("Portugues (Brasil)");
  });
});
