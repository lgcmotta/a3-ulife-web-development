import { learningTracks } from "@/content/tracks";
import { StudentBuilderClient } from "@/features/student-area/components/student-builder-client";
import { loadBuilderState } from "@/features/student-area/server/builder-selection";
import { createRedisStudentAreaStore } from "@/server/student-area/repository";

export async function StudentBuilderView({ studentId }: { studentId: string }) {
  const initialState = await loadBuilderState({
    studentId,
    catalog: learningTracks,
    store: createRedisStudentAreaStore(),
  });

  return (
    <section aria-labelledby="builder-heading" className="student-panel">
      <h2 id="builder-heading">Learning Path Builder</h2>
      <p>Select tracks and topics to build a personal study sequence.</p>
      <StudentBuilderClient studentId={studentId} initialState={initialState} />
    </section>
  );
}
