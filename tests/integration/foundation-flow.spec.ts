import { expect, test } from "@playwright/test";

test.describe("foundation flow", () => {
  test("home explains the platform and exposes primary navigation", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Legado de Diogenes" })).toBeVisible();
    await expect(page.getByRole("link", { name: /explore tracks/i })).toBeVisible();
    await expect(
      page
        .getByLabel("Primary actions")
        .getByRole("link", { name: "Accessibility help" }),
    ).toBeVisible();
  });

  test("learning tracks are reachable and link to topic pages", async ({ page }) => {
    await page.goto("/tracks");

    await expect(page.getByRole("heading", { name: /choose a small/i })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Programming Foundations" })).toBeVisible();

    await page.getByRole("link", { name: /problem-solving basics/i }).click();
    await page.waitForURL("**/tracks/programming-foundations/problem-solving-basics", {
      timeout: 15_000,
    });
    await expect(
      page.getByRole("heading", { name: "Problem-Solving Basics" }),
    ).toBeVisible({ timeout: 15_000 });
    await expect(page.getByRole("heading", { name: /what to do next/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /back to learning tracks/i })).toBeVisible();
  });

  test("mobile viewport keeps the main flow reachable", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");

    await expect(page.getByRole("navigation", { name: /primary navigation/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /learning tracks/i })).toBeVisible();
    await expect(page.locator("body")).not.toHaveJSProperty("scrollLeft", 1);
  });

  test("required public routes render meaningful content", async ({ page }) => {
    for (const route of ["/", "/tracks", "/accessibility"]) {
      await page.goto(route);
      await expect(page.locator("main h1")).toBeVisible();
    }
  });
});
