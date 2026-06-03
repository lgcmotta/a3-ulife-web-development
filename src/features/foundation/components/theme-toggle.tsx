"use client";

import { Contrast } from "lucide-react";
import type { KeyboardEvent } from "react";
import { useSyncExternalStore } from "react";
import { defaultTheme, type ThemeId } from "@/accessibility/theme";
import {
  applyThemePreference,
  getThemePreferenceSnapshot,
  notifyThemePreferenceChange,
  subscribeToThemePreference,
  writeThemePreference,
} from "@/storage/theme-preference";
import { Switch } from "@/ui/components/switch";

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToThemePreference,
    getThemePreferenceSnapshot,
    () => defaultTheme,
  );

  const isHighContrast = theme === "high-contrast";

  function toggleTheme() {
    const nextTheme: ThemeId = isHighContrast ? "default" : "high-contrast";
    writeThemePreference(nextTheme);
    applyThemePreference(nextTheme);
    notifyThemePreferenceChange();
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
