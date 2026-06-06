import { describe, expect, it } from "vitest";
import { getLocalizedTracks } from "@/content/locales";
import { supportedLocales } from "@/i18n/locales";

describe("localized tracks content", () => {
  it("keeps track and topic slugs aligned across supported locales", () => {
    const englishTracks = getLocalizedTracks("en");

    for (const locale of supportedLocales) {
      const localizedTracks = getLocalizedTracks(locale);

      expect(localizedTracks.map((track) => track.slug)).toEqual(
        englishTracks.map((track) => track.slug),
      );

      for (const [trackIndex, track] of localizedTracks.entries()) {
        expect(track.topics.map((topic) => topic.slug)).toEqual(
          englishTracks[trackIndex].topics.map((topic) => topic.slug),
        );
      }
    }
  });

  it("keeps localized visible content fields populated", () => {
    for (const locale of supportedLocales) {
      for (const track of getLocalizedTracks(locale)) {
        expect(track.title.trim()).not.toHaveLength(0);
        expect(track.summary.trim()).not.toHaveLength(0);
        expect(track.description.trim()).not.toHaveLength(0);
        expect(track.recommendedFor.trim()).not.toHaveLength(0);
        expect(track.outcome.trim()).not.toHaveLength(0);

        for (const topic of track.topics) {
          expect(topic.title.trim()).not.toHaveLength(0);
          expect(topic.summary.trim()).not.toHaveLength(0);
          expect(topic.keyIdeas.length).toBeGreaterThanOrEqual(4);
        }
      }
    }
  });
});
