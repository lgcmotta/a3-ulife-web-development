import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { getLocalizedTracks } from "@/content/locales";
import { supportedLocales } from "@/i18n/locales";
import { learningTracks } from "@/content/tracks";
import { parseMarkdownMetadata } from "@/server/learning-content/markdown";

const contentDirectory = path.join(process.cwd(), "src/content/learning-sections");

describe("learning section markdown content", () => {
  for (const track of learningTracks) {
    for (const topic of track.topics) {
      it(`${topic.slug} has substantial original markdown content`, () => {
        const content = readFileSync(path.join(contentDirectory, "en", `${topic.slug}.md`), "utf8");
        const metadata = parseMarkdownMetadata(content);

        expect(content.startsWith(`# ${topic.title}`)).toBe(true);
        expect(metadata.wordCount).toBeGreaterThanOrEqual(600);
        expect(metadata.externalReferences.length).toBeGreaterThanOrEqual(2);
        expect(content).not.toMatch(/<\/?[a-z][\s\S]*>/i);
      });
    }
  }

  it("provides one markdown file for each published topic and supported locale", () => {
    for (const locale of supportedLocales) {
      for (const track of getLocalizedTracks(locale)) {
        for (const topic of track.topics) {
          const content = readFileSync(
            path.join(contentDirectory, locale, `${topic.slug}.md`),
            "utf8",
          );

          expect(content.startsWith(`# ${topic.title}`)).toBe(true);
          expect(content).not.toMatch(/<\/?[a-z][\s\S]*>/i);
        }
      }
    }
  });
});
