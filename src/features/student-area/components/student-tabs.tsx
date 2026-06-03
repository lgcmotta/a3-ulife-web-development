import Link from "next/link";

import { cn } from "@/ui/utils";

export const studentTabs = [
  {
    href: "/tracks/history",
    label: "Learning Path History",
  },
  {
    href: "/tracks/builder",
    label: "Learning Path Builder",
  },
];

export function StudentTabs({ activePath }: { activePath: "/tracks/history" | "/tracks/builder" }) {
  return (
    <nav aria-label="Student area">
      <div className="student-tabs" role="tablist" aria-label="Student area sections">
        {studentTabs.map((tab) => {
          const selected = tab.href === activePath;

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
              {tab.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
