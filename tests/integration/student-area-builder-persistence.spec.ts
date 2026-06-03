import { expect, test } from "@playwright/test";

import { clearStudentAreaTestData } from "../e2e-support/redis-test-utils";

test.describe("student area builder persistence", () => {
  test.beforeEach(async () => {
    await clearStudentAreaTestData();
  });

  test("save enables start learning and discard uses confirmation", async ({ page }) => {
    await page.goto("/tracks/builder");

    await expect(page.getByRole("button", { name: "Start Learning" })).toBeDisabled();
    await page.getByRole("button", { name: /programming foundations/i }).click();
    await page.getByRole("checkbox", { name: /^select programming foundations$/i }).click();
    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.getByText(/learning path saved/i)).toBeVisible();
    await expect(page.getByRole("button", { name: "Start Learning" })).toBeEnabled();

    await page.getByRole("checkbox", { name: /^select programming foundations$/i }).click();
    await page.getByRole("button", { name: /discard changes/i }).click();
    await expect(page.getByRole("dialog", { name: /discard changes/i })).toBeVisible();
  });

  test("discard and clear dialogs render with opaque readable panels", async ({ page }) => {
    await page.goto("/tracks/builder");

    await page.getByRole("button", { name: /programming foundations/i }).click();
    await page.getByRole("checkbox", { name: /^select programming foundations$/i }).click();
    await page.getByRole("button", { name: /discard changes/i }).click();

    const discardDialog = page.getByRole("dialog", { name: /discard changes/i });
    await expect(discardDialog).toBeVisible();
    await expect(discardDialog).toHaveCSS("background-color", "rgb(255, 255, 255)");

    await page.getByRole("button", { name: "Cancel" }).click();
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByRole("button", { name: /clear learning path/i }).click();

    const clearDialog = page.getByRole("dialog", { name: /clear learning path/i });
    await expect(clearDialog).toBeVisible();
    await expect(clearDialog).toHaveCSS("background-color", "rgb(255, 255, 255)");
  });

  test("builder returns to the initial state after completing a learning path", async ({ page }) => {
    await page.goto("/tracks/builder");

    await page.getByRole("button", { name: /programming foundations/i }).click();
    await page.getByRole("checkbox", { name: /^select programming foundations$/i }).click();
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByRole("button", { name: "Start Learning" }).click();

    await page.getByRole("button", { name: /complete topic/i }).click();
    await page.getByRole("button", { name: /complete topic/i }).click();
    await page.getByRole("button", { name: /complete topic/i }).click();
    await expect(page.getByRole("heading", { name: /congratulations/i })).toBeVisible();

    await page.goto("/tracks/builder");

    await expect(page.getByText(/select at least one topic/i)).toBeVisible();
    await expect(page.getByTestId("current-topic-problem-solving-basics")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Start Learning" })).toBeDisabled();
  });
});
