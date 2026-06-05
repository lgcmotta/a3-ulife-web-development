"use client";

import { Contrast, Moon, Sun } from "lucide-react";
import type { KeyboardEvent } from "react";
import { useId, useSyncExternalStore } from "react";
import {
  defaultVisualPreference,
  resolveVisualPreference,
  type BaseThemeId,
} from "@/accessibility/theme";
import {
  applyThemePreference,
  getThemePreferenceSnapshot,
  notifyThemePreferenceChange,
  subscribeToThemePreference,
  writeBaseThemePreference,
  writeHighContrastPreference,
} from "@/storage/theme-preference";
import { Switch } from "@/ui/components/switch";

const themeIcons = {
  light: Sun,
  dark: Moon,
};

const baseThemeLabels = {
  light: "Light theme",
  dark: "Dark theme",
} satisfies Record<BaseThemeId, string>;

export function ThemeToggle() {
  const preference = useSyncExternalStore(
    subscribeToThemePreference,
    getThemePreferenceSnapshot,
    () => defaultVisualPreference,
  );
  const baseThemeLabelId = useId();
  const highContrastLabelId = useId();
  const ThemeIcon = themeIcons[preference.baseTheme];
  const baseThemeLabel = baseThemeLabels[preference.baseTheme];
  const isDarkTheme = preference.baseTheme === "dark";

  function setBaseTheme(baseTheme: BaseThemeId) {
    if (baseTheme === preference.baseTheme) {
      return;
    }

    const nextPreference = resolveVisualPreference({
      baseTheme,
      highContrast: preference.highContrast,
    });
    writeBaseThemePreference(baseTheme);
    applyThemePreference(nextPreference);
    notifyThemePreferenceChange();
  }

  function toggleBaseTheme() {
    setBaseTheme(isDarkTheme ? "light" : "dark");
  }

  function toggleHighContrast() {
    const nextPreference = resolveVisualPreference({
      baseTheme: preference.baseTheme,
      highContrast: !preference.highContrast,
    });
    writeHighContrastPreference(nextPreference.highContrast);
    applyThemePreference(nextPreference);
    notifyThemePreferenceChange();
  }

  function handleSwitchKeyDown(event: KeyboardEvent<HTMLButtonElement>, toggle: () => void) {
    if (event.key !== " " && event.key !== "Spacebar") {
      return;
    }

    event.preventDefault();
    toggle();
  }

  return (
    <div className="theme-toggle" aria-label="Visual theme">
      <div className="base-theme-control">
        <ThemeIcon aria-hidden="true" size={18} />
        <span className="theme-control-label" id={baseThemeLabelId}>
            {baseThemeLabel}
        </span>
        <Switch
          aria-label="Toggle base theme"
          aria-labelledby={baseThemeLabelId}
          checked={isDarkTheme}
          onClick={toggleBaseTheme}
          onKeyDown={(event) => handleSwitchKeyDown(event, toggleBaseTheme)}
        />
      </div>
      <div className="contrast-control">
        <Contrast aria-hidden="true" size={18} />
        <span className="theme-control-label" id={highContrastLabelId}>
          High contrast
        </span>
        <Switch
          aria-label="Toggle high contrast"
          aria-labelledby={highContrastLabelId}
          checked={preference.highContrast}
          onClick={toggleHighContrast}
          onKeyDown={(event) => handleSwitchKeyDown(event, toggleHighContrast)}
        />
      </div>
    </div>
  );
}
