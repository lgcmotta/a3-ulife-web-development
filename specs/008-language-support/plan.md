# Implementation Plan: Language Support

**Branch**: `008-language-support` | **Date**: 2026-06-05 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/008-language-support/spec.md`, plus planning direction to use an i18n package with JSON message files and a translation hook/function, while serving separate English and Portuguese (Brazil) Markdown topic files based on the current selected language. Updated planning direction: keep testing focused on the core translation plumbing, avoid broad e2e translation sweeps, verify localized Markdown file selection by returned locale/file identity, leave visual validation to the user, and stop implementation validation after tests and build pass instead of launching the app manually. Refined planning direction: keep this inside spec 008, move all message JSON under `src/i18n/messages`, split messages by domain, compose one catalog per locale, use `next-intl` module augmentation to infer keys from the English catalog, use `t(...)` for all non-Markdown translated strings, use stable semantic keys instead of array indexes where possible, use `t.raw(...)` only for genuine arrays/objects, and keep localized Markdown files separate.

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Add bilingual language support for English and Portuguese (Brazil) across visible UI text, assistive text, structured non-Markdown product content, and topic learning content. Use `next-intl` for local domain-split JSON message files, compose one selected-language catalog per locale, and use module augmentation so TypeScript infers translation keys from the English catalog. Use `t(...)` consistently for non-Markdown strings, reserve `t.raw(...)` for structured arrays/objects the UI genuinely needs, and use stable semantic keys for repeated content such as tracks/topics/evidence. Keep long-form topic Markdown separate from message catalogs by storing one Markdown file per topic per locale and loading only the selected locale's file at runtime. Add a language toggle beside the existing visual preference controls using United States and Brazil flag glyphs as visual icons plus accessible language names. Keep implementation and verification intentionally small: prove the typed translation mechanism once, prove Markdown selection by locale once, then rely on clean key/file coverage instead of checking every rendered string in e2e.

## Technical Context

**Language/Version**: TypeScript 6.0.3, Node.js v25.9.0

**Primary Dependencies**: Next.js 16.2.7, React 19.2.7, Tailwind CSS 4.3.0, `next-intl` 4.13.0, `react-markdown` 10.1.0, `remark-gfm` 4.0.1, existing shadcn/Radix-style controls, Vitest 4.1.8, Playwright 1.60.0.

**Storage**: Local domain-split JSON message files under `src/i18n/messages/{locale}/` for UI, assistive text, and structured non-Markdown product content; TypeScript message composers under `src/i18n/messages/` that produce one catalog per locale; local per-locale Markdown files for long-form topic content; browser-local language preference stored in a server-readable cookie and mirrored into client-readable preference state for the toggle. No Redis schema or saved-path storage changes.

**Testing**: Vitest and focused component tests for locale validation, composed message-key parity, typed translation rendering, structured catalog access, Markdown loader file selection, language preference helpers, and language toggle state. No broad Playwright/e2e sweep for translated copy. Visual layout, mobile fit, and final human review of Portuguese wording are manual validation owned by the user.

**Target Platform**: Responsive web application for anonymous students using the existing public learning and saved learning path flows.

**Project Type**: Frontend-focused Next.js web application with existing server-rendered routes and existing server actions for approved student-area commands.

**Performance Goals**: Language switching remains possible in under 30 seconds; composed message catalogs load from local files only; topic pages load only the selected locale's Markdown file; no external translation or localization network requests are introduced.

**Constraints**: English is the default locale; Portuguese (Brazil) is the only additional locale; all visible text, assistive text, and structured non-Markdown product content must be localized through `next-intl` messages; Markdown topic prose must stay separate from message catalogs; language changes must not reset base theme, high contrast, saved paths, builder composition, or learning progress; flag glyphs are visual cues only and must not be the accessible name; automated tests must validate language mechanics and selected Markdown file identity, not infer whether prose is truly English or Portuguese; implementation should create extra type helpers only when `next-intl` inference and the English catalog type do not cover the need.

**Scale/Scope**: Two locales, all currently published primary pages and student-area surfaces, all currently published tracks/topics, all currently published learning-section Markdown files, one language preference control, and focused evidence artifacts for bilingual coverage.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Spec-driven scope**: PASS. The plan implements only approved bilingual language behavior for existing product areas and does not add new audiences, authentication, external services, or learning domains.
- **Simplicity and academic fit**: PASS. The design uses one focused i18n package for all non-Markdown translated text, local duplicated Markdown files for long-form topic material, and the existing preference-control pattern. It rejects route rewrites, extra languages, translation services, CMS integrations, flag-icon package dependencies, and broad custom type-helper systems unless strictly necessary.
- **Usability and accessibility**: PASS. The plan includes localized visible text, localized accessible names/status text, keyboard-operable language switching, non-color selected-state cues, and `html lang` updates. Visual layout, long-label fit, and final language-quality review are documented as manual user validation rather than agent-run browser checks.
- **Static-first fit**: PASS. All translations and topic content remain local project files. The language preference is browser-local and no external runtime service is introduced. Existing approved server rendering is used only to choose the selected local message/content files.
- **Independent testing**: PASS. Tests can set locale and content fixtures at the start of each case. Locale tests avoid shared mutable state, do not depend on test order or exact generated IDs, and focus on reusable translation behavior instead of all-page e2e repetition.
- **Assignment evidence**: PASS. The plan requires implementation evidence for message/file coverage and command results, with visual/mobile/manual language review left to the user.
- **Responsibility boundaries**: PASS. UI code owns the interactive language control and preference write. Server/rendering code reads the explicit locale and loads matching local messages/content. Student storage and progress code remain unchanged and non-mutating on reads.
- **Single-flow functions**: PASS. Locale validation, preference read/write, domain message composition, selected-language message loading, structured content access, and Markdown loading are separate responsibilities. Markdown loading branches only by validated locale and topic slug.

## Project Structure

### Documentation (this feature)

```text
specs/008-language-support/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── language-preference-contract.md
│   ├── language-toggle-ui-contract.md
│   ├── localized-markdown-contract.md
│   └── translation-message-contract.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── globals.css
│   └── layout.tsx
├── content/
│   ├── learning-sections/
│   │   ├── en/
│   │   │   └── *.md
│   │   └── pt-BR/
│   │       └── *.md
│   └── types.ts
├── features/
│   ├── foundation/
│   │   └── components/
│   │       ├── language-toggle.tsx
│   │       ├── site-header.tsx
│   │       └── theme-toggle.tsx
│   └── student-area/
│       ├── components/
│       └── views/
├── i18n/
│   ├── locales.ts
│   ├── messages.ts
│   ├── messages.d.ts
│   ├── messages/
│   │   ├── en/
│   │   │   ├── accessibility.json
│   │   │   ├── evidence.json
│   │   │   ├── home.json
│   │   │   ├── layout.json
│   │   │   ├── navigation.json
│   │   │   ├── preferences.json
│   │   │   ├── student-area.json
│   │   │   ├── topics.json
│   │   │   └── tracks.json
│   │   ├── en.ts
│   │   ├── pt-BR/
│   │   │   ├── accessibility.json
│   │   │   ├── evidence.json
│   │   │   ├── home.json
│   │   │   ├── layout.json
│   │   │   ├── navigation.json
│   │   │   ├── preferences.json
│   │   │   ├── student-area.json
│   │   │   ├── topics.json
│   │   │   └── tracks.json
│   │   └── pt-BR.ts
│   └── request.ts
├── routes/
│   └── navigation.ts
├── server/
│   └── learning-content/
│       └── markdown.ts
└── storage/
    └── language-preference.ts

