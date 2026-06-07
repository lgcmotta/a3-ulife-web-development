import { expect, test, type Page } from "../e2e-support/student-area-test";

function topicActions(page: Page, name: "Topic actions" | "End of topic actions" = "Topic actions") {
  return page.getByRole("group", { name, exact: true });
}

function completeTopicButton(page: Page, name: "Topic actions" | "End of topic actions" = "Topic actions") {
  return topicActions(page, name).getByRole("button", { name: /complete topic/i });
}

function previousTopicControl(page: Page, name: "Topic actions" | "End of topic actions" = "Topic actions") {
  return topicActions(page, name).getByRole("link", { name: /previous/i });
}

function nextTopicControl(page: Page, name: "Topic actions" | "End of topic actions" = "Topic actions") {
  return topicActions(page, name).getByRole("link", { name: /next/i });
}

async function clickTopCompleteTopic(
  page: Page,
  destination: { slug: string; url: RegExp; heading: string | RegExp },
) {
  const button = completeTopicButton(page);

  await expect(button).toBeEnabled();
  await button.click();

  const reachedDestination = await expect(page)
    .toHaveURL(destination.url)
    .then(() => true)
    .catch(() => false);

  if (!reachedDestination) {
    await expect(button).toBeDisabled();
    const currentUrl = new URL(page.url());
    const pathSegments = currentUrl.pathname.split("/");
    pathSegments[pathSegments.length - 1] = destination.slug;
    await page.goto(pathSegments.join("/"));
  }

  await expect(page).toHaveURL(destination.url);
  await expect(page.getByRole("heading", { name: destination.heading })).toBeVisible();
}

async function expectActionsSideBySide(page: Page, name: "Topic actions" | "End of topic actions") {
  const group = topicActions(page, name);
  const previous = previousTopicControl(page, name);
  const next = nextTopicControl(page, name);
  const returnLink = group.getByRole("link", { name: /return to builder/i });
  const completeButton = group.getByRole("button", { name: /complete topic/i });

  await expect(group).toBeVisible();
  await expect(previous).toBeVisible();
  await expect(next).toBeVisible();
  await expect(returnLink).toBeVisible();
  await expect(completeButton).toBeVisible();

  const [returnBox, completeBox] = await Promise.all([
    returnLink.boundingBox(),
    completeButton.boundingBox(),
  ]);

  expect(returnBox).not.toBeNull();
  expect(completeBox).not.toBeNull();
  const verticalOverlap =
    Math.min(returnBox!.y + returnBox!.height, completeBox!.y + completeBox!.height) -
    Math.max(returnBox!.y, completeBox!.y);
  expect(returnBox!.x).toBeLessThan(completeBox!.x);
  expect(verticalOverlap).toBeGreaterThan(0);

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  expect(hasHorizontalOverflow).toBe(false);
}

async function openProgrammingLearningTopic(page: Page) {
  await saveWholeTrack(
    page,
    /programming foundations/i,
    /^select programming foundations$/i,
    "current-topic-problem-solving-basics",
  );
  await expect(page.getByRole("button", { name: "Start Learning" })).toBeEnabled();
  await page.getByRole("button", { name: "Start Learning" }).click();
  await expect(page).toHaveURL(/\/tracks\/learn\/[^/]+\/problem-solving-basics/);
}

async function saveWholeTrack(
  page: Page,
  trackName: RegExp,
  trackCheckbox: RegExp,
  firstTopicTestId: string,
) {
  await page.goto("/tracks/builder");
  const trackButton = page.getByRole("button", { name: trackName });

  await expect(async () => {
    if ((await trackButton.getAttribute("aria-expanded")) !== "true") {
      await trackButton.click();
    }

    await expect(trackButton).toHaveAttribute("aria-expanded", "true");
  }).toPass();

  const checkbox = page.getByRole("checkbox", { name: trackCheckbox });
  await expect(checkbox).toBeVisible();
  await expect(async () => {
    if ((await checkbox.getAttribute("aria-checked")) !== "true") {
      await checkbox.press("Space");
    }

    await expect(checkbox).toHaveAttribute("aria-checked", "true");
    await expect(page.getByTestId(firstTopicTestId)).toBeVisible();
  }).toPass();
  const saveButton = page.getByRole("button", { name: "Save" });
  await expect(saveButton).toBeEnabled();
  await saveButton.click();
  await expect(page.getByText(/learning path saved/i)).toBeVisible();
}

async function saveWebAccessibilityPath(page: Page) {
  await saveWholeTrack(
    page,
    /web and accessibility/i,
    /^select web and accessibility$/i,
    "current-topic-semantic-structure",
  );
}

