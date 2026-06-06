import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";
import { HomeIntroduction } from "@/features/foundation/components/home-introduction";
import enMessages from "@/i18n/messages/en";

describe("home introduction", () => {
  it("renders the platform purpose, Diogenes role, and primary next actions", () => {
    render(
      <NextIntlClientProvider locale="en" messages={enMessages}>
        <HomeIntroduction />
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Diogenes Legacy",
    );
    expect(screen.getByText(/retired computer science professor/i)).toBeTruthy();
    expect(screen.getByText(/diogenes carvalho matias/i)).toBeTruthy();
    expect(screen.getByText(/plain explanations/i)).toBeTruthy();
    expect(screen.getByText(/practical next action/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /explore tracks/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /accessibility help/i })).toBeTruthy();
  });
});
