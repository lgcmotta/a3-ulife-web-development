import { describe, expect, it } from "vitest";
import { getLocalizedContent } from "@/content/locales";

describe("accessibility help content", () => {
  it("covers the required platform-specific accessibility guidance", () => {
    const { accessibilityHelpSections } = getLocalizedContent("en");
    const copy = accessibilityHelpSections
      .map((section) => `${section.title} ${section.appliesTo} ${section.content}`)
      .join(" ")
      .toLowerCase();

    expect(copy).toContain("home");
    expect(copy).toContain("learning tracks");
    expect(copy).toContain("accessibility help");
    expect(copy).toContain("tab");
    expect(copy).toContain("skip link");
    expect(copy).toContain("screen reader");
    expect(copy).toContain("headings");
    expect(copy).toContain("high-contrast");
    expect(copy).toContain("not color alone");
  });

  it("keeps accessibility help concise and non-generic", () => {
    const { accessibilityHelpSections } = getLocalizedContent("en");

    expect(accessibilityHelpSections).toHaveLength(4);
    for (const section of accessibilityHelpSections) {
      expect(section.content.length).toBeGreaterThan(120);
      expect(section.content).not.toMatch(/generic|policy|coming soon|first version/i);
    }
  });
});
