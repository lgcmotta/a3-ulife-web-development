# Tasks: Educational Content Refresh

**Input**: Design documents from `/specs/003-educational-content/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/content-quality.md](./contracts/content-quality.md), [quickstart.md](./quickstart.md)

**Tests**: Include focused updates to existing unit and Playwright tests because the specification defines independent content validation criteria and the repository already has content and foundation-flow coverage.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing.

## Phase 1: Setup (Shared Content Inventory)

**Purpose**: Establish a concrete source-content checklist before changing copy.

- [X] T001 Create a source content inventory and rewrite checklist in `specs/003-educational-content/content-review.md` covering `src/content/diogenes.ts`, `src/content/tracks.ts`, `src/content/accessibility-help.ts`, and `src/features/foundation/views/accessibility-view.tsx`
- [X] T002 [P] Run the quickstart placeholder scan against `src/` and record all user-facing matches in `specs/003-educational-content/content-review.md`

---

## Phase 2: Foundational (Content Shape And Rendering)

**Purpose**: Add the minimal content fields needed for richer educational copy before individual user stories rewrite content.

**CRITICAL**: Complete this phase before user-story implementation so content, rendering, and tests agree on the richer model.

- [X] T003 Add `outcome` to `LearningTrack` and `practicePrompt` plus `professorNote` to `Topic` in `src/content/types.ts`
- [X] T004 Render learning-track outcomes in `src/features/foundation/components/track-card.tsx`
- [X] T005 Render topic practice prompts and professor notes in `src/features/foundation/components/topic-study-card.tsx`
- [X] T006 Update structural content expectations for new fields in `tests/unit/content/tracks-content.test.ts`

**Checkpoint**: The application can render richer track and topic fields before content is rewritten.

---

## Phase 3: User Story 1 - Study With Realistic Track Content (Priority: P1) MVP

**Goal**: A beginner Computer Science student can scan learning tracks, open a topic, and understand what to study, why it matters, and what to do next.

**Independent Test**: Review every learning track and topic preview and confirm each describes a real beginner-friendly Computer Science study purpose without placeholder text.

### Tests for User Story 1

- [X] T007 [P] [US1] Add unit assertions for track outcomes, topic practice prompts, professor notes, and placeholder-free track copy in `tests/unit/content/tracks-content.test.ts`
- [X] T008 [P] [US1] Add Playwright assertions for visible track outcome copy and richer topic study sections in `tests/integration/foundation-flow.spec.ts`

### Implementation for User Story 1

- [X] T009 [US1] Expand the Programming Foundations track and its topics with realistic beginner study content in `src/content/tracks.ts`
- [X] T010 [US1] Expand the Web and Accessibility track and its topics with realistic beginner study content in `src/content/tracks.ts`
- [X] T011 [US1] Expand the Study Methods for CS track and its topics with realistic beginner study content in `src/content/tracks.ts`
- [X] T012 [US1] Verify all topic slugs still resolve through existing route helpers in `tests/unit/content/topic-routing.test.ts`

**Checkpoint**: User Story 1 is functional and testable independently through `/tracks` and at least one topic page from each track.

---

## Phase 4: User Story 2 - Use Helpful Diogenes Guidance (Priority: P2)

**Goal**: A student understands who Diogenes is, what the platform offers, and how to choose a study path without any live chatbot, account, or personalization expectation.

**Independent Test**: Review home, introduction, assistant/help-style guidance, and next-action copy and confirm it gives practical static advice without implying dynamic advising.

### Tests for User Story 2

- [X] T013 [P] [US2] Add unit assertions for realistic Diogenes identity, static guidance, and forbidden assistant claims in `tests/unit/content/foundation-content.test.ts`
- [X] T014 [P] [US2] Add home-rendering assertions for updated Diogenes role, platform purpose, and primary guidance copy in `tests/unit/content/home-content.test.ts`

### Implementation for User Story 2

- [X] T015 [US2] Rewrite Diogenes profile copy and home principles with realistic English educational guidance in `src/content/diogenes.ts`
- [X] T016 [US2] Render `diogenesProfile.teachingTone` as visible static guidance in `src/features/foundation/components/home-introduction.tsx`
- [X] T017 [US2] Review all topic `studyNext` and `professorNote` copy for static non-personalized guidance in `src/content/tracks.ts`

**Checkpoint**: User Story 2 is functional and testable independently from the home page and topic next-action areas.

---

## Phase 5: User Story 3 - Understand Accessibility Guidance (Priority: P3)

**Goal**: A student with accessibility needs can understand keyboard navigation, screen reader structure, visual theme support, and movement through the main platform areas.

**Independent Test**: Review the accessibility help area and confirm it explains actual platform structure and accessibility supports in plain, actionable English.

### Tests for User Story 3

- [X] T018 [P] [US3] Add unit assertions for keyboard, screen reader, visual theme, and navigation guidance coverage in `tests/unit/content/accessibility-help-content.test.ts`
- [X] T019 [P] [US3] Add Playwright assertions for product-specific accessibility help copy in `tests/integration/accessibility.spec.ts`

### Implementation for User Story 3

- [X] T020 [US3] Rewrite accessibility help sections with concrete product-specific instructions in `src/content/accessibility-help.ts`
- [X] T021 [US3] Replace first-version framing with realistic accessibility introduction copy in `src/features/foundation/views/accessibility-view.tsx`

**Checkpoint**: User Story 3 is functional and testable independently from `/accessibility`.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Confirm content quality, usability, accessibility, and regression protection across all stories.

- [X] T022 Remove any remaining placeholder, release-framing, or temporary wording found by the quickstart scan in `src/content/diogenes.ts`, `src/content/tracks.ts`, `src/content/accessibility-help.ts`, and `src/features/foundation/views/accessibility-view.tsx`
- [X] T023 [P] Update assignment evidence copy only where it contradicts refreshed content in `src/content/evidence/personas.ts`, `src/content/evidence/information-architecture.ts`, and `src/content/evidence/heuristic-evaluation.ts`
- [X] T024 Run `pnpm lint` to validate source and test files under `src/` and `tests/`
- [X] T025 Run `pnpm build` to validate the Next.js application under `src/app/`
- [X] T026 Run `pnpm test` to validate unit tests under `tests/unit/`
- [X] T027 Run `pnpm test:e2e` to validate Playwright flows under `tests/integration/`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies.
- **Foundational (Phase 2)**: Depends on Setup completion and blocks all user stories.
- **User Story 1 (Phase 3)**: Depends on Foundational completion and is the MVP.
- **User Story 2 (Phase 4)**: Depends on Foundational completion; should follow US1 if topic professor notes are updated in the same file.
- **User Story 3 (Phase 5)**: Depends on Foundational completion and can proceed independently of US1 and US2.
- **Polish (Phase 6)**: Depends on all selected user stories being complete.

### User Story Dependencies

- **US1 (P1)**: No dependency on other user stories after Foundational phase.
- **US2 (P2)**: No functional dependency on US1, but task T017 touches `src/content/tracks.ts` and should run after US1 track rewrites to avoid same-file conflicts.
- **US3 (P3)**: No dependency on US1 or US2 after Foundational phase.

### Parallel Opportunities

- T002 can run in parallel with T001 after the feature documents are available.
- T007 and T008 can run in parallel before US1 implementation.
- T013 and T014 can run in parallel before US2 implementation.
- T018 and T019 can run in parallel before US3 implementation.
- US3 implementation can proceed in parallel with US1 or US2 after Phase 2 because it uses different content files.
- T023 can run in parallel with final manual content cleanup if assignment evidence changes are needed.

---

## Parallel Example: User Story 1

```bash
# Test updates can be prepared together because they touch different files:
Task: "T007 Add unit assertions for track outcomes, topic practice prompts, professor notes, and placeholder-free track copy in tests/unit/content/tracks-content.test.ts"
Task: "T008 Add Playwright assertions for visible track outcome copy and richer topic study sections in tests/integration/foundation-flow.spec.ts"
```

---

## Parallel Example: User Story 2

```bash
# Home and content-contract tests can be prepared together:
Task: "T013 Add unit assertions for realistic Diogenes identity, static guidance, and forbidden assistant claims in tests/unit/content/foundation-content.test.ts"
Task: "T014 Add home-rendering assertions for updated Diogenes role, platform purpose, and primary guidance copy in tests/unit/content/home-content.test.ts"
```

---

## Parallel Example: User Story 3

```bash
# Unit and e2e accessibility-copy checks can be prepared together:
Task: "T018 Add unit assertions for keyboard, screen reader, visual theme, and navigation guidance coverage in tests/unit/content/accessibility-help-content.test.ts"
Task: "T019 Add Playwright assertions for product-specific accessibility help copy in tests/integration/accessibility.spec.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 Setup.
2. Complete Phase 2 Foundational content shape and rendering.
3. Complete Phase 3 User Story 1.
4. Validate `/tracks` and topic pages independently.
5. Run `pnpm lint`, `pnpm build`, `pnpm test`, and `pnpm test:e2e` before demo.

### Incremental Delivery

1. Setup plus Foundational work creates richer content support.
2. US1 makes the core learning-track experience credible.
3. US2 improves the Diogenes identity and static guidance.
4. US3 improves user-facing accessibility guidance.
5. Polish confirms placeholder removal and regression checks.

### Team Parallel Strategy

1. Complete Phase 1 and Phase 2 together.
2. Assign US1 and US2 carefully because both may touch `src/content/tracks.ts`.
3. Assign US3 independently because it primarily touches accessibility help files.
4. Merge after story checkpoints and run the full validation commands.

---

## Notes

- Keep revised copy original and in English, except the product name.
- Do not add chatbot behavior, progress dashboards, accounts, personalization, game mechanics, or external integrations.
- Keep content concise enough for mobile reading and class presentation.
- Every task uses the required checklist format with task ID, optional parallel marker, story label where required, and file path.
