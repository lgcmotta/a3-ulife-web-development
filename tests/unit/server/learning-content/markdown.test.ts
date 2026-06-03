import { describe, expect, it } from "vitest";

import { getLearningSectionFileName, parseMarkdownMetadata } from "@/server/learning-content/markdown";

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
});
