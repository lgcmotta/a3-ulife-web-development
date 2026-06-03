"use client";

import { Contrast } from "lucide-react";
import type { KeyboardEvent } from "react";
import { useEffect, useState } from "react";
import { type ThemeId } from "@/accessibility/theme";
import {
  applyThemePreference,
  readThemePreference,
  writeThemePreference,
} from "@/storage/theme-preference";
import { Switch } from "@/ui/components/switch";

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeId>(() => readThemePreference());

  useEffect(() => {
    applyThemePreference(theme);
  }, [theme]);

  const isHighContrast = theme === "high-contrast";

  function toggleTheme() {
    const nextTheme: ThemeId = isHighContrast ? "default" : "high-contrast";
    setTheme(nextTheme);
    writeThemePreference(nextTheme);
    applyThemePreference(nextTheme);
  }

  function handleToggleKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== " " && event.key !== "Spacebar") {
      return;
    }

    event.preventDefault();
    toggleTheme();
  }

  return (
    <div className="theme-toggle" aria-label="Visual theme">
      <Contrast aria-hidden="true" size={18} />
      <span id="theme-toggle-label">High contrast</span>
      <Switch
        aria-label="Toggle high contrast theme"
        aria-labelledby="theme-toggle-label"
        checked={isHighContrast}
        onClick={toggleTheme}
        onKeyDown={handleToggleKeyDown}
      />
    </div>
  );
}
