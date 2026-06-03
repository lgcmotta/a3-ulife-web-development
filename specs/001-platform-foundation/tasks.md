# Tasks: Platform Foundation

**Input**: Design documents from `/specs/001-platform-foundation/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/ui-navigation.md](./contracts/ui-navigation.md), [quickstart.md](./quickstart.md)

**Tests**: Included because the plan defines Vitest, React Testing Library, Playwright, axe integration, and accessibility/usability success criteria that require repeatable validation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel after prerequisite phase completion because it touches different files and does not depend on incomplete sibling tasks
- **[Story]**: Maps the task to a user story from `spec.md`
- Every task includes an exact file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Initialize the Next.js TypeScript application and toolchain without adding product behavior.

- [X] T001 Scaffold the Next.js 16.2.7 TypeScript app with `src/` routing and update `package.json`, `pnpm-lock.yaml`, `next.config.ts`, `tsconfig.json`, `eslint.config.mjs`, `postcss.config.mjs`, `src/app/layout.tsx`, `src/app/page.tsx`, and `src/app/globals.css`
- [X] T002 Pin runtime and test dependencies from `specs/001-platform-foundation/quickstart.md` in `package.json`
- [X] T003 [P] Configure static export compatibility in `next.config.ts`
- [X] T004 [P] Configure Vitest and jsdom test setup in `vitest.config.ts` and `tests/unit/setup.ts`
- [X] T005 [P] Configure Playwright projects and axe integration support in `playwright.config.ts` and `tests/integration/accessibility.spec.ts`
- [X] T006 [P] Initialize shadcn component conventions and base utility files in `components.json` and `src/ui/utils.ts`
- [X] T007 [P] Add shared shadcn-derived primitives in `src/ui/components/button.tsx`, `src/ui/components/badge.tsx`, `src/ui/components/separator.tsx`, and `src/ui/components/switch.tsx`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Create shared content models, route metadata, layout shell, theme foundation, and validation coverage required before user-story implementation.

**CRITICAL**: No user story work can begin until this phase is complete.

- [X] T008 Define shared content and evidence TypeScript types in `src/content/types.ts`
- [X] T009 [P] Create Diogenes profile content in `src/content/diogenes.ts`
- [X] T010 [P] Create public navigation metadata in `src/routes/navigation.ts`
- [X] T011 [P] Create accessibility landmark constants in `src/accessibility/landmarks.ts`
- [X] T012 Create default and high-contrast theme token helpers in `src/accessibility/theme.ts`
- [X] T013 Implement browser-local theme preference helper in `src/storage/theme-preference.ts`
- [X] T014 Implement the global app shell with skip link, landmarks, primary navigation, theme control slot, and main content region in `src/app/layout.tsx`
- [X] T015 Apply responsive base styles, visible focus states, default theme tokens, and high-contrast theme tokens in `src/app/globals.css`
- [X] T016 [P] Add content model validation tests for Diogenes profile and navigation metadata in `tests/unit/content/foundation-content.test.ts`
- [X] T017 [P] Add theme helper tests for default and high-contrast behavior in `tests/unit/accessibility/theme.test.ts`
- [X] T018 [P] Add UI contract smoke checks for required public routes in `tests/integration/foundation-flow.spec.ts`

**Checkpoint**: Shared foundation is ready; user story implementation can begin.

---

## Phase 3: User Story 1 - Understand the Platform Purpose (Priority: P1) MVP

**Goal**: A first-time student can understand who Diogenes is, what the platform offers, and where to go next.

**Independent Test**: Open `/` and verify a first-time student can identify the platform purpose, Diogenes's role, and the next action to Learning Tracks or Accessibility Help without external explanation.

### Tests for User Story 1

- [X] T019 [P] [US1] Add home introduction rendering tests for Diogenes identity, platform purpose, and primary next actions in `tests/unit/content/home-content.test.ts`
- [X] T020 [P] [US1] Add home page integration checks for desktop and mobile primary navigation reachability in `tests/integration/foundation-flow.spec.ts`

### Implementation for User Story 1

- [X] T021 [P] [US1] Create home view content composition in `src/features/foundation/views/home-view.tsx`
- [X] T022 [P] [US1] Create introduction and next-action components in `src/features/foundation/components/home-introduction.tsx` and `src/features/foundation/components/primary-actions.tsx`
- [X] T023 [US1] Replace starter home page with the foundation introduction route in `src/app/page.tsx`
- [X] T024 [US1] Add route metadata and accessible page title for the home route in `src/app/page.tsx`
- [X] T025 [US1] Verify home copy does not imply dashboard, chatbot, accounts, progress tracking, or external integrations in `src/content/diogenes.ts`

**Checkpoint**: User Story 1 is independently functional and can serve as the MVP demo.

---

## Phase 4: User Story 2 - Explore Learning Tracks (Priority: P1)

**Goal**: A student can open the learning tracks overview, compare a small curated set of tracks, and choose a topic to inspect.

**Independent Test**: Open `/tracks` and verify the available tracks, each track purpose, and topic links are clear and scannable.

### Tests for User Story 2

- [X] T026 [P] [US2] Add learning track model validation tests for unique slugs, required topics, and scan-friendly track count in `tests/unit/content/tracks-content.test.ts`
- [X] T027 [P] [US2] Add learning tracks overview integration checks for route reachability, track comparison, and topic link navigation in `tests/integration/foundation-flow.spec.ts`

### Implementation for User Story 2

- [X] T028 [P] [US2] Create curated learning tracks and topic summaries in `src/content/tracks.ts`
- [X] T029 [P] [US2] Create track overview card and topic link components in `src/features/foundation/components/track-card.tsx` and `src/features/foundation/components/topic-link-list.tsx`
- [X] T030 [US2] Create learning tracks overview view in `src/features/foundation/views/tracks-view.tsx`
- [X] T031 [US2] Implement the `/tracks` route in `src/app/tracks/page.tsx`
- [X] T032 [US2] Add accessible page metadata and current navigation state support for `/tracks` in `src/app/tracks/page.tsx` and `src/routes/navigation.ts`
- [X] T033 [US2] Ensure track cards communicate grouping and topic availability without color-only meaning in `src/features/foundation/components/track-card.tsx`

**Checkpoint**: User Stories 1 and 2 are independently functional and navigable.

---

## Phase 5: User Story 3 - Open and Understand a Topic (Priority: P2)

**Goal**: A student can open a topic, understand what it is about, why it matters, and what to study next.

**Independent Test**: Open `/tracks/[trackSlug]/[topicSlug]` for a curated topic and verify the title, explanation, learning value, next study action, and return path are visible and understandable.

### Tests for User Story 3

- [X] T034 [P] [US3] Add topic route generation and invalid slug behavior tests in `tests/unit/content/topic-routing.test.ts`
- [X] T035 [P] [US3] Add topic page integration checks for heading, learning value, next study action, and return navigation in `tests/integration/foundation-flow.spec.ts`

### Implementation for User Story 3

- [X] T036 [P] [US3] Create topic route lookup helpers in `src/content/topic-routes.ts`
- [X] T037 [P] [US3] Create topic detail components in `src/features/foundation/components/topic-header.tsx`, `src/features/foundation/components/topic-study-card.tsx`, and `src/features/foundation/components/topic-next-action.tsx`
- [X] T038 [US3] Create topic detail view in `src/features/foundation/views/topic-view.tsx`
- [X] T039 [US3] Implement static topic detail route and route params in `src/app/tracks/[trackSlug]/[topicSlug]/page.tsx`
- [X] T040 [US3] Add breadcrumb or return navigation to the topic detail route in `src/app/tracks/[trackSlug]/[topicSlug]/page.tsx`
- [X] T041 [US3] Ensure short topic content still includes useful study direction in `src/content/tracks.ts`

**Checkpoint**: User Stories 1, 2, and 3 provide the complete basic learning flow.

---

## Phase 6: User Story 4 - Navigate Accessibly Across the Foundation (Priority: P2)

**Goal**: A student with accessibility needs can understand the platform structure and navigate the core areas independently.

**Independent Test**: Use keyboard-only and screen-reader-oriented checks across `/`, `/tracks`, a topic route, and `/accessibility`; verify focus, labels, landmarks, headings, and theme behavior.

### Tests for User Story 4

- [X] T042 [P] [US4] Add keyboard navigation integration checks for skip link, primary nav, track/topic links, and accessibility help in `tests/integration/accessibility.spec.ts`
- [X] T043 [P] [US4] Add axe accessibility checks for home, tracks, topic detail, and accessibility help routes in `tests/integration/accessibility.spec.ts`
- [X] T044 [P] [US4] Add theme control tests for keyboard activation and no focus disruption in `tests/unit/accessibility/theme-control.test.ts`

### Implementation for User Story 4

- [X] T045 [P] [US4] Create accessibility help content sections in `src/content/accessibility-help.ts`
- [X] T046 [P] [US4] Create theme toggle component with accessible name and state in `src/features/foundation/components/theme-toggle.tsx`
- [X] T047 [US4] Wire the theme toggle into the global app shell in `src/app/layout.tsx`
- [X] T048 [US4] Create accessibility help view in `src/features/foundation/views/accessibility-view.tsx`
- [X] T049 [US4] Implement the `/accessibility` route in `src/app/accessibility/page.tsx`
- [X] T050 [US4] Audit and adjust headings, landmarks, labels, and non-color-only current-state indicators across `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/tracks/page.tsx`, `src/app/tracks/[trackSlug]/[topicSlug]/page.tsx`, and `src/app/accessibility/page.tsx`

**Checkpoint**: The core foundation flow is keyboard-accessible, screen-reader-understandable, and supports default plus high-contrast themes.

---

## Phase 7: User Story 5 - Prepare Assignment Evidence (Priority: P3)

**Goal**: The foundation includes assignment evidence for personas, information architecture, wireframe thinking, heuristic evaluation findings, and iteration notes.

**Independent Test**: Review the project evidence content and verify it covers at least one beginner-student persona, IA/wireframe-oriented notes, heuristic findings, and at least one iteration decision.

### Tests for User Story 5

- [X] T051 [P] [US5] Add assignment evidence validation tests for persona, IA, wireframe notes, heuristic findings, and iteration notes in `tests/unit/content/assignment-evidence.test.ts`

### Implementation for User Story 5

- [X] T052 [P] [US5] Create beginner-student persona evidence in `src/content/evidence/personas.ts`
- [X] T053 [P] [US5] Create information architecture and wireframe-oriented evidence in `src/content/evidence/information-architecture.ts`
- [X] T054 [P] [US5] Create heuristic evaluation findings and iteration notes in `src/content/evidence/heuristic-evaluation.ts`
- [X] T055 [US5] Add an assignment evidence summary section to the accessibility help or foundation content in `src/features/foundation/views/accessibility-view.tsx`
- [X] T056 [US5] Ensure evidence content stays aligned with scope exclusions in `src/content/evidence/personas.ts`, `src/content/evidence/information-architecture.ts`, and `src/content/evidence/heuristic-evaluation.ts`

**Checkpoint**: Assignment evidence is present and reviewable without expanding the product scope.

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Validate the full foundation, tighten presentation quality, and prepare for task handoff or implementation review.

- [X] T057 [P] Run quickstart validation commands and document any deviations in `specs/001-platform-foundation/quickstart.md`
- [X] T058 [P] Add final responsive presentation checks for desktop and mobile viewport coverage in `tests/integration/foundation-flow.spec.ts`
- [X] T059 [P] Add static hosting compatibility notes for the public class presentation URL in `README.md`
- [X] T060 Review all student-facing copy for simple, welcoming, academically appropriate wording in `src/content/diogenes.ts`, `src/content/tracks.ts`, `src/content/accessibility-help.ts`, and `src/content/evidence/personas.ts`
- [X] T061 Run final lint, unit, integration, accessibility, and build validation from `package.json`
- [X] T062 Update implementation completion notes and unresolved later-scope follow-ups in `specs/001-platform-foundation/tasks.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 Setup**: No dependencies; start here.
- **Phase 2 Foundational**: Depends on Phase 1; blocks every user story.
- **Phase 3 US1**: Depends on Phase 2; recommended MVP slice.
- **Phase 4 US2**: Depends on Phase 2 and can proceed after or alongside US1, but the strongest demo order is US1 then US2.
- **Phase 5 US3**: Depends on Phase 2 and uses track content from US2, so implement after US2 for the cleanest flow.
- **Phase 6 US4**: Depends on Phase 2 and should be verified against each completed story route.
- **Phase 7 US5**: Depends on Phase 2 and can run in parallel with UI stories after shared content types exist.
- **Phase 8 Polish**: Depends on all desired stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational; no dependency on other stories.
- **User Story 2 (P1)**: Can start after Foundational; no dependency on US1 for content, but navigation from US1 improves demo flow.
- **User Story 3 (P2)**: Depends on track/topic content from US2 for stable routes and topic lookup.
- **User Story 4 (P2)**: Can start after Foundational, then should be re-run after US1, US2, and US3 routes exist.
- **User Story 5 (P3)**: Can start after Foundational; evidence can be implemented independently of route completion.

