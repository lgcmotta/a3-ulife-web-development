import { describe, expect, it } from "vitest";
import { learningTracks } from "@/content/tracks";

describe("learning tracks content", () => {
  const forbiddenPlaceholderTerms =
    /placeholder|lorem|first version|intentionally small|coming soon|temporary/i;

  it("keeps tracks scan-friendly and route slugs unique", () => {
    expect(learningTracks.length).toBeGreaterThanOrEqual(3);
    expect(learningTracks.length).toBeLessThanOrEqual(4);

    const slugs = new Set(learningTracks.map((track) => track.slug));
    expect(slugs.size).toBe(learningTracks.length);
  });

  it("provides required topic fields for every track", () => {
    for (const track of learningTracks) {
      expect(track.outcome).toBeTruthy();
      expect(track.topics.length).toBeGreaterThan(0);
      for (const topic of track.topics) {
        expect(topic.trackSlug).toBe(track.slug);
        expect(topic.summary).toBeTruthy();
        expect(topic.whyItMatters).toBeTruthy();
        expect(topic.studyNext).toBeTruthy();
        expect(topic.practicePrompt).toBeTruthy();
        expect(topic.professorNote).toBeTruthy();
      }
    }
  });

  it("keeps learning track copy realistic and placeholder-free", () => {
    for (const track of learningTracks) {
      const trackCopy = [
        track.title,
        track.summary,
        track.description,
        track.recommendedFor,
        track.outcome,
        ...track.topics.flatMap((topic) => [
          topic.title,
          topic.summary,
          topic.whyItMatters,
          topic.studyNext,
          topic.practicePrompt,
          topic.professorNote,
          ...topic.keyIdeas,
        ]),
      ].join(" ");

      expect(trackCopy).not.toMatch(forbiddenPlaceholderTerms);
      expect(track.outcome.length).toBeGreaterThan(40);
      expect(track.topics.every((topic) => topic.keyIdeas.length >= 4)).toBe(true);
    }
  });
});
