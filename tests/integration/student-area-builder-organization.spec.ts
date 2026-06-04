import { expect, test } from "../e2e-support/student-area-test";

test.describe("student area builder organization", () => {
  test("context menu exposes organization actions", async ({ page }) => {
    await page.goto("/tracks/builder");

    await page.getByRole("button", { name: /programming foundations/i }).click();
    await page.getByRole("checkbox", { name: /^select programming foundations$/i }).click();
    await page.getByRole("button", { name: /actions for programming foundations/i }).click();

    await expect(page.getByRole("menuitem", { name: "Remove" })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: "Move up" })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: "Move down" })).toBeVisible();
    await expect(page.getByRole("menuitem", { name: "Complete" })).toHaveCount(0);
    await expect(page.getByRole("menuitem", { name: "Reset" })).toHaveCount(0);
    await expect(page.getByRole("menuitem", { name: "Delete" })).toHaveCount(0);
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

  test("move commands reorder tracks and topics without moving topics across tracks", async ({ page }) => {
    await page.goto("/tracks/builder");

    await page.getByRole("button", { name: /programming foundations/i }).click();
    await page.getByRole("checkbox", { name: /^select programming foundations$/i }).click();
    await page.getByRole("button", { name: /web and accessibility/i }).click();
    await page.getByRole("checkbox", { name: /^select web and accessibility$/i }).click();

    const trackHeadings = page.locator(".current-track-group h3");
    await expect(trackHeadings).toHaveText(["Programming Foundations", "Web and Accessibility"]);

    await page.getByRole("button", { name: /actions for web and accessibility/i }).click();
    await page.getByRole("menuitem", { name: "Move up" }).click();
    await expect(trackHeadings).toHaveText(["Web and Accessibility", "Programming Foundations"]);

    await page.getByRole("button", { name: /actions for variables and flow/i }).click();
    await page.getByRole("menuitem", { name: "Move up" }).click();

    const programmingTopics = page
      .locator(".current-track-group")
      .filter({ hasText: "Programming Foundations" })
      .locator("[data-testid^='current-topic-']");
    await expect(programmingTopics).toHaveText([
      "Variables and Flow",
      "Problem-Solving Basics",
      "Debugging Habits",
    ]);
  });
});
