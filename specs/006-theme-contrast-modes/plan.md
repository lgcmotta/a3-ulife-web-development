# Implementation Plan: Theme And Contrast Modes

**Branch**: `006-theme-contrast-modes` | **Date**: 2026-06-04 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/006-theme-contrast-modes/spec.md`

## Summary

Add light and dark base themes while keeping high contrast as an independent accessibility modifier. Replace the current two-value visual theme model with a small token-based system for four combinations: light, light high contrast, dark, and dark high contrast. Preferences remain browser-local and are applied before hydration through root document attributes so React renders deterministic initial state. Shared UI primitives and existing page styles will consume paired semantic foreground/background tokens so buttons, links, menus, tabs, dialogs, disabled states, selected states, focus rings, and icon-only controls cannot render as white-on-white, black-on-black, or equivalent unreadable pairings.

## Technical Context

**Language/Version**: TypeScript 6.0.3, Node.js v25.9.0

**Primary Dependencies**: Next.js 16.2.7, React 19.2.7, Tailwind CSS 4.3.0, Radix UI/shadcn-style primitives, lucide-react, Vitest 4.1.8, Playwright 1.60.0, @axe-core/playwright 4.11.3

**Storage**: Browser `localStorage` for base theme and high-contrast preference only. No backend storage, Redis changes, cookies, external services, or cross-device synchronization.

**Testing**: Vitest unit tests with Testing Library for preference helpers and controls; Playwright integration tests with axe checks for keyboard operation, persisted preferences, hydration-safe attributes, and representative contrast/readability checks.

**Target Platform**: Responsive static-first web application for anonymous students using modern browsers.

**Project Type**: Frontend-focused Next.js web application with existing server-rendered routes. This feature changes visual presentation and browser-local preference behavior only.

**Performance Goals**: Apply the stored visual mode before React hydration, avoid visible unreadable flashes during theme changes, keep preference changes immediate on the current page, and preserve the spec target that users can switch from light normal to dark high contrast and back in under 30 seconds.

**Constraints**: Preserve existing routes, content, student-area behavior, and product identity. Do not add backend storage, external services, new primary pages, new learning content, authentication, real AI behavior, or unrelated redesign work. Keep the token set small and semantic; do not create a broad theme matrix.

**Scale/Scope**: Existing public pages, global navigation, accessibility help, learning tracks, topic pages, approved student-area surfaces, shared UI primitives, and current accessibility tests. Four visual combinations only.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Spec-driven scope**: PASS. The plan implements only the approved Theme And Contrast Modes specification and the reported high-contrast readability defect.
- **Simplicity and academic fit**: PASS. The design keeps a small four-combination token model and rejects a large theme matrix, redesign, or new product surfaces.
- **Usability and accessibility**: PASS. The plan centers readable controls, independent visual preferences, keyboard operation, assistive-technology labels, focus visibility, contrast evidence, and non-color-only states.
- **Static-first fit**: PASS. Preferences stay browser-local and compatible with static hosting. No runtime service, API, or backend dependency is added.
- **Independent testing**: PASS. Each visual combination is explicitly set before unit or Playwright checks; tests do not rely on previous local-storage state or execution order.
- **Assignment evidence**: PASS. The plan includes concise evidence for contrast, keyboard review, accessible labels, all four visual combinations, and the original white-on-white defect.
- **Responsibility boundaries**: PASS. Client/UI code owns preferences and visual state. Server/action and repository/storage behavior are untouched.
- **Single-flow functions**: PASS. Preference helpers are planned as separate read, resolve, apply, write, subscribe, and bootstrap responsibilities instead of one branching workflow.

## Project Structure

### Documentation (this feature)

```text
specs/006-theme-contrast-modes/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── accessibility-evidence-contract.md
│   ├── semantic-token-contract.md
│   └── visual-preference-contract.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
src/
├── accessibility/
│   └── theme.ts
├── app/
│   ├── globals.css
│   └── layout.tsx
├── features/
│   └── foundation/
│       ├── components/
│       │   ├── site-header.tsx
│       │   └── theme-toggle.tsx
│       └── views/
│           └── accessibility-view.tsx
├── storage/
│   └── theme-preference.ts
└── ui/
    └── components/
        ├── button.tsx
        ├── context-menu.tsx
        ├── dialog.tsx
        ├── dropdown-menu.tsx
        ├── switch.tsx
        └── tabs.tsx

tests/
├── integration/
│   └── accessibility.spec.ts
└── unit/
    └── accessibility/
        ├── theme-control.test.ts
        └── theme.test.ts
