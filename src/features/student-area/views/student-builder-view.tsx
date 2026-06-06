import { getLocale, getTranslations } from "next-intl/server";
import { getLocalizedTracks } from "@/content/locales";
import { StudentBuilderClient } from "@/features/student-area/components/student-builder-client";
import { loadBuilderState } from "@/features/student-area/server/builder-selection";
import { createRedisStudentAreaStore } from "@/server/student-area/repository";

export async function StudentBuilderView({
  studentId,
  editPathId,
}: {
  studentId: string;
  editPathId?: string;
}) {
  const locale = await getLocale();
  const t = await getTranslations("studentArea.builder");
  const learningTracks = getLocalizedTracks(locale);
  const initialState = await loadBuilderState({
    studentId,
    catalog: learningTracks,
    store: createRedisStudentAreaStore(),
    editPathId,
  });
  const translatedInitialState = {
    ...initialState,
    loadMessage:
      initialState.loadMessage ===
      "This saved learning path could not be found. A new empty builder is ready."
        ? t("loadMessages.notFound")
        : initialState.loadMessage ===
            "Completed learning paths are kept in history and cannot be edited."
          ? t("loadMessages.completed")
          : initialState.loadMessage,
  };

  return (
    <section aria-labelledby="builder-heading" className="student-panel">
      <h2 id="builder-heading">{t("heading")}</h2>
      <p>{t("intro")}</p>
      <StudentBuilderClient studentId={studentId} initialState={translatedInitialState} />
    </section>
  );
}
