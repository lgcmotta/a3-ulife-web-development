# Tasks: Language Support i18n Catalog Refactor

**Input**: Design documents from `/specs/008-language-support/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [quickstart.md](./quickstart.md), [contracts/language-preference-contract.md](./contracts/language-preference-contract.md), [contracts/language-toggle-ui-contract.md](./contracts/language-toggle-ui-contract.md), [contracts/localized-markdown-contract.md](./contracts/localized-markdown-contract.md), [contracts/translation-message-contract.md](./contracts/translation-message-contract.md)

**Tests**: Required by the plan and constitution, but intentionally focused. Use unit/component tests for composed message parity, typed translation rendering, representative structured reads, locale preference behavior, language toggle state, content slug parity, and localized Markdown file selection. Do not add broad e2e translation coverage, Markdown prose language-detection heuristics, dev-server visual checks, screenshots, or agent-run manual browser validation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Prepare the existing implementation for an in-place message catalog refactor.

- [X] T001 Create domain message directories in `src/i18n/messages/en/` and `src/i18n/messages/pt-BR/`
- [X] T002 [P] Add catalog-refactor tracking sections to `specs/008-language-support/implementation-evidence.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Shared catalog, typing, and stable-key infrastructure that must exist before user-story code can compile.

**Critical**: No user story work should begin until this phase is complete.

