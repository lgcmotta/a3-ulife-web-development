# Tasks: Theme And Contrast Modes

**Input**: Design documents from `/specs/006-theme-contrast-modes/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: Required by the specification, plan, constitution, and quickstart. Tests must be independently runnable, order-independent, and parallel-safe.

**Organization**: Tasks are grouped by user story so each story can be implemented and verified independently after the foundational phase.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel with other marked tasks in the same phase because it touches different files and does not depend on incomplete work.
- **[Story]**: User story label for story-scoped tasks only.
- Every task includes an exact file path.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the existing frontend theme work without changing application behavior yet.

- [X] T001 Review the active specification and contracts before editing implementation files in specs/006-theme-contrast-modes/spec.md, specs/006-theme-contrast-modes/plan.md, specs/006-theme-contrast-modes/contracts/visual-preference-contract.md, specs/006-theme-contrast-modes/contracts/semantic-token-contract.md, and specs/006-theme-contrast-modes/contracts/accessibility-evidence-contract.md
- [X] T002 [P] Create the initial accessibility evidence artifact with the required matrix and routes in specs/006-theme-contrast-modes/accessibility-evidence.md
- [X] T003 [P] Update the test setup default root attributes from the legacy `default` theme to light normal mode in tests/unit/setup.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Establish shared preference, token, and test utilities that all user stories rely on.

**CRITICAL**: No user story work can begin until this phase is complete.

- [X] T004 Extend visual theme types for `BaseTheme`, `HighContrastPreference`, `ThemeCombination`, labels, storage keys, and token pair metadata in src/accessibility/theme.ts
- [X] T005 Update the `VisualTheme` content type to support light, dark, and high-contrast modifier descriptions in src/content/types.ts
- [X] T006 Refactor theme preference helper boundaries for read, resolve, apply, write, notify, and subscribe responsibilities without mount-effect synchronization in src/storage/theme-preference.ts
- [X] T007 Update the root layout pre-hydration script to apply `data-theme="light|dark"` and `data-contrast="normal|high"` before React hydration in src/app/layout.tsx
- [X] T008 [P] Add a reusable contrast-ratio test helper for semantic color pairs in tests/unit/accessibility/theme.test.ts
- [X] T009 [P] Add a Playwright helper for explicitly setting each visual combination before navigation in tests/integration/accessibility.spec.ts
- [X] T010 [P] Update accessibility help content terminology from a single high-contrast theme to light/dark plus high-contrast modifier in src/content/accessibility-help.ts

**Checkpoint**: The repo has a shared four-combination preference model, hydration-safe root attributes, and reusable test helpers.

---

## Phase 3: User Story 1 - Read Every Control In High Contrast (Priority: P1) MVP

**Goal**: High contrast on light and dark themes keeps text, buttons, icons, controls, focus rings, and states readable without white-on-white or black-on-black pairings.

**Independent Test**: Set light high contrast and dark high contrast explicitly, then inspect representative pages and interactive states. The story passes only when no visible control surface has unreadable foreground/background pairing.

### Tests for User Story 1

- [X] T011 [P] [US1] Add unit tests for semantic token contrast thresholds and no white-on-white or black-on-black pairs in tests/unit/accessibility/theme.test.ts
- [X] T012 [P] [US1] Add Playwright checks for high-contrast readability on `/`, `/tracks`, `/tracks/builder`, `/tracks/history?demoHistory=1`, `/tracks/programming-foundations/problem-solving-basics`, and `/accessibility` in tests/integration/accessibility.spec.ts
- [X] T013 [US1] Add Playwright checks for readable primary, secondary, disabled, selected/current, focus, and icon-only control states in tests/integration/accessibility.spec.ts

### Implementation for User Story 1

- [X] T014 [US1] Replace legacy `:root[data-theme="high-contrast"]` styles with four compact selector blocks and paired semantic CSS variables in src/app/globals.css
- [X] T015 [US1] Update button variants to use paired action, hover, neutral, selected, disabled, and focus tokens without the `.button-default` override in src/ui/components/button.tsx
- [X] T016 [US1] Update switch track and knob styles to remain readable for checked, unchecked, focus, and disabled states in src/ui/components/switch.tsx
- [X] T017 [US1] Update dropdown menu surfaces, focused items, checked/radio indicators, disabled items, and destructive items to use semantic token pairs in src/ui/components/dropdown-menu.tsx
- [X] T018 [US1] Update context menu surfaces, focused items, checked/radio indicators, disabled items, and destructive items to use semantic token pairs in src/ui/components/context-menu.tsx
- [X] T019 [US1] Update tab list and trigger styles to use neutral and selected control token pairs with non-color active cues in src/ui/components/tabs.tsx
- [X] T020 [US1] Update dialog panel, close button, descriptions, overlay, focus, and action styles to use semantic token pairs in src/ui/components/dialog.tsx
- [X] T021 [US1] Update page-level surfaces, hero actions, navigation, panels, item action buttons, status labels, student tabs, and hard-coded foreground/background values to consume paired tokens in src/app/globals.css
- [X] T022 [US1] Remove or replace any remaining theme-breaking generated token classes used by shared primitives after the semantic-token migration in src/ui/components/button.tsx, src/ui/components/dialog.tsx, src/ui/components/context-menu.tsx, src/ui/components/dropdown-menu.tsx, src/ui/components/switch.tsx, and src/ui/components/tabs.tsx

**Checkpoint**: User Story 1 is independently functional when visual combinations are set directly through root attributes or test helpers.

---

## Phase 4: User Story 2 - Combine Light Or Dark Theme With Contrast Preference (Priority: P2)

**Goal**: Students can choose light or dark base theme and independently enable or disable high contrast, with both preferences persisting across navigation and reloads.

**Independent Test**: Select light, light high contrast, dark, and dark high contrast; navigate and reload after each selection; verify root attributes and content remain stable.

### Tests for User Story 2

- [X] T023 [P] [US2] Add unit tests for stored base theme, stored high contrast, invalid stored values, legacy key fallback, and preference snapshot priority in tests/unit/accessibility/theme.test.ts
- [X] T024 [P] [US2] Add unit tests that changing high contrast preserves base theme and changing base theme preserves high contrast in tests/unit/accessibility/theme-control.test.ts
- [X] T025 [P] [US2] Add Playwright checks for all four visual combinations, reload persistence, route navigation persistence, and no page-context reset in tests/integration/accessibility.spec.ts

### Implementation for User Story 2

- [X] T026 [US2] Implement independent local-storage read/write behavior for base theme and high-contrast preference with legacy fallback in src/storage/theme-preference.ts
- [X] T027 [US2] Update the pre-hydration bootstrap constants and root fallback attributes for light normal default plus stored four-combination support in src/app/layout.tsx
- [X] T028 [US2] Replace the single high-contrast-only header control with a compact base theme control plus independent high-contrast switch in src/features/foundation/components/theme-toggle.tsx
- [X] T029 [US2] Update header layout styles so the visual preference controls fit on desktop and mobile without text overlap in src/app/globals.css
- [X] T030 [US2] Update supported visual-theme rendering in the accessibility view to describe light, dark, and high-contrast modifier support in src/features/foundation/views/accessibility-view.tsx

**Checkpoint**: User Story 2 is independently functional through visible controls and persisted preferences.

---

## Phase 5: User Story 3 - Operate Theme Controls With Keyboard And Assistive Technology (Priority: P3)

**Goal**: Keyboard and assistive-technology users can find, operate, and understand the base theme and high-contrast controls in every visual combination.

**Independent Test**: Starting from each visual combination, use only keyboard input to reach and operate the base theme control and high-contrast switch; verify visible focus and accessible names/states.

### Tests for User Story 3

- [X] T031 [P] [US3] Add Testing Library checks for base theme group label, Light/Dark option names and selected state, High contrast switch name and checked state in tests/unit/accessibility/theme-control.test.ts
- [X] T032 [P] [US3] Add Playwright keyboard checks for Tab order, radio operation, Space toggling, focus retention, and visible focus in tests/integration/accessibility.spec.ts
- [X] T033 [US3] Add axe regression checks for the visual preference controls in all four visual combinations in tests/integration/accessibility.spec.ts

### Implementation for User Story 3

- [X] T034 [US3] Ensure the base theme control uses labelled native radio semantics or equivalent accessible segmented control semantics in src/features/foundation/components/theme-toggle.tsx
- [X] T035 [US3] Ensure the high-contrast switch exposes a stable accessible name, on/off state, keyboard Space behavior, and focus retention in src/features/foundation/components/theme-toggle.tsx
- [X] T036 [US3] Add or adjust focus, current, selected, and disabled non-color cues for the visual preference controls in src/app/globals.css
- [X] T037 [US3] Update accessibility help copy to explain keyboard operation for the base theme control and high-contrast switch in src/content/accessibility-help.ts

**Checkpoint**: User Story 3 is independently functional for keyboard and assistive-technology review.

---

## Phase 6: User Story 4 - Review Accessibility Evidence For Presentation (Priority: P4)

**Goal**: The team has concise evidence that all four visual combinations and the original white-on-white defect were checked before presentation.

**Independent Test**: Review the evidence artifact and confirm it lists checked routes, surfaces, states, keyboard behavior, assistive labels, contrast results, and remaining issues or "none observed."

### Tests for User Story 4

- [X] T038 [P] [US4] Add or update a content-style unit test that validates the evidence artifact contains all four visual combinations and the white-on-white defect note in tests/unit/accessibility/theme.test.ts

### Implementation for User Story 4

- [X] T039 [US4] Fill the accessibility evidence matrix with checked routes, visual combinations, surfaces, commands, and keyboard/assistive-label notes in specs/006-theme-contrast-modes/accessibility-evidence.md
- [X] T040 [US4] Add before/after notes for the original high-contrast white-background/white-text defect and record remaining issues or "none observed" in specs/006-theme-contrast-modes/accessibility-evidence.md

**Checkpoint**: User Story 4 is independently complete when the evidence artifact satisfies the accessibility evidence contract.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Validate the full feature, remove drift, and keep artifacts aligned.

- [X] T041 [P] Update quickstart outcomes if implementation changes the exact verification wording in specs/006-theme-contrast-modes/quickstart.md
- [X] T042 [P] Review all modified implementation files for unrelated route, content, backend, authentication, AI, or redesign changes in src/accessibility/theme.ts, src/storage/theme-preference.ts, src/app/layout.tsx, src/app/globals.css, src/features/foundation/components/theme-toggle.tsx, src/features/foundation/views/accessibility-view.tsx, src/content/accessibility-help.ts, src/ui/components/button.tsx, src/ui/components/context-menu.tsx, src/ui/components/dialog.tsx, src/ui/components/dropdown-menu.tsx, src/ui/components/switch.tsx, and src/ui/components/tabs.tsx
- [X] T043 Run targeted unit tests for visual preference behavior in tests/unit/accessibility/theme.test.ts and tests/unit/accessibility/theme-control.test.ts
- [X] T044 Run targeted Playwright accessibility checks for the feature in tests/integration/accessibility.spec.ts
- [X] T045 Run full project verification with `pnpm test`, `pnpm lint`, `pnpm build`, and `pnpm test:e2e` using package.json and playwright.config.ts
- [X] T046 Validate constitution gates for scope, simplicity, static-first storage, keyboard accessibility, high-contrast behavior, assignment evidence, and independent tests in specs/006-theme-contrast-modes/tasks.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 Setup**: No dependencies.
- **Phase 2 Foundational**: Depends on Phase 1 and blocks all user-story work.
- **Phase 3 US1**: Depends on Phase 2. This is the MVP and fixes the reported high-contrast readability defect.
- **Phase 4 US2**: Depends on Phase 2 and can proceed independently of US1 for preference logic, but final visual validation benefits from US1 token fixes.
- **Phase 5 US3**: Depends on Phase 2 and the controls from US2.
- **Phase 6 US4**: Depends on completed evidence from the implemented stories being reviewed.
- **Phase 7 Polish**: Depends on all desired user stories.

### User Story Dependencies

- **US1 (P1)**: Can start after Phase 2. No dependency on other user stories if test helpers set root attributes directly.
- **US2 (P2)**: Can start after Phase 2. No dependency on US1 for storage/control behavior.
- **US3 (P3)**: Depends on US2 control implementation.
- **US4 (P4)**: Depends on US1, US2, and US3 review results for complete evidence.

### Within Each User Story

- Write story tests first and confirm they fail for the current behavior before implementation.
- Implement model/helper changes before component integration.
- Implement shared primitive token consumption before page-specific cleanup.
- Validate each story independently before moving to lower-priority stories.

## Parallel Opportunities

- T002 and T003 can run in parallel after T001.
- T008, T009, and T010 can run in parallel with T004-T007 after file ownership is coordinated.
- US1 test tasks T011 and T012 can run in parallel; T013 follows because it extends the same Playwright file as T012.
- US1 component update tasks T015-T020 can run in parallel after T014 if each task owns its listed component file.
- US2 test tasks T023-T025 can run in parallel.
- US3 test tasks T031 and T032 can run in parallel; T033 follows because it extends the same Playwright file as T032.
- Polish review tasks T041 and T042 can run in parallel.

## Parallel Example: User Story 1

```text
Task: "T011 [P] [US1] Add unit tests for semantic token contrast thresholds and no white-on-white or black-on-black pairs in tests/unit/accessibility/theme.test.ts"
Task: "T012 [P] [US1] Add Playwright checks for high-contrast readability on representative routes in tests/integration/accessibility.spec.ts"
```

## Parallel Example: User Story 2

```text
Task: "T023 [P] [US2] Add unit tests for stored base theme, stored high contrast, invalid stored values, legacy key fallback, and preference snapshot priority in tests/unit/accessibility/theme.test.ts"
Task: "T024 [P] [US2] Add unit tests that changing high contrast preserves base theme and changing base theme preserves high contrast in tests/unit/accessibility/theme-control.test.ts"
Task: "T025 [P] [US2] Add Playwright checks for all four visual combinations, reload persistence, route navigation persistence, and no page-context reset in tests/integration/accessibility.spec.ts"
```

## Parallel Example: User Story 3

```text
Task: "T031 [P] [US3] Add Testing Library checks for labels and selected/checked state in tests/unit/accessibility/theme-control.test.ts"
Task: "T032 [P] [US3] Add Playwright keyboard checks in tests/integration/accessibility.spec.ts"
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 setup.
2. Complete Phase 2 foundational preference/token scaffolding.
3. Complete Phase 3 US1 to fix readable high-contrast controls and the white-on-white defect.
4. Stop and validate US1 with targeted unit and Playwright checks.

### Incremental Delivery

1. Complete Setup and Foundational phases.
2. Deliver US1 to remove unreadable high-contrast controls.
3. Deliver US2 to expose four persistent visual combinations.
4. Deliver US3 to harden keyboard and assistive-technology operation.
5. Deliver US4 to complete class-facing accessibility evidence.
6. Run cross-cutting verification.

### Scope Guardrails

- Do not add backend storage, external services, new primary pages, authentication, real AI behavior, or unrelated redesign work.
- Preserve existing routes and learning content.
- Keep high contrast as an independent modifier for light and dark.
- Keep tests independent by explicitly setting root attributes and local-storage state per test.

## Notes

- [P] tasks use different files or can be safely coordinated without depending on incomplete implementation tasks.
- [US1], [US2], [US3], and [US4] labels map to the prioritized user stories in spec.md.
- Test tasks are included because the specification, plan, contracts, quickstart, and constitution require explicit accessibility, contrast, persistence, hydration, keyboard, and evidence validation.
