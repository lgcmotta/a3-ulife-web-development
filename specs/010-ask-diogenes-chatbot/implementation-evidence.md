# Implementation Evidence: Ask Diogenes Chatbot

## Prompt Map

- Reuse decision: Use existing `Button`, `ChatMessage`, and `TypingIndicator` components. Avoid the full `Chat`, `MessageInput`, audio, attachment, rating, and storage paths because this assistant is prompt-only and deterministic.
- `platformOrientation`: Explains how to start with tracks and where help lives. Actions: `openTracks`, `openAccessibility`.
- `learningTracks`: Explains track selection and small learning paths. Actions: `openTracks`, `openBuilder`.
- `topicStudy`: Explains topic pages, study prompts, and professor notes. Actions: `openTracks`.
- `progressFeedback`: Explains saved paths, history, and progress feedback. Actions: `openBuilder`, `openHistory`.
- `accessibilityLanguage`: Explains accessibility controls and language switching. Actions: `openAccessibility`.

## Widget States

- Launcher: Floating Ask Diogenes button with character mark and localized accessible label.
- Open empty: Localized title, greeting, description, and fixed prompt buttons; no persisted messages.
- Typing: Selected user prompt is visible, localized typing status is announced, and existing typing indicator is shown.
- Response: User prompt and deterministic Diogenes response are visible with optional guided actions.
- Minimized: Panel closes back to the launcher and resets to the empty state on reopen.
- Small screen: Widget uses constrained fixed positioning and scrolling inside the panel; automated placement approval is not performed.

## Accessibility Review

- Completed automated checks: keyboard open, prompt selection, guided action activation, minimize/close, focus return, empty-on-reopen reset, live typing status, and high-contrast mode.
- Automated verification was limited to unit tests and e2e tests.
- Human UI placement review remains required for final visual judgment.

## Heuristic Evaluation

- Visibility of system status: Typing feedback and live status announce that a scripted answer is being prepared.
- Match with the real world: Copy presents Diogenes as a bounded guide, not a real AI.
- User control and freedom: Close and minimize are available and reset transient state.
- Consistency and standards: Uses existing app providers, localized message JSON, buttons, chat message display, and routes.
- Error prevention: Prompt-only interaction prevents unsupported free-form chatbot expectations.

## Iteration Notes

- Kept the implementation in one widget component plus JSON scripts instead of adding hooks, storage, routes, or a chatbot engine.
- Adjusted Portuguese copy to keep localized strings natural and covered by existing copy quality tests.
- Tightened e2e locators around the launcher and panel so tests verify the assistant without depending on unrelated page buttons.
- Visual placement is intentionally left for human review after automated behavior tests pass.

## Test Results

- 2026-06-07 `pnpm test`: PASS. 30 test files passed; 104 tests passed.
- 2026-06-07 `pnpm test:e2e -- tests/integration/ask-diogenes-widget.spec.ts`: PASS. 10 Ask Diogenes tests passed across desktop and mobile.
- 2026-06-07 `pnpm test:e2e`: FAIL. All Ask Diogenes tests passed in the full suite, but 5 existing desktop student-area tests failed outside this feature:
  - `tests/integration/student-area-builder-persistence.spec.ts:88`
  - `tests/integration/student-area-builder-persistence.spec.ts:124`
  - `tests/integration/student-area-builder-persistence.spec.ts:152`
  - `tests/integration/student-area-builder-persistence.spec.ts:164`
  - `tests/integration/student-area-learning-flow.spec.ts:112`

## Scope Check

- No new assistant files were added under `src/server/`, `src/storage/`, or `src/app/api/`.
- `src/features/ask-diogenes/components/ask-diogenes-widget.tsx` uses local transient state only and has no Redis, storage, server, AI/provider, localStorage, or sessionStorage imports.
- The widget uses existing `Button`, `ChatMessage`, and `TypingIndicator` display components and does not render full-chat input, `MessageInput`, audio, file, attachment, rating, AI status, or send controls.
- Guided actions are limited to existing routes through the local allowlist: `/tracks`, `/tracks/builder`, `/tracks/history`, `/accessibility`, and `/`.

## Human UI Placement Review

- Automated agents did not run `pnpm run dev`, open localhost, capture screenshots, use browser tools, or approve visual placement for this feature.
- Human owner will open the app and request fixes if placement or visual polish is wrong.