### Within Each User Story

- Write story-specific tests before implementation when a test task exists.
- Content models before views that consume them.
- Components before route files that compose them.
- Route/page implementation before integration validation.
- Complete each checkpoint before moving to the next priority if working sequentially.

### Parallel Opportunities

- Setup tasks T003-T007 can run in parallel after T001-T002.
- Foundational content/helper tasks T009-T013 and validation tasks T016-T018 can run in parallel once shared types exist.
- In US1, T019-T022 can run in parallel before T023-T025.
- In US2, T026-T029 can run in parallel before T030-T033.
- In US3, T034-T037 can run in parallel before T038-T041.
- In US4, T042-T046 can run in parallel before T047-T050.
- In US5, T051-T054 can run in parallel before T055-T056.
- Polish tasks T057-T060 can run in parallel before final validation T061-T062.

---

## Parallel Example: User Story 1

```text
Task: "T019 [P] [US1] Add home introduction rendering tests for Diogenes identity, platform purpose, and primary next actions in tests/unit/content/home-content.test.ts"
Task: "T020 [P] [US1] Add home page integration checks for desktop and mobile primary navigation reachability in tests/integration/foundation-flow.spec.ts"
Task: "T021 [P] [US1] Create home view content composition in src/features/foundation/views/home-view.tsx"
Task: "T022 [P] [US1] Create introduction and next-action components in src/features/foundation/components/home-introduction.tsx and src/features/foundation/components/primary-actions.tsx"
```

