export const studentCounters = {
  student: "ids:student",
  path: "ids:path",
  history: "ids:history",
};

export function studentKeys(studentId: string) {
  return {
    student: `student:${studentId}`,
    draft: `student:${studentId}:path:draft`,
    activePath: `student:${studentId}:path:active`,
    history: `student:${studentId}:paths:history`,
    feedback: `student:${studentId}:feedback`,
  };
}
