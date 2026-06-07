# Tasks: Ask Diogenes Chatbot

**Input**: Design documents from `/specs/010-ask-diogenes-chatbot/`

**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/)

**Tests**: Required by the specification, plan, and constitution. Automated implementation verification is limited to unit tests and e2e tests.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Implementation Guardrails

- Keep this implementation low effort: one small widget, two locale JSON files, existing message imports, focused tests, and one evidence note file.
- Reuse existing helpers, hooks, providers, and installed shadcn-chatbot-kit display pieces where practical; create new helpers only when reusing an existing one would risk behavior in another section.
- Do not add Redis conversation history, browser-local chat history, server routes, storage helpers, AI adapters, AI SDKs, chatbot APIs, natural-language parsing, audio input, file attachments, or free-form message input.
- Do not run the application, open localhost, use a browser/screenshot tool, or visually inspect placement as an automated implementation step. Widget placement review belongs to the human owner.
- Automated implementation may run only `pnpm test` and `pnpm test:e2e` for verification. If placement or visual polish is wrong, the human owner will request fixes.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel with other tasks in the same phase because it touches different files and has no dependency on incomplete work.
- **[Story]**: Maps the task to a user story phase only.
- Every task includes exact file paths.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the existing project surface and create the assignment evidence shell without adding unnecessary infrastructure.

- [X] T001 Review existing reusable UI and provider files in `src/ui/components/chat-message.tsx`, `src/ui/components/typing-indicator.tsx`, `src/ui/components/prompt-suggestions.tsx`, `src/features/foundation/components/preference-providers.tsx`, and `src/app/layout.tsx`; record the reuse decision in `specs/010-ask-diogenes-chatbot/implementation-evidence.md`.
- [X] T002 Create `specs/010-ask-diogenes-chatbot/implementation-evidence.md` with sections for Prompt Map, Widget States, Accessibility Review, Heuristic Evaluation, Iteration Notes, Test Results, and Human UI Placement Review.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Add the deterministic localized script contract and block scope creep before any user story implementation.

**CRITICAL**: No user story work can begin until this phase is complete.

- [X] T003 [P] Add English Ask Diogenes script data with required persona, launcher, panel, actions, and prompt keys in `src/i18n/messages/en/ask-diogenes.json`.
- [X] T004 [P] Add Portuguese Ask Diogenes script data with the same key shape as English in `src/i18n/messages/pt-BR/ask-diogenes.json`.
- [X] T005 Import the Ask Diogenes message catalogs in `src/i18n/messages/en.ts` and `src/i18n/messages/pt-BR.ts`.
- [X] T006 [P] Add a focused message-contract unit test for required prompt IDs, aligned locale keys, and absence of AI/Redis/provider fields in `tests/unit/i18n/ask-diogenes-messages.test.ts`.
- [X] T007 Create the minimal client widget file with local component types, the guided-action allowlist, and no Redis/storage/server imports in `src/features/ask-diogenes/components/ask-diogenes-widget.tsx`.

**Checkpoint**: Locale scripts, imports, and widget shell are ready. No persistence or AI/chatbot integration exists.

---

## Phase 3: User Story 1 - Get Platform Orientation (Priority: P1) MVP

**Goal**: A student opens Ask Diogenes and receives a friendly scripted orientation response with typing feedback.

**Independent Test**: From a fresh page visit, open the widget, select the platform orientation prompt, and verify greeting, prompt choices, typing feedback, and final scripted response.

### Tests for User Story 1

- [X] T008 [P] [US1] Add a component test for opening the empty widget and selecting the orientation prompt in `tests/unit/features/ask-diogenes/ask-diogenes-widget.test.tsx`.
- [X] T009 [P] [US1] Add an e2e test for launcher open, empty state, orientation prompt, typing feedback, and final response in `tests/integration/ask-diogenes-widget.spec.ts`.

### Implementation for User Story 1

- [X] T010 [US1] Implement launcher, open-empty state, greeting, orientation prompt selection, user message, typing delay, and scripted response rendering in `src/features/ask-diogenes/components/ask-diogenes-widget.tsx`.
- [X] T011 [US1] Mount `AskDiogenesWidget` once inside existing providers without changing page content flow in `src/app/layout.tsx`.
- [X] T012 [US1] Update the Prompt Map and Widget States sections for the orientation flow in `specs/010-ask-diogenes-chatbot/implementation-evidence.md`.

**Checkpoint**: User Story 1 is independently functional and testable as the MVP.

---

## Phase 4: User Story 2 - Use Deterministic Guided Prompts (Priority: P2)

