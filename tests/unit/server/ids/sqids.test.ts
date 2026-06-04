import { describe, expect, it } from "vitest";

import { decodePublicId, encodePublicId, isPublicId } from "@/server/ids/sqids";

describe("public Sqids helper", () => {
  it("encodes integers as URL-safe public IDs with at least seven characters", () => {
    const id = encodePublicId(42);

    expect(id).toHaveLength(7);
    expect(id).toMatch(/^[A-Za-z0-9]+$/);
    expect(decodePublicId(id)).toBe(42);
  });

  it("rejects invalid public IDs", () => {
    expect(isPublicId("abc1234")).toBe(true);
    expect(isPublicId("short")).toBe(false);
    expect(isPublicId("bad-id!")).toBe(false);
    expect(decodePublicId("bad-id!")).toBeNull();
  });
});
