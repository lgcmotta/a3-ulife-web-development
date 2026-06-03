# Implementation Plan: Platform Foundation

**Branch**: `001-platform-foundation` | **Date**: 2026-06-02 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-platform-foundation/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Build the Legado de Diogenes foundation MVP as a public, static-compatible Next.js application. The implementation will provide a clear home introduction, learning tracks overview, topic content route, accessibility help area, responsive navigation, assignment evidence content, keyboard-friendly flows, screen-reader-understandable structure, and default plus high-contrast visual themes. Content remains local and curated; the plan excludes dashboards, assistants, accounts, backend services, external integrations, and game-like mechanics.

## Technical Context

**Language/Version**: TypeScript 6.0.3 with Node.js v25.9.0

**Primary Dependencies**: Next.js 16.2.7, React 19.2.7, React DOM 19.2.7, Tailwind CSS 4.3.0, shadcn CLI 4.10.0 for copied component primitives, lucide-react 1.17.0 for icons, class-variance-authority 0.7.1, clsx 2.1.1, tailwind-merge 3.6.0

**Storage**: Local static content under `src/content`; optional browser-local visual theme preference only; no server-side storage, accounts, student records, or remote content source

**Testing**: Vitest 4.1.8, React Testing Library 16.3.2, Testing Library user-event 14.6.1, jsdom 29.1.1, Playwright 1.60.0, @axe-core/playwright 4.11.3, plus documented heuristic evaluation notes

**Target Platform**: Public static web application for modern desktop and mobile browsers, compatible with static export and HTTPS static hosting

**Project Type**: Single frontend application at repository root

**Performance Goals**: Core pages should render meaningful local content without waiting on external services; primary navigation between foundation areas should feel immediate during class presentation; desktop and mobile layouts should avoid horizontal scrolling and content overlap

**Constraints**: No backend, no authentication, no community features, no external APIs, no real chatbot, no progress dashboard, no advanced personalization, no maps, no calendars, no game mechanics; all core flows must support keyboard navigation, coherent headings, semantic landmarks, screen-reader-friendly labels, visible focus states, and non-color-only meaning

**Scale/Scope**: Four public route groups (`/`, `/tracks`, `/tracks/[trackSlug]/[topicSlug]`, `/accessibility`), a small curated set of learning tracks and topics, assignment evidence artifacts for personas, information architecture, wireframe thinking, heuristic findings, and iteration notes

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The repository constitution file is still the default placeholder, so the effective gates for this plan come from `AGENTS.md` manual project governance.

| Gate | Status | Evidence |
|------|--------|----------|
| Spec Kit chain controls scope | PASS | Feature is backed by `specs/001-platform-foundation/spec.md` and stays within the approved foundation MVP. |
| Static-compatible frontend | PASS | Plan uses a single Next.js frontend with static export compatibility, local content, and no required server runtime. |
| Usability-first IA | PASS | Routes and content model center on introduction, learning tracks, topic detail, accessibility help, and clear navigation. |
| Accessibility-first behavior | PASS | Plan includes keyboard navigation, landmarks, heading hierarchy, screen-reader labels, visible focus, non-color-only meaning, and default plus high-contrast themes. |
| Assignment evidence included | PASS | Plan includes personas, IA/wireframe-oriented evidence, heuristic findings, and iteration notes as first-class content. |
| Scope boundaries preserved | PASS | Plan excludes progress dashboards, assistants, AI behavior, accounts, external integrations, maps, calendars, community features, and game mechanics. |

## Project Structure

### Documentation (this feature)

```text
specs/001-platform-foundation/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── ui-navigation.md
├── checklists/
│   └── requirements.md
└── tasks.md
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── tracks/
│   │   ├── page.tsx
│   │   └── [trackSlug]/
│   │       └── [topicSlug]/
│   │           └── page.tsx
│   ├── accessibility/
│   │   └── page.tsx
│   └── globals.css
├── routes/
│   └── navigation.ts
├── features/
│   └── foundation/
│       ├── components/
│       └── views/
├── content/
│   ├── diogenes.ts
│   ├── tracks.ts
│   └── evidence/
│       ├── personas.ts
│       ├── information-architecture.ts
│       └── heuristic-evaluation.ts
├── ui/
│   ├── components/
│   └── utils.ts
├── accessibility/
│   ├── landmarks.ts
│   └── theme.ts
└── storage/
    └── theme-preference.ts

tests/
├── unit/
│   ├── content/
│   └── accessibility/
└── integration/
    ├── foundation-flow.spec.ts
    └── accessibility.spec.ts

public/
```

**Structure Decision**: Use the repository's intended single-frontend structure with Next.js App Router under `src/app`, route metadata under `src/routes`, curated static content under `src/content`, shared shadcn-derived primitives under `src/ui`, feature-specific composition under `src/features/foundation`, accessibility helpers under `src/accessibility`, and tests split into unit and integration coverage.

## Complexity Tracking

No constitution or governance violations are introduced by this plan.

## Phase 0 Research Summary

Research decisions are captured in [research.md](./research.md). All technical unknowns from the user request are resolved: TypeScript 6.0.3 is available, Node v25.9.0 is the active runtime, and current registry versions were selected for Next.js, Tailwind CSS, shadcn CLI, React, test tooling, and accessibility tooling.

## Phase 1 Design Summary

Design artifacts are captured in:

- [data-model.md](./data-model.md)
- [contracts/ui-navigation.md](./contracts/ui-navigation.md)
- [quickstart.md](./quickstart.md)

## Post-Design Constitution Check

| Gate | Status | Evidence |
|------|--------|----------|
| Spec Kit chain controls scope | PASS | Design artifacts map directly to the approved foundation spec and do not add unapproved major features. |
| Static-compatible frontend | PASS | Data model is local and static; route contract avoids API routes, server actions, or external services. |
| Usability-first IA | PASS | UI contract defines predictable routes, navigation labels, breadcrumbs, and topic return paths. |
| Accessibility-first behavior | PASS | Data model and UI contract include keyboard, landmarks, focus, labels, high contrast, and non-color-only requirements. |
| Assignment evidence included | PASS | Data model includes evidence artifacts and heuristic findings; quickstart includes validation expectations. |
| Scope boundaries preserved | PASS | Contracts explicitly exclude accounts, dashboard, chatbot, external integrations, and game-like mechanics. |
