# Implementation Plan: Personalized Student Area

**Branch**: `004-personalized-tracks` | **Date**: 2026-06-03 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/004-personalized-tracks/spec.md`

## Summary

Add a server-managed student area for personalized learning paths. Home and Learning Tracks route students to `/tracks/history`; the history tab links to `/tracks/builder`; the builder loads anonymous student data from Redis, lets students select and order tracks/topics, saves drafts and active paths, and routes students through detailed topic learning sections rendered from local markdown content. Each available topic must receive its own realistic, original markdown file with complete educational explanation and external links that add study value.

## Technical Context

**Language/Version**: TypeScript 6.0.3, Node.js v25.9.0

**Primary Dependencies**: Next.js 16.2.7, React 19.2.7, Tailwind CSS 4.3.0, shadcn CLI/components, `redis` 6.0.0, `sqids` 0.3.0, `react-markdown` 10.1.0, `remark-gfm` 4.0.1

**Storage**: Redis via local Docker Compose for anonymous student records, draft paths, saved paths, progress, and history; one local markdown file per available topic for topic learning section content

**Testing**: ESLint, TypeScript build, Vitest unit tests, Playwright e2e tests, axe checks, Redis-backed integration tests where server state is required

**Target Platform**: Responsive server-rendered web application with server-managed student data

**Project Type**: Next.js web application with server components, server actions, Redis persistence, and client UI islands for interactive builder controls

**Performance Goals**: Student area pages should load usable content within 2 seconds locally with Redis running; builder actions should give visible feedback within 1 second; learning sections should avoid horizontal scrolling on mobile

**Constraints**: No identity setup, authentication, or authorization; anonymous student record only; every Redis key for student data includes the student ID; all public IDs use 7-character URL-safe Sqids values; no empty track groups saved; no topic can move outside its parent track; color is never the only state indicator; only discard and clear use confirmation dialogs; markdown content must be original English educational writing generated or edited for this project, not copied from external sources

**Scale/Scope**: One anonymous student per browser, three existing learning tracks, nine existing topics, one active learning path, path history table, nine markdown learning section files, one per topic

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- Usability-first: PASS. Plan preserves tab URLs, explicit actions, feedback, disabled states, and history/builder separation.
- Accessibility-first: PASS. Plan requires keyboard-accessible tabs, tree controls, context menus, dialogs, toasts/live regions, tables, and learning sections.
- Assignment evidence: PASS. Feature can add IA and heuristic-evaluation evidence for student area flows.
- Scope control: PASS WITH JUSTIFICATION. This is a major feature, but it has a complete spec and stays inside the Diogenes education domain.
- Static-first default: JUSTIFIED DEVIATION. The approved spec and user plan require server-managed persistent student data. Redis plus a server runtime replaces the earlier static-only delivery assumption for this feature.
- No auth/community/game scope: PASS. Anonymous visitor persistence is not identity setup, authentication, authorization, social behavior, or game mechanics.

**Post-design re-check**: PASS WITH SAME JUSTIFIED DEVIATION. Phase 1 artifacts keep server persistence limited to anonymous student learning data and avoid unrelated backend scope.

## Project Structure

### Documentation (this feature)

```text
specs/004-personalized-tracks/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── student-learning-content.md
│   ├── student-area-routes.md
│   └── student-state-actions.md
└── tasks.md
```

### Source Code (repository root)

```text
docker-compose.yml
src/
├── app/
│   ├── page.tsx
│   └── tracks/
│       ├── page.tsx
│       ├── history/page.tsx
│       ├── builder/page.tsx
│       └── learn/
│           ├── [pathId]/[topicSlug]/page.tsx
│           └── [pathId]/complete/page.tsx
├── content/
│   ├── tracks.ts
│   └── learning-sections/
│       ├── problem-solving-basics.md
│       ├── variables-and-flow.md
│       ├── debugging-habits.md
│       ├── semantic-structure.md
│       ├── responsive-layouts.md
│       ├── accessible-navigation.md
│       ├── reading-technical-texts.md
│       ├── planning-study-sessions.md
│       └── asking-better-questions.md
├── features/
│   ├── foundation/
│   └── student-area/
│       ├── actions/
│       ├── components/
│       ├── server/
│       └── views/
├── server/
│   ├── ids/
│   ├── learning-content/
│   ├── redis/
│   └── student-area/
└── ui/

tests/
├── integration/
├── unit/
└── e2e-support/
```

**Structure Decision**: Keep existing foundation pages and content modules. Add student-area routes under `src/app/tracks/`, server-only persistence helpers under `src/server/`, interactive builder UI under `src/features/student-area/`, and one markdown learning section file per topic under `src/content/learning-sections/`. Task generation must include explicit authoring tasks for all nine markdown files.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Server runtime instead of static-only hosting | Spec requires platform-managed persistent student records and server-handled student area data | Browser-local storage would conflict with the updated spec and user plan |
| Redis service | User plan requires Redis-backed student records, drafts, saved paths, completion state, and history | Static JSON/local storage cannot preserve server-managed user data |
| New student-area primary routes | Spec requires `/tracks/history` and `/tracks/builder` tab URLs plus learning section pages | Reusing only `/tracks` would hide required student-area states and make tab URLs untestable |
