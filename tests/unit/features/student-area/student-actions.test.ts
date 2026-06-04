import { describe, expect, it } from "vitest";

import { createActionError, createActionSuccess } from "@/features/student-area/actions/action-results";

describe("student action results", () => {
  it("creates friendly success and error responses", () => {
    expect(createActionSuccess("Saved.", { draftId: "draft01" })).toMatchObject({
      ok: true,
      feedback: { kind: "success", message: "Saved." },
    });
    expect(createActionError("Please select at least one topic.")).toMatchObject({
      ok: false,
      feedback: { kind: "error", message: "Please select at least one topic." },
    });
  });
});
