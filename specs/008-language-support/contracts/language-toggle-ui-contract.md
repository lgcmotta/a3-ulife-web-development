# Contract: Language Toggle UI

## Purpose

Define the required user-facing and assistive behavior for the language control.

## Placement

- Render in the site header with the existing visual preference controls.
- Follow the same compact rhythm as the base theme and high-contrast controls.
- Remain visible and usable on desktop and mobile layouts.

## Options

| Locale | Visible Icon | Accessible Name |
|--------|--------------|-----------------|
| `en` | United States flag glyph | English |
| `pt-BR` | Brazil flag glyph | Portuguese (Brazil) |

Flag glyphs are decorative. They must be hidden from assistive technology.

## Interaction

- Keyboard users can reach the control in normal tab order.
- Keyboard users can change the selected language without using a mouse.
- Pointer users can change the selected language with one direct action.
- The selected state is visible and programmatic.
- Language changes keep the student on the same logical page.
- Language changes preserve base theme and high contrast.

## Accessibility

- The control exposes a localized purpose, available choices, and selected state.
- The selected language is not communicated by flag or color alone.
- Focus indicators remain visible in light, dark, light high contrast, and dark high contrast modes.
- Labels and selected-state text are localized after the language changes.

## Responsive Behavior

- Portuguese labels may wrap, but must not clip or force horizontal page overflow.
- The control must not overlap the brand mark, primary navigation, or theme controls.
- On narrow screens, the control can stack consistently with the existing preference controls.
- Final mobile, desktop, and high-contrast visual review is manual and user-owned.

## Test Obligations

- Component tests verify the default English state, Portuguese selection, English reselection, selected state, and accessible labels.
- Unit tests verify preference writes and DOM language application.
- Do not add broad e2e checks for every translated page.
- Do not require the agent to launch the app or inspect visual layout after tests and build pass.
