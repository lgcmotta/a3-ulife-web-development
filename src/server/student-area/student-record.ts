import { cookies as nextCookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  allocateStudentRecord,
  createRedisStudentAreaStore,
  type StudentAreaStore,
} from "@/server/student-area/repository";

export const ANONYMOUS_STUDENT_COOKIE = "diogenes_student_id";

export type StudentCookieStore = {
  get(name: string): { value: string } | undefined;
  set(name: string, value: string, options?: Record<string, unknown>): void;
};

export async function ensureStudentRecord({
  store = createRedisStudentAreaStore(),
  cookies,
}: {
  store?: StudentAreaStore;
  cookies: StudentCookieStore;
}) {
  const existingId = cookies.get(ANONYMOUS_STUDENT_COOKIE)?.value;

  if (existingId) {
    const existing = await store.loadStudent(existingId);

    if (existing) {
      const updated = {
        ...existing,
        lastSeenAt: new Date().toISOString(),
      };
      await store.saveStudent(updated);
      return { student: updated, created: false };
    }
  }

  const student = await allocateStudentRecord(store);
  await store.saveStudent(student);
  cookies.set(ANONYMOUS_STUDENT_COOKIE, student.studentId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return { student, created: true };
}

export async function ensureCurrentStudent() {
  const cookieStore = await nextCookies();
  return ensureStudentRecord({ cookies: cookieStore });
}

export async function getCurrentStudentOrRedirect(nextPath: string) {
  const cookieStore = await nextCookies();
  const studentId = cookieStore.get(ANONYMOUS_STUDENT_COOKIE)?.value;
  const store = createRedisStudentAreaStore();

  if (!studentId) {
    redirect(`/tracks/session?next=${encodeURIComponent(nextPath)}`);
  }

  const student = await store.loadStudent(studentId);

  if (!student) {
    redirect(`/tracks/session?next=${encodeURIComponent(nextPath)}`);
  }

  const updated = {
    ...student,
    lastSeenAt: new Date().toISOString(),
  };
  await store.saveStudent(updated);

  return { student: updated, created: false };
}
