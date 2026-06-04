# Tasks: Learning Path CRUD State Correction

**Input**: Design documents from `/specs/005-fix-path-builder-crud/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: Required by user request. Add or update tests before implementation so the refactor can proceed from a pinned behavior baseline.

**Organization**: Tasks are grouped by setup, foundational refactor prerequisites, and then by user story in priority order. Each user story remains independently testable after the foundational phase.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it touches different files and does not depend on incomplete tasks.
- **[Story]**: User story label from [spec.md](./spec.md), used only in user story phases.
- Every task includes exact repository file paths.

## Phase 1: Setup

**Purpose**: Prepare fixtures and isolate the current state surfaces before behavior changes.

- [X] T001 Inventory persisted builder draft, active-path-only, recovery, cleanup, delete, Complete, and Reset call sites in `src/features/student-area/actions/student-path-actions.ts`, `src/features/student-area/server/builder-selection.ts`, `src/server/student-area/repository.ts`, `src/features/student-area/views/student-history-view.tsx`, and `src/features/student-area/components/path-item-context-menu.tsx`
- [X] T002 [P] Add multi-path saved-progress fixture helpers for retained, added, and removed topic cases in `tests/unit/fixtures/student-area.ts`
- [X] T003 [P] Extend Redis test cleanup helpers for saved-path-by-ID keys without adding app-facing delete behavior in `tests/e2e-support/redis-test-utils.ts`

---

## Phase 2: Foundational Tests And Refactor Primitives

**Purpose**: Pin expected behavior with tests first, then create the shared pure state and storage boundaries required by every user story.

**Critical**: Complete this phase before implementing user stories. The tests in this phase are expected to fail before the refactor.

### Tests First

- [X] T004 [P] Add unit tests for create-mode initial state, track selection, topic selection, full parent selected state, partial parent state, local dirty state, local discard, and local clear in `tests/unit/features/student-area/builder-selection.test.ts`
- [X] T005 [P] Add unit tests for track reorder, topic reorder inside the parent track, and blocked cross-track topic movement in `tests/unit/features/student-area/path-organization.test.ts`
- [X] T006 [P] Add unit tests for save-create, save-edit overwrite, no duplicate history row, retained-topic progress preservation, newly added topics initialized not completed, and removed-topic progress removal in `tests/unit/features/student-area/path-persistence.test.ts`
- [X] T007 [P] Add unit tests proving repository load methods do not save, delete, recover, repair, migrate, clean up, or mutate data in `tests/unit/server/student-area/repository.test.ts`
- [X] T008 [P] Add unit tests for history Resume/Edit visibility, completed-row action hiding, saved-path-ID destinations, and no delete action in `tests/unit/features/student-area/history-presenter.test.ts`
- [X] T009 [P] Add Playwright coverage for create mode, whole-track selection, individual topic selection, parent full/partial state, and reorder constraints in `tests/integration/student-area-builder-selection.spec.ts`
- [X] T010 [P] Add Playwright coverage for composition-only menus with Remove, Move up, Move down, and no Complete, Reset, or Delete in `tests/integration/student-area-builder-organization.spec.ts`
- [X] T011 [P] Add Playwright coverage for save new path, Start Learning from created path ID, edit from saved path ID, discard in create/edit, clear-without-save, clear-then-save overwrite, and no duplicate history row in `tests/integration/student-area-builder-persistence.spec.ts`
- [X] T012 [P] Add Playwright coverage for Resume/Edit visibility, completed rows with no Resume/Edit, no delete action, and saved path ID navigation in `tests/integration/student-area-history.spec.ts`
- [X] T013 [P] Add Playwright coverage for completing topics through the learning flow and updating only the saved path ID from the route in `tests/integration/student-area-learning-flow.spec.ts`

### Shared Refactor Primitives

- [X] T014 Update student-area types to introduce local builder composition state, saved path ID references, and composition-only `PathContextAction` values in `src/server/student-area/types.ts`
- [X] T015 Refactor pure selection helpers for create/edit initial state, track/topic toggles, parent full/partial state, dirty comparison, local discard, and local clear in `src/features/student-area/server/builder-selection.ts`
- [X] T016 Refactor pure reorder helpers so track moves reorder track groups and topic moves stay inside the parent track in `src/features/student-area/server/path-reorder.ts`
- [X] T017 Refactor validation helpers to reject empty saves, empty track groups, unknown catalog topics, and cross-track topic placement in `src/server/student-area/path-validation.ts`
- [X] T018 Refactor Redis key helpers for saved path records by ID and remove app-facing persisted-draft and active-path-only key assumptions in `src/server/student-area/keys.ts`
- [X] T019 Refactor repository interface and implementations to expose idempotent load/save methods for students, saved paths by ID, history, feedback, and ID allocation only in `src/server/student-area/repository.ts`
- [X] T020 Remove repository load-time JSON deletion, split-data recovery, cleanup, and learning-path delete behavior from normal app storage code in `src/server/student-area/repository.ts`
- [X] T021 Update student record helpers to keep anonymous-student creation separate from saved path storage mutation in `src/server/student-area/student-record.ts`

**Checkpoint**: Unit and Playwright tests exist for the intended behavior, and shared pure/storage primitives are ready for user story implementation.

---

## Phase 3: User Story 1 - Create A Learning Path From Builder State (Priority: P1) MVP

**Goal**: A student opens an empty create-mode builder, composes a path locally, saves explicitly, and starts learning from the created saved path ID.

**Independent Test**: Open `/tracks/builder`, verify empty state, select track/topic combinations, reorder selected items, save, and confirm Start Learning uses the created path ID.

### Implementation for User Story 1

- [X] T022 [US1] Update create-mode initial builder loading to return an empty clean composition without saving a draft in `src/features/student-area/server/builder-selection.ts`
- [X] T023 [US1] Update `StudentBuilderView` to pass create/edit initial state and no persisted draft assumptions to the client in `src/features/student-area/views/student-builder-view.tsx`
- [X] T024 [US1] Move track selection, track deselection, topic selection, topic deselection, item remove, track reorder, topic reorder, local clear, and local discard state transitions into client state in `src/features/student-area/components/student-builder-client.tsx`
- [X] T025 [US1] Update track/topic tree controls to call local client handlers and expose selected/partial state from local composition in `src/features/student-area/components/track-topic-tree.tsx`
- [X] T026 [US1] Update current path rendering to consume local composition and keep selected topics grouped by parent track in `src/features/student-area/components/current-path-panel.tsx`
- [X] T027 [US1] Update builder action bar disabled states so Save requires topics plus unsaved changes and Start Learning requires a saved path ID with no unsaved changes in `src/features/student-area/components/builder-action-bar.tsx`
- [X] T028 [US1] Replace draft-save behavior with a save action that accepts the local composition payload and creates a new saved path plus history entry in `src/features/student-area/actions/student-path-actions.ts`
- [X] T029 [US1] Implement create-mode saved path creation, new history entry creation, and learning destination return values in `src/features/student-area/server/path-persistence.ts`
- [X] T030 [US1] Update Start Learning from the builder to use the saved path ID returned by Save instead of loading a global active path in `src/features/student-area/components/student-builder-client.tsx`

**Checkpoint**: User Story 1 is independently functional and covered by create/select/reorder/save/start tests.

---

## Phase 4: User Story 2 - Edit A Saved Learning Path Without Accidental Persistence (Priority: P2)

**Goal**: A student edits an unfinished saved path by ID, keeps all unsaved changes local, discards or clears locally, and Save overwrites the same path ID.

**Independent Test**: Create a saved path, open Edit Path from history, make unsaved changes, verify saved data remains unchanged until Save, discard to saved state, clear without save, and clear then save over the same path ID.

### Implementation for User Story 2

- [X] T031 [US2] Implement edit-mode initial loading by saved path ID without saving or updating storage in `src/features/student-area/server/builder-selection.ts`
- [X] T032 [US2] Update builder route handling to pass `edit` path IDs to the initial-state loader without inferring edit mode from stored drafts in `src/app/tracks/builder/page.tsx`
- [X] T033 [US2] Update client discard behavior so create mode resets to empty initial state and edit mode resets to the initial saved-path composition in `src/features/student-area/components/student-builder-client.tsx`
- [X] T034 [US2] Update client Clear Learning Path behavior so it clears only local builder composition and never calls a storage delete or clear action in `src/features/student-area/components/student-builder-client.tsx`
- [X] T035 [US2] Update Clear Learning Path dialog copy to state that only builder UI is cleared and saved data remains unchanged until Save in `src/features/student-area/components/builder-confirmation-dialogs.tsx`
- [X] T036 [US2] Remove server actions for toggle track, toggle topic, item menu mutation, discard, and clear from `src/features/student-area/actions/student-path-actions.ts`
- [X] T037 [US2] Implement edit-save overwrite by existing path ID with completed-path rejection in `src/features/student-area/actions/student-path-actions.ts`
- [X] T038 [US2] Implement edit-save progress merge that preserves retained topic progress, initializes newly added topics as not completed, and drops progress only for removed topics in `src/features/student-area/server/path-persistence.ts`
- [X] T039 [US2] Update history upsert behavior so edited saves update the matching history row and never add a duplicate row in `src/features/student-area/server/path-persistence.ts`
- [X] T040 [US2] Update builder save success handling so the current composition becomes the new clean initial state after Save in `src/features/student-area/components/student-builder-client.tsx`

**Checkpoint**: User Stories 1 and 2 both work independently, with create and edit paths using explicit Save as the only composition write.

---

## Phase 5: User Story 3 - Read And Resume Saved Paths From History (Priority: P3)

**Goal**: History lists saved paths, offers Resume/Edit for unfinished paths, hides actions for completed paths, and navigation uses saved path IDs.

**Independent Test**: Create saved paths with different progress states, open history, resume an unfinished path, edit an unfinished path, and confirm completed paths show no Resume/Edit.

### Implementation for User Story 3

- [X] T041 [US3] Refactor history presenter rows to derive Resume Learning and Edit Path destinations from saved path IDs and hide both actions for completed paths in `src/features/student-area/server/history-presenter.ts`
- [X] T042 [US3] Update history loading to read history and saved path records without recovery or active-path-only assumptions in `src/features/student-area/views/student-history-view.tsx`
- [X] T043 [US3] Update history table rendering to show no Resume/Edit/Delete actions for completed rows and no Delete action for any row in `src/features/student-area/components/learning-path-history-table.tsx`
- [X] T044 [US3] Update learning navigation action to resolve destinations by supplied saved path ID rather than a global active path in `src/features/student-area/actions/learning-navigation-actions.ts`
- [X] T045 [US3] Update learning route loading to fetch the saved path matching the route `pathId` in `src/app/tracks/learn/[pathId]/[topicSlug]/page.tsx`
- [X] T046 [US3] Update learning completion route loading to use saved path ID state without active-path-only assumptions in `src/app/tracks/learn/[pathId]/complete/page.tsx`
- [X] T047 [US3] Update learning section return/edit links so route and feedback stay tied to the saved path ID in `src/features/student-area/views/learning-section-view.tsx`

**Checkpoint**: User Story 3 is independently functional through history read, Resume Learning, Edit Path, completed-row action hiding, and saved path ID navigation.

---

## Phase 6: User Story 4 - Keep Learning Progress Separate From Builder Composition (Priority: P4)

**Goal**: Builder item menus only manage composition, while topic completion stays in the learning flow and updates saved progress/history.

**Independent Test**: Open builder menus and confirm only Remove, Move up, Move down are present; complete topics in learning flow and confirm history status updates without builder completion/reset actions.

### Implementation for User Story 4

- [X] T048 [US4] Remove Complete and Reset menu items so builder item menus render only Remove, Move up, and Move down in `src/features/student-area/components/path-item-context-menu.tsx`
- [X] T049 [US4] Remove completion status editing from builder current path item UI while preserving composition actions in `src/features/student-area/components/current-path-panel.tsx`
- [X] T050 [US4] Remove builder imports and call paths for `completePathItem` and `resetPathItem` from `src/features/student-area/actions/student-path-actions.ts`
- [X] T051 [US4] Keep topic completion logic scoped to saved paths in the learning flow in `src/features/student-area/server/path-progress.ts`
- [X] T052 [US4] Update Complete Topic action to load, update, save, and redirect using only the route saved path ID in `src/features/student-area/actions/complete-topic-action.ts`
- [X] T053 [US4] Update learning section UI so Complete Topic remains available in the learning flow and no progress reset control is introduced in `src/features/student-area/views/learning-section-view.tsx`

**Checkpoint**: User Story 4 is independently functional, with builder composition and learning progress separated.

---

## Phase 7: User Story 5 - Preserve A Simple Persistence Boundary (Priority: P5)

**Goal**: Normal storage, history, builder, and action flows are idempotent load/save boundaries with no hidden mutation, recovery, cleanup, or delete behavior.

**Independent Test**: Load history and builder states with saved paths, clear/discard locally, save valid edits, and confirm no hidden deletion, migration, recovery, cleanup, or duplicate path behavior occurs.

### Implementation for User Story 5

- [X] T054 [US5] Remove all `recoverSplitLearningData` calls from normal history and builder flows in `src/features/student-area/views/student-history-view.tsx` and `src/features/student-area/actions/student-path-actions.ts`
- [X] T055 [US5] Remove app-facing persisted draft load/save/delete usage from builder load, save, discard, clear, and navigation flows in `src/features/student-area/server/builder-selection.ts` and `src/features/student-area/actions/learning-navigation-actions.ts`
- [X] T056 [US5] Remove app-facing active-path-only load/save/delete usage in favor of saved path by ID methods in `src/features/student-area/actions/complete-topic-action.ts`, `src/app/tracks/learn/[pathId]/[topicSlug]/page.tsx`, and `src/features/student-area/views/student-history-view.tsx`
- [X] T057 [US5] Remove app-facing clear/delete learning path methods from the repository type and memory store implementation in `src/server/student-area/repository.ts`
- [X] T058 [US5] Ensure corrupt or unavailable saved data returns a recoverable load result without deleting keys during load in `src/server/student-area/repository.ts`
- [X] T059 [US5] Update server action error handling so load/save failures show friendly feedback without performing cleanup or deletion in `src/features/student-area/actions/student-path-actions.ts`
- [X] T060 [US5] Update route and component imports after repository boundary changes in `src/app/tracks/history/page.tsx`, `src/app/tracks/builder/page.tsx`, and `src/features/student-area/views/student-builder-view.tsx`

**Checkpoint**: User Story 5 is independently functional, and normal app flows expose no delete, hidden recovery, cleanup, or load-time mutation behavior.

---

## Phase 8: Polish And Cross-Cutting Verification

**Purpose**: Confirm all stories work together and keep documentation aligned with the implemented refactor.

- [X] T061 [P] Update implementation notes and progress-preservation wording if implementation changes terminology in `specs/005-fix-path-builder-crud/quickstart.md`
- [X] T062 [P] Update student-area contract notes if final action names differ from the plan in `specs/005-fix-path-builder-crud/contracts/student-state-actions.md`
- [X] T063 Run focused unit verification commands from quickstart and record any failures in `specs/005-fix-path-builder-crud/quickstart.md`
- [X] T064 Run focused Playwright verification commands from quickstart with Redis available and record any failures in `specs/005-fix-path-builder-crud/quickstart.md`
- [X] T065 Run full verification `pnpm test`, `pnpm lint`, `pnpm build`, and `pnpm test:e2e`, then record the final result in `specs/005-fix-path-builder-crud/quickstart.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational Tests And Refactor Primitives (Phase 2)**: Depends on Setup. Blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on Phase 2. Delivers MVP create/save/start flow.
- **User Story 2 (Phase 4)**: Depends on Phase 2 and integrates with US1 save behavior.
- **User Story 3 (Phase 5)**: Depends on Phase 2 and saved path by ID behavior from US1/US2.
- **User Story 4 (Phase 6)**: Depends on Phase 2 and can be implemented after or alongside US3 once saved path progress behavior is available.
- **User Story 5 (Phase 7)**: Depends on Phase 2 and must be validated after US1-US4 remove old call paths.
- **Polish (Phase 8)**: Depends on selected user stories being complete.

