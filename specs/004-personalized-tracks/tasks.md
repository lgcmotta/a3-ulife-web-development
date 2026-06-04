# Tasks: Personalized Student Area

**Input**: Design documents from `/specs/004-personalized-tracks/`

**Prerequisites**: `plan.md`, `spec.md`, `research.md`, `data-model.md`, `contracts/`, `quickstart.md`

**Tests**: Required for this feature because the approved plan calls for unit tests, Redis-backed integration behavior, Playwright e2e coverage, and accessibility checks.

**Organization**: Tasks are grouped by user story so each story can be implemented and validated independently after the shared foundation is complete.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel because it touches different files and has no direct dependency on another unfinished task in the same phase
- **[Story]**: Maps a task to the user story from `spec.md`
- Every task includes exact file paths

---

## Phase 1: Setup

**Purpose**: Add the shared project dependencies, Redis service, environment defaults, and file locations required by the plan.

- [X] T001 Create the Redis service exactly as planned in `docker-compose.yml`
- [X] T002 Install `redis`, `sqids`, `react-markdown`, and `remark-gfm` in `package.json` and `pnpm-lock.yaml`
- [X] T003 Add shadcn/Radix UI primitives for accordion, checkbox, context menu, dialog, table, tabs, and sonner in `src/ui/components/`
- [X] T004 [P] Document `REDIS_URL=redis://localhost:6379` and no required secrets in `.env.example`
- [X] T005 [P] Add Redis cleanup and seed helpers for Playwright tests in `tests/e2e-support/redis-test-utils.ts`
- [X] T006 [P] Add markdown learning-section authoring rules in `src/content/learning-sections/README.md`
- [X] T007 [P] Add student-area test fixtures for available tracks and selected paths in `tests/unit/fixtures/student-area.ts`
- [X] T008 [P] Add shared markdown content styles for rendered learning sections in `src/app/globals.css`
- [X] T009 Run production dependency audit and record the result in `specs/004-personalized-tracks/quickstart.md`

---

## Phase 2: Foundational

**Purpose**: Build the server-side primitives that block every student-area story.

**Critical**: No user story work should start until this phase is complete.

- [X] T010 [P] Add unit tests for 7-character URL-safe Sqids encoding and decoding in `tests/unit/server/ids/sqids.test.ts`
- [X] T011 Implement the Sqids helper with minimum length 7 in `src/server/ids/sqids.ts`
- [X] T012 [P] Add unit tests for student-scoped Redis key construction in `tests/unit/server/student-area/keys.test.ts`
- [X] T013 Implement Redis key builders for student, draft, active path, history, feedback, and counters in `src/server/student-area/keys.ts`
- [X] T014 [P] Define student-area domain types from the data model in `src/server/student-area/types.ts`
- [X] T015 Implement the Redis client using `REDIS_URL` in `src/server/redis/client.ts`
- [X] T016 [P] Add unit tests for anonymous student creation and last-seen updates in `tests/unit/server/student-area/student-record.test.ts`
- [X] T017 Implement anonymous student record creation and browser persistence helpers in `src/server/student-area/student-record.ts`
- [X] T018 [P] Add unit tests for draft, active path, history, and feedback persistence in `tests/unit/server/student-area/repository.test.ts`
- [X] T019 Implement the Redis repository for draft, active path, progress, history, and feedback records in `src/server/student-area/repository.ts`
- [X] T020 [P] Add catalog lookup helpers that map existing tracks and topics to student-area data in `src/server/student-area/catalog.ts`
- [X] T021 [P] Add unit tests for empty-track rejection, topic parent validation, and saved-path validation in `tests/unit/server/student-area/path-validation.test.ts`
- [X] T022 Implement path validation and normalization services in `src/server/student-area/path-validation.ts`
- [X] T023 [P] Add unit tests for markdown lookup by topic slug and missing-file errors in `tests/unit/server/learning-content/markdown.test.ts`
- [X] T024 Implement markdown file loading and metadata extraction in `src/server/learning-content/markdown.ts`
- [X] T025 [P] Add unit tests for shared student-area server action responses in `tests/unit/features/student-area/student-actions.test.ts`
- [X] T026 Implement shared server action result helpers and friendly error mapping in `src/features/student-area/actions/action-results.ts`
- [X] T027 [P] Implement the accessible student-area tab navigation shell in `src/features/student-area/components/student-tabs.tsx`
- [X] T028 [P] Implement shared feedback live region and toast adapter in `src/features/student-area/components/student-feedback.tsx`

