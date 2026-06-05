# Quickstart: Language Support

## Prerequisites

- Active branch: `008-language-support`
- Feature pointer: `.specify/feature.json` points to `specs/008-language-support`
- Design artifacts present: `plan.md`, `research.md`, `data-model.md`, and `contracts/`

## Implementation Outline

1. Add the i18n dependency.

   ```bash
   pnpm add next-intl@4.13.0
   ```

2. Create `messages/en.json` and `messages/pt-BR.json`.

   - Keep the same nested key shape in both files.
   - Put visible UI text, button labels, aria labels, screen-reader-only text, status text, dialog text, and toast text here.
   - Do not put Markdown topic prose here.

3. Add locale helpers and request configuration.

   - Add `src/i18n/locales.ts`.
   - Add `src/i18n/request.ts`.
   - Read the server-readable language cookie in request configuration and fall back to English.
   - Wrap the app with `NextIntlClientProvider` in `src/app/layout.tsx`.
   - Update `next.config.ts` with the `next-intl` plugin.

4. Add language preference helpers and the language toggle.

   - Add `src/storage/language-preference.ts`.
   - Add `src/features/foundation/components/language-toggle.tsx`.
   - Render the language toggle beside `ThemeToggle`.
   - Write the language cookie and client snapshot before refreshing the current route.
   - Use decorative United States and Brazil flag glyphs plus accessible language names.

5. Localize UI and assistive copy.

   - Replace hardcoded visible strings with message lookups.
   - Replace hardcoded aria labels, group labels, status text, and screen-reader-only text with message lookups.
   - Keep translated labels stable enough for accessible role queries.

6. Localize educational content metadata.

   - Move current English content into `src/content/locales/en/`.
   - Add Portuguese (Brazil) counterparts under `src/content/locales/pt-BR/`.
   - Add locale-aware content getters.
   - Keep slugs identical across locales.

7. Localize Markdown topic content.

   - Move existing Markdown files into `src/content/learning-sections/en/`.
   - Add translated files under `src/content/learning-sections/pt-BR/`.
   - Update `loadLearningSectionMarkdown(topicSlug, locale)`.
   - Test that the returned locale/file identity matches the requested language.
   - Do not write tests that try to decide whether the prose itself is English or Portuguese.

8. Create implementation evidence.

   - Add a feature evidence file with message-key coverage, Markdown file coverage, core component/helper tests, and command results.
   - Leave mobile/desktop/high-contrast visual review and final Portuguese wording review to the user.

## Focused Verification

```bash
pnpm lint
pnpm test
pnpm build
```

Do not start the dev server or open the app for visual inspection if lint, tests, and build pass. Manual visual review is user-owned for this feature.

## Manual Review Checklist (User-Owned)

- English is the default on a clean browser profile.
- Portuguese (Brazil) selection changes visible UI text.
- Portuguese (Brazil) selection changes accessible names and status text.
- English reselection restores English UI and assistive text.
- The same topic opens with English Markdown in English and Portuguese Markdown in Portuguese (Brazil).
- Language switching preserves current page context, theme, high contrast, saved path, and learning progress.
- The language toggle is keyboard reachable and screen-reader understandable.
- Mobile and desktop layouts have no clipped translated labels or horizontal overflow.
- High-contrast modes keep the language control readable.
