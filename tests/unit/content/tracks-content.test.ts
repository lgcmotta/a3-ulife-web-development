import { describe, expect, it } from "vitest";
import { learningTracks } from "@/content/tracks";

describe("learning tracks content", () => {
  it("keeps tracks scan-friendly and route slugs unique", () => {
    expect(learningTracks.length).toBeGreaterThanOrEqual(3);
    expect(learningTracks.length).toBeLessThanOrEqual(4);

    const slugs = new Set(learningTracks.map((track) => track.slug));
    expect(slugs.size).toBe(learningTracks.length);
  });

  it("provides required topic fields for every track", () => {
    for (const track of learningTracks) {
      expect(track.topics.length).toBeGreaterThan(0);
      for (const topic of track.topics) {
        expect(topic.trackSlug).toBe(track.slug);
        expect(topic.summary).toBeTruthy();
        expect(topic.whyItMatters).toBeTruthy();
        expect(topic.studyNext).toBeTruthy();
      }
    }
  });
});
