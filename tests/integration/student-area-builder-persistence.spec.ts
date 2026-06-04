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
    await expect(page.getByRole("button", { name: /clear learning path/i })).toBeDisabled();
  });

  test("completed history is preserved while creating a new learning path", async ({ page }) => {
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
    await page.getByRole("button", { name: /web and accessibility/i }).click();
    await page.getByRole("checkbox", { name: /^select web and accessibility$/i }).click();
    await expect(page.getByText(/web and accessibility was added/i)).toBeVisible();
    await expect(page.getByTestId("current-topic-semantic-structure")).toBeVisible();
    await expect(page.getByRole("button", { name: "Save" })).toBeEnabled();
    await page.getByRole("button", { name: "Save" }).click();
    await expect(page.getByText(/learning path saved/i)).toBeVisible();

    await page.goto("/tracks/history");

    await expect(page.getByText("Programming Foundations")).toBeVisible();
    await expect(page.getByText("Web and Accessibility")).toBeVisible();
    await expect(page.getByText("3 of 3 topics complete")).toBeVisible();
    await expect(page.getByText("0 of 3 topics complete")).toBeVisible();
    await expect(page.getByText("Completed")).toBeVisible();
    await expect(page.getByText("Not started")).toBeVisible();
  });

  test("plain builder visits stay empty after starting a saved learning path", async ({ page }) => {
    await page.goto("/tracks/builder");

    await page.getByRole("button", { name: /programming foundations/i }).click();
    await page.getByRole("checkbox", { name: /^select programming foundations$/i }).click();
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByRole("button", { name: "Start Learning" }).click();
    await expect(page.getByRole("button", { name: /complete topic/i })).toBeVisible();

    await page.goto("/tracks/builder");

    await expect(page.getByText(/select at least one topic/i)).toBeVisible();
    await expect(page.getByTestId("current-topic-problem-solving-basics")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Start Learning" })).toBeDisabled();
    await expect(page.getByRole("button", { name: /clear learning path/i })).toBeDisabled();
  });

  test("edit path pre-populates once but plain builder visits return to a clean state", async ({ page }) => {
    await page.goto("/tracks/builder");

    await page.getByRole("button", { name: /programming foundations/i }).click();
    await page.getByRole("checkbox", { name: /^select programming foundations$/i }).click();
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByRole("button", { name: "Start Learning" }).click();
    await expect(page.getByRole("button", { name: /complete topic/i })).toBeVisible();

    await page.goto("/tracks/history");
    await page.getByRole("link", { name: /edit path/i }).click();
    await expect(page).toHaveURL(/\/tracks\/builder\?edit=/);
    await expect(page.getByTestId("current-topic-problem-solving-basics")).toBeVisible();

    await page.goto("/tracks/builder");

    await expect(page).toHaveURL(/\/tracks\/builder$/);
    await expect(page.getByText(/select at least one topic/i)).toBeVisible();
    await expect(page.getByTestId("current-topic-problem-solving-basics")).toHaveCount(0);
    await expect(page.getByRole("button", { name: "Start Learning" })).toBeDisabled();
  });

  test("editing a full track can remove one topic without clearing the whole path", async ({ page }) => {
    await page.goto("/tracks/builder");

    await page.getByRole("button", { name: /programming foundations/i }).click();
    await page.getByRole("checkbox", { name: /^select programming foundations$/i }).click();
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByRole("button", { name: "Start Learning" }).click();
    await expect(page.getByRole("button", { name: /complete topic/i })).toBeVisible();

    await page.goto("/tracks/history");
    await page.getByRole("link", { name: /edit path/i }).click();
    await expect(page).toHaveURL(/\/tracks\/builder\?edit=/);
    await expect(page.getByTestId("current-topic-problem-solving-basics")).toBeVisible();
    await expect(page.getByTestId("current-topic-variables-and-flow")).toBeVisible();
    await expect(page.getByTestId("current-topic-debugging-habits")).toBeVisible();
    await expect(page.getByRole("button", { name: /clear learning path/i })).toBeEnabled();

    await page.getByRole("button", { name: /actions for variables and flow/i }).click();
    const removeTopic = page.getByRole("menuitem", { name: "Remove" });
    await expect(removeTopic).toBeVisible();
    await removeTopic.click();
    await expect(page.getByText(/item removed from your current path/i)).toBeVisible();

    await expect(page.getByTestId("current-topic-problem-solving-basics")).toBeVisible();
    await expect(page.getByTestId("current-topic-variables-and-flow")).toHaveCount(0);
    await expect(page.getByTestId("current-topic-debugging-habits")).toBeVisible();
    await expect(page.getByRole("button", { name: "Save" })).toBeEnabled();

    await page.getByRole("button", { name: "Save" }).click();

    await expect(page.getByText(/learning path saved/i)).toBeVisible();
    await expect(page.getByText(/at least one topic/i)).toHaveCount(0);
  });
});
