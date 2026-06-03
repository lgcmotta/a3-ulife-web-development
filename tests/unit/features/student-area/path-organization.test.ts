import { describe, expect, it } from "vitest";

import { completePathItem, resetPathItem } from "@/features/student-area/server/path-progress";
import { movePathItem } from "@/features/student-area/server/path-reorder";
import { fixtureDraft } from "../../fixtures/student-area";

describe("path organization", () => {
  it("blocks topic moves outside of track boundaries", () => {
    const result = movePathItem({
      draft: fixtureDraft,
      level: "topic",
      trackSlug: "programming-foundations",
      topicSlug: "problem-solving-basics",
      direction: "up",
    });

    expect(result.ok).toBe(false);
    expect(result.feedback).toMatch(/already first/i);
  });

  it("completes and resets a whole track", () => {
    const completed = completePathItem({
      draft: fixtureDraft,
      level: "track",
      trackSlug: "programming-foundations",
    });

    expect(completed.trackGroups[0]?.topicItems.every((topic) => topic.completed)).toBe(true);

    const reset = resetPathItem({
      draft: completed,
      level: "track",
      trackSlug: "programming-foundations",
    });

    expect(reset.trackGroups[0]?.topicItems.every((topic) => !topic.completed)).toBe(true);
  });
});
