import { NextRequest, NextResponse } from "next/server";

import { ANONYMOUS_STUDENT_COOKIE } from "@/server/student-area/student-record";
import {
  allocateStudentRecord,
  createRedisStudentAreaStore,
} from "@/server/student-area/repository";

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
    : await allocateStudentRecord(store);

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