**Goal**: Students use only predefined prompts, and every prompt produces deterministic JSON-backed responses.

**Independent Test**: Select every supported prompt from a fresh widget session, verify there is no free-form input, and verify repeated selection returns the same response text.

### Tests for User Story 2

- [X] T013 [P] [US2] Extend component coverage for all required prompts, repeated prompt selection, no textbox, no attachment control, and no audio control in `tests/unit/features/ask-diogenes/ask-diogenes-widget.test.tsx`.
- [X] T014 [P] [US2] Extend e2e coverage for all prompt buttons, deterministic repeated responses, and absence of free-form chat controls in `tests/integration/ask-diogenes-widget.spec.ts`.

### Implementation for User Story 2

- [X] T015 [US2] Render all required prompt buttons from `src/i18n/messages/en/ask-diogenes.json` and `src/i18n/messages/pt-BR/ask-diogenes.json` through `src/features/ask-diogenes/components/ask-diogenes-widget.tsx`.
- [X] T016 [US2] Ensure `src/features/ask-diogenes/components/ask-diogenes-widget.tsx` does not import or render full-chat input, message input, audio, file, attachment, rating, AI status, or send controls from `src/ui/components/chat.tsx`, `src/ui/components/message-input.tsx`, `src/ui/components/audio-visualizer.tsx`, or related kit files.
- [X] T017 [US2] Finalize the full prompt map and deterministic-response notes in `specs/010-ask-diogenes-chatbot/implementation-evidence.md`.

**Checkpoint**: All scripted prompts work without free-form chatbot behavior.

---

## Phase 5: User Story 3 - Follow Simple Guided Actions (Priority: P3)

**Goal**: Assistant responses can offer simple guided actions to existing platform areas without creating new workflows.

**Independent Test**: Select prompts with actions, activate each guided action, and verify navigation or fallback behavior targets only existing routes.

### Tests for User Story 3

- [X] T018 [P] [US3] Add e2e coverage for guided action buttons and existing-route navigation in `tests/integration/ask-diogenes-widget.spec.ts`.

### Implementation for User Story 3

- [X] T019 [US3] Implement the action target allowlist for `openTracks`, `openBuilder`, `openHistory`, `openAccessibility`, and `backHome` in `src/features/ask-diogenes/components/ask-diogenes-widget.tsx`.
- [X] T020 [US3] Render localized guided action controls from JSON action labels while using only allowlisted targets in `src/features/ask-diogenes/components/ask-diogenes-widget.tsx`.
- [X] T021 [US3] Document guided actions and any fallback behavior in `specs/010-ask-diogenes-chatbot/implementation-evidence.md`.

**Checkpoint**: Guided actions lead only to existing platform areas and remain deterministic.

---

## Phase 6: User Story 4 - Use the Assistant Without Disrupting Study (Priority: P4)

**Goal**: Students can use, minimize, close, and reopen the assistant without blocking core study controls, with keyboard and high-contrast support.

**Independent Test**: Use keyboard and high-contrast mode to open, select a prompt, minimize, close, and reopen the widget; verify focus behavior and empty-on-open reset.

### Tests for User Story 4

- [X] T022 [P] [US4] Extend e2e coverage for keyboard open, prompt selection, minimize, close, focus return, empty-on-reopen reset, and high-contrast readability in `tests/integration/ask-diogenes-widget.spec.ts`.
- [X] T023 [P] [US4] Extend component coverage for close/minimize resetting messages and cancelling pending typing feedback in `tests/unit/features/ask-diogenes/ask-diogenes-widget.test.tsx`.

### Implementation for User Story 4

- [X] T024 [US4] Implement close, minimize, Escape handling if consistent with local UI behavior, typing cancellation, and focus return in `src/features/ask-diogenes/components/ask-diogenes-widget.tsx`.
- [X] T025 [US4] Apply minimal responsive and high-contrast-safe classes using existing CSS variables and Tailwind utilities in `src/features/ask-diogenes/components/ask-diogenes-widget.tsx`; avoid global CSS unless the component cannot meet accessibility requirements locally.
- [X] T026 [US4] Complete Accessibility Review, Heuristic Evaluation, Iteration Notes, and Human UI Placement Review instructions in `specs/010-ask-diogenes-chatbot/implementation-evidence.md`.

**Checkpoint**: The assistant supports keyboard, reset, contrast, and non-disruptive usage requirements without automated visual placement approval.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Verify the final implementation while respecting the no-automated-placement-review rule.

