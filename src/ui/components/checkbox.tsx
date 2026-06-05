"use client"

import * as React from "react"
import { CheckIcon } from "lucide-react"
import { Checkbox as CheckboxPrimitive } from "radix-ui"

import { cn } from "@/ui/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer size-4 shrink-0 rounded-[4px] border border-[var(--border)] bg-[var(--control)] text-[var(--control-foreground)] shadow-xs transition-shadow outline-none focus-visible:border-[var(--focus)] focus-visible:ring-[3px] focus-visible:ring-[var(--focus)]/50 disabled:cursor-not-allowed disabled:bg-[var(--disabled)] disabled:text-[var(--disabled-foreground)] aria-invalid:border-[var(--danger)] aria-invalid:ring-[var(--danger)]/25 data-[state=checked]:border-[var(--control-selected)] data-[state=checked]:bg-[var(--control-selected)] data-[state=checked]:text-[var(--control-selected-foreground)]",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none"
      >
        <CheckIcon className="size-3.5" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