**Checkpoint**: Redis persistence, IDs, catalog lookup, markdown loading, action responses, and shared navigation are ready.

---

## Phase 3: User Story 1 - Enter The Student Area (Priority: P1)

**Goal**: A student can use Start Learning from Home or Learning Tracks and arrive at `/tracks/history` with the student-area tabs visible.

**Independent Test**: Open `/` and `/tracks`, activate Start Learning from each page, and confirm `/tracks/history` renders selected History tab navigation without asking for identity.

### Tests for User Story 1

- [X] T029 [P] [US1] Add Playwright coverage for Home and Learning Tracks Start Learning navigation in `tests/integration/student-area-entry.spec.ts`
- [X] T030 [P] [US1] Add unit tests for student tab labels, selected state, and route targets in `tests/unit/features/student-area/student-tabs.test.tsx`

### Implementation for User Story 1

- [X] T031 [US1] Add student-area route constants for `/tracks/history` and `/tracks/builder` in `src/routes/navigation.ts`
- [X] T032 [US1] Update Home Start Learning action to navigate to `/tracks/history` in `src/app/page.tsx`
- [X] T033 [US1] Update Learning Tracks Start Learning action to navigate to `/tracks/history` in `src/app/tracks/page.tsx`
- [X] T034 [US1] Create the History tab route that ensures an anonymous student record in `src/app/tracks/history/page.tsx`
- [X] T035 [US1] Create the Builder tab route shell that ensures an anonymous student record in `src/app/tracks/builder/page.tsx`
- [X] T036 [US1] Compose the shared student-area shell around History and Builder tabs in `src/features/student-area/views/student-area-shell.tsx`

**Checkpoint**: Entry navigation and tab URLs work independently.

---

## Phase 4: User Story 2 - Review Learning Path History (Priority: P2)

**Goal**: A student can review saved learning path history or use the empty-state action to add a new learning path.

**Independent Test**: Open `/tracks/history` with no history, use Add New Learning Path to reach `/tracks/builder`, then seed a saved path and confirm the history table exposes track summary, topic counts, status, and saved date.

### Tests for User Story 2

- [X] T037 [P] [US2] Add Playwright coverage for history empty state, add-new action, and seeded history rows in `tests/integration/student-area-history.spec.ts`
- [X] T038 [P] [US2] Add unit tests for history row presentation and non-color status text in `tests/unit/features/student-area/history-presenter.test.ts`

### Implementation for User Story 2

- [X] T039 [US2] Implement history presenter mapping Redis history entries to table rows in `src/features/student-area/server/history-presenter.ts`
- [X] T040 [US2] Implement the accessible learning path history table in `src/features/student-area/components/learning-path-history-table.tsx`
- [X] T041 [US2] Implement the empty history state with Add New Learning Path action in `src/features/student-area/components/empty-history-state.tsx`
- [X] T042 [US2] Implement the full History tab view with Redis-loaded state in `src/features/student-area/views/student-history-view.tsx`

**Checkpoint**: History tab works with empty and populated data.

---

## Phase 5: User Story 3 - Build A Personalized Path (Priority: P3)

**Goal**: A student can select tracks or individual topics in a collapsible checkbox tree and see the current path under construction grouped by parent track.

**Independent Test**: Open `/tracks/builder`, select a full track, deselect one topic, confirm parent partial state, and confirm selected topics appear under the correct parent track in the current path view.

### Tests for User Story 3

