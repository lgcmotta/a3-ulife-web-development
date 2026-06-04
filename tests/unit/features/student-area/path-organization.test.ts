import { describe, expect, it } from "vitest";

import { learningTracks } from "@/content/tracks";
import { createEmptyDraft, toggleTrackInDraft } from "@/features/student-area/server/builder-selection";
import { movePathItem } from "@/features/student-area/server/path-reorder";
import { fixtureDraft } from "../../fixtures/student-area";

describe("path organization", () => {
  it("reorders tracks relative to other tracks", () => {
    const draft = toggleTrackInDraft(
      toggleTrackInDraft(createEmptyDraft("abc1234", "draft01"), learningTracks, "programming-foundations", true),
      learningTracks,
      "web-and-accessibility",
      true,
    );

    const result = movePathItem({
      draft,
      level: "track",
      trackSlug: "web-and-accessibility",
      direction: "up",
    });

    expect(result.ok).toBe(true);
    expect(result.draft.trackGroups.map((group) => group.trackSlug)).toEqual([
      "web-and-accessibility",
      "programming-foundations",
    ]);
  });

  it("reorders topics only inside their parent track", () => {
    const draft = toggleTrackInDraft(
      createEmptyDraft("abc1234", "draft01"),
      learningTracks,
      "programming-foundations",
      true,
    );

    const result = movePathItem({
      draft,
      level: "topic",
      trackSlug: "programming-foundations",
      topicSlug: "variables-and-flow",
      direction: "up",
    });

    expect(result.ok).toBe(true);
    expect(result.draft.trackGroups).toHaveLength(1);
    expect(result.draft.trackGroups[0]?.topicItems.map((topic) => topic.topicSlug)).toEqual([
      "variables-and-flow",
      "problem-solving-basics",
      "debugging-habits",
    ]);
  });

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
});
