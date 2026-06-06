import Link from "next/link";
import { useTranslations } from "next-intl";

import { studentAreaRoutes } from "@/routes/navigation";
import { buttonVariants } from "@/ui/components/button";

export function EmptyHistoryState() {
  const t = useTranslations("studentArea.history");

  return (
    <div className="student-empty-state">
      <p>{t("empty")}</p>
      <Link className={buttonVariants()} href={studentAreaRoutes.builder} prefetch={false}>
        {t("addNew")}
      </Link>
    </div>
  );
}
