import { expect, test, type Page } from "../e2e-support/student-area-test";

async function saveWholeTrack(page: Page, trackName: RegExp, trackCheckbox: RegExp) {
  await page.goto("/tracks/builder");
  await page.getByRole("button", { name: trackName }).click();
  const checkbox = page.getByRole("checkbox", { name: trackCheckbox });
  await expect(checkbox).toBeVisible();
  await checkbox.click();
  await expect(page.getByRole("button", { name: "Save" })).toBeEnabled();
  await page.getByRole("button", { name: "Save" }).click();
  await expect(page.getByText(/learning path saved/i)).toBeVisible();
}

test.describe("student area learning flow", () => {
  test("saved path opens topic content and can return to builder", async ({ page }) => {
    await page.goto("/tracks/builder");

    await page.getByRole("button", { name: /programming foundations/i }).click();
    await page.getByRole("checkbox", { name: /^select programming foundations$/i }).click();
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByRole("button", { name: "Start Learning" })).toBeEnabled();
    await page.getByRole("button", { name: "Start Learning" }).click();

    await expect(page).toHaveURL(/\/tracks\/learn\/[^/]+\/problem-solving-basics/);
    await expect(page.getByRole("heading", { name: "Problem-Solving Basics" })).toBeVisible();
    await expect(page.getByRole("link", { name: /return to builder/i })).toBeVisible();
  });

  test("completing every topic marks the path completed in history", async ({ page }) => {
    await page.goto("/tracks/builder");

    await page.getByRole("button", { name: /programming foundations/i }).click();
    await page.getByRole("checkbox", { name: /^select programming foundations$/i }).click();
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByRole("button", { name: "Start Learning" }).click();

    await page.getByRole("button", { name: /complete topic/i }).click();
    await page.getByRole("button", { name: /complete topic/i }).click();
    await page.getByRole("button", { name: /complete topic/i }).click();
    await expect(page.getByRole("heading", { name: /congratulations/i })).toBeVisible();

    await page.goto("/tracks/history");

    await expect(page.getByText("3 of 3 topics complete")).toBeVisible();
    await expect(page.getByText("Completed")).toBeVisible();
    await expect(page.getByRole("link", { name: /resume learning/i })).toHaveCount(0);
    await expect(page.getByRole("link", { name: /edit path/i })).toHaveCount(0);
  });

  test("complete topic updates the saved path ID from the learning route only", async ({ page }) => {
    await saveWholeTrack(page, /programming foundations/i, /^select programming foundations$/i);
    await page.getByRole("button", { name: "Start Learning" }).click();
    await expect(page).toHaveURL(/\/tracks\/learn\/[^/]+\/problem-solving-basics/);
    const firstPathUrl = page.url();

    await saveWholeTrack(page, /web and accessibility/i, /^select web and accessibility$/i);

    await page.goto(firstPathUrl);
    await page.getByRole("button", { name: /complete topic/i }).click();
    await expect(page).toHaveURL(/\/tracks\/learn\/[^/]+\/variables-and-flow/);

    await page.goto("/tracks/history");

    const table = page.getByRole("table", { name: /saved learning paths/i });
    await expect(table.getByText("Programming Foundations")).toBeVisible();
    await expect(table.getByText("Web and Accessibility")).toBeVisible();
    await expect(table.getByText("1 of 3 topics complete")).toBeVisible();
    await expect(table.getByText("0 of 3 topics complete")).toBeVisible();
  });
});
