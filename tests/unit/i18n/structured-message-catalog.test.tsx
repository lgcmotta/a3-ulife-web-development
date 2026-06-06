import React from "react";
import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider, useTranslations } from "next-intl";
import { describe, expect, it } from "vitest";
import ptBRMessages from "@/i18n/messages/pt-BR";

function RepresentativeStructuredContent() {
  const t = useTranslations("tracks");
  const raw = t.raw as (key: string) => unknown;
  const track = raw("items.programming-foundations") as {
    title: string;
    summary: string;
  };

  return (
    <article>
      <h1>{track.title}</h1>
      <p>{track.summary}</p>
    </article>
  );
}

describe("structured message catalog reads", () => {
  it("reads representative structured content with t.raw", () => {
    render(
      <NextIntlClientProvider locale="pt-BR" messages={ptBRMessages}>
        <RepresentativeStructuredContent />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole("heading", { name: "Fundamentos de Programacao" })).toBeTruthy();
    expect(screen.getByText(/programas claros/i)).toBeTruthy();
  });
});
