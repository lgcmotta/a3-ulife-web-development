import { expect, test, type Page } from "../e2e-support/student-area-test";

async function openAskDiogenes(page: Page) {
  await page.getByRole("button", { name: /^Ask Diogenes$/ }).click();
  await expect(
    page.getByRole("group", { name: "Choose a question for Diogenes" }),
  ).toBeVisible();
}

test.describe("Ask Diogenes widget", () => {
  test("opens empty and answers the orientation prompt with typing feedback", async ({ page }) => {
    await page.goto("/");
    await openAskDiogenes(page);

    await expect(page.getByText(/prepared questions/i)).toBeVisible();
    await expect(page.getByRole("button", { name: "How do I use this platform?" })).toBeVisible();

    await page.getByRole("button", { name: "How do I use this platform?" }).click();

    await expect(page.getByText("Diogenes is preparing a scripted answer")).toBeAttached();
    await expect(page.getByText(/Start with Learning Tracks/i)).toBeVisible();
  });

  test("keeps every response deterministic and prompt-only", async ({ page }) => {
    await page.goto("/");
    await openAskDiogenes(page);

    await expect(page.getByRole("textbox")).toHaveCount(0);
    await expect(page.getByRole("button", { name: /send/i })).toHaveCount(0);
    await expect(page.getByRole("button", { name: /attach|audio|record/i })).toHaveCount(0);

    const progressPrompt = page.getByRole("button", { name: "Where is my progress?" });

    await progressPrompt.click();
    const response = page.getByText(/Your saved paths and completed topics/i);
    await expect(response).toBeVisible();
    const firstResponse = await response.textContent();

    await progressPrompt.click();
    await expect(response).toBeVisible();
    await expect.poll(() => response.textContent()).toBe(firstResponse);
  });

  test("offers guided actions only to existing platform areas", async ({ page }) => {
    await page.goto("/");
    await openAskDiogenes(page);

    await page.getByRole("button", { name: "Where is my progress?" }).click();
    await expect(page.getByText(/Your saved paths and completed topics/i)).toBeVisible();

    await page.getByRole("link", { name: "Open path builder" }).click();
    await expect(page).toHaveURL(/\/tracks\/builder$/);
  });

  test("supports keyboard use, reset on reopen, and high contrast mode", async ({ page }) => {
    await page.context().addCookies([
      {
        name: "legado-de-diogenes-theme-preference",
        value: "dark-high",
        url: "http://127.0.0.1:3000",
        sameSite: "Lax",
      },
    ]);
    await page.goto("/");
    await expect(page.locator("html")).toHaveAttribute("data-contrast", "high");

    const launcher = page.getByRole("button", { name: /^Ask Diogenes$/ });
    await launcher.focus();
    await page.keyboard.press("Enter");

    const topicPrompt = page.getByRole("button", { name: "How should I study a topic?" });
    await expect(topicPrompt).toBeVisible();
    await topicPrompt.focus();
    await page.keyboard.press("Enter");

    await expect(page.getByText(/Read the main explanation first/i)).toBeVisible();

    await page.getByRole("button", { name: "Minimize Ask Diogenes" }).focus();
    await page.keyboard.press("Enter");
    await expect(launcher).toBeFocused();

    await page.keyboard.press("Enter");
    await expect(page.getByRole("button", { name: "How should I study a topic?" })).toBeVisible();
    await expect(
      page.getByTestId("ask-diogenes-messages").getByText("How should I study a topic?"),
    ).toHaveCount(0);

    await page.keyboard.press("Escape");
    await expect(launcher).toBeFocused();
  });

  test("uses Portuguese scripted answers when Portuguese is selected", async ({ page }) => {
    await page.context().addCookies([
      {
        name: "legado-de-diogenes-language",
        value: "pt-BR",
        url: "http://127.0.0.1:3000",
        sameSite: "Lax",
      },
    ]);
    await page.goto("/");

    await page.getByRole("button", { name: "Perguntar ao Diogenes" }).click();
    await page.getByRole("button", { name: "Como uso esta plataforma?" }).click();

    await expect(page.getByText(/Comece em Trilhas de Aprendizagem/i)).toBeVisible();
  });
});
