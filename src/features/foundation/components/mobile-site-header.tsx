"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState, type MouseEvent } from "react";
import {
  LanguageToggle,
  type LanguageToggleLabels,
} from "@/features/foundation/components/language-toggle";
import { PrimaryNavigation } from "@/features/foundation/components/primary-navigation";
import { ThemeToggle, type ThemeToggleLabels } from "@/features/foundation/components/theme-toggle";
import { Button } from "@/ui/components/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/ui/components/collapsible";

type MobileMenuLabels = {
  openLabel: string;
  closeLabel: string;
  regionLabel: string;
};

export function MobileSiteHeader({
  brandHomeLabel,
  brandName,
  languageToggleLabels,
  menuLabels,
  themeToggleLabels,
}: {
  brandHomeLabel: string;
  brandName: string;
  languageToggleLabels: LanguageToggleLabels;
  menuLabels: MobileMenuLabels;
  themeToggleLabels: ThemeToggleLabels;
}) {
  const [open, setOpen] = useState(false);
  const MenuIcon = open ? X : Menu;

  function closeAfterNavigation(event: MouseEvent<HTMLDivElement>) {
    const target = event.target;

    if (target instanceof Element && target.closest("a")) {
      setOpen(false);
    }
  }

  return (
    <Collapsible className="mobile-site-header" open={open} onOpenChange={setOpen}>
      <div className="mobile-site-header__bar">
        <Link className="brand-mark" href="/" aria-label={brandHomeLabel}>
          <span aria-hidden="true">LD</span>
          <span>{brandName}</span>
        </Link>
        <CollapsibleTrigger asChild>
          <Button
            aria-label={open ? menuLabels.closeLabel : menuLabels.openLabel}
            className="mobile-menu-trigger"
            size="icon"
            type="button"
            variant="outline"
          >
            <MenuIcon aria-hidden="true" size={22} />
          </Button>
        </CollapsibleTrigger>
      </div>
      <CollapsibleContent
        aria-label={menuLabels.regionLabel}
        className="mobile-site-menu"
        role="region"
      >
        <div className="mobile-site-menu__content" onClick={closeAfterNavigation}>
          <PrimaryNavigation />
          <div className="preference-controls">
            <ThemeToggle labels={themeToggleLabels} />
            <LanguageToggle labels={languageToggleLabels} />
          </div>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
