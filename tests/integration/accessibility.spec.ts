import AxeBuilder from "@axe-core/playwright";
import type { Locator, Page } from "@playwright/test";
import { contrastRatio, type Rgb } from "../accessibility/contrast-helpers";
import { expect, test } from "../e2e-support/student-area-test";

const routes = [
  "/",
  "/tracks",
  "/tracks/history?demoHistory=1",
  "/tracks/builder",
  "/tracks/programming-foundations/problem-solving-basics",
  "/accessibility",
];

const visualModes = [
  { name: "light", baseTheme: "light", highContrast: false, contrast: "normal" },
  { name: "light high contrast", baseTheme: "light", highContrast: true, contrast: "high" },
  { name: "dark", baseTheme: "dark", highContrast: false, contrast: "normal" },
  { name: "dark high contrast", baseTheme: "dark", highContrast: true, contrast: "high" },
] as const;

const highContrastModes = visualModes.filter((mode) => mode.highContrast);

type VisualMode = (typeof visualModes)[number];

async function setVisualMode(page: Page, mode: VisualMode) {
  await page.addInitScript((preference) => {
    window.localStorage.setItem("legado-de-diogenes-base-theme", preference.baseTheme);
    window.localStorage.setItem(
      "legado-de-diogenes-high-contrast",
      String(preference.highContrast),
    );
    window.localStorage.removeItem("legado-de-diogenes-theme");
  }, mode);
}

async function expectRootMode(page: Page, mode: VisualMode) {
  await expect(page.locator("html")).toHaveAttribute("data-theme", mode.baseTheme);
  await expect(page.locator("html")).toHaveAttribute("data-contrast", mode.contrast);
}

function parseRgb(color: string): Rgb {
  const rgbMatch = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);

  if (rgbMatch) {
    return {
      r: Number(rgbMatch[1]),
      g: Number(rgbMatch[2]),
      b: Number(rgbMatch[3]),
    };
  }

  const srgbMatch = color.match(/color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/);

  if (srgbMatch) {
    return {
      r: Math.round(Number(srgbMatch[1]) * 255),
      g: Math.round(Number(srgbMatch[2]) * 255),
      b: Math.round(Number(srgbMatch[3]) * 255),
    };
  }

  throw new Error(`Unsupported color format: ${color}`);
}

async function readEffectiveColors(locator: Locator) {
  const target = locator.first();

  return target.evaluate((element) => {
    function isTransparent(color: string) {
      return (
        color === "transparent" ||
        /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*0\s*\)$/.test(color) ||
        /^color\(srgb\s+[\d.]+\s+[\d.]+\s+[\d.]+\s*\/\s*0\s*\)$/.test(color)
      );
    }

    function effectiveBackgroundColor(start: Element) {
      let current: Element | null = start;

      while (current) {
        const backgroundColor = getComputedStyle(current).backgroundColor;

        if (!isTransparent(backgroundColor)) {
          return backgroundColor;
        }

        current = current.parentElement;
      }

      return getComputedStyle(document.documentElement).backgroundColor;
    }

    const styles = getComputedStyle(element);

    return {
      backgroundColor: effectiveBackgroundColor(element),
      color: styles.color,
    };
  });
}

async function expectReadable(locator: Locator, label: string, minimumRatio = 4.5) {
  const target = locator.first();
  await expect(target, `${label} should be visible`).toBeVisible();

  await expect
    .poll(
      async () => {
        const colors = await readEffectiveColors(target);
        const foreground = parseRgb(colors.color);
        const background = parseRgb(colors.backgroundColor);

        return contrastRatio(foreground, background);
      },
      { message: label },
    )
    .toBeGreaterThanOrEqual(minimumRatio);

  const colors = await readEffectiveColors(target);

  const foreground = parseRgb(colors.color);
  const background = parseRgb(colors.backgroundColor);

  expect(foreground, `${label} must not render foreground equal to background`).not.toEqual(
    background,
  );
  expect(
    contrastRatio(foreground, background),
    `${label}: ${colors.color} on ${colors.backgroundColor}`,
  ).toBeGreaterThanOrEqual(minimumRatio);
}

