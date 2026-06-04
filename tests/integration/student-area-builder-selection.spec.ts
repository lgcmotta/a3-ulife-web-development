import { expect, test } from "@playwright/test";

import { clearStudentAreaTestData } from "../e2e-support/redis-test-utils";

test.describe("student area builder selection", () => {
  test.beforeEach(async () => {
    await clearStudentAreaTestData();
  });

  test("create mode opens with empty local builder state", async ({ page }) => {
    await page.goto("/tracks/builder");

    await expect(page.getByText(/select at least one topic/i)).toBeVisible();
    await expect(page.getByRole("button", { name: "Save" })).toBeDisabled();
    await expect(page.getByRole("button", { name: "Start Learning" })).toBeDisabled();
    await expect(page.getByRole("button", { name: /clear learning path/i })).toBeDisabled();
  });

  test("selecting a track selects child topics and current path grouping", async ({ page }) => {
    await page.goto("/tracks/builder");

    await page.getByRole("button", { name: /programming foundations/i }).click();
    const trackCheckbox = page.getByRole("checkbox", { name: /^select programming foundations$/i });
    await trackCheckbox.click();

    await expect(page.getByText(/programming foundations was added/i)).toBeVisible();
    await expect(trackCheckbox).toHaveAttribute("aria-checked", "true");
    await expect(page.getByRole("heading", { name: "Current Path" })).toBeVisible();
    const currentPath = page.getByLabel("Current Path");
    await expect(currentPath.getByTestId("current-topic-problem-solving-basics")).toBeVisible();
    await expect(currentPath.getByTestId("current-topic-variables-and-flow")).toBeVisible();
    await expect(currentPath.getByTestId("current-topic-debugging-habits")).toBeVisible();
  });

  test("selecting one topic leaves the parent track in a partial state", async ({ page }) => {
    await page.goto("/tracks/builder");

    await page.getByRole("button", { name: /programming foundations/i }).click();
    const trackCheckbox = page.getByRole("checkbox", { name: /^select programming foundations$/i });
    await page.getByRole("checkbox", { name: /^problem-solving basics$/i }).click();

    await expect(trackCheckbox).toHaveAttribute("aria-checked", "mixed");
    const currentPath = page.getByLabel("Current Path");
    await expect(currentPath.getByTestId("current-topic-problem-solving-basics")).toBeVisible();
    await expect(currentPath.getByTestId("current-topic-variables-and-flow")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Save" })).toBeEnabled();
  });
});
