# Research: Ask Diogenes Chatbot

## Decision: Use locale JSON files for all deterministic assistant copy

All prompt labels, user-visible scripted prompt text, assistant responses, empty-state labels, typing labels, and guided-action labels will live in `src/i18n/messages/en/ask-diogenes.json` and `src/i18n/messages/pt-BR/ask-diogenes.json`, imported through the existing `en.ts` and `pt-BR.ts` message catalogs.

**Rationale**: The app already uses per-locale JSON message files and next-intl catalog imports. Matching that pattern keeps the feature easy to review and ensures Portuguese UI shows Portuguese assistant answers while English/default UI shows English answers.

**Alternatives considered**:

- Hard-coded strings in the widget: rejected because the user explicitly required JSON-backed deterministic answers and because it would bypass the existing translation pattern.
- A new `src/content/assistant` script system: rejected as unnecessary for a small prompt set and more work than the current message-catalog pattern.

## Decision: Keep chat state empty each time the widget opens

The widget will initialize with no conversation messages on every open and show a greeting plus predefined prompt buttons. Closing and reopening resets the visible conversation.

**Rationale**: The user prefers an empty state every time the chatbox opens. The interactions are deterministic, so persisted history adds effort without improving the assignment outcome.

**Alternatives considered**:

- Redis conversation history by anonymous student/session: rejected for this feature because it adds server/storage code, test cleanup, and persistence meaning that the spec does not require.
- Browser-local conversation history: rejected because it conflicts with the preferred empty-on-open behavior and adds avoidable state edge cases.

## Decision: Reuse only fitting shadcn-chatbot-kit display pieces

Use installed local components such as `ChatMessage`, `TypingIndicator`, and possibly `PromptSuggestions` if their props fit the fixed-prompt interaction. Do not use the full `Chat` component as-is because it includes free-form input, attachments, audio-oriented behavior, and submit semantics intended for generative chat.

**Rationale**: The feature must look like a chatbot but must not behave like a free-form chatbot. Selective reuse gives the school-assignment presentation value with less code than adapting an AI-style chat flow.

**Alternatives considered**:

- Full `Chat` component adoption: rejected because it exposes features that violate scope or require disabling several paths.
- Custom UI from scratch: rejected because the kit is already installed and can provide the basic chat bubble and typing affordances.

## Decision: Mount a single global assistant widget from the root layout

Render the widget once inside the existing `NextIntlClientProvider` and `PreferenceProviders`, after the page shell so it can use current locale messages and theme state.

**Rationale**: The spec requires a floating global assistant on main public pages. A single mount avoids duplicating it across route components and keeps implementation effort low.

**Alternatives considered**:

- Per-page assistant placement: rejected as repetitive and easier to forget on new pages.
- Separate assistant page: rejected because the requirement is a floating character/chat widget, not a new primary page.

## Decision: Guided actions use a tiny allowlist to existing areas

Assistant JSON will provide localized labels and response text. The component maps approved action IDs to existing routes or page anchors, such as learning tracks, builder/history where already present, and accessibility help.

**Rationale**: This keeps answer copy in JSON while avoiding route strings spread through translations. It also prevents assistant prompts from creating new workflows or pointing to unsupported destinations.

**Alternatives considered**:

- Store arbitrary hrefs in JSON: rejected because translations should primarily hold user-facing text and because arbitrary destinations increase broken-link risk.
- Build page-aware discovery logic: rejected as over-engineering for a small deterministic prompt set.

## Decision: Tests focus on deterministic behavior and accessibility, not storage

Use existing unit/i18n tests to keep English and Portuguese catalog shapes aligned, add a small component test for reset/prompt behavior if needed, and add a Playwright integration flow for open, prompt selection, typing feedback, no free-form textbox, guided action, keyboard use, and high-contrast readability.

**Rationale**: These tests directly prove the assignment requirement and avoid Redis setup for a feature that does not persist data.

**Alternatives considered**:

- Redis-backed integration tests: rejected because this plan intentionally excludes Redis chat history.
- Extensive snapshot tests: rejected because they add maintenance cost without proving the important behavior.
