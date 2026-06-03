import { describe, expect, it } from "vitest";
import { defaultTheme, resolveTheme, themes } from "@/accessibility/theme";

describe("theme helpers", () => {
  it("defines default and high-contrast visual themes", () => {
    expect(themes.map((theme) => theme.id)).toEqual(["default", "high-contrast"]);
    expect(defaultTheme).toBe("default");
  });

  it("falls back to the default theme for unknown values", () => {
    expect(resolveTheme("high-contrast")).toBe("high-contrast");
    expect(resolveTheme("unknown")).toBe("default");
    expect(resolveTheme(null)).toBe("default");
  });
});
