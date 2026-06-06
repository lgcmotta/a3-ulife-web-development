"use client";

import { useTranslations } from "next-intl";
import { EllipsisVertical } from "lucide-react";

import type { PathContextAction, PathItemLevel } from "@/server/student-area/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/components/dropdown-menu";

export function PathItemContextMenu({
  label,
  level,
  trackSlug,
  topicSlug,
  onAction,
}: {
  label: string;
  level: PathItemLevel;
  trackSlug: string;
  topicSlug?: string;
  onAction: (
    level: PathItemLevel,
    trackSlug: string,
    topicSlug: string | undefined,
    action: PathContextAction,
  ) => void;
}) {
  const t = useTranslations("studentArea.builder.menu");
  const actions: Array<{ label: string; action: PathContextAction }> = [
    { label: t("remove"), action: "remove" },
    { label: t("moveUp"), action: "move-up" },
    { label: t("moveDown"), action: "move-down" },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={t("actionsFor", { label })}
          className="item-action-button"
          type="button"
        >
          <EllipsisVertical aria-hidden="true" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {actions.map((item) => (
          <DropdownMenuItem
            key={item.action}
            onSelect={() => onAction(level, trackSlug, topicSlug, item.action)}
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
