# Implementation Plan: Educational Content Refresh

**Branch**: `003-educational-content` | **Date**: 2026-06-03 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-educational-content/spec.md`

## Summary

Replace placeholder and overly thin educational copy with realistic English content for the existing Legado de Diogenes foundation. The implementation will keep the application static-first and small: update local content modules for the home introduction, learning tracks, topic pages, Diogenes guidance/help copy, and accessibility guidance; add only minimal content-shape changes if required to support clearer track and topic sections.

## Technical Context

**Language/Version**: TypeScript 6.0.3, Node.js v25.9.0

**Primary Dependencies**: Existing Next.js 16.2.7 application, React 19.2.7, Tailwind CSS 4.3.0, shadcn component conventions already in the project

**Storage**: Local static TypeScript content modules under `src/content`; no database, backend, CMS, or external content source

**Testing**: Existing ESLint, TypeScript build, Vitest unit tests, Playwright e2e tests; add or update tests only where content structure or visible copy assertions need coverage

**Target Platform**: Responsive public web application for desktop and mobile browsers

**Project Type**: Static-first frontend web application

**Performance Goals**: No new runtime services, network content fetches, or heavy assets; revised copy must remain scannable on mobile and must not cause layout overflow in core pages

**Constraints**: English user-facing educational copy; preserve the established product name; original writing only; no copied source passages; no real chatbot, live assistant behavior, accounts, progress dashboard, external integrations, game mechanics, maps, calendars, or new primary product areas

**Scale/Scope**: Existing foundation content only: home/introduction, learning tracks, topic detail content, static Diogenes/help guidance, and accessibility guidance

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Static-first product boundary: PASS. Content remains local in `src/content` with no backend or external integrations.
- Usability-first requirement: PASS. Revised copy must make track choice, topic purpose, and next actions clearer for beginner students.
- Accessibility-first requirement: PASS. Accessibility guidance is a first-class content area and core flows remain keyboard and screen-reader oriented.
- Scope control: PASS. The plan deepens approved foundation content instead of adding new sections or feature behavior.
- Assignment evidence support: PASS. Content must sound academically credible and preserve user research, IA, accessibility, and heuristic-evaluation readiness.
- Product-premise handling: PASS. Artifacts use the approved Diogenes premise as settled context and do not reopen theme selection.

**Post-design re-check**: PASS. Phase 1 artifacts keep the implementation limited to content data and review contracts.

## Project Structure

### Documentation (this feature)

```text
specs/003-educational-content/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── content-quality.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── app/
│   └── page.tsx
├── content/
│   ├── accessibility-help.ts
│   ├── diogenes.ts
│   └── tracks.ts
├── features/
├── ui/
└── accessibility/

tests/
├── e2e/
└── unit/
```

**Structure Decision**: Use the existing frontend structure. Content updates should be concentrated in `src/content`; page or component edits are allowed only when a richer content field must be rendered or tested.

## Complexity Tracking

No constitution violations. No extra complexity justified for this feature.
