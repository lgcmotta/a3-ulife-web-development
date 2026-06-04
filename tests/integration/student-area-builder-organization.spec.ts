import { expect, test } from "@playwright/test";

import { clearStudentAreaTestData } from "../e2e-support/redis-test-utils";

test.describe("student area builder organization", () => {
  test.beforeEach(async () => {
    await clearStudentAreaTestData();
  });

  test("context menu exposes organization actions", async ({ page }) => {
    await page.goto("/tracks/builder");

    await page.getByRole("button", { name: /programming foundations/i }).click();
    await page.getByRole("checkbox", { name: /^select programming foundations$/i }).click();
    await page.getByRole("button", { name: /actions for programming foundations/i }).click();

    await expect(page.getByRole("menuitem", { name: "Remove" })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: "Move up" })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: "Complete" })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: "Reset" })).toBeVisible();
  });

  test("item actions use a compact three-dot dropdown trigger", async ({ page }) => {
    await page.goto("/tracks/builder");

    await page.getByRole("button", { name: /programming foundations/i }).click();
    await page.getByRole("checkbox", { name: /^select programming foundations$/i }).click();

    await expect(page.getByText("Actions for Programming Foundations")).toHaveCount(0);
    const trigger = page.getByRole("button", { name: /actions for programming foundations/i });
    await expect(trigger).toBeVisible();
    await expect(trigger.locator("svg")).toBeVisible();

    await trigger.click();
    await expect(page.getByRole("menuitem", { name: "Move down" })).toBeVisible();
  });
});
