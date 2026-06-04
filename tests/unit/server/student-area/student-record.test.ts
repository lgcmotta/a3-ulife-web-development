import { describe, expect, it } from "vitest";

import {
  ANONYMOUS_STUDENT_COOKIE,
  ensureStudentRecord,
  type StudentCookieStore,
} from "@/server/student-area/student-record";
import { createMemoryStudentAreaStore } from "@/server/student-area/repository";

function createCookieStore(): StudentCookieStore {
  const values = new Map<string, string>();

  return {
    get(name) {
      const value = values.get(name);
      return value ? { value } : undefined;
    },
    set(name, value) {
      values.set(name, value);
    },
  };
}

describe("anonymous student record", () => {
  it("creates and stores a student record when no cookie exists", async () => {
    const store = createMemoryStudentAreaStore();
    const cookies = createCookieStore();

    const result = await ensureStudentRecord({ store, cookies });

    expect(result.created).toBe(true);
    expect(result.student.studentId).toHaveLength(7);
    expect(cookies.get(ANONYMOUS_STUDENT_COOKIE)?.value).toBe(result.student.studentId);
    await expect(store.loadStudent(result.student.studentId)).resolves.toEqual(result.student);
  });

  it("reuses a valid student cookie and updates last seen timestamp", async () => {
    const store = createMemoryStudentAreaStore();
    const cookies = createCookieStore();
    const first = await ensureStudentRecord({ store, cookies });
    const second = await ensureStudentRecord({ store, cookies });

    expect(second.created).toBe(false);
    expect(second.student.studentId).toBe(first.student.studentId);
    expect(new Date(second.student.lastSeenAt).getTime()).toBeGreaterThanOrEqual(
      new Date(first.student.lastSeenAt).getTime(),
    );
  });
});
