# Quickstart: Topic Action Buttons

## Implementation Path

1. Confirm the active feature is `007-topic-action-buttons`.
2. Add `src/features/student-area/components/learning-topic-actions.tsx`.
3. Move the existing return link and complete-topic form from `LearningSectionView` into the new component.
4. Render the component before the topic header and after `LearningSectionContent`.
5. Add CSS for a side-by-side topic action group that fits mobile and desktop widths.
6. Update Playwright selectors that currently assume only one "Complete Topic" button exists.

## Focused Validation

Run these after implementation:

```bash
pnpm lint
pnpm test
pnpm test:e2e -- tests/integration/student-area-learning-flow.spec.ts
```

The Playwright check requires the existing Redis test dependency to be available, matching the current student-area integration setup.

## Manual Review

- Open a saved learning path topic on a mobile-width viewport and confirm the top actions are side by side.
- Scroll to the end of the same topic on mobile and confirm the bottom actions are side by side.
- Repeat the top and bottom checks on desktop.
- Complete a topic from the bottom action group and confirm it advances exactly like the current top completion action.
- Use keyboard navigation to confirm each action group focuses "Return to Builder" before "Complete Topic".