- [X] T003 Split root message catalogs into domain JSON files under `src/i18n/messages/en/` and `src/i18n/messages/pt-BR/`
- [X] T004 Create composed locale catalogs in `src/i18n/messages/en.ts` and `src/i18n/messages/pt-BR.ts`
- [X] T005 Add minimal `next-intl` module augmentation using `typeof enMessages` in `src/i18n/messages.d.ts`
- [X] T006 Update selected-locale catalog loading to import composed catalogs in `src/i18n/messages.ts`
- [X] T007 Extract stable track/topic slug order and semantic ids without translated prose in `src/content/catalog-structure.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Choose Interface Language (Priority: P1) MVP

**Goal**: A student can select English or Portuguese (Brazil), and all interface, assistive, status, and non-Markdown product text uses the selected language through the composed message catalog.

**Independent Test**: Run focused unit/component tests for composed message key parity, locale fallback/write behavior, representative typed translation rendering, representative structured reads, and default-English behavior. Confirm no broad e2e translation checks are required.

### Tests for User Story 1

- [X] T008 [P] [US1] Update composed catalog key-shape and non-empty value tests in `tests/unit/i18n/message-catalog.test.ts`
- [X] T009 [P] [US1] Update representative typed visible-label and assistive-label rendering tests in `tests/unit/i18n/translation-rendering.test.tsx`
- [X] T010 [P] [US1] Add representative structured `t.raw(...)` catalog tests in `tests/unit/i18n/structured-message-catalog.test.ts`
- [X] T011 [P] [US1] Add regression coverage that root `messages/en.json` and `messages/pt-BR.json` are no longer imported in `tests/unit/i18n/message-catalog.test.ts`

### Implementation for User Story 1

- [X] T012 [US1] Move layout, metadata, brand, actions, navigation, preferences, shared status, and error messages into domain files in `src/i18n/messages/en/` and `src/i18n/messages/pt-BR/`
- [X] T013 [US1] Update message imports from root catalogs to composed catalogs in `src/i18n/messages.ts`, `tests/unit/i18n/message-catalog.test.ts`, `tests/unit/i18n/translation-rendering.test.tsx`, and `tests/unit/content/home-content.test.ts`
- [X] T014 [US1] Remove obsolete root message files `messages/en.json` and `messages/pt-BR.json`
- [X] T015 [US1] Replace home profile and home principles hardcoded content with `useTranslations` and limited `t.raw(...)` usage in `src/features/foundation/components/home-introduction.tsx` and `src/features/foundation/views/home-view.tsx`
- [X] T016 [US1] Replace accessibility help and assignment evidence hardcoded content with message catalog lookups in `src/features/foundation/views/accessibility-view.tsx`
- [X] T017 [US1] Migrate home, accessibility, and evidence prose from `src/content/locales/en/`, `src/content/locales/pt-BR/`, and `src/content/evidence/` into `src/i18n/messages/en/` and `src/i18n/messages/pt-BR/`

**Checkpoint**: User Story 1 is functional with composed catalogs, typed keys, representative structured reads, and default English behavior preserved.

---

## Phase 4: User Story 2 - Read Topic Content In Selected Language (Priority: P2)

**Goal**: Topic metadata is supplied by the selected message catalog, while long-form Markdown content remains selected from separate per-locale Markdown files.

**Independent Test**: Run localized track/topic semantic-key parity tests and Markdown loader tests. Verify that requesting `en` returns an English-locale file identity and requesting `pt-BR` returns a Portuguese-locale file identity. Do not test whether prose is actually English or Portuguese.

### Tests for User Story 2

- [X] T018 [P] [US2] Update localized track/topic semantic-key parity tests in `tests/unit/content/localized-tracks-content.test.ts`
- [X] T019 [P] [US2] Update English compatibility content tests for catalog-backed tracks in `tests/unit/content/tracks-content.test.ts` and `tests/unit/content/topic-routing.test.ts`
- [X] T020 [P] [US2] Update Markdown file coverage tests to use catalog-backed track/topic slugs in `tests/unit/content/learning-sections.test.ts`
- [X] T021 [P] [US2] Keep Markdown loader file-identity tests focused on locale and file path in `tests/unit/server/learning-content/markdown.test.ts`

### Implementation for User Story 2

- [X] T022 [US2] Migrate track and topic metadata from `src/content/locales/en/tracks.ts` and `src/content/locales/pt-BR/tracks.ts` into `src/i18n/messages/en/tracks.json`, `src/i18n/messages/en/topics.json`, `src/i18n/messages/pt-BR/tracks.json`, and `src/i18n/messages/pt-BR/topics.json`
- [X] T023 [US2] Refactor localized content assembly helpers to read selected messages instead of translated TypeScript constants in `src/content/locales/index.ts`
- [X] T024 [US2] Update stable route and storage catalog helpers for catalog-backed tracks in `src/content/topic-routes.ts`, `src/content/tracks.ts`, and `src/server/student-area/catalog.ts`
- [X] T025 [US2] Update public track and home views to consume catalog-backed tracks in `src/features/foundation/views/tracks-view.tsx`, `src/features/foundation/views/home-view.tsx`, and `src/features/foundation/components/track-card.tsx`
- [X] T026 [US2] Update public topic route and topic components to consume catalog-backed topic metadata in `src/app/tracks/[trackSlug]/[topicSlug]/page.tsx`, `src/features/foundation/views/topic-view.tsx`, `src/features/foundation/components/topic-header.tsx`, and `src/features/foundation/components/topic-study-card.tsx`
- [X] T027 [US2] Update student-area builder, history, and path actions to use catalog-backed tracks while preserving saved-path/progress behavior in `src/features/student-area/views/student-builder-view.tsx`, `src/features/student-area/views/student-history-view.tsx`, and `src/features/student-area/actions/student-path-actions.ts`
- [X] T028 [US2] Update learning-section route and view code to use catalog-backed topic metadata while keeping Markdown loading separate in `src/app/tracks/learn/[pathId]/[topicSlug]/page.tsx`, `src/features/student-area/views/learning-section-view.tsx`, and `src/features/student-area/components/learning-section-content.tsx`
- [X] T029 [US2] Remove or shrink translated prose exports in `src/content/locales/en/`, `src/content/locales/pt-BR/`, `src/content/diogenes.ts`, `src/content/accessibility-help.ts`, and `src/content/evidence/`

**Checkpoint**: User Story 2 is functional with catalog-backed metadata and separate Markdown file-selection tests.

---

## Phase 5: User Story 3 - Use A Familiar Language Control (Priority: P3)

**Goal**: The language control keeps the existing preference-control behavior while using typed catalog keys and the relocated message catalogs.

**Independent Test**: Run component tests for the language toggle and helper tests for preference writes. Manual mobile, desktop, and high-contrast visual review is user-owned and not agent-run.

### Tests for User Story 3

- [X] T030 [P] [US3] Update language toggle component tests for relocated composed catalogs in `tests/unit/accessibility/language-control.test.tsx`

### Implementation for User Story 3

- [X] T031 [US3] Update `LanguageToggle` label usage to typed semantic preference keys in `src/features/foundation/components/language-toggle.tsx`
- [X] T032 [US3] Update `SiteHeader` language label wiring to use composed catalog keys without function props in `src/features/foundation/components/site-header.tsx`

**Checkpoint**: User Story 3 is functional with focused component tests and unchanged visual behavior.

---

## Phase 6: User Story 4 - Review Bilingual Evidence For Presentation (Priority: P4)

**Goal**: The project team has concise implementation evidence that distinguishes catalog coverage, Markdown coverage, automated validation, and user-owned manual review.

**Independent Test**: Open `specs/008-language-support/implementation-evidence.md` and confirm it records domain catalog coverage, composed key parity, typed translation checks, Markdown file coverage, command results, and a user-owned manual review checklist.

### Implementation for User Story 4

- [X] T033 [US4] Record domain message files, composed catalog parity, and module augmentation coverage in `specs/008-language-support/implementation-evidence.md`
- [X] T034 [US4] Record that non-Markdown translated strings are supplied by `src/i18n/messages/` and that Markdown remains under `src/content/learning-sections/` in `specs/008-language-support/implementation-evidence.md`
- [X] T035 [US4] Record focused test coverage, command results, open issues, and user-owned visual/wording review boundaries in `specs/008-language-support/implementation-evidence.md`

**Checkpoint**: User Story 4 evidence is ready for class-facing review.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final checks and cleanup across the refactor.

- [X] T036 Audit remaining hardcoded user-visible or assistive strings in `src/` and record intentional exceptions in `specs/008-language-support/implementation-evidence.md`
- [X] T037 Audit obsolete root catalog and localized translated-prose imports in `src/`, `tests/`, and `specs/008-language-support/implementation-evidence.md`
- [X] T038 Verify no task introduced broad e2e translation coverage, Markdown prose language-detection tests, dev-server visual validation, or screenshot requirements in `specs/008-language-support/tasks.md`
- [X] T039 Run `pnpm lint` and record the result in `specs/008-language-support/implementation-evidence.md`
- [X] T040 Run `pnpm test` and record the result in `specs/008-language-support/implementation-evidence.md`
- [X] T041 Run `pnpm build` and record the result in `specs/008-language-support/implementation-evidence.md`
- [X] T042 Validate final responsibility boundaries and confirm no student progress, saved path, Redis, route prefix, or backend persistence behavior changed in `specs/008-language-support/implementation-evidence.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational completion - MVP for the refactor
- **User Story 2 (Phase 4)**: Depends on Foundational completion and integrates with catalog composition from User Story 1
- **User Story 3 (Phase 5)**: Depends on Foundational completion and can proceed after preference message domains exist
- **User Story 4 (Phase 6)**: Can start after Setup, but final evidence depends on completed desired stories
- **Polish (Phase 7)**: Depends on all desired stories being complete

