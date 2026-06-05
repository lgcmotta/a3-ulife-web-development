import { expect, test, type Page } from "../e2e-support/student-area-test";

function topicActions(page: Page) {
  return page.getByRole("group", { name: "Topic actions", exact: true });
}

async function clickTopCompleteTopic(page: Page) {
  const previousUrl = page.url();
  await topicActions(page).getByRole("button", { name: /complete topic/i }).click();
  await expect.poll(() => page.url()).not.toBe(previousUrl);
}

test.describe("student area history", () => {
  test("empty history explains the next action", async ({ page }) => {
    await page.goto("/tracks/history");

    await expect(page.getByRole("heading", { name: "Learning Path History" })).toBeVisible();
    await expect(page.getByText(/no saved learning paths/i)).toBeVisible();
    await page.getByRole("link", { name: /add new learning path/i }).click();
    await page.waitForURL("**/tracks/builder");
  });

  test("history table exposes readable row values", async ({ page }) => {
    await page.goto("/tracks/history?demoHistory=1");

    await expect(page.getByRole("table", { name: /saved learning paths/i })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "Saved" })).toBeVisible();
    await expect(page.getByRole("columnheader", { name: "Tracks" })).toBeVisible();
    await expect(page.getByText("Not started")).toBeVisible();
    await expect(page.getByRole("link", { name: /delete/i })).toHaveCount(0);
  });

  test("unfinished history rows expose resume learning and edit path actions", async ({ page }) => {
    await page.goto("/tracks/builder");

    await page.getByRole("button", { name: /programming foundations/i }).click();
    await page.getByRole("checkbox", { name: /^select programming foundations$/i }).click();
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByRole("button", { name: "Start Learning" }).click();
    await expect(page).toHaveURL(/\/tracks\/learn\/[^/]+\/problem-solving-basics/);

    await clickTopCompleteTopic(page);
    await expect(page).toHaveURL(/\/tracks\/learn\/[^/]+\/variables-and-flow/);

    await page.goto("/tracks/history");

    await expect(page.getByRole("table", { name: /saved learning paths/i })).toBeVisible();
    await expect(page.getByText("1 of 3 topics complete")).toBeVisible();
    await expect(page.getByText("In progress")).toBeVisible();
    await expect(page.getByRole("link", { name: /resume learning/i })).toBeVisible();
    const editPath = page.getByRole("link", { name: /edit path/i });
    await expect(editPath).toBeVisible();
    await expect(editPath).toHaveAttribute("href", /\/tracks\/builder\?edit=.+/);
    await expect(page.getByRole("link", { name: /delete/i })).toHaveCount(0);

    await editPath.click();
    await expect(page).toHaveURL(/\/tracks\/builder\?edit=.+/);
    await expect(page.getByTestId("current-topic-problem-solving-basics")).toBeVisible();
  });

  test("completed history rows show no resume, edit, or delete actions", async ({ page }) => {
    await page.goto("/tracks/builder");

    await page.getByRole("button", { name: /programming foundations/i }).click();
    await page.getByRole("checkbox", { name: /^select programming foundations$/i }).click();
    await page.getByRole("button", { name: "Save" }).click();
    await page.getByRole("button", { name: "Start Learning" }).click();

    await clickTopCompleteTopic(page);
    await clickTopCompleteTopic(page);
    await clickTopCompleteTopic(page);
    await expect(page.getByRole("heading", { name: /congratulations/i })).toBeVisible();

    await page.goto("/tracks/history");

    await expect(page.getByText("Completed")).toBeVisible();
    await expect(page.getByRole("link", { name: /resume learning/i })).toHaveCount(0);
    await expect(page.getByRole("link", { name: /edit path/i })).toHaveCount(0);
    await expect(page.getByRole("link", { name: /delete/i })).toHaveCount(0);
  });
});
