import Link from "next/link";

import { cn } from "@/ui/utils";

export const studentTabs = [
  {
    href: "/tracks/history",
    labelKey: "history",
  },
  {
    href: "/tracks/builder",
    labelKey: "builder",
  },
] as const;

export type StudentTabsLabels = {
  navLabel: string;
  listLabel: string;
  history: string;
  builder: string;
};

const defaultLabels: StudentTabsLabels = {
  navLabel: "Student area",
  listLabel: "Student area sections",
  history: "Learning Path History",
  builder: "Learning Path Builder",
};

export function StudentTabs({
  activePath,
  labels = defaultLabels,
}: {
  activePath: "/tracks/history" | "/tracks/builder";
  labels?: StudentTabsLabels;
}) {
  return (
    <nav aria-label={labels.navLabel}>
      <div className="student-tabs" role="tablist" aria-label={labels.listLabel}>
        {studentTabs.map((tab) => {
          const selected = tab.href === activePath;
          const label = labels[tab.labelKey];

          return (
            <Link
              aria-current={selected ? "page" : undefined}
              aria-selected={selected}
              className={cn("student-tab", selected && "student-tab-active")}
              href={tab.href}
              key={tab.href}
              prefetch={false}
              role="tab"
            >
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
