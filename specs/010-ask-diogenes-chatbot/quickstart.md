# Quickstart: Ask Diogenes Chatbot

## Implementation Order

1. Add `ask-diogenes.json` to both locale folders and import it from `src/i18n/messages/en.ts` and `src/i18n/messages/pt-BR.ts`.
2. Create one small client widget at `src/features/ask-diogenes/components/ask-diogenes-widget.tsx`.
3. Reuse installed shadcn-chatbot-kit display pieces only where they fit fixed-prompt behavior, especially message bubbles and typing feedback.
4. Mount the widget once from `src/app/layout.tsx` inside the existing locale/theme providers.
5. Add focused tests for message-catalog alignment, deterministic prompt behavior, no free-form input, keyboard operation, typing feedback, and high-contrast readability.
6. Add assignment evidence notes for prompt map, widget states, heuristic review, accessibility review, and iteration.

## Minimum File Budget

Expected new or edited implementation files:

- `src/i18n/messages/en/ask-diogenes.json`
- `src/i18n/messages/pt-BR/ask-diogenes.json`
- `src/i18n/messages/en.ts`
- `src/i18n/messages/pt-BR.ts`
- `src/features/ask-diogenes/components/ask-diogenes-widget.tsx`
- `src/app/layout.tsx`
- One focused unit test, if component behavior is not fully covered by integration tests.
- One focused Playwright integration test.

Avoid new server routes, Redis repositories, storage helpers, AI adapters, generic chat engines, or broad UI refactors.

## Verification Commands

```bash
pnpm lint
pnpm test
pnpm test:e2e
```

For a narrower development loop, run the relevant unit and integration specs once they exist.

## Manual Review

- Open the home page and verify the launcher is visible.
- Open the widget and confirm it starts empty each time.
- Select each prompt and confirm typing feedback appears before the scripted response.
- Confirm there is no free-form input, audio input, attachment button, AI status, or external service behavior.
- Switch to Portuguese and verify prompt labels and answers come from Portuguese JSON.
- Use keyboard only to open, select a prompt, activate a guided action, minimize, and close.
- Review default and high-contrast visual modes at desktop and mobile widths.
