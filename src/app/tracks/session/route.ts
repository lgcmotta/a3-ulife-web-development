import { NextRequest, NextResponse } from "next/server";

import { ANONYMOUS_STUDENT_COOKIE } from "@/server/student-area/student-record";
import {
  allocateStudentRecord,
  createRedisStudentAreaStore,
  type StudentAreaStore,
} from "@/server/student-area/repository";
import type { AnonymousStudentRecord } from "@/server/student-area/types";

const pendingAnonymousStudents = new Map<string, Promise<AnonymousStudentRecord>>();

function pendingStudentKey(request: NextRequest) {
  return [
    request.headers.get("x-forwarded-for") ?? "local",
    request.headers.get("user-agent") ?? "unknown-agent",
    request.headers.get("accept-language") ?? "unknown-language",
  ].join("|");
}

async function allocatePendingStudent(request: NextRequest, store: StudentAreaStore) {
  const key = pendingStudentKey(request);
  const pending = pendingAnonymousStudents.get(key);

  if (pending) {
    return pending;
  }

  const next = allocateStudentRecord(store);
  pendingAnonymousStudents.set(key, next);

  const clearPending = () => {
    setTimeout(() => pendingAnonymousStudents.delete(key), 2_000);
  };
  next.then(clearPending, clearPending);

  return next;
}

export async function GET(request: NextRequest) {
  const store = createRedisStudentAreaStore();
  const next = request.nextUrl.searchParams.get("next") ?? "/tracks/history";
  const safeNext = next.startsWith("/tracks") ? next : "/tracks/history";
  const existingId = request.cookies.get(ANONYMOUS_STUDENT_COOKIE)?.value;
  const existing = existingId ? await store.loadStudent(existingId) : null;
  const student = existing
    ? {
        ...existing,
        lastSeenAt: new Date().toISOString(),
      }
    : await allocatePendingStudent(request, store);

  await store.saveStudent(student);

  const response = NextResponse.redirect(new URL(safeNext, request.url));
  response.cookies.set(ANONYMOUS_STUDENT_COOKIE, student.studentId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return response;
}
