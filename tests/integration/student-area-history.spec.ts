import { expect, test } from "@playwright/test";

import { clearStudentAreaTestData } from "../e2e-support/redis-test-utils";

test.describe("student area history", () => {
  test.beforeEach(async () => {
    await clearStudentAreaTestData();
  });

  test("empty history explains the next action", async ({ page }) => {
    await page.goto("/tracks/history");

    await expect(page.getByRole("heading", { name: "Learning Path History" })).toBeVisible();
    await expect(page.getByText(/no saved learning paths/i)).toBeVisible();
    await page.getByRole("link", { name: /add new learning path/i }).click();
    await page.waitForURL("**/tracks/builder");
  });

  test("history table exposes readable row values", async ({ page }) => {
    await page.goto("/tracks/history?demoHistory=1");

    await expect(page.getByRole("table", { name: /saved learning paths/i })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "Saved" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "Tracks" })).toBeVisible();
    await expect(page.getByText("Not started")).toBeVisible();
  });

  test("unfinished history rows expose resume learning and edit path actions", async ({ page }) => {
    await page.goto("/tracks/builder");

    await page.getByRole("button", { name: /programming foundations/i }).click();
    await page.getByRole("checkbox", { name: /^select programming foundations$/i }).click();
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByRole("button", { name: "Start Learning" }).click();
    await expect(page).toHaveURL(/\/tracks\/learn\/[^/]+\/problem-solving-basics/);

    await page.getByRole("button", { name: /complete topic/i }).click();
    await expect(page).toHaveURL(/\/tracks\/learn\/[^/]+\/variables-and-flow/);

    await page.goto("/tracks/history");

    await expect(page.getByRole("table", { name: /saved learning paths/i })).toBeVisible();
    await expect(page.getByText("1 of 3 topics complete")).toBeVisible();
    await expect(page.getByText("In progress")).toBeVisible();
    await expect(page.getByRole("link", { name: /resume learning/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /edit path/i })).toBeVisible();

    await page.getByRole("link", { name: /edit path/i }).click();
    await page.waitForURL("**/tracks/builder");
  });
});
