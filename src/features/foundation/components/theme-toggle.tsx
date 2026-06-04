"use client";

import { Contrast, Moon, Sun } from "lucide-react";
import type { KeyboardEvent } from "react";
import { useId, useSyncExternalStore } from "react";
import {
  baseThemes,
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

const baseThemeOrder = baseThemes.map((theme) => theme.id);

export function ThemeToggle() {
  const preference = useSyncExternalStore(
    subscribeToThemePreference,
    getThemePreferenceSnapshot,
    () => defaultVisualPreference,
  );
  const baseThemeLabelId = useId();
  const highContrastLabelId = useId();

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

  function toggleHighContrast() {
    const nextPreference = resolveVisualPreference({
      baseTheme: preference.baseTheme,
      highContrast: !preference.highContrast,
    });
    writeHighContrastPreference(nextPreference.highContrast);
    applyThemePreference(nextPreference);
    notifyThemePreferenceChange();
  }

  function focusBaseTheme(baseTheme: BaseThemeId) {
    requestAnimationFrame(() => {
      document
        .querySelector<HTMLInputElement>(`input[name="base-theme"][value="${baseTheme}"]`)
        ?.focus();
    });
  }

  function handleBaseThemeKeyDown(event: KeyboardEvent<HTMLInputElement>, baseTheme: BaseThemeId) {
    if (
      event.key !== "ArrowRight" &&
      event.key !== "ArrowDown" &&
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowUp"
    ) {
      return;
    }

    event.preventDefault();

    const currentIndex = baseThemeOrder.indexOf(baseTheme);
    const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    const nextIndex = (currentIndex + direction + baseThemeOrder.length) % baseThemeOrder.length;
    const nextBaseTheme = baseThemeOrder[nextIndex];

    setBaseTheme(nextBaseTheme);
    focusBaseTheme(nextBaseTheme);
  }

  function handleContrastKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
    if (event.key !== " " && event.key !== "Spacebar") {
      return;
    }

    event.preventDefault();
    toggleHighContrast();
  }

  return (
    <div className="theme-toggle" aria-label="Visual theme">
      <fieldset className="base-theme-control" aria-labelledby={baseThemeLabelId}>
        <legend id={baseThemeLabelId}>Base theme</legend>
        <div className="base-theme-options">
          {baseThemes.map((theme) => {
            const Icon = themeIcons[theme.id];

            return (
              <label className="theme-option" key={theme.id}>
                <input
                  checked={preference.baseTheme === theme.id}
                  name="base-theme"
                  onChange={() => setBaseTheme(theme.id)}
                  onKeyDown={(event) => handleBaseThemeKeyDown(event, theme.id)}
                  type="radio"
                  value={theme.id}
                />
                <span>
                  <Icon aria-hidden="true" size={15} />
                  {theme.label}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
      <div className="contrast-control">
        <Contrast aria-hidden="true" size={18} />
        <span id={highContrastLabelId}>High contrast</span>
        <Switch
          aria-label="Toggle high contrast"
          aria-labelledby={highContrastLabelId}
          checked={preference.highContrast}
          onClick={toggleHighContrast}
          onKeyDown={handleContrastKeyDown}
        />
      </div>
    </div>
  );
}
