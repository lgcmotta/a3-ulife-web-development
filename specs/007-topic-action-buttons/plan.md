# Implementation Plan: Topic Action Buttons

**Branch**: `007-topic-action-buttons` | **Date**: 2026-06-04 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/007-topic-action-buttons/spec.md`, plus planning direction to extract "Return to Builder" and "Complete Topic" into one reusable component rendered at the top and bottom of each topic learning page.

## Summary

Update the saved-path topic learning view so the existing return and completion actions are presented as one reusable action group. The group will render the current "Return to Builder" link and the current `Complete Topic` form action without changing their destinations, completion command, progress behavior, or saved-path semantics. `LearningSectionView` will render the action group once before the topic header and once after the rendered learning content, with layout CSS that keeps both controls side by side on mobile and desktop.

## Technical Context

**Language/Version**: TypeScript 6.0.3, Node.js v25.9.0

**Primary Dependencies**: Next.js 16.2.7, React 19.2.7, Tailwind CSS 4.3.0, `react-markdown` 10.1.0, `remark-gfm` 4.0.1, Redis-backed student-area persistence already used by the approved personalized tracks flow, Vitest 4.1.8, Playwright 1.60.0

**Storage**: No storage changes. Existing saved-path and progress storage remain behind the current complete-topic server action.

**Testing**: Playwright integration coverage for the student-area learning flow and visual placement; existing Vitest coverage remains unchanged unless a narrow component test is useful after implementation.

**Target Platform**: Responsive web application for anonymous students using the saved learning path flow.

**Project Type**: Frontend-focused Next.js web application with existing server-rendered routes and server actions for explicit student-area commands.

**Performance Goals**: No measurable performance impact; rendering the same small action group twice must not add additional data loads or duplicate server work before user activation.

**Constraints**: Preserve the current "Return to Builder" destination, current `completeTopicAction` behavior, route structure, markdown content rendering, progress semantics, and saved-path persistence boundaries. Do not add sticky or floating controls, new topic actions, new content, new storage behavior, or broad visual redesign.

**Scale/Scope**: One student-area topic learning view, one reusable action component, small CSS layout support, and focused integration-test updates for duplicated controls.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Spec-driven scope**: PASS. The plan implements only the approved topic action placement behavior and the user's requested component extraction.
- **Simplicity and academic fit**: PASS. The design extracts two existing controls into one small component and avoids sticky footers, new route behavior, or a page redesign.
- **Usability and accessibility**: PASS. The plan puts the actions where students need them, keeps both controls keyboard reachable, adds distinct group context for duplicated controls, and requires readable default/high-contrast states.
- **Static-first fit**: PASS. No new runtime service, API, external dependency, or storage model is introduced.
- **Independent testing**: PASS. Tests can seed their own saved path, open a topic, verify top and bottom groups independently, and avoid exact generated IDs.
- **Assignment evidence**: PASS. Implementation should capture concise before/after mobile and desktop evidence for the reported backtracking issue.
- **Responsibility boundaries**: PASS. UI presentation is extracted; the existing server action remains the explicit completion command and storage code remains untouched.
- **Single-flow functions**: PASS. The new component has one purpose: render the existing two topic actions for a given placement. It does not branch across progress or persistence meanings.

## Project Structure

### Documentation (this feature)

```text
specs/007-topic-action-buttons/
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
└── features/
    └── student-area/
        ├── actions/
        │   └── complete-topic-action.ts
        ├── components/
        │   ├── learning-section-content.tsx
        │   └── learning-topic-actions.tsx
        └── views/
            └── learning-section-view.tsx

tests/
└── integration/
    ├── accessibility.spec.ts
    └── student-area-learning-flow.spec.ts
```

**Structure Decision**: Keep the existing feature-oriented student-area structure. Add the reusable action group beside `learning-section-content.tsx` because it belongs to the learning topic surface, not the generic UI library. Keep `LearningSectionView` responsible for fetching topic context and markdown, then composing the top action group, topic header, completion content, and bottom action group.

## Phase 0 Research Summary

Research output is captured in [research.md](./research.md). Key decisions:

- Extract a server-renderable action group component instead of a client component so the existing server action form remains unchanged.
- Pass `studentId`, `pathId`, `topicSlug`, and a placement label into the component; do not pass callback handlers or create new client state.
- Render the group twice: before the topic header for immediate orientation and after `LearningSectionContent` for end-of-reading action.
- Give each repeated group a distinct accessible group label so tests and assistive technology can disambiguate identical action labels.
- Update Playwright selectors that currently assume a single "Complete Topic" button.

## Phase 1 Design Summary

### Component Contract

- Add `LearningTopicActions` in `src/features/student-area/components/learning-topic-actions.tsx`.
- Props:
  - `studentId`: existing student identifier supplied to `completeTopicAction`.
  - `pathId`: saved learning path identifier used by both actions.
  - `topicSlug`: current topic identifier supplied to `completeTopicAction`.
  - `placement`: `start` or `end`, used only to label the repeated action group.
- Render:
  - A grouped container with an accessible label such as "Topic actions" for the top group and "End of topic actions" for the bottom group.
  - A "Return to Builder" link with `href=/tracks/builder?edit={pathId}` and `prefetch={false}`.
  - A form whose action remains `completeTopicAction.bind(null, studentId, pathId, topicSlug)` and whose submit button remains "Complete Topic".

### View Composition

- Remove the standalone top return link and standalone completion form from `LearningSectionView`.
- Render `<LearningTopicActions placement="start" ... />` before the topic header.
- Render `<LearningTopicActions placement="end" ... />` immediately after `LearningSectionContent`.
- Keep all error states unchanged. Error pages continue to expose the existing single return action because the feature is scoped to valid topic learning pages.

### Layout And Accessibility

- Replace or narrow `.return-link` topic-page-specific styling with an action-group style that applies to both the link and the form button.
- Keep both actions side by side on narrow mobile and desktop widths. The labels may wrap inside their own controls if text settings are large, but the group must not cause horizontal page scrolling.
- Preserve button/link contrast through existing semantic control/action tokens. The completion action keeps primary visual weight; the return action keeps secondary visual weight with non-color cues such as border treatment.
- Keep focus order consecutive inside each group: return action first, complete action second.

### Test And Evidence Plan

- Update existing learning-flow tests to target the top action group for repeated completion steps, avoiding ambiguous broad "Complete Topic" button queries after duplication.
- Add a focused integration check that opens a saved-path topic, verifies both top and bottom action groups, scrolls to the bottom, and completes from the bottom group.
- Add placement/readability checks at mobile and desktop viewports for side-by-side layout and absence of horizontal overflow.
- Extend accessibility visual checks only if needed so duplicated topic action controls remain readable in the representative routes and visual modes.
- Capture concise before/after evidence in this feature directory or implementation notes: desktop top, mobile top, desktop bottom, mobile bottom.

## Implementation Task Outline

1. Add `LearningTopicActions` with the existing return link and existing complete-topic form action.
2. Update `LearningSectionView` to render the action component at the start and end of valid topic content.
3. Add or adjust CSS for `.learning-topic-actions` and related child controls so both actions remain side by side and readable across mobile, desktop, default, and high-contrast modes.
4. Update integration tests that complete topics to scope their selectors to the intended action group.
5. Add a bottom-action integration test that verifies end-of-content access and completes from the bottom group.
6. Run focused validation: `pnpm lint`, `pnpm test`, and the student-area learning-flow Playwright spec with Redis available.
