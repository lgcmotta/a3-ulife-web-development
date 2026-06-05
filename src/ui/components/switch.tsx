"use client";

import * as React from "react";
import { cn } from "@/ui/utils";

export interface SwitchProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "role"> {
  checked: boolean;
}

export const Switch = React.forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, className, children, ...props }, ref) => (
    <button
      aria-checked={checked}
      className={cn(
        "switch-control inline-flex h-7 w-12 items-center rounded-full border border-[var(--border)] bg-[var(--control)] p-1 text-[var(--control-foreground)] focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-[var(--focus)] disabled:bg-[var(--disabled)] disabled:text-[var(--disabled-foreground)]",
        checked && "bg-[var(--control-selected)] text-[var(--control-selected-foreground)]",
        className,
      )}
      ref={ref}
      role="switch"
      type="button"
      {...props}
    >
      <span
        className={cn(
          "block h-5 w-5 rounded-full border border-[var(--border)] bg-current shadow-sm transition-transform",
          checked && "translate-x-5",
        )}
      />
      {children}
    </button>
  ),
);
Switch.displayName = "Switch";
