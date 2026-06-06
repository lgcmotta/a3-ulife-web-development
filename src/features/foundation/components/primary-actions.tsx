import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, BookOpenCheck, LifeBuoy } from "lucide-react";
import { studentAreaRoutes } from "@/routes/navigation";
import { buttonVariants } from "@/ui/components/button";

export function PrimaryActions() {
  const t = useTranslations("actions");

  return (
    <div className="primary-actions" aria-label={t("primary")}>
      <Link className={buttonVariants()} href={studentAreaRoutes.history} prefetch={false}>
        {t("startLearning")}
        <BookOpenCheck aria-hidden="true" size={18} />
      </Link>
      <Link className={buttonVariants({ variant: "secondary" })} href="/tracks">
        {t("exploreTracks")}
        <ArrowRight aria-hidden="true" size={18} />
      </Link>
      <Link className={buttonVariants({ variant: "secondary" })} href="/accessibility">
        <LifeBuoy aria-hidden="true" size={18} />
        {t("accessibilityHelp")}
      </Link>
    </div>
  );
}
