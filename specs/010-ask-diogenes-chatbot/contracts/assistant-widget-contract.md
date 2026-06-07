# Contract: Ask Diogenes Widget UI

## Purpose

Define the user-visible behavior of the floating Ask Diogenes widget. This is an internal UI contract for implementation and tests.

## Global Placement

- The launcher is visible on main public platform pages.
- The launcher stays outside main content flow and must not remove access to page navigation or primary actions.
- The widget reads the active locale from the existing app provider.

## States

### Closed

- Shows a compact floating character/chat launcher.
- Launcher has an accessible name from locale JSON.
- Activating the launcher opens the widget in empty state.

### Open Empty

- Shows title, greeting, description, and predefined prompt buttons.
- Shows no persisted conversation messages.
- Shows no free-form text input, file attachment control, audio input, AI model status, or send button.

### Typing

- Immediately follows prompt selection.
- Shows the selected user message and visible typing feedback.
- Announces typing state to assistive technology using localized text.
- Closing the widget cancels pending typing feedback.

### Response Visible

- Shows the selected user message and deterministic assistant response.
- Shows guided actions when the prompt defines supported action IDs.
- Allows selecting another predefined prompt.

### Minimized

- Collapses the panel while leaving the launcher available.
- Does not permanently cover primary page controls.
- Reopening returns to empty state for this minimum implementation.

## Interaction Rules

- Open, close, minimize, prompt selection, and guided actions must be reachable by keyboard.
- Focus moves into the panel when opened.
- Focus returns to a predictable launcher or prior control when closed.
- Escape may close the panel if consistent with local UI behavior.
- The same prompt in the same locale always produces the same response.
- Route actions only navigate to existing app routes.

## Visual Rules

- The widget must remain readable in default and high-contrast visual modes.
- Color cannot be the only state indicator.
- Floating placement must adapt on mobile so close/minimize remains reachable and core page actions remain usable.

## Out Of Scope

- Free-form question answering.
- Real AI or natural-language processing.
- External chatbot services.
- Redis or browser-local chat history.
- Audio recording, attachments, uploads, rating controls, or copy-to-clipboard affordances unless they already appear as harmless display-only UI and do not expand scope.
