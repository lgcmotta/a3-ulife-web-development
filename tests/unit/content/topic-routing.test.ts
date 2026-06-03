import { describe, expect, it } from "vitest";
import { findTopicRoute, getTopicRouteParams } from "@/content/topic-routes";
import { learningTracks } from "@/content/tracks";

describe("topic routes", () => {
  it("generates a static route for every curated topic", () => {
    const params = getTopicRouteParams();
    const topicCount = learningTracks.reduce((count, track) => count + track.topics.length, 0);

    expect(params.length).toBe(topicCount);
    expect(params.every((param) => findTopicRoute(param))).toBe(true);
  });

  it("returns null for invalid slugs", () => {
    expect(
      findTopicRoute({ trackSlug: "missing-track", topicSlug: "missing-topic" }),
    ).toBeNull();
  });
});