- [X] T043 [P] [US3] Add unit tests for track/topic selection, partial parent state, and empty-track removal in `tests/unit/features/student-area/builder-selection.test.ts`
- [X] T044 [P] [US3] Add Playwright coverage for builder tree checkbox behavior and selection feedback in `tests/integration/student-area-builder-selection.spec.ts`

### Implementation for User Story 3

- [X] T045 [US3] Implement track/topic toggle behavior and parent selection-state calculation in `src/features/student-area/server/builder-selection.ts`
- [X] T046 [US3] Implement collapsible track/topic checkbox tree with accessible labels and partial state in `src/features/student-area/components/track-topic-tree.tsx`
- [X] T047 [US3] Implement selected-content grouping by parent track in `src/features/student-area/components/current-path-panel.tsx`
- [X] T048 [US3] Connect tree selection, draft loading, current path display, and toast feedback in `src/features/student-area/views/student-builder-view.tsx`
- [X] T049 [US3] Wire toggle track and toggle topic server actions in `src/features/student-area/actions/student-path-actions.ts`

**Checkpoint**: Builder selection works without save, reorder, or learning flow dependencies.

---

## Phase 6: User Story 4 - Organize And Update The Current Path (Priority: P4)

**Goal**: A student can reorder tracks among tracks, reorder topics only inside their parent track, and use context-menu actions to remove, complete, or reset items.

**Independent Test**: Build a path with multiple tracks and topics, move tracks up/down, move topics within a track, verify invalid boundary moves show friendly feedback, then complete and reset a topic and a track.

### Tests for User Story 4

- [X] T050 [P] [US4] Add unit tests for reorder boundaries and context-menu state actions in `tests/unit/features/student-area/path-organization.test.ts`
- [X] T051 [P] [US4] Add Playwright coverage for context-menu remove, move up, move down, complete, and reset actions in `tests/integration/student-area-builder-organization.spec.ts`

### Implementation for User Story 4

- [X] T052 [US4] Implement track and topic reorder services with boundary feedback in `src/features/student-area/server/path-reorder.ts`
- [X] T053 [US4] Implement complete and reset services for topic and track levels in `src/features/student-area/server/path-progress.ts`
- [X] T054 [US4] Implement the item context menu with remove, move up, move down, complete, and reset actions in `src/features/student-area/components/path-item-context-menu.tsx`
- [X] T055 [US4] Add keyboard-reachable context-menu controls to current path groups and topics in `src/features/student-area/components/current-path-panel.tsx`
- [X] T056 [US4] Wire reorder, remove, complete, and reset server actions in `src/features/student-area/actions/student-path-actions.ts`

**Checkpoint**: Current path organization and progress-state controls work in the builder.

---

## Phase 7: User Story 5 - Save, Continue, Or Discard Builder Changes (Priority: P5)

**Goal**: A student can save a valid path, start or continue learning when allowed, discard unsaved changes, and clear the path only after visual confirmation.

**Independent Test**: Build a path, verify Start Learning is disabled until save, save it, confirm Start Learning changes to Continue Learning after progress exists, change the draft, confirm Continue Learning is disabled until saving or discarding, and confirm discard/clear require dialogs.

### Tests for User Story 5

- [X] T057 [P] [US5] Add unit tests for save, dirty state, discard, clear, start, and continue workflows in `tests/unit/features/student-area/path-persistence.test.ts`
- [X] T058 [P] [US5] Add Playwright coverage for save, disabled states, discard dialog, clear dialog, and continue routing in `tests/integration/student-area-builder-persistence.spec.ts`

### Implementation for User Story 5

- [X] T059 [US5] Implement builder action bar buttons and disabled states in `src/features/student-area/components/builder-action-bar.tsx`
- [X] T060 [US5] Implement confirmation dialogs for Discard Changes and Clear Learning Path in `src/features/student-area/components/builder-confirmation-dialogs.tsx`
- [X] T061 [US5] Implement save draft, discard changes, and clear learning path server actions in `src/features/student-area/actions/student-path-actions.ts`
- [X] T062 [US5] Implement start and continue learning route resolution in `src/features/student-area/actions/learning-navigation-actions.ts`
- [X] T063 [US5] Integrate save, dirty-state refresh, discard, clear, start, and continue behavior into `src/features/student-area/views/student-builder-view.tsx`

