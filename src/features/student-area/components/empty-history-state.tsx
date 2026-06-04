import Link from "next/link";

import { studentAreaRoutes } from "@/routes/navigation";
import { buttonVariants } from "@/ui/components/button";

export function EmptyHistoryState() {
  return (
    <div className="student-empty-state">
      <p>
        No saved learning paths are available yet. Build a small path from the curated
        tracks, save it, and return here to review progress.
      </p>
      <Link className={buttonVariants()} href={studentAreaRoutes.builder} prefetch={false}>
        Add New Learning Path
      </Link>
    </div>
  );
}
