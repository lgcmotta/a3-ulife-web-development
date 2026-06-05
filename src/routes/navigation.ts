import type { MainNavigationItem } from "@/content/types";

export const studentAreaRoutes = {
  history: "/tracks/history",
  builder: "/tracks/builder",
} as const;

export const mainNavigation: MainNavigationItem[] = [
  {
    href: "/",
    order: 1,
    area: "home",
  },
  {
    href: "/tracks",
    order: 2,
    area: "tracks",
  },
  {
    href: "/accessibility",
    order: 3,
    area: "accessibility",
  },
];
