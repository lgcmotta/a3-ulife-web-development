# Accessibility Evidence: Theme And Contrast Modes

**Feature**: Theme And Contrast Modes
**Date**: 2026-06-04

## Review Matrix

| Visual Combination | Required Result | Status |
|--------------------|-----------------|--------|
| Light | Checked | Passed targeted unit and Playwright checks |
| Light high contrast | Checked | Passed targeted unit and Playwright checks |
| Dark | Checked | Passed targeted unit and Playwright checks |
| Dark high contrast | Checked | Passed targeted unit and Playwright checks |

High contrast remains independent from the Light and Dark base theme selection.

## Routes Checked

- `/`
- `/tracks`
- `/tracks/builder`
- `/tracks/history?demoHistory=1`
- `/tracks/programming-foundations/problem-solving-basics`
- `/accessibility`

## Surfaces And States

- Global navigation current, hover, and focus states
- Base theme radio group and High contrast switch
- Primary, secondary, disabled, selected/current, and focused button states
- Selected/current student tabs
- Dropdown menu trigger and menu item states
- Dialog panel, close button, cancel action, and confirm action
- Icon-only path action controls
- Text over hero imagery with overlay present
- Status labels and history table headings

## Commands And Checks

- Passed: `pnpm test -- tests/unit/accessibility/theme.test.ts tests/unit/accessibility/theme-control.test.ts`.
- Passed: `CI=1 pnpm test:e2e -- tests/integration/accessibility.spec.ts`, confirming the targeted suite runs with the configured 2 Playwright workers.
- Passed: `pnpm test`.
- Passed: `pnpm lint`.
- Passed: `pnpm build`.
- Passed: `CI=1 pnpm test:e2e`, confirming the full Playwright suite runs with the configured 2 workers.

## Keyboard And Assistive Labels

- Keyboard path checked on `/accessibility`: Tab reaches the Light radio, arrow key changes to Dark, Tab reaches High contrast, and Space toggles the switch while keeping focus on the operated control.
- Base theme exposes a labelled `Base theme` radio group with `Light` and `Dark` selected state.
- High contrast exposes a switch named `High contrast` with `aria-checked` on/off state.
- Current and selected states include non-color cues such as underline, selected state, borders, and native checked state.

## Contrast Results

- Semantic token pair unit coverage checks all four combinations for 4.5:1 text contrast and 3:1 essential non-text/focus contrast.
- Playwright checks representative route controls in light high contrast and dark high contrast, including primary actions, secondary actions, disabled builder actions, selected tabs, status labels, dialogs, dropdown menus, icon-only controls, and theme controls.
- No white-on-white or black-on-black foreground/background pairings were observed in checked controls after the token migration.

## White-On-White Defect

- Before: high-contrast mode could render white text or icons on white or very light controls.
- After: shared primitives and page-level controls consume paired semantic tokens for action, control, selected, disabled, surface, and focus states. The previous white-on-white defect is fixed for the checked routes and states.

## Scope Confirmation

- No backend storage, external service, authentication, real AI behavior, new primary route, or learning content change was introduced.
- Preferences remain browser-local and frontend-only.
- Existing product routes and learning flows are preserved.

## Remaining Issues

- None observed in the checked routes, controls, and visual combinations.
