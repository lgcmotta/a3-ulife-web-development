# Quickstart: Topic Navigation

## Prerequisites

- Active branch: `009-topic-navigation`
- Feature pointer: `.specify/feature.json` points to `specs/009-topic-navigation`
- Design artifacts present: `plan.md`, `research.md`, `data-model.md`, and `contracts/learning-topic-actions-contract.md`
- Existing user changes, especially `src/app/globals.css`, must be inspected before editing and preserved unless directly required by this feature.

## Implementation Outline

1. Add the pagination primitive.

   - Create `src/ui/components/pagination.tsx`.
   - Follow the shadcn pagination composition with `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationPrevious`, and `PaginationNext`.
   - Adapt `PaginationLink` to import and render Next.js `Link`.
   - Allow `PaginationPrevious` and `PaginationNext` to receive translated `text` and accessible labels.
   - Keep the primitive small; page numbers and ellipsis are not needed for this feature.

2. Add saved-path neighbor calculation.

   - Add a helper near the existing saved-path path helpers.
   - Flatten the current saved path's ordered topics.
   - Return `previousHref`, `nextHref`, and `isCurrentTopicCompleted` for the current `topicSlug`.
   - Do not update `lastActiveTopicSlug`, completion state, history state, or storage from this helper.

3. Update `LearningSectionView`.

   - Derive navigation state after confirming the topic belongs to the path.
   - Pass `previousHref`, `nextHref`, and `isCurrentTopicCompleted` into both `LearningTopicActions` calls.
   - Keep error states unchanged.

4. Update `LearningTopicActions`.

   - Insert the pagination controls inside the existing grouped component.
   - Render previous-topic, next-topic, Return to Builder, and Complete Topic in that order.
   - Use translated Previous and Next labels from `studentArea.learning`.
   - Disable unavailable previous/next controls.
   - Disable Complete Topic with the plain button `disabled` prop when the displayed topic is already complete.

5. Add translations.

   - Add English `studentArea.learning` keys for previous topic, next topic, previous accessible label, next accessible label, and already-complete state if needed.
   - Add matching Portuguese (Brazil) keys.
   - Use `t(...)` at call sites; do not hardcode Previous or Next in `LearningTopicActions`.

6. Adjust layout only where needed.

   - Update `.learning-topic-actions` and child styles so the four controls fit without overlap.
   - Preserve top and bottom group redundancy.
   - Preserve default and high-contrast readability.
   - Avoid unrelated global CSS churn.

7. Update tests.

   - Add unit tests for first, middle, last, single-topic, and completed-topic navigation state.
   - Update existing learning-flow tests to scope selectors to top or bottom action groups.
   - Add integration checks for previous/next navigation from both placements, disabled boundaries, completed-topic disablement, and unchanged resume behavior.

8. Capture implementation evidence.

   - Add a short evidence artifact or notes in this feature directory with command results and manual review reminders.
   - Include top and bottom action group checks for mobile, desktop, default, and high-contrast modes.

## Focused Verification

```bash
pnpm lint
pnpm test
pnpm test:e2e -- tests/integration/student-area-learning-flow.spec.ts
```

Redis must be available for the Playwright student-area learning flow.

## Manual Review Checklist

- First topic: previous is disabled, next is available.
- Middle topic: previous and next are both available.
- Last topic: next is disabled, previous is available.
- Single-topic path: previous and next are both disabled.
- Completed topic revisited by navigation: Complete Topic is disabled.
- Uncompleted topic reached by navigation: Complete Topic remains enabled.
- Top and bottom action groups contain matching previous, next, Return to Builder, and Complete Topic controls.
- Returning through history after browsing still opens the last uncompleted topic.
- Mobile and desktop layouts have no clipped labels, overlapping controls, or horizontal overflow.
- Default and high-contrast modes keep disabled and enabled states distinguishable without color alone.