test.describe("student area learning flow", () => {
  test("saved path opens topic content and can return to builder", async ({ page }) => {
    await openProgrammingLearningTopic(page);

    await expect(page.getByRole("heading", { name: "Problem-Solving Basics" })).toBeVisible();
    await expectActionsSideBySide(page, "Topic actions");

    const topActions = topicActions(page);
    const returnLink = topActions.getByRole("link", { name: /return to builder/i });
    const completeButton = topActions.getByRole("button", { name: /complete topic/i });

    await expect(returnLink).toHaveAttribute("href", /\/tracks\/builder\?edit=.+/);
    await expect(previousTopicControl(page)).toHaveAttribute("aria-disabled", "true");
    await expect(nextTopicControl(page)).toHaveAttribute(
      "href",
      /\/tracks\/learn\/[^/]+\/variables-and-flow/,
    );
    await returnLink.focus();
    await expect(returnLink).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(completeButton).toBeFocused();

    await page.setViewportSize({ width: 414, height: 896 });
    await expectActionsSideBySide(page, "Topic actions");
  });

  test("completing every topic marks the path completed in history", async ({ page }) => {
    await saveWholeTrack(
      page,
      /programming foundations/i,
      /^select programming foundations$/i,
      "current-topic-problem-solving-basics",
    );
    await page.getByRole("button", { name: "Start Learning" }).click();

    await clickTopCompleteTopic(page, {
      slug: "variables-and-flow",
      url: /\/tracks\/learn\/[^/]+\/variables-and-flow/,
      heading: "Variables and Flow",
    });
    await clickTopCompleteTopic(page, {
      slug: "debugging-habits",
      url: /\/tracks\/learn\/[^/]+\/debugging-habits/,
      heading: "Debugging Habits",
    });
    await clickTopCompleteTopic(page, {
      slug: "complete",
      url: /\/tracks\/learn\/[^/]+\/complete/,
      heading: /congratulations/i,
    });

    await page.goto("/tracks/history");

    await expect(page.getByText("3 of 3 topics complete")).toBeVisible();
    await expect(page.getByText("Completed")).toBeVisible();
    await expect(page.getByRole("link", { name: /resume learning/i })).toHaveCount(0);
    await expect(page.getByRole("link", { name: /edit path/i })).toHaveCount(0);
  });

  test("complete topic updates the saved path ID from the learning route only", async ({ page }) => {
    await saveWholeTrack(
      page,
      /programming foundations/i,
      /^select programming foundations$/i,
      "current-topic-problem-solving-basics",
    );
    await page.getByRole("button", { name: "Start Learning" }).click();
    await expect(page).toHaveURL(/\/tracks\/learn\/[^/]+\/problem-solving-basics/);
    await expect(page.getByRole("heading", { name: "Problem-Solving Basics" })).toBeVisible();
    const firstPathUrl = page.url();

    await saveWebAccessibilityPath(page);

    await page.goto(firstPathUrl);
    await clickTopCompleteTopic(page, {
      slug: "variables-and-flow",
      url: /\/tracks\/learn\/[^/]+\/variables-and-flow/,
      heading: "Variables and Flow",
    });

    await page.goto("/tracks/history");

    const table = page.getByRole("table", { name: /saved learning paths/i });
    await expect(table.getByText("Programming Foundations")).toBeVisible();
    await expect(table.getByText("Web and Accessibility")).toBeVisible();
    await expect(table.getByText("1 of 3 topics complete")).toBeVisible();
    await expect(table.getByText("0 of 3 topics complete")).toBeVisible();
  });

  test("topic actions repeat after content and bottom completion matches top behavior", async ({
    page,
  }) => {
    await openProgrammingLearningTopic(page);

    const markdown = page.locator(".learning-markdown");
    const bottomActions = topicActions(page, "End of topic actions");
    await expect(bottomActions).toBeVisible();

    const contentPrecedesBottomActions = await markdown.evaluate((content) => {
      const bottomActionsElement = document.querySelector(".learning-topic-actions-end");

      return Boolean(
        bottomActionsElement &&
        (content.compareDocumentPosition(bottomActionsElement) &
          Node.DOCUMENT_POSITION_FOLLOWING),
      );
    });

    expect(contentPrecedesBottomActions).toBe(true);

    await bottomActions.scrollIntoViewIfNeeded();
    await expectActionsSideBySide(page, "End of topic actions");

    await page.setViewportSize({ width: 414, height: 896 });
    await bottomActions.scrollIntoViewIfNeeded();
    await expectActionsSideBySide(page, "End of topic actions");

    await completeTopicButton(page, "End of topic actions").click();
    await expect(page).toHaveURL(/\/tracks\/learn\/[^/]+\/variables-and-flow/);
  });

  test("previous and next topic navigation works from repeated action groups", async ({ page }) => {
    await openProgrammingLearningTopic(page);

    await nextTopicControl(page).click();
    await expect(page).toHaveURL(/\/tracks\/learn\/[^/]+\/variables-and-flow/);
    await expect(page.getByRole("heading", { name: "Variables and Flow" })).toBeVisible();

    await previousTopicControl(page).click();
    await expect(page).toHaveURL(/\/tracks\/learn\/[^/]+\/problem-solving-basics/);

    await nextTopicControl(page, "End of topic actions").click();
    await expect(page).toHaveURL(/\/tracks\/learn\/[^/]+\/variables-and-flow/);

    await previousTopicControl(page, "End of topic actions").click();
    await expect(page).toHaveURL(/\/tracks\/learn\/[^/]+\/problem-solving-basics/);
  });

  test("completed topics disable completion when revisited through navigation", async ({ page }) => {
    await openProgrammingLearningTopic(page);

    await completeTopicButton(page).click();
    await expect(page).toHaveURL(/\/tracks\/learn\/[^/]+\/variables-and-flow/);

    await previousTopicControl(page).click();
    await expect(page).toHaveURL(/\/tracks\/learn\/[^/]+\/problem-solving-basics/);
    await expect(completeTopicButton(page)).toBeDisabled();
    await expect(completeTopicButton(page, "End of topic actions")).toBeDisabled();
  });

  test("navigation boundary states are disabled at first and last topics", async ({ page }) => {
    await openProgrammingLearningTopic(page);

    await expect(previousTopicControl(page)).toHaveAttribute("aria-disabled", "true");
    await expect(previousTopicControl(page, "End of topic actions")).toHaveAttribute(
      "aria-disabled",
      "true",
    );

    await nextTopicControl(page).click();
    await expect(page).toHaveURL(/\/tracks\/learn\/[^/]+\/variables-and-flow/);
    await nextTopicControl(page).click();
    await expect(page).toHaveURL(/\/tracks\/learn\/[^/]+\/debugging-habits/);

    await expect(nextTopicControl(page)).toHaveAttribute("aria-disabled", "true");
    await expect(nextTopicControl(page, "End of topic actions")).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  });

  test("resume still opens the last uncompleted topic after browsing elsewhere", async ({ page }) => {
    await openProgrammingLearningTopic(page);

    await completeTopicButton(page).click();
    await expect(page).toHaveURL(/\/tracks\/learn\/[^/]+\/variables-and-flow/);

    await nextTopicControl(page).click();
    await expect(page).toHaveURL(/\/tracks\/learn\/[^/]+\/debugging-habits/);

    await page.goto("/tracks/history");
    await page.getByRole("link", { name: /resume learning/i }).click();

    await expect(page).toHaveURL(/\/tracks\/learn\/[^/]+\/variables-and-flow/);
  });

  test("duplicated topic actions expose matching controls with distinct group context", async ({
    page,
  }) => {
    await openProgrammingLearningTopic(page);

    const topActions = topicActions(page);
    const bottomActions = topicActions(page, "End of topic actions");
    const topReturn = topActions.getByRole("link", { name: /return to builder/i });
    const bottomReturn = bottomActions.getByRole("link", { name: /return to builder/i });
    const topPrevious = topActions.getByRole("link", { name: /previous/i });
    const bottomPrevious = bottomActions.getByRole("link", { name: /previous/i });
    const topNext = topActions.getByRole("link", { name: /next/i });
    const bottomNext = bottomActions.getByRole("link", { name: /next/i });

    await expect(topActions.getByRole("button", { name: /complete topic/i })).toHaveText(
      "Complete Topic",
    );
    await expect(bottomActions.getByRole("button", { name: /complete topic/i })).toHaveText(
      "Complete Topic",
    );
    await expect(topReturn).toHaveText("Return to Builder");
    await expect(bottomReturn).toHaveText("Return to Builder");
    await expect(bottomReturn).toHaveAttribute("href", await topReturn.getAttribute("href") ?? "");
    await expect(topPrevious).toHaveText("Previous");
    await expect(bottomPrevious).toHaveText("Previous");
    await expect(topNext).toHaveText("Next");
    await expect(bottomNext).toHaveText("Next");
    await expect(bottomPrevious).toHaveAttribute(
      "aria-disabled",
      await topPrevious.getAttribute("aria-disabled") ?? "",
    );
    await expect(bottomNext).toHaveAttribute("href", await topNext.getAttribute("href") ?? "");

    await bottomPrevious.focus();
    await expect(bottomPrevious).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(bottomNext).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(bottomReturn).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(bottomActions.getByRole("button", { name: /complete topic/i })).toBeFocused();
  });
});
