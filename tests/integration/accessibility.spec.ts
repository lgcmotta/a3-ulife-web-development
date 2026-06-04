import { expect, test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const routes = [
  "/",
  "/tracks",
  "/tracks/history?demoHistory=1",
  "/tracks/builder",
  "/tracks/programming-foundations/problem-solving-basics",
  "/accessibility",
];

test.describe("accessibility foundation", () => {
  for (const route of routes) {
    test(`has no detectable axe violations on ${route}`, async ({ page }) => {
      await page.goto(route);
      const results = await new AxeBuilder({ page }).analyze();
      expect(results.violations).toEqual([]);
    });
  }

  test("keyboard navigation reaches skip link, nav, topic links, and accessibility help", async ({
    page,
  }) => {
    await page.goto("/");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: /skip to main content/i })).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page.locator("main")).toBeFocused();

    await page.goto("/tracks");
    await page.keyboard.press("Tab");
    await page.keyboard.press("Tab");
    await expect(page.getByRole("link", { name: /legado de diogenes home/i })).toBeFocused();
    await page
      .getByRole("navigation", { name: /primary navigation/i })
      .getByRole("link", { name: /accessibility help/i })
      .click();
    await expect(page.getByRole("heading", { name: /navigate the foundation/i })).toBeVisible();
  });

  test("accessibility help explains concrete navigation and theme support", async ({ page }) => {
    await page.goto("/accessibility");

    await expect(page.getByText(/Back to learning tracks link/i)).toBeVisible();
    await expect(page.getByText(/Press Tab to move forward/i)).toBeVisible();
    await expect(page.getByText(/Screen reader users can jump by headings/i)).toBeVisible();
    await expect(page.getByText(/not color alone/i)).toBeVisible();
  });

  test("theme switch is keyboard reachable and preserves content", async ({ page }) => {
    await page.goto("/accessibility");
    const toggle = page.getByRole("switch", { name: /high contrast/i });
    await toggle.focus();
    await page.keyboard.press("Space");

    await expect(page.locator("html")).toHaveAttribute("data-theme", "high-contrast");
    await expect(page.getByRole("heading", { name: /navigate the foundation/i })).toBeVisible();
  });

  test("student area tabs and builder actions are keyboard reachable", async ({ page }) => {
    await page.goto("/tracks/builder");

    await expect(page.getByRole("tab", { name: "Learning Path Builder" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "Save" })).toBeVisible();
    await expect(page.getByRole("button", { name: "Start Learning" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Available Tracks" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Current Path" })).toBeVisible();
  });
});