**Checkpoint**: Builder persistence and learning navigation decisions work before topic pages are added.

---

## Phase 8: User Story 6 - Learn From Detailed Topic Sections (Priority: P6)

**Goal**: A student can open a saved learning topic, read substantial markdown content, complete the topic, move to the next topic, and see a completion screen at the end.

**Independent Test**: Save a path, start learning, confirm the first topic route renders detailed markdown, complete topics in order, confirm progress persists, and confirm the final page returns to `/tracks/history`.

### Tests for User Story 6

- [X] T064 [P] [US6] Add content contract tests for all nine markdown files, 600-word minimums, external links, and no raw HTML in `tests/unit/content/learning-sections.test.ts`
- [X] T065 [P] [US6] Add Playwright coverage for topic rendering, Complete Topic, next-topic navigation, completion page, and Return to Builder in `tests/integration/student-area-learning-flow.spec.ts`

### Markdown Content for User Story 6

- [X] T066 [P] [US6] Write 600+ words of original English content with 2+ external links for Problem-Solving Basics in `src/content/learning-sections/problem-solving-basics.md`
- [X] T067 [P] [US6] Write 600+ words of original English content with 2+ external links for Variables and Flow in `src/content/learning-sections/variables-and-flow.md`
- [X] T068 [P] [US6] Write 600+ words of original English content with 2+ external links for Debugging Habits in `src/content/learning-sections/debugging-habits.md`
- [X] T069 [P] [US6] Write 600+ words of original English content with 2+ external links for Semantic Structure in `src/content/learning-sections/semantic-structure.md`
- [X] T070 [P] [US6] Write 600+ words of original English content with 2+ external links for Responsive Layouts in `src/content/learning-sections/responsive-layouts.md`
- [X] T071 [P] [US6] Write 600+ words of original English content with 2+ external links for Accessible Navigation in `src/content/learning-sections/accessible-navigation.md`
- [X] T072 [P] [US6] Write 600+ words of original English content with 2+ external links for Reading Technical Texts in `src/content/learning-sections/reading-technical-texts.md`
- [X] T073 [P] [US6] Write 600+ words of original English content with 2+ external links for Planning Study Sessions in `src/content/learning-sections/planning-study-sessions.md`
- [X] T074 [P] [US6] Write 600+ words of original English content with 2+ external links for Asking Better Questions in `src/content/learning-sections/asking-better-questions.md`

### Implementation for User Story 6

- [X] T075 [US6] Implement markdown rendering with `react-markdown` and `remark-gfm` in `src/features/student-area/components/learning-section-content.tsx`
- [X] T076 [US6] Implement the topic learning section view with track/topic context and Return to Builder action in `src/features/student-area/views/learning-section-view.tsx`
- [X] T077 [US6] Create the topic learning route for `/tracks/learn/{pathId}/{topicSlug}` in `src/app/tracks/learn/[pathId]/[topicSlug]/page.tsx`
- [X] T078 [US6] Implement Complete Topic and next-topic routing action in `src/features/student-area/actions/complete-topic-action.ts`
- [X] T079 [US6] Implement the path completion view and return-to-history action in `src/features/student-area/views/learning-complete-view.tsx`
- [X] T080 [US6] Create the completion route for `/tracks/learn/{pathId}/complete` in `src/app/tracks/learn/[pathId]/complete/page.tsx`
- [X] T081 [US6] Implement friendly missing path, missing topic, and missing markdown states in `src/features/student-area/views/learning-section-view.tsx`

**Checkpoint**: Saved paths can be studied through detailed topic pages and completed.

---

## Phase 9: Polish And Cross-Cutting Validation

**Purpose**: Verify quality gates, assignment evidence, accessibility, and documentation after all user stories are complete.

