# Implementation Evidence: Language Support

## Message Catalog Coverage

- Domain JSON files live under `src/i18n/messages/en/` and `src/i18n/messages/pt-BR/`.
- Composed locale catalogs live in `src/i18n/messages/en.ts` and `src/i18n/messages/pt-BR.ts`.
- `src/i18n/messages.d.ts` augments `next-intl` with `Messages: typeof enMessages` and the supported locale union.
- English and Portuguese (Brazil) composed catalogs contain 367 matching string leaf keys.
- Root `messages/en.json` and `messages/pt-BR.json` were removed.
- Message parity, non-empty values, and obsolete-root-catalog removal are covered by `tests/unit/i18n/message-catalog.test.ts`.
- Representative typed visible and assistive translation rendering is covered by `tests/unit/i18n/translation-rendering.test.tsx`.
- Representative structured `t.raw(...)` catalog access is covered by `tests/unit/i18n/structured-message-catalog.test.tsx`.

## Localized Content Coverage

- Non-Markdown translated strings are supplied by `src/i18n/messages/`.
- Home profile, home principles, accessibility help, assignment evidence, track metadata, and topic metadata were moved out of translated TypeScript prose modules and into domain JSON files.
- Stable route/storage slugs and display order live in `src/content/catalog-structure.ts`.
- English and Portuguese catalogs both expose 3 tracks and 9 topics.
- Track and topic slugs match across locales; route/storage slugs remain unchanged.
- Localized catalog coverage is covered by `tests/unit/content/localized-tracks-content.test.ts`.

## Markdown File Coverage

- Long-form topic Markdown remains separate from message catalogs under `src/content/learning-sections/`.
- English Markdown files: 9 under `src/content/learning-sections/en/`.
- Portuguese (Brazil) Markdown files: 9 under `src/content/learning-sections/pt-BR/`.
- Published topic coverage is covered by `tests/unit/content/learning-sections.test.ts`.
- Representative loader identity checks for `en` and `pt-BR` are covered by `tests/unit/server/learning-content/markdown.test.ts`.

## Focused Tests

- Message key parity and non-empty values.
- Browser-local language preference fallback, cookie/client snapshot writes, DOM `lang` and `data-language`, and theme preservation.
- Representative typed translation rendering.
- Representative structured `t.raw(...)` rendering.
- Localized track/topic slug parity.
- Localized Markdown file coverage and selected-locale file identity.
- Language toggle default state, selected state, accessible labels, preference writes, route refresh, and relocated composed-catalog labels.
- Broad e2e translation sweeps, prose language-detection tests, screenshot checks, dev-server visual checks, and agent-run browser validation were not added.

## Command Results

- `pnpm lint`: PASS.
- `pnpm test`: PASS, 27 test files and 88 tests.
- `pnpm build`: PASS, `next build --webpack` completed successfully.

## Open Issues

- No automated implementation blockers remain.
- Manual visual review and final Portuguese wording review remain user-owned.

## User-Owned Manual Review

- Mobile, desktop, high-contrast, screen-reader, and final Portuguese wording review are manual checks owned by the user.
- The agent did not run `pnpm run dev`, browser screenshots, or manual visual validation.

## Hardcoded String Audit

- Intentional English compatibility/default text remains in fallback component labels, internal storage/presenter defaults, route constants, IDs, and validation/config helpers.
- Public rendered navigation, page labels, controls, status text, action feedback, selected-state labels, home content, accessibility content, evidence snippets, track metadata, and topic metadata now use message catalogs or catalog-backed selected-locale helpers.
- Markdown prose remains outside UI message catalogs and is served from `en` or `pt-BR` folders by selected locale.

## Responsibility Boundaries

- Language preference is browser-local through a readable cookie plus client snapshot.
- Language switching updates `html lang`, `data-language`, notifies subscribers, and refreshes the current route.
- Current routes, route prefixes, student progress, saved paths, Redis keys, builder composition semantics, Markdown file selection behavior, and hidden storage mutation behavior were not changed.
