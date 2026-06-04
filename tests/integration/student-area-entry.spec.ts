import { expect, test } from "../e2e-support/student-area-test";

test.describe("student area entry", () => {
  test("home Start Learning opens the history tab", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: /start learning/i }).click();

    await page.waitForURL("**/tracks/history");
    await expect(page.getByRole("tab", { name: "Learning Path History" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  test("learning tracks Start Learning opens the history tab", async ({ page }) => {
    await page.goto("/tracks");
    await page.getByRole("link", { name: /start learning/i }).click();

    await page.waitForURL("**/tracks/history");
    await expect(page.getByRole("heading", { name: /learning path history/i })).toBeVisible();
  });
});