- [X] T082 [P] Update information architecture evidence for `/tracks/history`, `/tracks/builder`, and learning routes in `src/content/evidence/information-architecture.ts`
- [X] T083 [P] Update heuristic evaluation notes for builder feedback, confirmation dialogs, keyboard flow, and learning-section navigation in `src/content/evidence/heuristic-evaluation.ts`
- [X] T084 [P] Add accessibility regression coverage for student tabs, builder controls, dialogs, history table, and learning sections in `tests/integration/accessibility.spec.ts`
- [X] T085 Update project setup notes with Redis and markdown content workflow in `README.md`
- [X] T086 Run `pnpm lint`, `pnpm build`, `pnpm test`, and `pnpm test:e2e`, then record any known follow-up in `specs/004-personalized-tracks/quickstart.md`

---

## Phase 10: User Story 2 - History Status And Actions Regression Fixes (Priority: P2)

**Goal**: A student can see accurate saved-path status in history and can resume or edit any unfinished learning path from the history table.

**Independent Test**: Build a path, start but do not finish it, return to `/tracks/history`, and confirm the row shows current progress plus separate Resume Learning and Edit Path actions.

### Tests for User Story 2

- [X] T087 [P] [US2] Add unit coverage for accurate status, progress labels, resume targets, and edit targets in `tests/unit/features/student-area/history-presenter.test.ts`
- [X] T088 [P] [US2] Add Playwright coverage for unfinished history rows showing both Resume Learning and Edit Path buttons in `tests/integration/student-area-history.spec.ts`

### Implementation for User Story 2

- [X] T089 [US2] Extend presented history rows with current status, progress, resume target, and edit target data in `src/features/student-area/server/history-presenter.ts`
- [X] T090 [US2] Render separate Resume Learning and Edit Path buttons for non-completed history rows in `src/features/student-area/components/learning-path-history-table.tsx`
- [X] T091 [US2] Pass active saved-path state into the history presenter so stale history snapshots do not hide current progress in `src/features/student-area/views/student-history-view.tsx`

**Checkpoint**: History rows expose current progress and actionable controls for unfinished paths.

---

## Phase 11: User Story 4 - Current Path Item Menu Regression Fixes (Priority: P4)

**Goal**: A student can open item actions from an icon-only three-dot dropdown menu instead of visible "Actions for ..." text.

**Independent Test**: Build a current path, confirm each track/topic item has a keyboard-reachable three-dot menu button with an accessible name, open it, and confirm remove, move, complete, and reset actions are available.

### Tests for User Story 4

- [X] T092 [P] [US4] Add Playwright coverage for three-dot item action triggers and dropdown menu actions in `tests/integration/student-area-builder-organization.spec.ts`

### Implementation for User Story 4

- [X] T093 [US4] Add the shadcn/Radix dropdown menu component in `src/ui/components/dropdown-menu.tsx` and update `package.json` plus `pnpm-lock.yaml` if the dependency set changes
- [X] T094 [US4] Replace the custom visible "Actions for ..." menu with a shadcn DropdownMenu three-dot trigger in `src/features/student-area/components/path-item-context-menu.tsx`
- [X] T095 [US4] Update current-path action-menu styling for compact icon buttons and dropdown content in `src/app/globals.css`

**Checkpoint**: Current path item actions are compact, accessible, and no longer display "Actions for ..." as visible button text.

---

## Phase 12: User Story 5 - Builder Dialog And Completed-Path Reset Regression Fixes (Priority: P5)

**Goal**: Confirmation dialogs have an opaque readable surface, and opening the builder after finishing a learning path starts a fresh empty builder draft.

**Independent Test**: Open Discard Changes and Clear Learning Path dialogs and confirm the dialog panel is opaque and readable; complete a full path, open `/tracks/builder`, and confirm the builder is in the initial empty state.

### Tests for User Story 5