### User Story Dependencies

- **US1 (P1)**: MVP; should complete first after foundational work.
- **US2 (P2)**: Depends on save/path primitives from US1 but can be tested independently through edit mode.
- **US3 (P3)**: Depends on saved path by ID records from US1/US2.
- **US4 (P4)**: Depends on saved path progress logic; can proceed in parallel with US3 after T038 and T052 are coordinated.
- **US5 (P5)**: Cross-checks storage boundary cleanup after old action paths are removed.

### Safe Refactor Sequence

1. Pin intended behavior with T004-T013 tests.
2. Refactor pure builder composition state with T014-T017 and T022-T027.
3. Simplify repository/storage boundaries with T018-T021 and T054-T058.
4. Update save, history, and learning actions with T028-T047.
5. Update builder menus and copy with T035 and T048-T053.
6. Run full verification with T063-T065.

---

## Parallel Opportunities

- T002 and T003 can run in parallel after T001.
- T004-T013 can run in parallel because they target separate unit/integration files.
- T014-T017 can run in parallel with T018-T021 only after test expectations are agreed, but merge carefully around shared types.
- After Phase 2, UI-focused tasks T024-T027 can run in parallel with save-service tasks T028-T029.
- US3 presenter/table tasks T041-T043 can run in parallel with learning route/action tasks T044-T047 after saved path repository methods exist.
- Polish documentation tasks T061-T062 can run in parallel before verification commands T063-T065.

