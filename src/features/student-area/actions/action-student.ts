"use server";

import { cookies } from "next/headers";

import { ANONYMOUS_STUDENT_COOKIE } from "@/server/student-area/student-record";
import type { StudentAreaStore } from "@/server/student-area/repository";

export async function resolveActionStudentId(boundStudentId: string, store: StudentAreaStore) {
  const cookieStore = await cookies();
  const cookieStudentId = cookieStore.get(ANONYMOUS_STUDENT_COOKIE)?.value;

  if (!cookieStudentId) {
    cookieStore.set(ANONYMOUS_STUDENT_COOKIE, boundStudentId, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return boundStudentId;
  }

  const cookieStudent = await store.loadStudent(cookieStudentId);
  const resolvedStudentId = cookieStudent ? cookieStudent.studentId : boundStudentId;

  cookieStore.set(ANONYMOUS_STUDENT_COOKIE, resolvedStudentId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });

  return resolvedStudentId;
}
