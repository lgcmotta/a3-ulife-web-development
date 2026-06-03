import { describe, expect, it } from "vitest";
import { findTopicRoute, getTopicRouteParams } from "@/content/topic-routes";

describe("topic routes", () => {
  it("generates a static route for every curated topic", () => {
    const params = getTopicRouteParams();
    expect(params.length).toBeGreaterThan(3);
    expect(params.every((param) => findTopicRoute(param))).toBe(true);
  });

  it("returns null for invalid slugs", () => {
    expect(
      findTopicRoute({ trackSlug: "missing-track", topicSlug: "missing-topic" }),
    ).toBeNull();
  });
});
