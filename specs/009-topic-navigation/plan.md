# Implementation Plan: Topic Navigation

**Branch**: `009-topic-navigation` | **Date**: 2026-06-06 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/009-topic-navigation/spec.md`, plus planning direction to implement previous-topic and next-topic controls in `LearningTopicActions` using the shadcn pagination composition, adapted for Next.js `Link`, with translatable Previous and Next labels.

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Add previous-topic and next-topic browsing controls to the existing repeated `LearningTopicActions` component so the full action group appears at the top and bottom of every valid ongoing learning topic page. Use a small local shadcn-style pagination primitive under `src/ui/components/pagination.tsx`, adapted to render Next.js `Link`, and pass translated Previous and Next text from `studentArea.learning`. Compute neighboring topic links from the saved path order in a small server-side helper, pass those links plus current completion state into `LearningTopicActions`, and disable `Complete Topic` with the existing button behavior when the displayed topic is already complete. Do not change resume routing, history rules, builder editing semantics, storage schema, or topic completion persistence.

## Technical Context

**Language/Version**: TypeScript 6.0.3, Node.js v25.9.0

**Primary Dependencies**: Next.js 16.2.7, React 19.2.7, Tailwind CSS 4.3.0, `next-intl` 4.13.0, `lucide-react` 1.17.0, existing shadcn/Radix-style local UI components, Redis-backed student-area persistence already approved by the personalized tracks flow, Vitest 4.1.8, Playwright 1.60.0.

**Storage**: No storage schema or repository changes. The feature reads the existing saved path order and topic completion flags. Only the existing explicit Complete Topic action updates progress.

**Testing**: Focused Vitest coverage for saved-path topic neighbor calculation and existing progress preservation, plus Playwright integration coverage for top/bottom action groups, previous/next navigation, disabled boundary states, completed-topic disabled completion, and resume-to-last-uncompleted behavior.

**Target Platform**: Responsive web application for anonymous students using the existing saved learning path flow.

**Project Type**: Frontend-focused Next.js web application with existing server-rendered learning routes and explicit server actions for student progress.

**Performance Goals**: Neighbor calculation runs over the selected topics in one saved path and adds no network calls. Rendering the two repeated action groups must not add duplicate storage reads.

**Constraints**: Previous/next browsing must not mark topics complete, uncomplete topics, update `lastActiveTopicSlug`, alter history status except through existing completion derivation, or change `getLearningDestination` resume behavior. The pagination labels and accessible names must come from translations. Keep the implementation inside `LearningTopicActions` and adjacent existing learning-view/path helper code; do not add free-form topic jumping, sticky controls, new path actions, new services, or broad layout redesign.

**Scale/Scope**: One learning topic page, one repeated topic action component, one local pagination UI primitive, small message catalog additions for two locales, one neighbor-position helper, and focused tests for the ongoing learning path flow.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Spec-driven scope**: PASS. The plan implements only the approved previous/next topic navigation and completed-topic disabled state inside ongoing learning paths.
- **Simplicity and academic fit**: PASS. The design adds one small pagination primitive and one narrow neighbor helper, avoiding new storage rules, client state machines, route rewrites, or unrelated student-area behavior.
- **Usability and accessibility**: PASS. The plan includes top and bottom action groups, keyboard flow, translated visible labels and accessible names, disabled states, color-independent meaning, and mobile/desktop fit.
- **Static-first fit**: PASS. No external runtime service or new backend dependency is added. Existing approved Redis persistence is read and updated only through current student-area boundaries.
- **Independent testing**: PASS. Unit tests can construct isolated saved paths; integration tests can seed their own paths through the existing builder flow and avoid exact generated IDs.
- **Assignment evidence**: PASS. Implementation should capture concise evidence for top and bottom controls, first/middle/last boundaries, completed-topic state, mobile/desktop, and high-contrast readability.
- **Responsibility boundaries**: PASS. Server/view code derives display navigation from saved data; UI renders links and disabled controls; the existing completion action remains the only progress update command; repository reads remain non-mutating.
- **Single-flow functions**: PASS. Neighbor lookup, action-group rendering, and completion update remain separate responsibilities. No helper should combine browsing with progress mutation.

## Project Structure

### Documentation (this feature)

```text
specs/009-topic-navigation/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── learning-topic-actions-contract.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
src/
├── app/
│   └── globals.css
├── features/
│   └── student-area/
│       ├── actions/
│       │   └── complete-topic-action.ts
│       ├── components/
│       │   └── learning-topic-actions.tsx
│       ├── server/
│       │   ├── path-persistence.ts
│       │   └── path-progress.ts
│       └── views/
│           └── learning-section-view.tsx
├── i18n/
│   └── messages/
│       ├── en/student-area.json
│       └── pt-BR/student-area.json
└── ui/
    └── components/
        ├── button.tsx
        └── pagination.tsx

