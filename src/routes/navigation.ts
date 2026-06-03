import type { MainNavigationItem } from "@/content/types";

export const mainNavigation: MainNavigationItem[] = [
  {
    label: "Home",
    href: "/",
    description: "Understand Diogenes and the platform purpose",
    order: 1,
    area: "home",
  },
  {
    label: "Learning Tracks",
    href: "/tracks",
    description: "Browse curated beginner study paths",
    order: 2,
    area: "tracks",
  },
  {
    label: "Accessibility Help",
    href: "/accessibility",
    description: "Learn how to navigate and use the platform accessibly",
    order: 3,
    area: "accessibility",
  },
];

export function getNavigationItem(href: string) {
  return mainNavigation.find((item) => item.href === href);
}