---

## Parallel Example: User Story 1

```text
Task: "T024 [US1] Move track selection, track deselection, topic selection, topic deselection, item remove, track reorder, topic reorder, local clear, and local discard state transitions into client state in src/features/student-area/components/student-builder-client.tsx"
Task: "T028 [US1] Replace draft-save behavior with a save action that accepts the local composition payload and creates a new saved path plus history entry in src/features/student-area/actions/student-path-actions.ts"
Task: "T029 [US1] Implement create-mode saved path creation, new history entry creation, and learning destination return values in src/features/student-area/server/path-persistence.ts"
```

## Parallel Example: User Story 2

```text
Task: "T033 [US2] Update client discard behavior so create mode resets to empty initial state and edit mode resets to the initial saved-path composition in src/features/student-area/components/student-builder-client.tsx"
Task: "T035 [US2] Update Clear Learning Path dialog copy to state that only builder UI is cleared and saved data remains unchanged until Save in src/features/student-area/components/builder-confirmation-dialogs.tsx"
Task: "T038 [US2] Implement edit-save progress merge that preserves retained topic progress, initializes newly added topics as not completed, and drops progress only for removed topics in src/features/student-area/server/path-persistence.ts"
```

## Parallel Example: User Story 3

```text
Task: "T041 [US3] Refactor history presenter rows to derive Resume Learning and Edit Path destinations from saved path IDs and hide both actions for completed paths in src/features/student-area/server/history-presenter.ts"
Task: "T043 [US3] Update history table rendering to show no Resume/Edit/Delete actions for completed rows and no Delete action for any row in src/features/student-area/components/learning-path-history-table.tsx"
Task: "T045 [US3] Update learning route loading to fetch the saved path matching the route pathId in src/app/tracks/learn/[pathId]/[topicSlug]/page.tsx"
```

