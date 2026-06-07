import React from "react";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";
import { AskDiogenesWidget } from "@/features/ask-diogenes/components/ask-diogenes-widget";
import enMessages from "@/i18n/messages/en";

function renderWidget() {
  return render(
    <NextIntlClientProvider locale="en" messages={enMessages}>
      <AskDiogenesWidget />
    </NextIntlClientProvider>,
  );
}

async function advanceTyping() {
  await new Promise((resolve) => window.setTimeout(resolve, 650));
}

describe("AskDiogenesWidget", () => {
  it("opens empty and answers the orientation prompt", async () => {
    const user = userEvent.setup();
    renderWidget();

    await user.click(screen.getByRole("button", { name: "Ask Diogenes" }));

    expect(screen.getByText("Welcome. I can point you around the platform with a few prepared questions.")).toBeTruthy();
    expect(screen.getByRole("button", { name: "How do I use this platform?" })).toBeTruthy();

    await user.click(screen.getByRole("button", { name: "How do I use this platform?" }));

    expect(
      within(screen.getByTestId("ask-diogenes-messages")).getByText("How do I use this platform?"),
    ).toBeTruthy();
    expect(screen.getByText("Diogenes is preparing a scripted answer")).toBeTruthy();

    await advanceTyping();

    expect(screen.getByText(/Start with Learning Tracks/i)).toBeTruthy();
  });

  it("keeps every interaction prompt-only and deterministic", async () => {
    const user = userEvent.setup();
    renderWidget();

    await user.click(screen.getByRole("button", { name: "Ask Diogenes" }));

    expect(screen.queryByRole("textbox")).toBeNull();
    expect(screen.queryByRole("button", { name: /send/i })).toBeNull();
    expect(screen.queryByRole("button", { name: /attach|audio|record/i })).toBeNull();

    const progressPrompt = screen.getByRole("button", { name: "Where is my progress?" });

    await user.click(progressPrompt);
    await advanceTyping();
    const firstResponse = screen.getByText(/Your saved paths and completed topics/i).textContent;

    await user.click(progressPrompt);
    await advanceTyping();
    const secondResponse = screen.getByText(/Your saved paths and completed topics/i).textContent;

    expect(secondResponse).toBe(firstResponse);
  });

  it("resets messages when closed or minimized and cancels pending typing", async () => {
    const user = userEvent.setup();
    renderWidget();

    await user.click(screen.getByRole("button", { name: "Ask Diogenes" }));
    await user.click(screen.getByRole("button", { name: "What are learning tracks?" }));
    await user.click(screen.getByRole("button", { name: "Minimize Ask Diogenes" }));

    await advanceTyping();

    expect(screen.queryByText(/Learning tracks group related topics/i)).toBeNull();

    await user.click(screen.getByRole("button", { name: "Ask Diogenes" }));

    expect(screen.queryByTestId("ask-diogenes-messages")).toBeNull();

    await user.click(screen.getByRole("button", { name: "Close Ask Diogenes" }));

    await waitFor(() => {
      expect(screen.getByRole("button", { name: "Ask Diogenes" })).toBe(document.activeElement);
    });
  });

  it("closes and resets when a guided action is clicked", async () => {
    const user = userEvent.setup();
    renderWidget();

    await user.click(screen.getByRole("button", { name: "Ask Diogenes" }));
    await user.click(screen.getByRole("button", { name: "How should I study a topic?" }));
    await advanceTyping();

    expect(screen.getByText(/Read the main explanation first/i)).toBeTruthy();

    const action = screen.getByRole("link", { name: "Explore learning tracks" });
    action.addEventListener("click", (event) => event.preventDefault());

    await user.click(action);

    expect(screen.queryByRole("group", { name: "Choose a question for Diogenes" })).toBeNull();

    await user.click(screen.getByRole("button", { name: "Ask Diogenes" }));

    expect(screen.queryByTestId("ask-diogenes-messages")).toBeNull();
  });
});
