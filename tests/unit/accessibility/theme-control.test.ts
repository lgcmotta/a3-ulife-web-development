import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { ThemeToggle } from "@/features/foundation/components/theme-toggle";

describe("ThemeToggle", () => {
  it("toggles high contrast without moving focus away from the control", async () => {
    const user = userEvent.setup();
    render(React.createElement(ThemeToggle));

    const toggle = screen.getByRole("switch", { name: /high contrast/i });
    toggle.focus();
    await user.keyboard("[Space]");

    expect(document.documentElement.dataset.theme).toBe("high-contrast");
    expect(document.activeElement).toBe(toggle);
  });
});
