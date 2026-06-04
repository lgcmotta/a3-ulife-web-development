import Link from "next/link";

import type { SavedLearningPath } from "@/server/student-area/types";
import { buttonVariants } from "@/ui/components/button";

export function LearningCompleteView({ path }: { path: SavedLearningPath | null }) {
  if (!path) {
    return (
      <section className="content-container page-section" aria-labelledby="learning-complete-heading">
        <h1 id="learning-complete-heading">Learning path unavailable</h1>
        <p>This saved learning path could not be loaded.</p>
        <Link className={buttonVariants()} href="/tracks/history" prefetch={false}>
          Continue
        </Link>
      </section>
    );
  }

  return (
    <section className="content-container page-section" aria-labelledby="learning-complete-heading">
      <p className="eyebrow">Path complete</p>
      <h1 id="learning-complete-heading">Congratulations, you finished your learning path</h1>
      <p>
        Your selected topics are marked complete. Return to the student area to review the
        history or build a new path.
      </p>
      <Link className={buttonVariants()} href="/tracks/history" prefetch={false}>
        Continue
      </Link>
    </section>
  );
}
