# Accessibility Evidence Contract

## Scope

Defines the concise evidence expected after implementation. This evidence supports the class presentation and must not create a new product page.

## Evidence Artifact

Create or update:

```text
specs/006-theme-contrast-modes/accessibility-evidence.md
```

## Required Matrix

| Visual Combination | Required Result |
|--------------------|-----------------|
| Light | Checked |
| Light high contrast | Checked |
| Dark | Checked |
| Dark high contrast | Checked |

## Required Routes

Check representative existing routes:

- `/`
- `/tracks`
- `/tracks/builder`
- `/tracks/history?demoHistory=1`
- `/tracks/programming-foundations/problem-solving-basics`
- `/accessibility`

## Required Surfaces And States

- Global navigation current, hover, and focus states
- Base theme control and high-contrast switch
- Primary and secondary buttons
- Disabled buttons or disabled actions
- Selected/current tabs
- Menus or context menus where available
- Dialog actions where available
- Icon-only controls
- Text over hero imagery or tinted overlays
- Status, progress, warning, success, or selected indicators where present

## Required Notes

The evidence must include:

- Commands or checks run
- Keyboard path for reaching and operating visual preference controls
- Assistive-technology or accessibility-tree labels for the controls
- Contrast result summary for text and non-text controls
- Before/after note for the reported white-on-white defect
- Remaining issues, or "none observed"

## Acceptance Checks

- Evidence covers all four visual combinations.
- Evidence mentions the original white-on-white defect explicitly.
- Evidence confirms that high contrast remains independent from light/dark.
- Evidence confirms no backend, route, or content behavior changed.