async function expectCommonReadableSurfaces(page: Page, route: string) {
  await expectReadable(
    page.getByRole("navigation", { name: /primary navigation/i }).getByRole("link").first(),
    `${route} primary navigation`,
  );
  await expectReadable(page.getByRole("switch", { name: /high contrast/i }), `${route} switch`, 3);

  if (route !== "/") {
    await expectReadable(page.locator("main").locator("h1, h2").first(), `${route} heading`);
  }

  if (route === "/") {
    await expect(page.locator(".hero-overlay")).toBeVisible();
    await expect(page.getByRole("heading", { name: /diogenes legacy/i })).toHaveCSS(
      "color",
      "rgb(255, 255, 255)",
    );
    const actions = page.locator(".primary-actions");
    await expectReadable(actions.getByRole("link", { name: /start learning/i }), "hero primary");
    await expectReadable(actions.getByRole("link", { name: /explore tracks/i }), "hero secondary");
  }

  if (route === "/tracks") {
    await expectReadable(page.locator(".topic-link-list a").first(), "track topic link");
  }

  if (route === "/tracks/builder") {
    await expectReadable(page.getByRole("tab", { name: "Learning Path Builder" }), "builder tab");
    await expectReadable(page.getByRole("button", { name: "Save" }), "disabled save button");
    await expectReadable(
      page.getByRole("button", { name: "Start Learning" }),
      "disabled learning button",
    );
    await expectReadable(
      page.getByRole("checkbox", { name: /^select programming foundations$/i }),
      "builder checkbox",
      3,
    );
  }

  if (route === "/tracks/history?demoHistory=1") {
    await expectReadable(
      page.locator(".student-tab-active").filter({ hasText: /History/ }),
      "history tab",
    );
    await expectReadable(page.getByRole("columnheader", { name: "Saved" }), "history table head");
    await expectReadable(page.locator(".status-label").first(), "history status label");
  }

  if (route === "/accessibility") {
    await expectReadable(page.locator(".base-theme-control"), "base theme control");
    await expectReadable(
      page.getByRole("switch", { name: /light theme|dark theme/i }),
      "base theme switch",
      3,
    );
  }
}