- [X] T096 [P] [US5] Add Playwright coverage for opaque discard and clear dialogs in `tests/integration/student-area-builder-persistence.spec.ts`
- [X] T097 [P] [US5] Add unit coverage for loading an empty builder draft after a completed active path in `tests/unit/features/student-area/builder-selection.test.ts`
- [X] T098 [P] [US5] Add Playwright coverage for returning to `/tracks/builder` after path completion and seeing the initial empty builder state in `tests/integration/student-area-builder-persistence.spec.ts`

### Implementation for User Story 5

- [X] T099 [US5] Fix Dialog overlay and content surface styling so confirmation modals are opaque and readable in `src/ui/components/dialog.tsx` and `src/app/globals.css`
- [X] T100 [US5] Update builder-state loading so a completed active path creates or loads an empty clean draft in `src/features/student-area/server/builder-selection.ts`
- [X] T101 [US5] Update discard behavior so completed active paths do not repopulate the builder with the finished path in `src/features/student-area/actions/student-path-actions.ts`

**Checkpoint**: Destructive confirmation dialogs are visually solid, and completed paths do not reappear as the active builder draft.

---

## Phase 13: User Story 6 - Learning Completion Persistence Regression Fixes (Priority: P6)

**Goal**: Completing the final selected topic updates saved-path and history state so the learning path appears completed everywhere.

**Independent Test**: Save a path, complete every selected topic, return to `/tracks/history`, and confirm the row shows all topics completed with a Completed status.

### Tests for User Story 6

- [X] T102 [P] [US6] Add unit coverage for final-topic completion updating saved path status, completion date, and progress counts in `tests/unit/features/student-area/path-persistence.test.ts`
- [X] T103 [P] [US6] Add Playwright coverage for completing all topics and seeing Completed status in `/tracks/history` in `tests/integration/student-area-learning-flow.spec.ts`

### Implementation for User Story 6

- [X] T104 [US6] Extract reusable path completion update logic that returns current topic counts and status in `src/features/student-area/server/path-progress.ts`
- [X] T105 [US6] Update Complete Topic persistence to refresh the matching history entry after progress changes in `src/features/student-area/actions/complete-topic-action.ts`

**Checkpoint**: Completed learning paths show completed status and completed progress in history.

---

## Phase 14: Regression Validation

**Purpose**: Validate that the targeted UI fixes did not regress the student-area feature.

- [X] T106 Run `pnpm lint`, `pnpm build`, `pnpm test`, and `pnpm test:e2e`, then record the targeted regression validation result in `specs/004-personalized-tracks/quickstart.md`

---

## Dependencies And Execution Order

### Phase Dependencies

- Phase 1 Setup has no dependencies.
- Phase 2 Foundational depends on Phase 1 and blocks all user stories.
- Phase 3 US1 depends on Phase 2.
- Phase 4 US2 depends on Phase 2 and uses the shell created by US1 for the full route experience.
- Phase 5 US3 depends on Phase 2 and can proceed once `/tracks/builder` route shell exists.
- Phase 6 US4 depends on US3 because it organizes selected builder content.
- Phase 7 US5 depends on US3 and US4 because it saves and navigates from a valid configured path.
- Phase 8 US6 depends on US5 because learning pages require a saved path.
- Phase 9 Polish depends on all selected user stories.
- Phase 10 US2 regression fixes can start after the completed baseline feature and should be completed before validating history e2e behavior.
- Phase 11 US4 regression fixes can start after the completed baseline feature and can run in parallel with Phase 10.
- Phase 12 US5 regression fixes depend on the completed baseline builder persistence behavior and can run in parallel with Phase 10 after tests are written.
- Phase 13 US6 regression fixes depend on the learning completion flow and should run before final regression validation.
- Phase 14 Regression Validation depends on Phases 10 through 13.

### User Story Dependencies