### User Story Dependencies

- **US1 - Choose Interface Language**: MVP after Foundational; provides composed catalog and non-Markdown catalog usage across visible/assistive surfaces
- **US2 - Read Topic Content In Selected Language**: Depends on stable catalog composition and slug structure; independently verified by semantic-key parity and Markdown file-selection tests
- **US3 - Use A Familiar Language Control**: Depends on preference message domains and language preference helpers; independently verified by component tests
- **US4 - Review Bilingual Evidence For Presentation**: Depends on evidence skeleton and accumulates results from US1-US3 plus final commands

### Within Each User Story

- Focused tests should be written before implementation tasks where listed
- Tests must be independent, order-independent, and parallel-safe
- Domain JSON files and composed catalogs must exist before localized call sites compile
- Stable slug structure must exist before catalog-backed track/topic helpers are refactored
- Markdown loader behavior must remain separate from message catalog refactoring
- Do not add broad e2e translation coverage or agent-run visual validation

### Parallel Opportunities

- T002 can run in parallel with T001
- T008, T009, T010, and T011 can run in parallel after T004-T006 exist
- T015, T016, and T017 can run in parallel after T012-T014 establish the domain catalog structure
- T018, T019, T020, and T021 can run in parallel
- T025, T026, T027, and T028 can run in parallel after T022-T024
- US2 catalog-backed content work and US3 control-key updates can proceed in parallel after Foundational completion

---

## Parallel Example: User Story 1

```bash
Task: "Update composed catalog key-shape and non-empty value tests in tests/unit/i18n/message-catalog.test.ts"
Task: "Update representative typed visible-label and assistive-label rendering tests in tests/unit/i18n/translation-rendering.test.tsx"
Task: "Add representative structured t.raw(...) catalog tests in tests/unit/i18n/structured-message-catalog.test.ts"
```

---

## Parallel Example: User Story 2

```bash
Task: "Update localized track/topic semantic-key parity tests in tests/unit/content/localized-tracks-content.test.ts"
Task: "Update Markdown file coverage tests to use catalog-backed track/topic slugs in tests/unit/content/learning-sections.test.ts"
Task: "Keep Markdown loader file-identity tests focused on locale and file path in tests/unit/server/learning-content/markdown.test.ts"
```

---

## Parallel Example: User Story 3

```bash
Task: "Update language toggle component tests for relocated composed catalogs in tests/unit/accessibility/language-control.test.tsx"
Task: "Update LanguageToggle label usage to typed semantic preference keys in src/features/foundation/components/language-toggle.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Stop and validate with focused unit/component tests for composed catalog parity, typed translation rendering, structured reads, and preference behavior
5. Continue only after default English behavior remains intact

### Incremental Delivery

1. Establish domain-split message files, composed catalogs, and module augmentation
2. Add US1 interface, assistive, home, accessibility, and evidence catalog usage
3. Add US2 catalog-backed track/topic metadata while preserving localized Markdown selection
4. Add US3 language-control key updates
5. Add US4 evidence
6. Run final `pnpm lint`, `pnpm test`, and `pnpm build`

### Verification Boundary

- Required automated validation: `pnpm lint`, `pnpm test`, `pnpm build`
- Do not run the dev server for manual inspection if those commands pass
- Do not add broad e2e translation checks
- Do not add automated tests that infer whether Markdown prose is English or Portuguese
- Manual visual/mobile/high-contrast review and final Portuguese wording review are user-owned

---

## Notes

- `P` tasks = different files, no dependencies on incomplete tasks
- `US1`, `US2`, `US3`, and `US4` labels map to the prioritized user stories in `spec.md`
- File paths are intentionally explicit so `/speckit-implement` can execute without rediscovering the feature shape
- Keep implementation small and direct; this refactor is catalog organization, typed message inference, structured content lookup, Markdown separation, and targeted tests