tests/
├── integration/
│   ├── accessibility.spec.ts
│   ├── foundation-flow.spec.ts
│   └── student-area-learning-flow.spec.ts
└── unit/
    ├── accessibility/
    ├── content/
    ├── i18n/
    ├── server/
    └── storage/
```

**Structure Decision**: Keep the feature inside the existing Next.js application and preserve the feature-oriented source layout. Move all message JSON under `src/i18n/messages/`, split it by domain, and compose `en` and `pt-BR` catalogs from small TypeScript modules so `next-intl` receives one messages object per locale. Add `src/i18n/messages.d.ts` for module augmentation that infers `Messages` from the English composed catalog and `Locale` from supported locale ids. Move non-Markdown educational/product content out of localized TypeScript prose modules and into the domain-split message catalogs; retain small TypeScript helpers only for stable route/storage slugs, object assembly, and call sites where a typed data shape is clearer than scattered component logic. Move Markdown learning sections into per-locale folders so long-form topic prose remains separate from message maps. Add `language-preference.ts` beside the existing theme preference helper because it is another browser-local preference with similar hydration and notification concerns.

## Phase 0 Research Summary

Research output is captured in [research.md](./research.md). Key decisions:

- Use `next-intl` 4.13.0 for UI, assistive text, and structured non-Markdown product content because it supports local JSON messages, `useTranslations`, `getTranslations`, `t.raw`, server-component translation APIs, request-scoped configuration, Client Component providers in the App Router, and message-key inference through module augmentation.
- Use a browser-local language preference with English fallback instead of locale-prefixed routes for this first release, preserving existing routes and the current page context while still letting server-rendered UI choose the selected local messages.
- Keep all non-Markdown translated strings in domain-split `next-intl` message JSON under `src/i18n/messages`, including track/topic metadata and assignment evidence. Keep long-form topic Markdown in per-locale Markdown folders. Do not put long-form topic prose in message JSON.
- Compose one catalog per locale from the domain files and infer message keys from the English composed catalog with `next-intl` module augmentation. Avoid custom dot-key helper types unless implementation proves they are necessary.
- Use flag emoji glyphs (`US` flag and Brazil flag) as the colored visual icons for the toggle, hidden from assistive technology, with localized accessible language names as the authoritative labels.
- Keep automated validation focused: test shared translation plumbing, composed key/file parity, typed translation rendering, language preference state, and Markdown file selection by locale; do not e2e every translated page or use tests to judge whether prose is written in the expected human language.

## Phase 1 Design Summary

### Locale And Message Architecture

- Move message JSON from the repository-root `messages/` directory into `src/i18n/messages/`.
- Split message JSON by domain under each locale folder. Recommended first-pass domains: `layout`, `navigation`, `preferences`, `home`, `tracks`, `topics`, `accessibility`, `student-area`, and `evidence`.
- Add `src/i18n/messages/en.ts` and `src/i18n/messages/pt-BR.ts` to import the locale's domain JSON files and export one composed catalog object. The composed object shape, not a hand-written type, is the source of truth.
- Add `src/i18n/messages.d.ts` for `next-intl` module augmentation, using the minimal pattern from the user direction:

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

- Keep the module augmentation intentionally small. Do not add custom key-building helper types unless the implementation cannot get adequate key inference from `next-intl` and `typeof enMessages`.
- Add `src/i18n/locales.ts` with supported locale ids, default locale, labels, and validation helpers.
- Update `src/i18n/messages.ts` to import the composed locale catalogs, expose `messageCatalogs`, preserve the `AppMessages` type from `typeof enMessages`, and return the selected composed catalog.
- Add or update `src/i18n/request.ts` using `next-intl` request configuration to read the language cookie, validate it, and load the selected locale's composed messages from local files.
- Wrap the app in `NextIntlClientProvider` from `src/app/layout.tsx`.
- Localize metadata, skip link, navigation labels/descriptions, page headings, button labels, empty states, dialog labels, form labels, status messages, toast copy, screen-reader-only strings, home introduction copy, accessibility help, assignment evidence, track metadata, and topic metadata through message keys.
- Use `useTranslations` in non-async server/shared components and client components. Use `getTranslations` in async server components and metadata functions. Use ordinary `t("semantic.key")` for strings.
- Use stable semantic keys for repeated content wherever possible. Prefer keys such as `tracks.programmingFoundations.title` and `topics.problemSolvingBasics.summary` over positional keys such as `tracks.0.title`.
- Use `t.raw(...)` only where the UI needs an array/object, such as a list of home principles, key ideas, evidence notes, or a typed assembled list of tracks/topics. Do not use `t.raw(...)` for ordinary labels, headings, descriptions, statuses, or button text.
- Prefer passing translated labels from server components into client components when the client component only needs labels; use client-side `useTranslations` where the component owns interactive state and label changes.

### Language Preference

- Add `src/storage/language-preference.ts` with read/write/subscribe helpers following the current theme preference pattern.
- Store only supported locale ids. Invalid or missing values resolve to English.
- When the language changes, write the browser-local cookie and client preference snapshot, update `document.documentElement.lang` and `data-language`, notify subscribers, and refresh the current route so server-rendered messages and Markdown re-render in the selected locale.
- Keep language preference independent from base theme and high-contrast preference. No student-area persistence or progress repository writes occur when language changes.

### Language Toggle

- Add `LanguageToggle` beside `ThemeToggle` in `SiteHeader`.
- Reuse the same compact preference-control visual rhythm as `.base-theme-control` and `.contrast-control`.
- Use visible flag glyphs as icons: United States for English and Brazil for Portuguese (Brazil). Mark glyphs `aria-hidden` and expose localized accessible names such as "English" and "Portuguese (Brazil)".
- Use a switch or segmented toggle consistent with the existing control pattern. The selected state must be exposed programmatically and visually without relying on flag colors alone.
- Ensure Portuguese labels can wrap or fit without clipping on mobile and in high-contrast modes.

### Localized Content And Markdown

- Replace per-locale translated TypeScript prose modules for Diogenes profile, accessibility help, assignment evidence, tracks, topics, and any other local content currently rendered as visible text with domain-split message catalog entries.
- Keep TypeScript helpers for route/storage-safe slugs and object assembly only when they reduce component noise. These helpers should read from `t(...)` or `t.raw(...)` rather than export hardcoded translated prose.
- Provide typed assembly helpers where helpful so routes and views receive structured content without each component reconstructing arrays manually. Helpers must preserve stable slugs across locales and keep ordinary strings sourced from the translation API.
- Move current Markdown files into `src/content/learning-sections/en/` and add translated counterparts under `src/content/learning-sections/pt-BR/`.
- Update `loadLearningSectionMarkdown(topicSlug, locale)` to validate both topic slug and locale, load only the selected locale's file, and return the selected locale plus file identity so tests can confirm the correct file was served.
- Update content tests so every published topic has one English Markdown file and one Portuguese (Brazil) Markdown file with matching stable slugs. Do not add automated tests that try to determine whether the prose itself is English or Portuguese.

### Tests And Evidence

- Add message-key parity tests for the composed English and Portuguese (Brazil) catalogs produced from `src/i18n/messages/{locale}/` domain files.
- Add a type-oriented translation rendering test that proves `next-intl` accepts real semantic keys from the augmented English catalog. Do not add a large custom type-helper suite unless implementation requires custom helpers.
- Add focused structured-content tests for representative `t.raw(...)` usage, such as one track/topic list or home principle list, proving the returned object/array shape is complete and locale-selected.
- Add locale helper tests for default fallback, invalid values, cookie/client snapshot write behavior, and DOM language application.
- Add focused component tests for the language toggle that verify accessible labels, selected state, and preference writes in both directions.
- Update content tests for localized track/topic slug parity through stable semantic keys and localized Markdown file coverage.
- Add Markdown loader tests that call the loader with `en` and `pt-BR` for one representative topic and assert the returned locale/file identity matches the requested language.
- Do not add broad e2e coverage for every translated route or every translated string. If a future e2e smoke is added, it should prove one representative language-switch path only.
- Create an implementation evidence artifact during implementation with message/file coverage and command results. Manual visual layout and final translation-quality notes are user-owned.

## Post-Design Constitution Check

- **Spec-driven scope**: PASS. Design artifacts still implement only bilingual support for existing surfaces.
- **Simplicity and academic fit**: PASS. One i18n dependency, domain-split local message files, separate Markdown topic files, and existing UI patterns keep the solution small and class-defensible.
- **Usability and accessibility**: PASS. The design covers visible copy, assistive copy, `lang`, keyboard operation, and selected state. Manual visual checks cover final layout, high-contrast appearance, and long translated labels.
- **Static-first fit**: PASS. Messages and Markdown remain local; no external APIs, CMS, translation service, or new backend storage are added.
- **Independent testing**: PASS. Locale, content, and component tests seed their own starting state and avoid shared progress assumptions. Broad e2e translation repetition is intentionally out of scope.
- **Assignment evidence**: PASS. Evidence work is part of the design and will be taskable in `/speckit-tasks`, with manual visual review assigned to the user.
- **Responsibility boundaries**: PASS. UI preference selection, composed message loading, Markdown loading, and student persistence remain separate.
- **Single-flow functions**: PASS. Locale, domain message composition, selected-locale catalog loading, structured content assembly, and Markdown helpers each have one clear control-flow purpose.

## Complexity Tracking

No constitution violations.
