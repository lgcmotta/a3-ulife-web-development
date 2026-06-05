# Tasks: Language Support

**Input**: Design documents from `/specs/008-language-support/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [quickstart.md](./quickstart.md), [contracts/language-preference-contract.md](./contracts/language-preference-contract.md), [contracts/language-toggle-ui-contract.md](./contracts/language-toggle-ui-contract.md), [contracts/localized-markdown-contract.md](./contracts/localized-markdown-contract.md), [contracts/translation-message-contract.md](./contracts/translation-message-contract.md)

**Tests**: Required by the plan and constitution, but intentionally focused. Use unit/component tests for message parity, locale preference behavior, language toggle state, content slug parity, and localized Markdown file selection. Do not add broad e2e translation coverage, language-detection heuristics for Markdown prose, dev-server visual checks, screenshots, or agent-run manual browser validation.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Add the dependency, directories, and evidence skeleton needed before implementation.

- [X] T001 Add `next-intl@4.13.0` to `package.json` and `pnpm-lock.yaml`
- [X] T002 Create localization directories in `messages/`, `src/i18n/`, `src/content/locales/en/`, `src/content/locales/pt-BR/`, `src/content/learning-sections/en/`, `src/content/learning-sections/pt-BR/`, and `tests/unit/i18n/`
- [X] T003 [P] Create implementation evidence skeleton in `specs/008-language-support/implementation-evidence.md`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core language infrastructure that must exist before story work can compile.

**Critical**: No user story work should begin until this phase is complete.

- [X] T004 Implement supported locale constants, default locale, flag glyph metadata, and validation helpers in `src/i18n/locales.ts`
- [X] T005 Create initial matching message catalog files in `messages/en.json` and `messages/pt-BR.json`
- [X] T006 Configure `next-intl` request loading and provider wiring in `next.config.ts`, `src/i18n/request.ts`, and `src/app/layout.tsx`
- [X] T007 Implement browser-local language preference helpers, cookie/client snapshot writes, DOM language application, and subscription notifications in `src/storage/language-preference.ts`
- [X] T008 [P] Add language preference test reset support in `tests/unit/setup.ts`

**Checkpoint**: Foundation ready - user story implementation can now begin.

---

## Phase 3: User Story 1 - Choose Interface Language (Priority: P1) MVP

**Goal**: A student can select English or Portuguese (Brazil), and the application shell, controls, labels, statuses, and assistive text use the selected language.

**Independent Test**: Run focused unit/component tests for message key parity, locale fallback/write behavior, representative translation rendering, and existing default-English app tests. Confirm no broad e2e translation checks are required.

### Tests for User Story 1

- [X] T009 [P] [US1] Add message catalog key-shape and non-empty value tests in `tests/unit/i18n/message-catalog.test.ts`
- [X] T010 [P] [US1] Add language preference fallback, cookie/client snapshot, DOM application, and theme-preservation tests in `tests/unit/storage/language-preference.test.ts`
- [X] T011 [P] [US1] Add one representative translated visible-label and assistive-label rendering test in `tests/unit/i18n/translation-rendering.test.tsx`

### Implementation for User Story 1

- [X] T012 [US1] Fill UI and assistive message keys for layout, navigation, preferences, shared actions, statuses, and errors in `messages/en.json` and `messages/pt-BR.json`
- [X] T013 [US1] Localize metadata, root `lang`, skip link, and provider usage in `src/app/layout.tsx`
- [X] T014 [US1] Localize brand, primary navigation labels, navigation descriptions, and header accessible names in `src/features/foundation/components/site-header.tsx`, `src/features/foundation/components/primary-navigation.tsx`, and `src/routes/navigation.ts`
- [X] T015 [P] [US1] Localize home page visible and assistive UI strings in `src/app/page.tsx`, `src/features/foundation/views/home-view.tsx`, `src/features/foundation/components/home-introduction.tsx`, and `src/features/foundation/components/primary-actions.tsx`
- [X] T016 [P] [US1] Localize learning-tracks page controls and non-content UI strings in `src/app/tracks/page.tsx`, `src/features/foundation/views/tracks-view.tsx`, `src/features/foundation/components/track-card.tsx`, `src/features/foundation/components/topic-link-list.tsx`, and `src/features/foundation/components/topic-next-action.tsx`
- [X] T017 [P] [US1] Localize accessibility page UI strings and assistive labels in `src/app/accessibility/page.tsx` and `src/features/foundation/views/accessibility-view.tsx`
- [X] T018 [P] [US1] Localize student-area shell, builder, history, tabs, empty states, menus, dialogs, feedback, and action labels in `src/features/student-area/views/student-area-shell.tsx`, `src/features/student-area/views/student-builder-view.tsx`, `src/features/student-area/views/student-history-view.tsx`, `src/features/student-area/components/student-tabs.tsx`, `src/features/student-area/components/empty-history-state.tsx`, `src/features/student-area/components/builder-action-bar.tsx`, `src/features/student-area/components/builder-confirmation-dialogs.tsx`, `src/features/student-area/components/path-item-context-menu.tsx`, and `src/features/student-area/components/student-feedback.tsx`
- [X] T019 [P] [US1] Localize learning-topic action labels, completion UI, and learning-section error messages in `src/features/student-area/components/learning-topic-actions.tsx`, `src/features/student-area/views/learning-section-view.tsx`, and `src/features/student-area/views/learning-complete-view.tsx`
- [X] T020 [US1] Update existing tests that rely on default English labels in `tests/unit/accessibility/theme-control.test.ts`, `tests/integration/accessibility.spec.ts`, `tests/integration/foundation-flow.spec.ts`, `tests/integration/student-area-entry.spec.ts`, `tests/integration/student-area-builder-selection.spec.ts`, `tests/integration/student-area-builder-persistence.spec.ts`, `tests/integration/student-area-history.spec.ts`, and `tests/integration/student-area-learning-flow.spec.ts`

**Checkpoint**: User Story 1 is functional with focused tests and default English behavior preserved.

---

## Phase 4: User Story 2 - Read Topic Content In Selected Language (Priority: P2)

**Goal**: Topic metadata and long-form Markdown content are served from English or Portuguese (Brazil) files based on the selected language, with Markdown prose kept separate from UI message catalogs.

**Independent Test**: Run content slug parity tests and Markdown loader tests. Verify that requesting `en` returns an English-locale file identity and requesting `pt-BR` returns a Portuguese-locale file identity. Do not test whether prose is actually English or Portuguese.

### Tests for User Story 2

- [X] T021 [P] [US2] Add localized track/topic slug parity tests in `tests/unit/content/localized-tracks-content.test.ts`
- [X] T022 [P] [US2] Update Markdown loader tests to assert returned locale, file path, and file name for `en` and `pt-BR` in `tests/unit/server/learning-content/markdown.test.ts`
- [X] T023 [P] [US2] Update learning-section file coverage tests to verify each published topic has `en` and `pt-BR` Markdown files without prose language detection in `tests/unit/content/learning-sections.test.ts`

### Implementation for User Story 2

- [X] T024 [US2] Add locale-aware content getters and stable slug helpers in `src/content/locales/index.ts`
- [X] T025 [P] [US2] Move current English content into `src/content/locales/en/diogenes.ts`, `src/content/locales/en/accessibility-help.ts`, `src/content/locales/en/tracks.ts`, `src/content/locales/en/evidence/personas.ts`, `src/content/locales/en/evidence/information-architecture.ts`, and `src/content/locales/en/evidence/heuristic-evaluation.ts`
- [X] T026 [P] [US2] Create Portuguese (Brazil) content counterparts in `src/content/locales/pt-BR/diogenes.ts`, `src/content/locales/pt-BR/accessibility-help.ts`, `src/content/locales/pt-BR/tracks.ts`, `src/content/locales/pt-BR/evidence/personas.ts`, `src/content/locales/pt-BR/evidence/information-architecture.ts`, and `src/content/locales/pt-BR/evidence/heuristic-evaluation.ts`
- [X] T027 [US2] Update compatibility exports or locale-aware accessors in `src/content/diogenes.ts`, `src/content/accessibility-help.ts`, `src/content/tracks.ts`, `src/content/evidence/personas.ts`, `src/content/evidence/information-architecture.ts`, and `src/content/evidence/heuristic-evaluation.ts`
- [X] T028 [US2] Update route and catalog helpers to preserve stable slugs while accepting localized content in `src/content/topic-routes.ts` and `src/server/student-area/catalog.ts`
- [X] T029 [US2] Move existing English Markdown files from `src/content/learning-sections/*.md` into `src/content/learning-sections/en/` and update `src/content/learning-sections/README.md`
- [X] T030 [US2] Add translated Portuguese Markdown files for all current topics under `src/content/learning-sections/pt-BR/`
- [X] T031 [US2] Update `loadLearningSectionMarkdown(topicSlug, locale)` to validate locale, read the selected locale file, and return locale/file identity in `src/server/learning-content/markdown.ts`
- [X] T032 [US2] Update public topic routes and views to request localized catalog content in `src/app/tracks/[trackSlug]/[topicSlug]/page.tsx`, `src/features/foundation/views/topic-view.tsx`, `src/features/foundation/components/topic-header.tsx`, and `src/features/foundation/components/topic-study-card.tsx`
- [X] T033 [US2] Update saved-path learning views to request localized topic context and selected-locale Markdown in `src/app/tracks/learn/[pathId]/[topicSlug]/page.tsx`, `src/features/student-area/views/learning-section-view.tsx`, and `src/features/student-area/components/learning-section-content.tsx`

**Checkpoint**: User Story 2 is functional with localized content files and file-selection tests.

---

## Phase 5: User Story 3 - Use A Familiar Language Control (Priority: P3)

**Goal**: The language control appears with the existing preference controls, uses United States and Brazil flag glyphs as decorative icons, exposes accessible names and selected state, and writes the selected language.

**Independent Test**: Run component tests for the language toggle and helper tests for preference writes. Manual mobile, desktop, and high-contrast visual review is user-owned and not agent-run.

### Tests for User Story 3

- [X] T034 [P] [US3] Add language toggle component tests for default English, Portuguese selection, English reselection, selected state, accessible labels, and preference writes in `tests/unit/accessibility/language-control.test.tsx`

### Implementation for User Story 3

- [X] T035 [US3] Implement `LanguageToggle` with decorative United States and Brazil flag glyphs, accessible labels, selected state, keyboard operation, and route refresh behavior in `src/features/foundation/components/language-toggle.tsx`
- [X] T036 [US3] Render `LanguageToggle` beside `ThemeToggle` in `src/features/foundation/components/site-header.tsx`
- [X] T037 [US3] Add language-control CSS that follows the existing preference-control rhythm without adding visual-test requirements in `src/app/globals.css`
- [X] T038 [US3] Keep `ThemeToggle` behavior unchanged while sharing preference-control styles in `src/features/foundation/components/theme-toggle.tsx` and `src/app/globals.css`

**Checkpoint**: User Story 3 is functional with focused component tests.

---

## Phase 6: User Story 4 - Review Bilingual Evidence For Presentation (Priority: P4)

**Goal**: The project team has concise implementation evidence separating automated coverage from user-owned manual visual and wording review.

**Independent Test**: Open `specs/008-language-support/implementation-evidence.md` and confirm it records message/file coverage, helper/component test coverage, command results, and a user-owned manual review checklist.

### Implementation for User Story 4

- [X] T039 [US4] Add sections for message catalog coverage, localized content coverage, Markdown file coverage, focused tests, command results, open issues, and user-owned manual review in `specs/008-language-support/implementation-evidence.md`
- [X] T040 [US4] Record message key parity and localized content slug coverage results in `specs/008-language-support/implementation-evidence.md`
- [X] T041 [US4] Record Markdown file coverage and representative loader file-identity checks in `specs/008-language-support/implementation-evidence.md`
- [X] T042 [US4] Record that mobile, desktop, high-contrast, and final Portuguese wording review are manual user-owned checks in `specs/008-language-support/implementation-evidence.md`

**Checkpoint**: User Story 4 evidence is ready for class-facing review.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Final checks and cleanup across the completed feature.

- [X] T043 Audit remaining hardcoded user-visible or assistive strings in `src/` and record intentional exceptions in `specs/008-language-support/implementation-evidence.md`
- [X] T044 Verify no implementation task introduced broad e2e translation coverage, prose language-detection tests, dev-server visual validation, or screenshot requirements in `specs/008-language-support/tasks.md` and `specs/008-language-support/implementation-evidence.md`
- [X] T045 Run `pnpm lint` and record the result in `specs/008-language-support/implementation-evidence.md`
- [X] T046 Run `pnpm test` and record the result in `specs/008-language-support/implementation-evidence.md`
- [X] T047 Run `pnpm build` and record the result in `specs/008-language-support/implementation-evidence.md`
- [X] T048 Validate final responsibility boundaries and confirm no student progress, saved path, Redis, or hidden storage mutation behavior changed in `specs/008-language-support/implementation-evidence.md`

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - blocks all user stories
- **User Story 1 (Phase 3)**: Depends on Foundational completion - MVP
- **User Story 2 (Phase 4)**: Depends on Foundational completion and integrates with localized shell behavior from User Story 1
- **User Story 3 (Phase 5)**: Depends on Foundational completion and can proceed after message/preference helpers exist
- **User Story 4 (Phase 6)**: Can start after Setup, but final evidence depends on completed desired stories
- **Polish (Phase 7)**: Depends on all desired stories being complete

### User Story Dependencies

- **US1 - Choose Interface Language**: MVP after Foundational; provides UI/assistive message usage across existing surfaces
- **US2 - Read Topic Content In Selected Language**: Depends on locale helpers and should integrate with US1 selected-locale behavior; independently verified by file-selection and slug-parity tests
- **US3 - Use A Familiar Language Control**: Depends on locale preference helpers and message keys; independently verified by component tests
- **US4 - Review Bilingual Evidence For Presentation**: Depends on evidence skeleton and accumulates results from US1-US3 plus final commands

### Within Each User Story

- Focused tests should be written before implementation tasks where listed
- Tests must be independent, order-independent, and parallel-safe
- Locale helpers and message catalogs must exist before localized views compile
- Markdown loader changes must happen before saved-path learning views can request localized Markdown
- Do not add broad e2e translation coverage or agent-run visual validation

### Parallel Opportunities

- T003 can run in parallel with dependency setup
- T008 can run in parallel with message/request helper implementation after T004 is underway
- T009, T010, and T011 can run in parallel
- T015, T016, T017, T018, and T019 can run in parallel after T012-T014 establish message/provider patterns
- T021, T022, and T023 can run in parallel
- T025 and T026 can run in parallel after T024 defines the locale content shape
- US2 content work and US3 control work can proceed in parallel after Foundational completion

---

## Parallel Example: User Story 1

```bash
Task: "Add message catalog key-shape and non-empty value tests in tests/unit/i18n/message-catalog.test.ts"
Task: "Add language preference fallback, cookie/client snapshot, DOM application, and theme-preservation tests in tests/unit/storage/language-preference.test.ts"
Task: "Add one representative translated visible-label and assistive-label rendering test in tests/unit/i18n/translation-rendering.test.tsx"
```

---

## Parallel Example: User Story 2

```bash
Task: "Add localized track/topic slug parity tests in tests/unit/content/localized-tracks-content.test.ts"
Task: "Update Markdown loader tests to assert returned locale, file path, and file name for en and pt-BR in tests/unit/server/learning-content/markdown.test.ts"
Task: "Update learning-section file coverage tests to verify each published topic has en and pt-BR Markdown files without prose language detection in tests/unit/content/learning-sections.test.ts"
```

---

## Parallel Example: User Story 3

```bash
Task: "Implement LanguageToggle with decorative United States and Brazil flag glyphs, accessible labels, selected state, keyboard operation, and route refresh behavior in src/features/foundation/components/language-toggle.tsx"
Task: "Add language-control CSS that follows the existing preference-control rhythm without adding visual-test requirements in src/app/globals.css"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. Stop and validate with focused unit/component tests for message parity, preference behavior, and representative rendering
5. Continue only after default English behavior remains intact

### Incremental Delivery

1. Add shared i18n infrastructure
2. Add US1 interface and assistive text localization
3. Add US2 localized content and Markdown file selection
4. Add US3 language control
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

- [P] tasks = different files, no dependencies on incomplete tasks
- [US1], [US2], [US3], and [US4] labels map to the prioritized user stories in `spec.md`
- File paths are intentionally explicit so `/speckit-implement` can execute without rediscovering the feature shape
- Keep implementation small and direct; this feature is mostly message lookup, locale selection, content file organization, and targeted tests
