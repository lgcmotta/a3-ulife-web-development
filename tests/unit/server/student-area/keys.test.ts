import { describe, expect, it } from "vitest";

import { studentKeys } from "@/server/student-area/keys";

describe("student Redis keys", () => {
  it("scopes every student data key by student ID", () => {
    const keys = studentKeys("abc1234");

    expect(keys.student).toBe("student:abc1234");
    expect(keys.draft).toBe("student:abc1234:path:draft");
    expect(keys.activePath).toBe("student:abc1234:path:active");
    expect(keys.history).toBe("student:abc1234:paths:history");
    expect(keys.feedback).toBe("student:abc1234:feedback");
  });
});
