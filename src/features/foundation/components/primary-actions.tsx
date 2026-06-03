import Link from "next/link";
import { ArrowRight, LifeBuoy } from "lucide-react";
import { buttonVariants } from "@/ui/components/button";

export function PrimaryActions() {
  return (
    <div className="primary-actions" aria-label="Primary actions">
      <Link className={buttonVariants()} href="/tracks">
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
