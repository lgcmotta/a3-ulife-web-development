# Tasks: Topic Navigation

**Input**: Design documents from `/specs/009-topic-navigation/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/learning-topic-actions-contract.md](./contracts/learning-topic-actions-contract.md), [quickstart.md](./quickstart.md)

**Tests**: Required by the specification, plan, constitution, and quickstart. Write the automated test tasks before the implementation tasks in each user story phase.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated independently after the shared setup and foundational work.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it touches different files and does not depend on incomplete tasks.
- **[Story]**: Maps a task to a user story from [spec.md](./spec.md).
- Every task includes exact file paths or commands.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Install the requested shadcn pagination primitive and prepare the local shared UI surface.

- [X] T001 Run `pnpm dlx shadcn@latest add pagination` from `/Users/motta/repos/lgcmotta/a3-uwdmg` to generate `src/ui/components/pagination.tsx`
- [X] T002 Inspect the generated `src/ui/components/pagination.tsx` and existing `src/ui/components/button.tsx` for local shadcn style consistency before editing
- [X] T003 Inspect the pre-existing user changes in `src/app/globals.css` before editing any `.learning-topic-actions` styles

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared primitives, translations, and route-state helpers that all user stories depend on.

**CRITICAL**: No user story work should begin until this phase is complete.

- [X] T004 Adapt `src/ui/components/pagination.tsx` so `PaginationLink` imports and renders Next.js `Link` and is typed with `React.ComponentProps<typeof Link>`
- [X] T005 Update `src/ui/components/pagination.tsx` so `PaginationPrevious` and `PaginationNext` accept translated `text` and accessible label props while keeping chevron icons
- [X] T006 Add translated previous/next and already-complete learning action keys in `src/i18n/messages/en/student-area.json`
- [X] T007 Add matching Portuguese previous/next and already-complete learning action keys in `src/i18n/messages/pt-BR/student-area.json`
- [X] T008 Add a read-only topic navigation state helper in `src/features/student-area/server/path-persistence.ts` that derives previous href, next href, and current completion state from a saved path without mutating saved data

**Checkpoint**: Shared pagination, translations, and navigation-state derivation are ready for user story implementation.

---

## Phase 3: User Story 1 - Move Between Neighboring Topics (Priority: P1) MVP

**Goal**: A student can move to the immediately previous or next topic from an ongoing learning topic page.

**Independent Test**: Open an ongoing path at a middle topic, activate previous from the top action group, then activate next from the bottom action group and confirm the expected topic pages open.

### Tests for User Story 1

- [X] T009 [P] [US1] Add unit tests for middle-topic previous and next hrefs in `tests/unit/features/student-area/path-persistence.test.ts`
- [X] T010 [P] [US1] Add Playwright coverage for previous-from-top and next-from-bottom navigation in `tests/integration/student-area-learning-flow.spec.ts`

### Implementation for User Story 1

- [X] T011 [US1] Pass derived `previousHref`, `nextHref`, and `isCurrentTopicCompleted` from `src/features/student-area/views/learning-section-view.tsx` into both `LearningTopicActions` placements
- [X] T012 [US1] Insert `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationPrevious`, and `PaginationNext` into `src/features/student-area/components/learning-topic-actions.tsx` before Return to Builder and Complete Topic
- [X] T013 [US1] Use `studentArea.learning` translations for Previous and Next visible text and accessible labels in `src/features/student-area/components/learning-topic-actions.tsx`

**Checkpoint**: User Story 1 is functional and testable as the MVP.

---

## Phase 4: User Story 2 - Preserve Completion State While Browsing (Priority: P1)

**Goal**: Previous/next browsing never marks topics complete or incomplete, and revisited completed topics show Complete Topic disabled.

**Independent Test**: Prepare an ongoing path with a completed topic and an uncompleted topic, navigate across both, and confirm completion state stays unchanged until Complete Topic is explicitly used.

### Tests for User Story 2

- [X] T014 [P] [US2] Add unit tests confirming derived navigation state reports `isCurrentTopicCompleted` without changing saved topic data in `tests/unit/features/student-area/path-persistence.test.ts`
- [X] T015 [P] [US2] Add Playwright coverage for revisiting a completed topic and seeing Complete Topic disabled in `tests/integration/student-area-learning-flow.spec.ts`

### Implementation for User Story 2

- [X] T016 [US2] Disable the existing Complete Topic button with a plain `disabled={isCurrentTopicCompleted}` prop in `src/features/student-area/components/learning-topic-actions.tsx`
- [X] T017 [US2] Add a translated disabled-state hint or accessible label for already-completed topics in `src/features/student-area/components/learning-topic-actions.tsx`

**Checkpoint**: User Story 2 is independently testable without changing completion persistence semantics.

---

## Phase 5: User Story 3 - Understand Navigation Boundaries (Priority: P2)

**Goal**: Students can clearly identify first-topic, middle-topic, last-topic, and single-topic navigation boundaries.

**Independent Test**: Open first, middle, last, and single-topic path positions and confirm previous/next availability matches the boundary rules in both action groups.

### Tests for User Story 3

- [X] T018 [P] [US3] Add unit tests for first-topic, last-topic, and single-topic navigation state in `tests/unit/features/student-area/path-persistence.test.ts`
- [X] T019 [P] [US3] Add Playwright coverage for disabled previous on first topic and disabled next on last topic in `tests/integration/student-area-learning-flow.spec.ts`

### Implementation for User Story 3

- [X] T020 [US3] Render unavailable previous and next controls as inert disabled controls in `src/features/student-area/components/learning-topic-actions.tsx`
- [X] T021 [US3] Ensure disabled previous and next controls expose disabled state programmatically in `src/ui/components/pagination.tsx`

**Checkpoint**: User Story 3 boundary states work independently once the helper and action component exist.

---

## Phase 6: User Story 4 - Use The Same Action Group At Top And Bottom (Priority: P2)

**Goal**: The top and bottom topic action groups contain the same previous, next, Return to Builder, and Complete Topic controls with matching labels, order, availability, and outcomes.

**Independent Test**: Compare top and bottom groups on representative topics and confirm matching controls have matching labels, accessible names, order, availability, and destinations.

### Tests for User Story 4

- [X] T022 [P] [US4] Update duplicated-action assertions for four matching controls in `tests/integration/student-area-learning-flow.spec.ts`
- [X] T023 [P] [US4] Add mobile no-horizontal-overflow checks for the four-control action group in `tests/integration/student-area-learning-flow.spec.ts`

### Implementation for User Story 4

- [X] T024 [US4] Update `.learning-topic-actions` and child styles in `src/app/globals.css` so four controls fit at top and bottom without overlap on mobile and desktop
- [X] T025 [US4] Preserve keyboard order previous, next, Return to Builder, Complete Topic in `src/features/student-area/components/learning-topic-actions.tsx`

**Checkpoint**: User Story 4 confirms the redundancy contract across both placements.

---

## Phase 7: User Story 5 - Keep Existing Learning Path Rules Unchanged (Priority: P2)

**Goal**: Completed history, builder editing, and return-to-path behavior keep their existing meanings while topic browsing is available only during ongoing learning.

**Independent Test**: Complete a path, edit an ongoing path, and leave then return to an ongoing path after browsing; confirm existing history, edit, and resume behavior remains unchanged.

### Tests for User Story 5

- [X] T026 [P] [US5] Add Playwright coverage that leaving after previous/next browsing and returning through history opens the last uncompleted topic in `tests/integration/student-area-learning-flow.spec.ts`
- [X] T027 [P] [US5] Add or preserve regression assertions for completed paths hiding Resume Learning and Edit Path in `tests/integration/student-area-learning-flow.spec.ts`

### Implementation for User Story 5

- [X] T028 [US5] Keep `getLearningDestination` unchanged and verify the new navigation helper remains separate in `src/features/student-area/server/path-persistence.ts`
- [X] T029 [US5] Verify no builder edit or history action changes are introduced while wiring navigation props in `src/features/student-area/views/learning-section-view.tsx`

**Checkpoint**: User Story 5 verifies existing learning path rules remain intact.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Final validation, evidence, and cleanup across all stories.

- [X] T030 [P] Add implementation evidence and command results in `specs/009-topic-navigation/implementation-evidence.md`
- [X] T031 Run `pnpm lint` from `/Users/motta/repos/lgcmotta/a3-uwdmg` and record the result in `specs/009-topic-navigation/implementation-evidence.md`
- [X] T032 Run `pnpm test` from `/Users/motta/repos/lgcmotta/a3-uwdmg` and record the result in `specs/009-topic-navigation/implementation-evidence.md`
- [X] T033 Run `pnpm test:e2e -- tests/integration/student-area-learning-flow.spec.ts` from `/Users/motta/repos/lgcmotta/a3-uwdmg` with Redis available and record the result in `specs/009-topic-navigation/implementation-evidence.md`
- [X] T034 Validate default and high-contrast visual readability for top and bottom action groups and record notes in `specs/009-topic-navigation/implementation-evidence.md`
- [X] T035 Review `src/features/student-area/components/learning-topic-actions.tsx`, `src/features/student-area/server/path-persistence.ts`, and `src/app/globals.css` for responsibility-boundary and single-flow compliance

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies. Start with the shadcn install command.
- **Foundational (Phase 2)**: Depends on Setup. Blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on Foundational. Suggested MVP.
- **User Story 2 (Phase 4)**: Depends on Foundational and can be implemented after or alongside US1 once shared props exist.
- **User Story 3 (Phase 5)**: Depends on Foundational and can be implemented after the helper is available.
- **User Story 4 (Phase 6)**: Depends on US1 because both placements must already render navigation controls.
- **User Story 5 (Phase 7)**: Depends on US1 because browsing must exist before resume-preservation can be verified.
- **Polish (Phase 8)**: Depends on all desired user stories.

### User Story Dependencies

- **US1 Move Between Neighboring Topics**: MVP and first deliverable.
- **US2 Preserve Completion State While Browsing**: Can proceed after navigation state includes current completion status.
- **US3 Understand Navigation Boundaries**: Can proceed after the navigation helper and disabled pagination controls exist.
- **US4 Use The Same Action Group At Top And Bottom**: Builds on US1 rendering in both placements.
- **US5 Keep Existing Learning Path Rules Unchanged**: Regression layer after browsing behavior exists.

### Within Each User Story

- Write tests before implementation tasks in that phase.
- Keep tests independent, order-independent, and parallel-safe.
- Implement read-only neighbor derivation before passing props into UI.
- Keep UI rendering separate from progress mutation.
- Complete a story checkpoint before moving to the next priority story.

### Parallel Opportunities

- T002 and T003 can run after T001 if different people inspect different files.
- T006 and T007 can run in parallel with T004 and T005 after T001.
- Unit test tasks and Playwright test tasks in the same story can run in parallel because they touch different files.
- US2 and US3 can proceed in parallel after Foundational when the shared helper contract is agreed.
- T030 and manual evidence writing can start while final validation commands are running, then be completed with command results.

---

## Parallel Example: User Story 1

```bash
# Unit and integration tests can be drafted in parallel:
Task: "T009 [P] [US1] Add unit tests for middle-topic previous and next hrefs in tests/unit/features/student-area/path-persistence.test.ts"
Task: "T010 [P] [US1] Add Playwright coverage for previous-from-top and next-from-bottom navigation in tests/integration/student-area-learning-flow.spec.ts"
```

---

## Parallel Example: User Story 2

```bash
# Completion-state unit and browser coverage can be drafted in parallel:
Task: "T014 [P] [US2] Add unit tests confirming derived navigation state reports isCurrentTopicCompleted without changing saved topic data in tests/unit/features/student-area/path-persistence.test.ts"
Task: "T015 [P] [US2] Add Playwright coverage for revisiting a completed topic and seeing Complete Topic disabled in tests/integration/student-area-learning-flow.spec.ts"
```

---

## Parallel Example: User Story 3

```bash
# Boundary unit and browser coverage can be drafted in parallel:
Task: "T018 [P] [US3] Add unit tests for first-topic, last-topic, and single-topic navigation state in tests/unit/features/student-area/path-persistence.test.ts"
Task: "T019 [P] [US3] Add Playwright coverage for disabled previous on first topic and disabled next on last topic in tests/integration/student-area-learning-flow.spec.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and run `pnpm dlx shadcn@latest add pagination`.
2. Complete Phase 2 to adapt pagination, add translations, and add read-only navigation-state derivation.
3. Complete Phase 3 so middle-topic previous/next browsing works from the repeated action group.
4. Stop and validate US1 independently with the unit and Playwright checks.

### Incremental Delivery

1. Add US1 for basic previous/next browsing.
2. Add US2 so completed-topic revisits disable Complete Topic without progress side effects.
3. Add US3 for first, last, and single-topic disabled boundaries.
4. Add US4 for top/bottom action group parity and responsive fit.
5. Add US5 for preservation of history, edit, and resume rules.
6. Run polish validation and record evidence.

### Validation Commands

```bash
pnpm lint
pnpm test
pnpm test:e2e -- tests/integration/student-area-learning-flow.spec.ts
```

## Notes

- Tests that use persisted data must seed or create their own saved path state.
- Do not rely on exact generated path IDs in Playwright assertions.
- Do not use global Redis cleanup as the proof of isolation.
- Previous/next browsing is read-only. Only the existing Complete Topic action may update progress.
- Keep `src/app/globals.css` edits narrowly scoped because it already had pre-existing user changes before this task list was created.
