import { expect, test } from "@playwright/test";

import { clearStudentAreaTestData } from "../e2e-support/redis-test-utils";

test.describe("student area learning flow", () => {
  test.beforeEach(async () => {
    await clearStudentAreaTestData();
  });

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
});