async function tabUntilFocused(page: Page, locator: Locator, maxTabs = 16) {
  for (let index = 0; index < maxTabs; index += 1) {
    await page.keyboard.press("Tab");

    if (await locator.evaluate((element) => element === document.activeElement).catch(() => false)) {
      return;
    }
  }

  throw new Error("Expected control was not reached with Tab");
}

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
    await expect(page.getByRole("link", { name: /diogenes legacy home/i })).toBeFocused();
    await page
      .getByRole("navigation", { name: /primary navigation/i })
      .getByRole("link", { name: /accessibility help/i })
      .click();
    await expect(page.getByRole("heading", { name: /navigate the foundation/i })).toBeVisible();
  });

  test("accessibility help explains concrete navigation and visual preference support", async ({
    page,
  }) => {
    await page.goto("/accessibility");

    await expect(page.getByText(/Back to learning tracks link/i)).toBeVisible();
    await expect(page.getByText(/Press Tab to move forward/i)).toBeVisible();
    await expect(page.getByText(/Screen reader users can jump by headings/i)).toBeVisible();
    await expect(page.getByText(/Use the base theme switch/i)).toBeVisible();
    await expect(page.getByText(/not color alone/i)).toBeVisible();
  });

  for (const mode of highContrastModes) {
    test(`${mode.name} keeps representative routes and controls readable`, async ({ page }) => {
      await setVisualMode(page, mode);

      for (const route of routes) {
        await page.goto(route);
        await expectRootMode(page, mode);
        await expectCommonReadableSurfaces(page, route);
      }
    });
  }

  test("representative button, menu, dialog, selected, disabled, focus, and icon states are readable", async ({
    page,
  }) => {
    await setVisualMode(page, visualModes[3]);
    await page.goto("/tracks/builder");
    await expectRootMode(page, visualModes[3]);

    const trackCheckbox = page.getByRole("checkbox", { name: /^select programming foundations$/i });
    await trackCheckbox.click();

    await expectReadable(page.getByRole("button", { name: "Save" }), "enabled save button");
    await expectReadable(
      page.getByRole("button", { name: "Start Learning" }),
      "enabled learning button",
    );

    const iconButton = page.getByRole("button", { name: /actions for/i }).first();
    await expectReadable(iconButton, "icon-only path action", 3);
    await iconButton.click();
    await expectReadable(page.getByRole("menu"), "dropdown menu");
    await expectReadable(page.getByRole("menuitem", { name: "Remove" }), "dropdown item");
    await page.keyboard.press("Escape");

    const clearButton = page.getByRole("button", { name: "Clear Learning Path" });
    await expectReadable(clearButton, "clear button");
    await clearButton.click();

    const dialog = page.getByRole("dialog", { name: /clear learning path/i });
    await expect(dialog).toBeVisible();
    await expectReadable(dialog, "clear dialog");
    await expectReadable(dialog.getByRole("button", { name: "Close" }), "dialog close button", 3);
    await expectReadable(
      dialog.getByRole("button", { name: "Clear Learning Path" }),
      "dialog confirm button",
    );
  });

  for (const mode of visualModes) {
    test(`${mode.name} persists through reload and route navigation`, async ({ page }) => {
      await setVisualMode(page, mode);
      await page.goto("/accessibility");
      await expectRootMode(page, mode);

      await expect(
        page.getByRole("switch", {
          name: mode.baseTheme === "light" ? /light theme/i : /dark theme/i,
        }),
      ).toHaveAttribute("aria-checked", String(mode.baseTheme === "dark"));
      await expect(page.getByRole("switch", { name: /high contrast/i })).toHaveAttribute(
        "aria-checked",
        String(mode.highContrast),
      );

      await page.reload();
      await expectRootMode(page, mode);

      await page.getByRole("link", { name: /learning tracks/i }).click();
      await expect(page).toHaveURL(/\/tracks$/);
      await expectRootMode(page, mode);
    });
  }

  test("base theme and contrast controls update independently", async ({ page }) => {
    await setVisualMode(page, visualModes[1]);
    await page.goto("/accessibility");

    await page.getByRole("switch", { name: /light theme/i }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("html")).toHaveAttribute("data-contrast", "high");
    await expect(page.getByRole("switch", { name: /dark theme/i })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    await expect(page.getByRole("switch", { name: /high contrast/i })).toHaveAttribute(
      "aria-checked",
      "true",
    );

    const contrastSwitch = page.getByRole("switch", { name: /high contrast/i });
    await contrastSwitch.press("Space");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("html")).toHaveAttribute("data-contrast", "normal");
    await expect(page.getByRole("switch", { name: /dark theme/i })).toHaveAttribute(
      "aria-checked",
      "true",
    );
    await expect(contrastSwitch).toBeFocused();
  });

  test("theme controls are keyboard operable and keep visible focus", async ({ page }) => {
    await setVisualMode(page, visualModes[0]);
    await page.goto("/accessibility");

    const baseThemeSwitch = page.getByRole("switch", { name: /light theme/i });
    const contrastSwitch = page.getByRole("switch", { name: /high contrast/i });

    await tabUntilFocused(page, baseThemeSwitch);
    await expect(baseThemeSwitch).toHaveCSS("outline-style", "solid");

    await page.keyboard.press("Space");
    const darkThemeSwitch = page.getByRole("switch", { name: /dark theme/i });
    await expect(darkThemeSwitch).toBeFocused();
    await expect(darkThemeSwitch).toHaveAttribute("aria-checked", "true");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("html")).toHaveAttribute("data-contrast", "normal");

    await tabUntilFocused(page, contrastSwitch, 4);
    await expect(contrastSwitch).toHaveCSS("outline-style", "solid");
    await page.keyboard.press("Space");
    await expect(contrastSwitch).toBeFocused();
    await expect(contrastSwitch).toHaveAttribute("aria-checked", "true");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await expect(page.locator("html")).toHaveAttribute("data-contrast", "high");
  });

  for (const mode of visualModes) {
    test(`${mode.name} theme controls have no axe violations`, async ({ page }) => {
      await setVisualMode(page, mode);
      await page.goto("/accessibility");
      await expectRootMode(page, mode);

      const results = await new AxeBuilder({ page }).include(".theme-toggle").analyze();
      expect(results.violations).toEqual([]);
    });
  }

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
