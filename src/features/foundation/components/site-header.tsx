"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Accessibility, BookOpen, Home } from "lucide-react";
import { mainNavigation } from "@/routes/navigation";
import { landmarkLabels } from "@/accessibility/landmarks";
import { ThemeToggle } from "@/features/foundation/components/theme-toggle";

const icons = {
  home: Home,
  tracks: BookOpen,
  accessibility: Accessibility,
};

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="site-header">
      <Link className="brand-mark" href="/" aria-label="Legado de Diogenes home">
        <span aria-hidden="true">LD</span>
        <span>Legado de Diogenes</span>
      </Link>
      <nav aria-label={landmarkLabels.primaryNavigation} className="primary-nav">
        {mainNavigation.map((item) => {
          const Icon = icons[item.area];
          const isCurrent =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              aria-current={isCurrent ? "page" : undefined}
              className="nav-link"
              href={item.href}
              key={item.href}
            >
              <Icon aria-hidden="true" size={17} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <ThemeToggle />
    </header>
  );
}