## Parallel Example: User Story 2

```text
Task: "T026 [P] [US2] Add learning track model validation tests for unique slugs, required topics, and scan-friendly track count in tests/unit/content/tracks-content.test.ts"
Task: "T028 [P] [US2] Create curated learning tracks and topic summaries in src/content/tracks.ts"
Task: "T029 [P] [US2] Create track overview card and topic link components in src/features/foundation/components/track-card.tsx and src/features/foundation/components/topic-link-list.tsx"
```

## Parallel Example: User Story 3

```text
Task: "T034 [P] [US3] Add topic route generation and invalid slug behavior tests in tests/unit/content/topic-routing.test.ts"
Task: "T036 [P] [US3] Create topic route lookup helpers in src/content/topic-routes.ts"
Task: "T037 [P] [US3] Create topic detail components in src/features/foundation/components/topic-header.tsx, src/features/foundation/components/topic-study-card.tsx, and src/features/foundation/components/topic-next-action.tsx"
```

## Parallel Example: User Story 4

```text
Task: "T042 [P] [US4] Add keyboard navigation integration checks for skip link, primary nav, track/topic links, and accessibility help in tests/integration/accessibility.spec.ts"
Task: "T043 [P] [US4] Add axe accessibility checks for home, tracks, topic detail, and accessibility help routes in tests/integration/accessibility.spec.ts"
Task: "T045 [P] [US4] Create accessibility help content sections in src/content/accessibility-help.ts"
Task: "T046 [P] [US4] Create theme toggle component with accessible name and state in src/features/foundation/components/theme-toggle.tsx"
```

