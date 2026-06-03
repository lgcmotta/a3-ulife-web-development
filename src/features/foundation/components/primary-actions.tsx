import Link from "next/link";
import { ArrowRight, BookOpenCheck, LifeBuoy } from "lucide-react";
import { studentAreaRoutes } from "@/routes/navigation";
import { buttonVariants } from "@/ui/components/button";

export function PrimaryActions() {
  return (
    <div className="primary-actions" aria-label="Primary actions">
      <Link className={buttonVariants()} href={studentAreaRoutes.history} prefetch={false}>
        Start Learning
        <BookOpenCheck aria-hidden="true" size={18} />
      </Link>
      <Link className={buttonVariants({ variant: "secondary" })} href="/tracks">
        Explore tracks
        <ArrowRight aria-hidden="true" size={18} />
      </Link>
      <Link className={buttonVariants({ variant: "secondary" })} href="/accessibility">
        <LifeBuoy aria-hidden="true" size={18} />
        Accessibility help
      </Link>
    </div>
  );
}
