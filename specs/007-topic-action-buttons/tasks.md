# Tasks: Topic Action Buttons

**Input**: Design documents from `/specs/007-topic-action-buttons/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/learning-topic-actions-contract.md](./contracts/learning-topic-actions-contract.md), [quickstart.md](./quickstart.md)

**Tests**: Required by the implementation plan and constitution. Integration tests must remain independently runnable, order-independent, and safe to run in parallel through the existing student-area Playwright fixture.

**Organization**: Tasks are grouped by user story so the top action group can ship as the MVP, then bottom redundancy, then consistency/accessibility hardening.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it touches different files or only reads existing context
- **[Story]**: Maps to the user story from [spec.md](./spec.md)
- Every task includes exact file paths

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Establish implementation evidence and preserve the current behavior contract before edits begin.

- [X] T001 Create `specs/007-topic-action-buttons/implementation-evidence.md` with sections for existing action behavior, mobile/desktop screenshots or notes, keyboard review, high-contrast review, and command results.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Confirm the existing action boundaries that all user stories must preserve.

**CRITICAL**: No user story work can begin until this phase is complete.

- [X] T002 Document the current `Return to Builder` href from `src/features/student-area/views/learning-section-view.tsx` and current `completeTopicAction.bind(null, studentId, path.pathId, topicSlug)` binding from `src/features/student-area/views/learning-section-view.tsx` in `specs/007-topic-action-buttons/implementation-evidence.md`.
- [X] T003 Document that `src/features/student-area/actions/complete-topic-action.ts` must remain behaviorally unchanged for this feature in `specs/007-topic-action-buttons/implementation-evidence.md`.

**Checkpoint**: Existing return and completion behavior is recorded and must be preserved.

---

## Phase 3: User Story 1 - See paired topic actions before reading (Priority: P1) MVP

**Goal**: A student opening a topic sees "Return to Builder" and "Complete Topic" side by side as one action group before the topic title or reading content on mobile and desktop.

**Independent Test**: Open a saved-path topic at mobile and desktop widths, verify the top "Topic actions" group contains both controls side by side, and verify keyboard focus reaches the return link before the complete button.

### Tests for User Story 1

- [X] T004 [P] [US1] Add failing Playwright assertions for the top "Topic actions" group visibility, return link, complete button, side-by-side layout, and keyboard focus order in `tests/integration/student-area-learning-flow.spec.ts`.

### Implementation for User Story 1

- [X] T005 [US1] Create `LearningTopicActions` with `studentId`, `pathId`, `topicSlug`, and `placement` props, distinct group labels, the existing builder edit link, and the existing complete-topic form in `src/features/student-area/components/learning-topic-actions.tsx`.
- [X] T006 [US1] Update `LearningSectionView` to import `LearningTopicActions`, render `placement="start"` before the topic header, and remove the standalone top return link and standalone top completion form in `src/features/student-area/views/learning-section-view.tsx`.
- [X] T007 [US1] Add `.learning-topic-actions` styles for side-by-side layout, readable secondary return link styling, primary completion styling, focus visibility, and mobile no-overflow behavior in `src/app/globals.css`.
- [X] T008 [US1] Record top-placement mobile and desktop review results in `specs/007-topic-action-buttons/implementation-evidence.md`.

**Checkpoint**: User Story 1 is functional and independently testable as the MVP.

---

## Phase 4: User Story 2 - Finish reading without backtracking (Priority: P1)

**Goal**: A student who reaches the end of a topic can return to the builder or complete the topic from a matching side-by-side action group after the final learning content.

**Independent Test**: Scroll to the end of a saved-path topic at mobile and desktop widths, verify the bottom "End of topic actions" group appears after the markdown content, and complete a topic from the bottom group with the same redirect/progress outcome as the top button.

### Tests for User Story 2

- [X] T009 [US2] Add failing Playwright coverage for the bottom "End of topic actions" group after final markdown content and bottom-group completion behavior in `tests/integration/student-area-learning-flow.spec.ts`.
- [X] T010 [P] [US2] Scope existing complete-topic clicks and visibility checks to the top action group in `tests/integration/student-area-builder-persistence.spec.ts` so duplicate buttons do not create ambiguous selectors.
- [X] T011 [P] [US2] Scope existing complete-topic clicks to the top action group in `tests/integration/student-area-history.spec.ts` so duplicate buttons do not create ambiguous selectors.
- [X] T012 [US2] Scope existing complete-topic progression clicks in `tests/integration/student-area-learning-flow.spec.ts` to the top action group except for the bottom-action scenario added for this story.

### Implementation for User Story 2

- [X] T013 [US2] Render `LearningTopicActions placement="end"` immediately after `LearningSectionContent` in `src/features/student-area/views/learning-section-view.tsx`.
- [X] T014 [US2] Add end-placement spacing and keep the bottom action group side by side without horizontal overflow in `src/app/globals.css`.
- [X] T015 [US2] Record bottom-placement mobile and desktop review results in `specs/007-topic-action-buttons/implementation-evidence.md`.

**Checkpoint**: User Stories 1 and 2 both work independently and together.

---

## Phase 5: User Story 3 - Use duplicated actions without confusion (Priority: P2)

**Goal**: Top and bottom action groups have matching visible labels, equivalent destinations/outcomes, consistent availability, and clear accessible context.

**Independent Test**: Compare the top and bottom action groups on a saved-path topic before and after a completion action; verify matching visible labels, matching return href pattern, distinct group labels, readable focus states, and no mismatch in completion behavior.

### Tests for User Story 3

- [X] T016 [US3] Add Playwright assertions comparing top and bottom group labels, return hrefs, complete button labels, distinct group names, and focus behavior in `tests/integration/student-area-learning-flow.spec.ts`.

### Implementation for User Story 3

- [X] T017 [US3] Normalize shared visible labels, group-label mapping, classes, and form/link structure for both placements in `src/features/student-area/components/learning-topic-actions.tsx`.
- [X] T018 [US3] Harden focus, hover, wrapping, and high-contrast readability rules for both action placements in `src/app/globals.css`.
- [X] T019 [US3] Record duplicated-action consistency, keyboard, and high-contrast review results in `specs/007-topic-action-buttons/implementation-evidence.md`.

**Checkpoint**: All user stories are implemented and independently verifiable.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate the full feature, remove ambiguity, and keep assignment evidence current.

- [X] T020 [P] Run `pnpm lint` and record the result in `specs/007-topic-action-buttons/implementation-evidence.md`.
- [X] T021 [P] Run `pnpm test` and record the result in `specs/007-topic-action-buttons/implementation-evidence.md`.
- [X] T022 Run `pnpm test:e2e -- tests/integration/student-area-learning-flow.spec.ts` with Redis available and record the result in `specs/007-topic-action-buttons/implementation-evidence.md`.
- [X] T023 Search for remaining ambiguous broad "Complete Topic" integration selectors and resolve any remaining cases in `tests/integration/student-area-learning-flow.spec.ts`, `tests/integration/student-area-builder-persistence.spec.ts`, and `tests/integration/student-area-history.spec.ts`.
- [X] T024 Validate the final diff preserves `src/features/student-area/actions/complete-topic-action.ts` behavior and does not introduce storage or progress changes, then record the boundary check in `specs/007-topic-action-buttons/implementation-evidence.md`.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies
- **Foundational (Phase 2)**: Depends on Phase 1 and blocks all user-story work
- **US1 (Phase 3)**: Depends on Phase 2 and is the MVP
- **US2 (Phase 4)**: Depends on US1 because the bottom placement reuses the action component created for the top placement
- **US3 (Phase 5)**: Depends on US1 and US2 because it compares both placements
- **Polish (Phase 6)**: Depends on all desired user stories being complete

### User Story Dependencies

- **US1 - See paired topic actions before reading**: Starts after Foundation; no dependency on other stories
- **US2 - Finish reading without backtracking**: Starts after US1 component exists; independently testable through bottom-group navigation and completion
- **US3 - Use duplicated actions without confusion**: Starts after both placements exist; independently testable through comparison assertions

### Within Each User Story

- Write or update the story's Playwright coverage first and confirm it fails for the missing behavior when practical
- Implement the minimum code for the story
- Run the story-specific Playwright spec before moving to the next story when Redis is available
- Keep tests isolated through the existing `tests/e2e-support/student-area-test.ts` fixture

---

## Parallel Opportunities

- T004 can run in parallel with T005-T007 only if following a non-TDD workflow; otherwise write T004 first.
- T010 and T011 can run in parallel because they touch different integration specs.
- T020 and T021 can run in parallel after implementation is complete.
- US1 implementation files are separate enough for one person to work on `learning-topic-actions.tsx` while another prepares `globals.css`, after T004 is defined.

## Parallel Example: User Story 2

```bash
Task: "Scope existing complete-topic clicks and visibility checks to the top action group in tests/integration/student-area-builder-persistence.spec.ts"
Task: "Scope existing complete-topic clicks to the top action group in tests/integration/student-area-history.spec.ts"
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Complete US1 tasks T004-T008.
3. Validate that the top topic actions are side by side on mobile and desktop.
4. Stop and review before adding the bottom duplicate controls.

### Incremental Delivery

1. Add US1 top action group and validate independently.
2. Add US2 bottom action group and duplicate-safe test selectors.
3. Add US3 consistency/accessibility checks across both placements.
4. Run the full validation commands from [quickstart.md](./quickstart.md).

### Single-Developer Order

1. T001-T003
2. T004-T008
3. T009-T015
4. T016-T019
5. T020-T024

## Notes

- Do not change the behavior of `src/features/student-area/actions/complete-topic-action.ts`.
- Do not add new topic actions, storage writes, hidden progress updates, sticky controls, or new learning content.
- Repeated visible labels are intentional; distinguish the repeated groups through accessible group labels and scoped tests.
