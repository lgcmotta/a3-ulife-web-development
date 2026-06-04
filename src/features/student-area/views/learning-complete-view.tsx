import Link from "next/link";

import { buttonVariants } from "@/ui/components/button";

export function LearningCompleteView() {
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
