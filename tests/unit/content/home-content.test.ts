import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { HomeIntroduction } from "@/features/foundation/components/home-introduction";

describe("home introduction", () => {
  it("renders the platform purpose, Diogenes role, and primary next actions", () => {
    render(React.createElement(HomeIntroduction));

    expect(screen.getByRole("heading", { level: 1 }).textContent).toBe(
      "Legado de Diogenes",
    );
    expect(screen.getByText(/retired computer science professor/i)).toBeTruthy();
    expect(screen.getByRole("link", { name: /explore tracks/i })).toBeTruthy();
    expect(screen.getByRole("link", { name: /accessibility help/i })).toBeTruthy();
  });
});