- **US1**: Entry route and tabs; first MVP slice.
- **US2**: History table; depends on shared student-area shell but can be tested with seeded history.
- **US3**: Builder selection; depends on Redis repository and catalog helpers.
- **US4**: Builder organization; depends on selected path data from US3.
- **US5**: Persistence and start/continue controls; depends on builder selection and organization.
- **US6**: Learning pages; depends on a saved path and markdown content files.
- **US2 regression**: History status and actions depend on current saved-path state and learning destination resolution.
- **US4 regression**: Dropdown trigger work is isolated to current-path item controls.
- **US5 regression**: Dialog styling and completed-path builder reset depend on existing builder persistence.
- **US6 regression**: Completion persistence depends on saved-path progress updates and history refresh.

### Test Ordering

- Write the tests listed in each story before implementation tasks in that story.
- Unit tests can run without the app server.
- Playwright tests require Redis from `docker-compose.yml` and the Next.js app server.
- Content contract tests should fail until all nine markdown files are authored.

---

## Parallel Examples

### Setup

```text
T004 .env.example
T005 tests/e2e-support/redis-test-utils.ts
T006 src/content/learning-sections/README.md
T007 tests/unit/fixtures/student-area.ts
T008 src/app/globals.css
```

### Foundational

```text
T010 tests/unit/server/ids/sqids.test.ts
T012 tests/unit/server/student-area/keys.test.ts
T014 src/server/student-area/types.ts
T016 tests/unit/server/student-area/student-record.test.ts
T018 tests/unit/server/student-area/repository.test.ts
T020 src/server/student-area/catalog.ts
T023 tests/unit/server/learning-content/markdown.test.ts
```

### Markdown Content

```text
T066 src/content/learning-sections/problem-solving-basics.md
T067 src/content/learning-sections/variables-and-flow.md
T068 src/content/learning-sections/debugging-habits.md
T069 src/content/learning-sections/semantic-structure.md
T070 src/content/learning-sections/responsive-layouts.md
T071 src/content/learning-sections/accessible-navigation.md
T072 src/content/learning-sections/reading-technical-texts.md
T073 src/content/learning-sections/planning-study-sessions.md
T074 src/content/learning-sections/asking-better-questions.md
```

### Regression Fixes

```text
T087 tests/unit/features/student-area/history-presenter.test.ts
T088 tests/integration/student-area-history.spec.ts
T092 tests/integration/student-area-builder-organization.spec.ts
T096 tests/integration/student-area-builder-persistence.spec.ts
T097 tests/unit/features/student-area/builder-selection.test.ts
T102 tests/unit/features/student-area/path-persistence.test.ts
T103 tests/integration/student-area-learning-flow.spec.ts
```

---

## Implementation Strategy

### MVP First

1. Complete Phase 1 and Phase 2.
2. Complete US1 so the student area can be entered.
3. Complete US2 so history and Add New Learning Path are usable.
4. Stop and validate navigation, anonymous student creation, and history empty state.

### Builder Increment

1. Complete US3 for selection.
2. Complete US4 for reordering and context actions.
3. Complete US5 for save, discard, clear, start, and continue.
4. Validate all builder flows with keyboard and screen-reader-friendly labels.

### Learning Increment

1. Complete all markdown content tasks in US6.
2. Complete markdown rendering and learning routes.
3. Validate topic completion, final completion page, and return to history.

### Targeted Regression Increment

1. Complete Phase 10 so unfinished history rows have correct status and actions.
2. Complete Phase 11 so current-path item actions use the three-dot dropdown menu.
3. Complete Phase 12 so dialogs are opaque and finished paths do not repopulate the builder.
4. Complete Phase 13 so final-topic completion updates history.
5. Complete Phase 14 validation before committing or presenting the fix.

---

## Notes

- Keep Redis student data scoped by `studentId` in every key.
- Do not add authentication, authorization, accounts, community features, maps, calendars, game mechanics, or real AI chatbot behavior.
- Do not allow empty track groups in saved paths.
- Do not allow topics to move outside their parent track.
- Use confirmation dialogs only for Discard Changes and Clear Learning Path.
- Use toasts or live feedback for all successful and invalid builder actions.
- Keep markdown self-contained, original, beginner-friendly, and in English.
- Keep regression fixes narrow to the reported UI and persistence issues; do not add authentication, new student profiles, or unrelated builder behavior.
