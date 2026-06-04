# Quickstart: Theme And Contrast Modes

## Goal

Verify that the implementation supports light, light high contrast, dark, and dark high contrast without unreadable controls or hydration mismatch.

## Expected Visual Preference Controls

- Header includes a labelled base theme control for Light and Dark.
- Header includes an independent High contrast switch.
- Changing one preference preserves the other preference.
- Controls are keyboard reachable and expose current state to assistive technology.

## Manual Review Matrix

Check each route in each visual combination:

| Route | Light | Light High Contrast | Dark | Dark High Contrast |
|-------|-------|---------------------|------|--------------------|
| `/` |  |  |  |  |
| `/tracks` |  |  |  |  |
| `/tracks/builder` |  |  |  |  |
| `/tracks/history?demoHistory=1` |  |  |  |  |
| `/tracks/programming-foundations/problem-solving-basics` |  |  |  |  |
| `/accessibility` |  |  |  |  |

For each combination, check:

- no white-on-white or black-on-black text, icon, or button state
- primary buttons, secondary buttons, disabled buttons, and icon-only controls
- navigation current state and focus state
- tabs, menus, dialogs, switches, and status labels where present
- text over images and overlays
- focus rings are visible
- selected/current/disabled/progress/status states have non-color cues

## Keyboard And Assistive Checks

1. Open `/accessibility`.
2. Press Tab until the base theme control is focused.
3. Confirm Light/Dark state is exposed through the control label and selected state.
4. Change Light/Dark with keyboard.
5. Confirm focus remains visible.
6. Move to the High contrast switch.
7. Toggle with Space.
8. Confirm the switch exposes on/off state and the page remains on the same route.
9. Repeat with high contrast on and off for both base themes.

## Automated Checks

Run targeted unit tests after implementation:

```bash
pnpm test -- tests/unit/accessibility/theme.test.ts tests/unit/accessibility/theme-control.test.ts
```

Run the accessibility integration suite:

```bash
pnpm test:e2e -- tests/integration/accessibility.spec.ts
```

Run the full quality checks before handoff:

```bash
pnpm test
pnpm lint
pnpm build
```

## Acceptance Checks

- All four visual combinations apply through root attributes before hydration.
- Preferences persist after reload and navigation.
- High contrast toggles without resetting light/dark.
- Light/dark switches without resetting high contrast.
- Theme controls do not trigger React/Next hydration mismatch warnings.
- Token-pair tests meet 4.5:1 for normal text and 3:1 for essential non-text UI.
- Playwright checks find no unreadable foreground/background pairings on representative controls.
- `specs/006-theme-contrast-modes/accessibility-evidence.md` documents the four combinations and the original white-on-white defect.