tests/
├── integration/
│   └── student-area-learning-flow.spec.ts
└── unit/
    └── features/student-area/
        └── path-persistence.test.ts
```

**Structure Decision**: Keep the feature in the existing student-area learning surface. Add a local `pagination.tsx` beside other shadcn-style primitives because it is a reusable UI primitive, but use it only inside `LearningTopicActions` for this feature. Add neighbor calculation to existing saved-path helper code or a directly adjacent helper, because the data comes from a saved path and must not become client-owned transient state.

## Phase 0 Research Summary

Research output is captured in [research.md](./research.md). Key decisions:

- Use shadcn pagination composition for previous/next controls, specifically `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationPrevious`, and `PaginationNext`.
- Add `src/ui/components/pagination.tsx` as a local shadcn-style primitive and adapt `PaginationLink` to Next.js `Link` because the official docs say the default component renders an anchor and must be updated for Next.js Link usage.
- Expose `text` and accessible-label props for previous/next controls so `LearningTopicActions` can pass translated labels from `studentArea.learning`.
- Calculate previous and next topics from the existing saved path order once in `LearningSectionView` and pass `previousHref`, `nextHref`, and `isCurrentTopicCompleted` into `LearningTopicActions`.
- Disable `Complete Topic` by passing `disabled={isCurrentTopicCompleted}` to the existing button; do not add a new server action guard for this UI-only duplicate prevention.
- Keep `getLearningDestination(savedPath)` unchanged so leaving and returning still opens the first uncompleted topic.

## Phase 1 Design Summary

### Topic Navigation State

- Add a small helper that flattens a saved path's ordered topic items and locates the current topic.
- The helper returns:
  - `currentTopic`: the matching path topic item or `null`.
  - `previousTopic`: the immediately previous topic item or `null`.
  - `nextTopic`: the immediately next topic item or `null`.
  - `previousHref`: `/tracks/learn/{pathId}/{previousTopicSlug}` when previous exists, otherwise `null`.
  - `nextHref`: `/tracks/learn/{pathId}/{nextTopicSlug}` when next exists, otherwise `null`.
  - `isCurrentTopicCompleted`: `true` only when the current path topic item is completed.
- The helper only reads the provided saved path and topic slug. It does not save data, update `lastActiveTopicSlug`, infer repair, or redirect.
- Existing completion flow remains in `completeSavedPathTopic` and `completeTopicAction`.

### Pagination Primitive

- Add `src/ui/components/pagination.tsx` using the shadcn pagination composition style and existing `buttonVariants`/`cn` utilities.
- Import `Link` from `next/link` and type `PaginationLink` props from `React.ComponentProps<typeof Link>` so navigation links use Next.js `Link`.
- Implement `PaginationPrevious` and `PaginationNext` with chevron icons from `lucide-react`.
- Support a `text` prop for visible Previous/Next labels and allow translated `aria-label` values from callers.
- Keep the primitive small: no page numbers, ellipsis-specific work, router state, or pagination data abstraction is required for this feature.
- Disabled previous/next states should render as inert, programmatically disabled controls with matching visual treatment rather than fake navigable links.

### LearningTopicActions Contract

- Update `LearningTopicActions` props:
  - Existing: `studentId`, `pathId`, `topicSlug`, `placement`.
  - New: `previousHref`, `nextHref`, `isCurrentTopicCompleted`.
- Render one grouped container as it does today, still labeled by placement.
- Inside the group, render the pagination controls first, then Return to Builder, then Complete Topic.
- Use translated labels for:
  - Previous visible text and accessible name.
  - Next visible text and accessible name.
  - Already-complete disabled completion state if a distinct description is shown.
- Keep Return to Builder as a Next.js `Link` to `/tracks/builder?edit={pathId}` with `prefetch={false}`.
- Keep Complete Topic as the existing form action. Add `disabled={isCurrentTopicCompleted}` and rely on standard button disabled behavior.
- Both top and bottom calls to `LearningTopicActions` receive the same navigation/completion props, so state cannot drift between placements.

### Layout And Accessibility

- Update `.learning-topic-actions` styles so the full action group fits four controls without overlap.
- Keep the controls readable and reachable at mobile and desktop widths; wrapping within the action group is acceptable when needed, but horizontal page overflow is not.
- Preserve consecutive keyboard order inside each group: previous, next, Return to Builder, Complete Topic.
- Disabled previous/next and Complete Topic states must be visually apparent and programmatically exposed without relying only on color.
- The bottom action group remains after `LearningSectionContent`; no sticky or floating behavior is introduced.

### Translation Plan

- Add English keys under `studentArea.learning`, for example:
  - `previousTopic`
  - `nextTopic`
  - `previousTopicLabel`
  - `nextTopicLabel`
  - `alreadyCompleted`
- Add matching Portuguese (Brazil) keys under the same message path.
- Use `t(...)` for Previous/Next text passed into pagination rather than hardcoded defaults.

### Test And Evidence Plan

- Add unit tests for neighbor calculation:
  - first topic has no previous and has next.
  - middle topic has both.
  - last topic has previous and no next.
  - single-topic path has neither.
  - completed current topic reports `isCurrentTopicCompleted` without changing data.
- Update learning-flow integration tests to scope selectors to the top or bottom action group now that previous/next links are present.
- Add Playwright coverage that:
  - verifies previous/next links appear in both top and bottom action groups.
  - navigates next from the top group and previous from the bottom group.
  - confirms first/last disabled states.
  - confirms a completed topic disables Complete Topic when revisited.
  - confirms leaving after browsing still resumes the last uncompleted topic.
  - verifies no horizontal overflow on mobile and desktop.
- Record implementation evidence with command results and a short note for top/bottom mobile/desktop/high-contrast review.

## Post-Design Constitution Check

- **Spec-driven scope**: PASS. Design remains limited to browsing between topics in an ongoing saved path.
- **Simplicity and academic fit**: PASS. The plan uses the requested shadcn pagination pattern but does not add page-number pagination, a new navigation subsystem, or storage changes.
- **Usability and accessibility**: PASS. Both repeated groups include the same controls, translated names, keyboard order, and disabled state requirements.
- **Static-first fit**: PASS. No new runtime service or external dependency is introduced.
- **Independent testing**: PASS. Unit and Playwright scenarios are isolated around their own path state.
- **Assignment evidence**: PASS. Evidence is scoped to the affected learning topic action group.
- **Responsibility boundaries**: PASS. Read-only neighbor derivation is separate from explicit completion updates and storage reads remain non-mutating.
- **Single-flow functions**: PASS. The helper reads topic position only; `LearningTopicActions` renders controls only; completion remains its existing explicit command.

## Implementation Task Outline

1. Add a local shadcn-style `src/ui/components/pagination.tsx` adapted for Next.js `Link`, with translatable previous/next text support.
2. Add a saved-path neighbor helper and unit tests for first, middle, last, single-topic, and completed-current-topic states.
3. Pass navigation hrefs and current completion state from `LearningSectionView` to both `LearningTopicActions` placements.
4. Insert pagination controls inside `LearningTopicActions` before Return to Builder and Complete Topic.
5. Add translated English and Portuguese labels for previous/next and already-complete completion state.
6. Disable Complete Topic when the displayed path topic is already complete with a plain button `disabled` prop.
7. Adjust action-group CSS only as needed for four controls, mobile fit, disabled state, and high-contrast readability.
8. Update Playwright learning-flow coverage for top/bottom matching controls, previous/next navigation, boundary states, completed-topic disablement, and unchanged resume behavior.
9. Run focused validation: `pnpm lint`, `pnpm test`, and `pnpm test:e2e -- tests/integration/student-area-learning-flow.spec.ts`.