## Parallel Example: User Story 4

```text
Task: "T048 [US4] Remove Complete and Reset menu items so builder item menus render only Remove, Move up, and Move down in src/features/student-area/components/path-item-context-menu.tsx"
Task: "T051 [US4] Keep topic completion logic scoped to saved paths in the learning flow in src/features/student-area/server/path-progress.ts"
Task: "T052 [US4] Update Complete Topic action to load, update, save, and redirect using only the route saved path ID in src/features/student-area/actions/complete-topic-action.ts"
```

## Parallel Example: User Story 5

```text
Task: "T054 [US5] Remove all recoverSplitLearningData calls from normal history and builder flows in src/features/student-area/views/student-history-view.tsx and src/features/student-area/actions/student-path-actions.ts"
Task: "T057 [US5] Remove app-facing clear/delete learning path methods from the repository type and memory store implementation in src/server/student-area/repository.ts"
Task: "T058 [US5] Ensure corrupt or unavailable saved data returns a recoverable load result without deleting keys during load in src/server/student-area/repository.ts"
```

---

## Implementation Strategy

### MVP First

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 for US1.
3. Validate create mode independently: empty builder, local composition, save, and Start Learning from the created saved path ID.

### Incremental Delivery

1. Add US1 create/save/start.
2. Add US2 edit/discard/clear/overwrite with progress-preserving edit saves.
3. Add US3 history read/resume/edit/completed-row behavior.
4. Add US4 progress separation and composition-only menus.
5. Add US5 repository boundary cleanup and mutation-free load verification.

### Verification Discipline

- Tests in Phase 2 should be written before implementation and should fail against the current behavior where behavior is currently wrong.
- Each story checkpoint should be validated before proceeding to the next story.
- Full verification is required at the end: `pnpm test`, `pnpm lint`, `pnpm build`, and `pnpm test:e2e`.

## Notes

- Preserve progress on edit-save for retained topics.
- Initialize newly added topics as not completed on edit-save.
- Remove progress only for topics removed from the edited saved path.
- Do not reintroduce persisted builder drafts, active-path-only navigation, builder Complete/Reset actions, load-time mutation, hidden recovery/cleanup, or learning-path delete behavior.
