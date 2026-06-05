# Research: Language Support

## Decision: Use `next-intl` for UI and assistive text

**Rationale**: The feature needs local JSON message catalogs, a hook/function style translation API, and support for both Server Components and Client Components. `next-intl` provides JSON messages, `useTranslations`, `getTranslations`, request-scoped configuration, and `NextIntlClientProvider` for the App Router. `pnpm view next-intl version` returned `4.13.0` on 2026-06-05. Official docs used: <https://next-intl.dev/docs/getting-started/app-router>, <https://next-intl.dev/docs/usage/translations>, and <https://next-intl.dev/docs/environments/server-client-components>.

**Alternatives considered**:

- `react-i18next` + `i18next`: Rejected for this project because it needs more custom wiring for Server Components and hydration. The official react-i18next SSR docs point Next.js users toward Next-specific integration options.
- `next-i18next`: Rejected because the project only needs a small App Router implementation and `next-intl` gives a direct App Router setup with request config, server APIs, and client provider support.
- Custom translation helper: Rejected because the user explicitly requested an i18n package and the app needs reliable Server/Client Component behavior.

## Decision: Use browser-local selected language without locale-prefixed routes for v1

**Rationale**: The specification and user direction emphasize the current selected language and preserving the current page context. Keeping existing paths avoids a broad route migration and keeps the language toggle aligned with the current theme/high-contrast preference controls. `next-intl` documents that apps without unique pathnames per locale can provide a locale based on user preference, with cookies as the simplest option. The implementation should keep the preference browser-local, use a cookie so request-scoped server rendering can choose the selected messages/content, and mirror the selected locale into client-readable preference state for the toggle.

**Alternatives considered**:

- Locale-prefixed routes such as `/en/...` and `/pt-BR/...`: Rejected for v1 because it would move every route, update all navigation contracts, and make language support larger than the requested preference behavior. It remains the fallback if future hosting, SEO, or static-export requirements require distinct localized URLs.
- Browser language auto-detection: Rejected because the specification sets English as default and manual selection as the first release behavior.
- Query-string language selection: Rejected because it makes preference persistence noisy and weakens the visual-preference parity requested by the user.

## Decision: Store UI messages separately from educational content

**Rationale**: The user explicitly separated UI/screen-reader translation maps from Markdown topic content. UI and assistive text should live in `messages/en.json` and `messages/pt-BR.json` with matching key shapes. Track/topic metadata and other educational content should live in locale-aware content catalog modules. Long-form topic prose should live in per-locale Markdown files.

**Alternatives considered**:

- Put all text, including Markdown prose, into JSON messages: Rejected because it would mix long educational content with short UI strings and conflict with the requested Markdown duplication model.
- Keep only Markdown localized and leave track/topic metadata in English: Rejected because track cards, topic headers, summaries, prompts, and professor notes are visible learning content and must be localized.
- Use a remote translation platform or CMS: Rejected because external integrations are out of scope and unnecessary for a two-language class project.

## Decision: Organize Markdown by locale directory

**Rationale**: Directory-per-locale keeps each topic slug stable and makes coverage tests straightforward: `src/content/learning-sections/en/{topicSlug}.md` and `src/content/learning-sections/pt-BR/{topicSlug}.md`. The loader can validate locale and slug separately, then read only the selected file.

**Alternatives considered**:

- File suffixes such as `{topicSlug}.en.md` and `{topicSlug}.pt-BR.md`: Rejected because locale folders are easier to scan and easier to validate in bulk.
- Inline Markdown imports in content modules: Rejected because the existing loader already reads Markdown files and can be extended with one locale parameter.
- Runtime fallback from missing Portuguese content to English: Rejected because the spec says incomplete localized topic content must not be silently presented as complete.

## Decision: Test Markdown selection by file identity, not prose language detection

**Rationale**: The implementation task will translate the Portuguese Markdown files directly. Automated tests should verify that the app asks for the correct locale and receives the expected locale-specific file, not try to decide whether the human prose is English or Portuguese. This keeps tests simple, deterministic, and focused on the behavior that drives localization.

**Alternatives considered**:

- Detecting Portuguese words or checking for language-specific terms: Rejected because it is brittle, adds low-value heuristics, and can fail on valid translations.
- Re-running content quality metrics for every Portuguese Markdown file: Rejected because the core requirement is locale-specific serving. English content quality tests can stay focused on the existing content baseline; Portuguese prose quality is handled during implementation and user review.
- E2E-checking every topic page in both languages: Rejected because one representative loader/component path proves the mechanism, while file coverage tests prove every localized asset exists.

## Decision: Use emoji flag glyphs for the language toggle icons

**Rationale**: The existing icon dependency does not provide actual country flag icons, and adding a flag icon package only for a nice-to-have would add low-value complexity. Emoji flag glyphs provide colored United States and Brazil visual cues without a new dependency. They must be marked `aria-hidden`; the accessible language names and selected state are the actual accessibility contract.

**Alternatives considered**:

- Add a flag icon dependency: Rejected as unnecessary dependency growth for two static icons.
- Use generic monochrome flag icons: Rejected because the user asked for the country flags and colored flags are preferred.
- Draw custom SVG flags: Rejected because it is more custom asset work than the feature needs.

## Decision: Extend the current preference hydration pattern

**Rationale**: The existing theme preference stack uses `useSyncExternalStore`, storage helpers, explicit DOM application, and a pre-hydration root script to avoid server/client divergence. Language selection should follow the same pattern: validate stored values, expose a deterministic default, update DOM language attributes immediately, and notify subscribers after writes.

**Alternatives considered**:

- Use component state initialized in `useEffect`: Rejected because prior theme work showed effect-driven preference synchronization can create hydration and lint issues.
- Keep language state only in a React provider: Rejected because server-rendered pages and Markdown loading need the selected locale before rendering.
- Mutate student records to store language: Rejected because language is a browser-local preference and must not change student progress or saved-path storage.

## Decision: Keep automated verification focused and leave visual review to the user

**Rationale**: The user wants clean, small implementation and required tests, without broad e2e translation checks or agent-run visual validation. The plan should rely on lint, unit/component tests, and build. Manual layout inspection, mobile/high-contrast appearance, and final Portuguese copy quality are user-owned review items.

**Alternatives considered**:

- Broad Playwright coverage for every localized route and label: Rejected because it duplicates the same mechanism many times and makes the task heavier than needed.
- Starting the app and inspecting pages manually during implementation: Rejected because the user explicitly asked the agent not to do this when tests and build pass.
- Screenshot or pixel checks for the language toggle: Rejected because the visual pattern is simple and manual visual review is enough for this feature.
