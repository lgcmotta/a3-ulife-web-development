export const studentCounters = {
  student: "ids:student",
  path: "ids:path",
  history: "ids:history",
};

export function studentKeys(studentId: string) {
  return {
    student: `student:${studentId}`,
    savedPath: (pathId: string) => `student:${studentId}:paths:${pathId}`,
    history: `student:${studentId}:paths:history`,
    feedback: `student:${studentId}:feedback`,
  };
}