```

**Structure Decision**: Keep the existing feature-oriented frontend structure. Extend `src/accessibility/theme.ts` and `src/storage/theme-preference.ts` for preference modeling, keep pre-hydration application in `src/app/layout.tsx`, keep the existing header control surface in `ThemeToggle` or a narrowly renamed equivalent, and consolidate shared primitive colors through `src/app/globals.css` plus existing Tailwind-compatible `var(...)` classes.

## Phase 0 Research Summary

Research output is captured in [research.md](./research.md). Key decisions:

- Store base theme and contrast independently, with a compatibility read for the current legacy high-contrast value.
- Apply `data-theme="light|dark"` and `data-contrast="normal|high"` on `<html>` before hydration.
- Keep `useSyncExternalStore` for hydration-safe client snapshots instead of effect-driven synchronization.
- Define token pairs for surfaces and controls so each background has a matching foreground.
- Use native, labelled controls for base theme and contrast preference.
- Verify with unit tests, Playwright, axe, and concise evidence for all four visual combinations.

## Phase 1 Design Summary

### Preference Storage And Application

- Replace the current single visual theme value with:
  - `BaseTheme`: `light | dark`
  - `HighContrastPreference`: `false | true`
  - derived `ThemeCombination`: `light-normal | light-high | dark-normal | dark-high`
- Store preferences in browser-local keys such as:
  - `legado-de-diogenes-base-theme`
  - `legado-de-diogenes-high-contrast`
- Read the existing `legado-de-diogenes-theme` key as a compatibility fallback:
  - missing or `default` -> `light` + high contrast off
  - `high-contrast` -> `light` + high contrast on
  - invalid values -> readable default
- Set root attributes:
  - `data-theme="light"` or `data-theme="dark"`
  - `data-contrast="normal"` or `data-contrast="high"`
- Keep `suppressHydrationWarning` on `<html>` because the pre-hydration script intentionally updates root attributes before React hydrates.

### Hydration-Safe Flow

- Server markup renders a readable default: `data-theme="light"` and `data-contrast="normal"`.
- The inline bootstrap script runs before interactive UI renders and resolves browser-local preference into the same root attributes used by CSS.
- Client controls use `useSyncExternalStore` with:
  - a deterministic server snapshot matching the server-rendered default,
  - a browser snapshot that reads stored preference first and applied root attributes second,
  - a subscription event fired after writes and storage events.
- Do not reintroduce mount-effect state synchronization for theme controls; that was the prior hydration mismatch source.

### Token Architecture

- Define four compact selector blocks in `src/app/globals.css`:
  - `:root, :root[data-theme="light"][data-contrast="normal"]`
  - `:root[data-theme="light"][data-contrast="high"]`
  - `:root[data-theme="dark"][data-contrast="normal"]`
  - `:root[data-theme="dark"][data-contrast="high"]`
- Keep Tailwind usage compatible by exposing semantic CSS variables consumed through existing arbitrary value classes such as `bg-[var(--surface)]` and `text-[var(--foreground)]`.
- Required token pairs:
  - page: `--background` / `--foreground`
  - muted text: `--background` / `--muted-foreground`
  - panels: `--surface` / `--surface-foreground`
  - raised or selected surfaces: `--surface-strong` / `--surface-strong-foreground`
  - primary actions: `--action` / `--action-foreground`
  - primary action hover: `--action-hover` / `--action-hover-foreground`
  - neutral controls: `--control` / `--control-foreground`
  - selected controls: `--control-selected` / `--control-selected-foreground`
  - disabled controls: `--disabled` / `--disabled-foreground`
  - focus: `--focus`
  - borders: `--border`
  - links: `--link`
  - status accents: `--accent`, `--warning`, `--success`, `--danger`
- Do not set a component background without also using the paired foreground when the component contains text or icons.

### Shared Primitive Updates

- `Button`: keep existing variants but route every variant through paired tokens. Remove the need for the `.button-default` override. Disabled buttons must keep readable text and a visible boundary rather than relying on opacity alone.
- `Switch`: checked and unchecked states must use readable track/knob token pairs. The knob must remain visible on action-colored and neutral tracks in all four combinations.
- `DropdownMenu` and `ContextMenu`: menu content, focused items, checked/radio indicators, destructive items, and disabled items must use repo semantic variables rather than generated token names that are not part of the theme contract.
- `Tabs` and student tabs: active, inactive, hover, focus, and disabled states must use selected and neutral control tokens plus non-color cues such as underline, border, or selected state.
- `Dialog`: overlay, panel, close button, descriptions, and footer actions must consume semantic tokens. The close icon button must have a visible focus ring and accessible name.
- `Icon-only controls`: all icon-only buttons must have accessible names and inherit foreground tokens from their background state.
- Links and navigation: current route, hover, and focus states keep underline or border cues so color is not the only signal.

### Accessible Theme Controls

- Keep the visual preference controls in the existing header area to preserve routes and behavior.
- Replace the single high-contrast switch-only model with:
  - a labelled base theme switch that displays Light theme or Dark theme with the matching icon,
  - a labelled high-contrast switch that remains independent of the base theme.
- Controls must expose:
  - current base theme label such as "Light theme" or "Dark theme",
  - switch state for whether the dark base theme is enabled,
  - switch label "High contrast" with on/off state,
  - visible focus indicator in every visual combination.
- Keyboard expectations:
  - Tab reaches the base theme switch and high-contrast switch in predictable order.
  - Space or Enter changes light/dark.
  - Space toggles high contrast.
  - Focus remains on the operated control after a preference change.

### White-On-White And Black-On-Black Prevention

- Use token pair review as an implementation gate: each component state must map to a background token and matching foreground token.
- Add unit coverage for the token definitions to assert each declared pair meets the required contrast threshold.
- Add Playwright checks that open representative pages in all four combinations and inspect primary buttons, secondary buttons, nav links, tabs, menus/dialogs where available, disabled actions, selected actions, focus rings, and icon-only controls.
- Treat any white foreground on a white or near-white control surface, or black foreground on a black or near-black surface, as a failing acceptance check even if the issue appears on only one state.

### Accessibility Evidence

- Create a concise evidence artifact during implementation, likely `specs/006-theme-contrast-modes/accessibility-evidence.md`.
- Capture:
  - the four visual combinations checked,
  - representative routes checked,
  - interactive states checked,
  - keyboard path for the theme controls,
  - assistive labels for the base theme and high-contrast controls,
  - before/after note for the reported white-on-white defect,
  - remaining issues or "none observed".
- Evidence is not a new primary page and should not add product UI.

## Implementation Task Outline

1. Update `src/accessibility/theme.ts` to model `BaseTheme`, `HighContrastPreference`, derived theme combinations, labels, storage keys, and contrast-pair metadata used by tests.
2. Update `src/storage/theme-preference.ts` so read, resolve, write, apply, notify, and subscribe responsibilities handle independent base theme and high-contrast values with legacy fallback.
3. Update the pre-hydration script in `src/app/layout.tsx` to apply `data-theme` and `data-contrast` before React hydration while preserving a readable server default.
4. Replace or extend `ThemeToggle` into a compact accessible visual preference control with a base theme switch and independent high-contrast switch.
5. Refactor global CSS variables in `src/app/globals.css` into the four selector blocks and paired semantic token contract.
6. Update shared primitives in `src/ui/components/` so button, switch, dropdown menu, context menu, tabs, dialog, disabled, selected, focus, and icon-only states consume paired semantic tokens.
7. Update route/page-specific CSS classes that hard-code foreground/background values when those values can break in one of the four combinations, especially hero actions, navigation, panels, item action buttons, status labels, tabs, and dialogs.
8. Update accessibility help copy only if needed to describe light/dark plus high-contrast behavior accurately.
9. Add unit tests for preference resolution, local-storage fallback, root attribute application, external-store snapshot behavior, accessible control labels, and token-pair contrast thresholds.
10. Add Playwright coverage for all four visual combinations, persisted preferences after reload/navigation, hydration-safe root attributes, keyboard operation of controls, readable button/control states, and no axe violations on representative routes.
11. Add the concise accessibility evidence artifact for the four combinations and the original white-on-white defect.
12. Run `pnpm test`, `pnpm lint`, `pnpm build`, and targeted `pnpm test:e2e -- tests/integration/accessibility.spec.ts`.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | N/A | N/A |

## Post-Design Constitution Check

- **Spec-driven scope**: PASS. Design artifacts stay within the approved visual accessibility and preference feature.
- **Simplicity and academic fit**: PASS. The design uses four explicit combinations and semantic tokens, not a large theme framework or redesign.
- **Usability and accessibility**: PASS. Contracts cover readable states, focus rings, keyboard operation, assistive labels, non-color cues, and evidence.
- **Static-first fit**: PASS. Browser-local preference storage and root attributes preserve static-hosting compatibility.
- **Independent testing**: PASS. Quickstart and contracts require explicit setup per visual mode and no reliance on shared preference state.
- **Assignment evidence**: PASS. Evidence contract defines concise class-facing accessibility documentation.
- **Responsibility boundaries**: PASS. Client/browser preference behavior is isolated from server actions and student data.
- **Single-flow functions**: PASS. Design separates resolving, applying, writing, subscribing, and rendering preference controls.
