"use client";

import { EllipsisVertical } from "lucide-react";

import type { PathContextAction, PathItemLevel } from "@/server/student-area/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/ui/components/dropdown-menu";

const actions: Array<{ label: string; action: PathContextAction }> = [
  { label: "Remove", action: "remove" },
  { label: "Move up", action: "move-up" },
  { label: "Move down", action: "move-down" },
];

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          aria-label={`Actions for ${label}`}
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
