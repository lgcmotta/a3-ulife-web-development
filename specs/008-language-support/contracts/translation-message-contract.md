# Contract: Translation Messages

## Purpose

Define the local JSON message catalogs used for visible UI text and assistive text.

## Files

```text
messages/en.json
messages/pt-BR.json
```

## Required Shape

- Both files MUST expose the same nested key shape.
- Keys MUST be organized by product area or component responsibility.
- Values SHOULD be strings.
- Rich text messages MAY be used only where the renderer is explicitly tested.
- Message keys MUST NOT include long-form Markdown topic prose.

## Required Message Coverage

- Root layout metadata copy and skip link.
- Brand/home accessible label.
- Primary navigation visible labels, descriptions, current-page text where applicable, and navigation accessible names.
- Theme, high-contrast, and language preference labels, accessible names, and selected-state text.
- Home, tracks, topic detail, accessibility help, student history, builder, learning topic, completion, dialogs, menus, empty states, status text, toast text, and error messages.
- Screen-reader-only labels, aria labels, aria descriptions, group labels, status announcements, and form labels.

## Example Namespace Shape

```json
{
  "preferences": {
    "visualTheme": "Visual theme",
    "baseTheme": {
      "light": "Light theme",
      "dark": "Dark theme",
      "toggle": "Toggle base theme"
    },
    "highContrast": {
      "label": "High contrast",
      "toggle": "Toggle high contrast"
    },
    "language": {
      "label": "Language",
      "toggle": "Change language",
      "english": "English",
      "portugueseBrazil": "Portuguese (Brazil)"
    }
  }
}
```

## Validation

- Unit tests compare key paths between English and Portuguese (Brazil).
- Unit tests fail if either file contains empty string values.
- Component or focused rendering tests verify that one representative component reads translated visible and assistive labels from the selected locale.
- Broad e2e checks for every visible string in the application are out of scope.
