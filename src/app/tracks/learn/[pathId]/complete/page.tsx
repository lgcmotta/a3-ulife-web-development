import type { Metadata } from "next";

import { LearningCompleteView } from "@/features/student-area/views/learning-complete-view";

export const metadata: Metadata = {
  title: "Learning Path Complete",
  description: "Completion screen for a personalized learning path.",
};

export default function LearningPathCompletePage() {
  return <LearningCompleteView />;
}
