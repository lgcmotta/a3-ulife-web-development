# Contract: Translation Messages

## Purpose

Define the local JSON message catalogs used for all non-Markdown translated text: visible UI text, assistive text, structured product content, track/topic metadata, accessibility help, and evidence copy.

## Files

```text
src/i18n/messages/
├── en/
│   ├── accessibility.json
│   ├── evidence.json
│   ├── home.json
│   ├── layout.json
│   ├── navigation.json
│   ├── preferences.json
│   ├── student-area.json
│   ├── topics.json
│   └── tracks.json
├── en.ts
├── pt-BR/
│   ├── accessibility.json
│   ├── evidence.json
│   ├── home.json
│   ├── layout.json
│   ├── navigation.json
│   ├── preferences.json
│   ├── student-area.json
│   ├── topics.json
│   └── tracks.json
└── pt-BR.ts

src/i18n/messages.ts
src/i18n/messages.d.ts
```

## Required Shape

- Locale domain files MUST compose into one English catalog and one Portuguese (Brazil) catalog.
- The composed English and Portuguese (Brazil) catalogs MUST expose the same nested key shape.
- Keys MUST be organized by product area or component responsibility.
- Values SHOULD be strings by default.
- Arrays or objects MAY be used only when the receiving UI genuinely needs structured repeated content.
- Rich text messages MAY be used only where the renderer is explicitly tested.
- Message keys MUST NOT include long-form Markdown topic prose.
- Stable semantic keys SHOULD be used wherever possible. Prefer `tracks.programmingFoundations.title` over `tracks.0.title`.

## Type Inference Contract

- The English composed catalog is the source of truth for message-key inference.
- `src/i18n/messages.d.ts` MUST augment `next-intl` with the supported locale type and the English catalog type.
- The augmentation should stay minimal:

```ts
import enMessages from "@/i18n/messages/en";
import type { SupportedLocale } from "@/i18n/locales";

declare module "next-intl" {
  interface AppConfig {
    Locale: SupportedLocale;
    Messages: typeof enMessages;
  }
}
```

- Do not add custom dot-key helper types unless `next-intl` inference cannot cover a specific implementation need.

## Required Message Coverage

- Root layout metadata copy and skip link.
- Brand/home accessible label.
- Primary navigation visible labels, descriptions, current-page text where applicable, and navigation accessible names.
- Theme, high-contrast, and language preference labels, accessible names, and selected-state text.
- Home, tracks, topic detail, accessibility help, student history, builder, learning topic, completion, dialogs, menus, empty states, status text, toast text, and error messages.
- Home introduction/profile copy, home principles, track summaries, topic metadata, key ideas, practice prompts, professor notes, accessibility help sections, personas, information architecture notes, and heuristic evaluation notes.
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

## Usage Contract

- Use ordinary translation calls for strings:

```ts
const t = useTranslations("navigation");
t("home");
```

- Use stable semantic keys for repeated content:

```ts
const t = useTranslations("tracks.programmingFoundations");
t("title");
t("summary");
```

- Use structured reads only when a component/helper genuinely needs an array/object:

```ts
const t = useTranslations("home");
const principles = t.raw("principles");
```

- Do not use structured reads for ordinary labels, headings, descriptions, statuses, button labels, or aria labels.

## Validation

- Unit tests compare key paths between the composed English and Portuguese (Brazil) catalogs.
- Unit tests fail if either composed catalog contains empty string values.
- Unit tests verify domain files compose into the selected locale catalog.
- Focused tests prove representative typed translation rendering and representative structured reads.
- Component or focused rendering tests verify that one representative component reads translated visible and assistive labels from the selected locale.
- Markdown topic files are validated separately through the localized Markdown contract.
- Broad e2e checks for every visible string in the application are out of scope.
