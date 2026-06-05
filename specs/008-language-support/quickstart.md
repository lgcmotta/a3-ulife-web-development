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

2. Move and split message catalogs under `src/i18n/messages`.

   - Move root `messages/en.json` and `messages/pt-BR.json` into domain files under `src/i18n/messages/en/` and `src/i18n/messages/pt-BR/`.
   - Recommended domains: `layout`, `navigation`, `preferences`, `home`, `tracks`, `topics`, `accessibility`, `student-area`, and `evidence`.
   - Add `src/i18n/messages/en.ts` and `src/i18n/messages/pt-BR.ts` to compose one catalog per locale from the domain JSON files.
   - Keep the same composed nested key shape in both locales.
   - Put visible UI text, button labels, aria labels, screen-reader-only text, status text, dialog text, toast text, home copy, track/topic metadata, accessibility help, and evidence copy here.
   - Do not put Markdown topic prose here.

3. Add locale helpers, type inference, and request configuration.

   - Add `src/i18n/locales.ts`.
   - Add `src/i18n/messages.ts`.
   - Add `src/i18n/messages.d.ts`.
   - Use `next-intl` module augmentation so TypeScript infers keys from the English composed catalog:

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

   - Create type helpers only if `next-intl` plus `typeof enMessages` does not cover a concrete need.
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

5. Localize all non-Markdown text through `next-intl`.

   - Replace hardcoded visible strings with `t(...)` or `getTranslations(...)` lookups.
   - Replace hardcoded aria labels, group labels, status text, and screen-reader-only text with translation lookups.
   - Replace hardcoded non-Markdown product content with translation lookups, including home introduction copy, track metadata, topic metadata, accessibility help, and evidence copy.
   - Use stable semantic keys such as `tracks.programmingFoundations.title`, not index-based keys such as `tracks.0.title`, wherever possible.
   - Use `t.raw(...)` only when a component or helper genuinely needs an array/object, such as home principles, key ideas, or assembled track/topic lists.
   - Keep translated labels stable enough for accessible role queries.

6. Replace localized TypeScript prose modules with catalog-backed helpers.

   - Remove or shrink localized TypeScript files that export translated prose.
   - Keep TypeScript helpers only for stable slugs, route/storage-safe ids, and assembling typed objects from `t(...)`/`t.raw(...)`.
   - Add or update locale-aware content getters so routes and views can still consume structured objects without hardcoded translated prose.
   - Keep slugs identical across locales.

7. Localize Markdown topic content.

   - Move existing Markdown files into `src/content/learning-sections/en/`.
   - Add translated files under `src/content/learning-sections/pt-BR/`.
   - Update `loadLearningSectionMarkdown(topicSlug, locale)`.
   - Test that the returned locale/file identity matches the requested language.
   - Do not write tests that try to decide whether the prose itself is English or Portuguese.

8. Create implementation evidence.

   - Add a feature evidence file with composed message-key coverage, domain file coverage, Markdown file coverage, core component/helper tests, and command results.
   - Document that non-Markdown translated strings are supplied by the selected message catalog.
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
