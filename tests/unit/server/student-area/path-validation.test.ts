import { describe, expect, it } from "vitest";

import { normalizePathGroups, validateSavedPathGroups } from "@/server/student-area/path-validation";
import { fixtureCatalog, fixtureDraft } from "../../fixtures/student-area";

describe("path validation", () => {
  it("removes empty track groups and normalizes order values", () => {
    const groups = normalizePathGroups([
      ...fixtureDraft.trackGroups,
      { trackSlug: "study-methods", order: 9, topicItems: [] },
    ]);

    expect(groups).toHaveLength(1);
    expect(groups[0]?.order).toBe(0);
    expect(groups[0]?.topicItems[0]?.order).toBe(0);
  });

  it("rejects empty saved paths and topic parent mismatches", () => {
    expect(() => validateSavedPathGroups([])).toThrow(/at least one topic/i);
    expect(() =>
      validateSavedPathGroups([
        {
          trackSlug: "study-methods",
          order: 0,
          topicItems: [
            {
              topicSlug: "problem-solving-basics",
              trackSlug: "programming-foundations",
              order: 0,
              completed: false,
              completedAt: null,
            },
          ],
        },
      ]),
    ).toThrow(/parent track/i);
  });

  it("rejects unknown catalog tracks and topics without repairing them", () => {
    expect(() =>
      validateSavedPathGroups(
        [
          {
            trackSlug: "unknown-track",
            order: 0,
            topicItems: [
              {
                topicSlug: "problem-solving-basics",
                trackSlug: "unknown-track",
                order: 0,
                completed: false,
                completedAt: null,
              },
            ],
          },
        ],
        fixtureCatalog,
      ),
    ).toThrow(/track is not available/i);

    expect(() =>
      validateSavedPathGroups(
        [
          {
            trackSlug: "programming-foundations",
            order: 0,
            topicItems: [
              {
                topicSlug: "unknown-topic",
                trackSlug: "programming-foundations",
                order: 0,
                completed: false,
                completedAt: null,
              },
            ],
          },
        ],
        fixtureCatalog,
      ),
    ).toThrow(/topic is not available/i);
  });
});
