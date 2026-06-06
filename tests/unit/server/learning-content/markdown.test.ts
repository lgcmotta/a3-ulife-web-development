import { describe, expect, it } from "vitest";

import {
  getLearningSectionFileName,
  loadLearningSectionMarkdown,
  parseMarkdownMetadata,
} from "@/server/learning-content/markdown";

describe("learning section markdown", () => {
  it("maps topic slugs to markdown file names", () => {
    expect(getLearningSectionFileName("problem-solving-basics")).toBe(
      "problem-solving-basics.md",
    );
  });

  it("extracts word count and external references", () => {
    const metadata = parseMarkdownMetadata(
      "# Title\n\nRead [MDN](https://developer.mozilla.org/) and [WAI](https://www.w3.org/WAI/).",
    );

    expect(metadata.wordCount).toBeGreaterThan(3);
    expect(metadata.externalReferences).toEqual([
      "https://developer.mozilla.org/",
      "https://www.w3.org/WAI/",
    ]);
  });

  it("loads selected locale markdown file identity", async () => {
    const english = await loadLearningSectionMarkdown("problem-solving-basics", "en");
    const portuguese = await loadLearningSectionMarkdown("problem-solving-basics", "pt-BR");

    expect(english.locale).toBe("en");
    expect(english.markdownFileName).toBe("problem-solving-basics.md");
    expect(english.markdownFilePath).toContain("learning-sections/en/problem-solving-basics.md");

    expect(portuguese.locale).toBe("pt-BR");
    expect(portuguese.markdownFileName).toBe("problem-solving-basics.md");
    expect(portuguese.markdownFilePath).toContain(
      "learning-sections/pt-BR/problem-solving-basics.md",
    );
  });
});