- [X] T027 Run unit tests with `pnpm test` from the repository root and record the result in `specs/010-ask-diogenes-chatbot/implementation-evidence.md`.
- [X] T028 Run e2e tests with `pnpm test:e2e` from the repository root and record the result in `specs/010-ask-diogenes-chatbot/implementation-evidence.md`.
- [X] T029 Inspect the final diff for forbidden scope additions under `src/server/`, `src/storage/`, `src/app/api/`, Redis chat history files, AI/provider imports, free-form chat inputs, or broad helper refactors; record the scope check in `specs/010-ask-diogenes-chatbot/implementation-evidence.md`.
- [X] T030 Confirm the Human UI Placement Review section in `specs/010-ask-diogenes-chatbot/implementation-evidence.md` states that automated agents did not run the app, open localhost, capture screenshots, or approve visual placement.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; starts immediately.
- **Foundational (Phase 2)**: Depends on Setup; blocks all user stories.
- **User Stories (Phase 3+)**: Depend on Foundational completion.
- **Polish (Phase 7)**: Depends on selected user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: Starts after Foundational; MVP and required first.
- **User Story 2 (P2)**: Starts after Foundational; can be developed after US1 or in parallel once the widget shell exists.
- **User Story 3 (P3)**: Starts after Foundational; depends on prompt data from US2 for meaningful action labels but must remain independently testable.
- **User Story 4 (P4)**: Starts after Foundational; can be implemented after the widget exists and should not change prompt semantics.

### Within Each User Story

- Write story-specific tests before implementation tasks in that story.
- Keep tests independent, order-independent, and parallel-safe.
- Keep client UI state in the widget, deterministic copy in JSON, and route targets in the component allowlist.
- Do not add persistence, server actions, Redis repositories, or generic chatbot engines.

## Parallel Opportunities

- T003 and T004 can run in parallel because they create separate locale files.
- T006 can run after T003-T005 are staged and independently from T007.
- T008 and T009 can run in parallel because they create unit and e2e coverage in different files.
- T013 and T014 can run in parallel for the same reason.
- T022 and T023 can run in parallel for the same reason.
- Evidence updates can be done by a separate person when the corresponding story behavior is complete.

## Parallel Example: User Story 1

```text
Task: "T008 [P] [US1] Add component test in tests/unit/features/ask-diogenes/ask-diogenes-widget.test.tsx"
Task: "T009 [P] [US1] Add e2e test in tests/integration/ask-diogenes-widget.spec.ts"
```

## Parallel Example: User Story 2

```text
Task: "T013 [P] [US2] Extend component coverage in tests/unit/features/ask-diogenes/ask-diogenes-widget.test.tsx"
Task: "T014 [P] [US2] Extend e2e coverage in tests/integration/ask-diogenes-widget.spec.ts"
```

## Parallel Example: User Story 4

```text
Task: "T022 [P] [US4] Extend e2e coverage in tests/integration/ask-diogenes-widget.spec.ts"
Task: "T023 [P] [US4] Extend component coverage in tests/unit/features/ask-diogenes/ask-diogenes-widget.test.tsx"
```

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1 and Phase 2.
2. Complete Phase 3 for the orientation prompt and global launcher.
3. Run only `pnpm test` and `pnpm test:e2e` when verifying automated behavior.
4. Stop for human review if visual placement needs judgment.

### Incremental Delivery

1. Add User Story 1 for the character launcher, empty state, typing feedback, and orientation response.
2. Add User Story 2 for all deterministic predefined prompts and no free-form input.
3. Add User Story 3 for guided actions to existing areas.
4. Add User Story 4 for keyboard, minimize/close, reset, and high-contrast behavior.
5. Finish evidence and run only unit/e2e test verification.

### Low-Effort Enforcement

- Prefer editing `src/features/ask-diogenes/components/ask-diogenes-widget.tsx` over creating extra hooks or utility files.
- Prefer JSON + existing next-intl imports over new content loaders.
- Prefer existing shadcn-chatbot-kit display components over writing new chat bubble primitives, but do not reuse components that would expose forbidden input/audio/file behavior.
- Prefer focused tests over broad snapshots or visual-diff workflows.
- Defer all visual placement approval to the human owner.

## Notes

- `[P]` tasks touch different files or can proceed without waiting on incomplete task output.
- `[US1]`, `[US2]`, `[US3]`, and `[US4]` labels map to the user stories in [spec.md](./spec.md).
- Test tasks are included because the spec, plan, and constitution require verifiable accessibility and deterministic behavior.
- Do not add `pnpm dev`, browser-open, screenshot, or localhost inspection tasks to this feature.
