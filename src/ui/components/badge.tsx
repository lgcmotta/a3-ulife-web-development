import * as React from "react";
import { cn } from "@/ui/utils";

export function Badge({
  className,
  ...props
}: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-[var(--border)] bg-[var(--surface-strong)] px-2.5 py-1 text-xs font-semibold text-[var(--muted-foreground)]",
        className,
      )}
      {...props}
    />
  );
}
