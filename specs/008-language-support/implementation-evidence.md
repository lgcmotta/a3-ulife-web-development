# Implementation Evidence: Language Support

## Message Catalog Coverage

- `messages/en.json` and `messages/pt-BR.json` contain 164 matching leaf keys.
- Message parity is covered by `tests/unit/i18n/message-catalog.test.ts`.
- One representative visible and assistive translation rendering path is covered by `tests/unit/i18n/translation-rendering.test.tsx`.

## Localized Content Coverage

- English and Portuguese content catalogs both expose 3 tracks and 9 topics.
- Track and topic slugs match across locales; route/storage slugs remain unchanged.
- Localized catalog coverage is covered by `tests/unit/content/localized-tracks-content.test.ts`.

## Markdown File Coverage

- English Markdown files: 9 under `src/content/learning-sections/en/`.
- Portuguese (Brazil) Markdown files: 9 under `src/content/learning-sections/pt-BR/`.
- Published topic coverage is covered by `tests/unit/content/learning-sections.test.ts`.
- Representative loader identity checks for `en` and `pt-BR` are covered by `tests/unit/server/learning-content/markdown.test.ts`.

## Focused Tests

- Message key parity and non-empty values.
- Browser-local language preference fallback, cookie/client snapshot writes, DOM `lang` and `data-language`, and theme preservation.
- Representative translation rendering.
- Localized track/topic slug parity.
- Localized Markdown file coverage and selected-locale file identity.
- Language toggle default state, selected state, accessible labels, preference writes, and route refresh.
- Broad e2e translation sweeps, prose language-detection tests, screenshot checks, and agent-run visual checks were not added.

## Command Results

- `pnpm lint`: PASS.
- `pnpm test`: PASS, 26 test files and 85 tests.
- `pnpm build`: PASS, `next build --webpack` completed successfully.

## Open Issues

- No automated implementation blockers remain.
- Manual visual review and final Portuguese wording review remain user-owned.

## User-Owned Manual Review

- Mobile, desktop, high-contrast, screen-reader, and final Portuguese wording review are manual checks owned by the user.

## Hardcoded String Audit

- Intentional English compatibility/default text remains in English-only compatibility exports, default component test labels, and internal validation/config helpers.
- Public rendered navigation, page labels, controls, status text, action feedback, selected-state labels, and localized content now use message catalogs or selected-locale content modules.
- Markdown prose remains outside UI message catalogs and is served from `en` or `pt-BR` folders by selected locale.

## Responsibility Boundaries

- Language preference is browser-local through a readable cookie plus client snapshot.
- Language switching updates `html lang`, `data-language`, notifies subscribers, and refreshes the current route.
- Student progress, saved paths, Redis keys, builder composition semantics, and hidden storage mutation behavior were not changed.