## Parallel Example: User Story 5

```text
Task: "T051 [P] [US5] Add assignment evidence validation tests for persona, IA, wireframe notes, heuristic findings, and iteration notes in tests/unit/content/assignment-evidence.test.ts"
Task: "T052 [P] [US5] Create beginner-student persona evidence in src/content/evidence/personas.ts"
Task: "T053 [P] [US5] Create information architecture and wireframe-oriented evidence in src/content/evidence/information-architecture.ts"
Task: "T054 [P] [US5] Create heuristic evaluation findings and iteration notes in src/content/evidence/heuristic-evaluation.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 setup.
2. Complete Phase 2 foundational shell, content types, navigation, theme helpers, and base validation.
3. Complete Phase 3 User Story 1.
4. Stop and validate `/` independently against US1 success criteria.

### Incremental Delivery

1. Add US1 to establish platform purpose and navigation entry.
2. Add US2 to make learning tracks discoverable.
3. Add US3 to complete the basic learning flow.
4. Add US4 to validate and refine accessibility across completed routes.
5. Add US5 to preserve class assignment evidence.
6. Complete Phase 8 for responsive, accessibility, static build, and presentation readiness.

### Parallel Team Strategy

1. Complete Setup and Foundational phases together.
2. Split content-heavy tasks and UI-heavy tasks by file path.
3. Keep US4 accessibility checks running as each route lands.
4. Merge only at story checkpoints so each increment remains independently demonstrable.

## Notes

- Do not add dashboard, chatbot, account, backend, community, external integration, map, calendar, or game mechanic tasks.
- Keep shadcn usage limited to copied primitives needed by the foundation UI.
- Preserve static export compatibility while implementing route and content tasks.
- Treat accessibility and assignment evidence as part of the foundation, not as late polish.
- Implementation completed on 2026-06-02. Validation passed with `pnpm lint`, `pnpm test`, `pnpm test:e2e`, and `pnpm build`.
