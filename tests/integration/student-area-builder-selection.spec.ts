import { expect, test } from "@playwright/test";

test.describe("student area builder selection", () => {
  test("selecting a track selects child topics and current path grouping", async ({ page }) => {
    await page.goto("/tracks/builder");

    await page.getByRole("button", { name: /programming foundations/i }).click();
    await page.getByRole("checkbox", { name: /^select programming foundations$/i }).click();

    await expect(page.getByText(/programming foundations was added/i)).toBeVisible();
    await expect(page.getByRole("heading", { name: "Current Path" })).toBeVisible();
    const currentPath = page.getByLabel("Current Path");
    await expect(currentPath.getByTestId("current-topic-problem-solving-basics")).toBeVisible();
    await expect(currentPath.getByTestId("current-topic-variables-and-flow")).toBeVisible();
  });
});
