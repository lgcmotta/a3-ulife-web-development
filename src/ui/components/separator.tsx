import * as React from "react";
import { cn } from "@/ui/utils";

export function Separator({
  className,
  decorative = true,
  ...props
}: React.HTMLAttributes<HTMLHRElement> & { decorative?: boolean }) {
  return (
    <hr
      aria-hidden={decorative}
      className={cn("border-0 border-t border-[var(--border)]", className)}
      {...props}
    />
  );
}
