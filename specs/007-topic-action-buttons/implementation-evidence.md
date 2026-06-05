# Implementation Evidence: Topic Action Buttons

## Existing Action Behavior

- Current return destination before implementation: `src/features/student-area/views/learning-section-view.tsx` links to `/tracks/builder?edit=${path.pathId}` with visible label `Return to Builder`.
- Current completion command before implementation: `src/features/student-area/views/learning-section-view.tsx` binds the form action as `completeTopicAction.bind(null, studentId, path.pathId, topicSlug)`.
- Boundary note: `src/features/student-area/actions/complete-topic-action.ts` must remain behaviorally unchanged for this feature. It owns saved-path progress, history upsert, and redirect behavior.

## Mobile And Desktop Review

- Top placement desktop: passed. Browser inspection at the default desktop viewport found the `Topic actions` group before the markdown content, with `Return to Builder` and `Complete Topic` on the same row, equal 266px control widths, no horizontal document overflow, and return href `/tracks/builder?edit=<saved-path-id>`.
- Top placement mobile: passed. Browser inspection at 414px x 896px found the `Topic actions` group remains side by side, with equal 179px control widths and no horizontal document overflow.
- Bottom placement desktop: passed. Browser inspection found the `End of topic actions` group after `.learning-markdown`, with matching labels, matching return href, same-row controls, and no horizontal document overflow.
- Bottom placement mobile: passed. Browser inspection at 414px x 896px found the `End of topic actions` group remains side by side after the markdown content, with equal 179px control widths and no horizontal document overflow.

## Keyboard Review

- Passed. Playwright asserts keyboard focus reaches the top `Return to Builder` link before the top `Complete Topic` button, and the bottom `Return to Builder` link before the bottom `Complete Topic` button.

## High-Contrast Review

- Passed. Browser inspection with `data-contrast="high"` found both action groups still side by side with no horizontal overflow. The return controls used high-contrast control tokens (`rgb(5, 5, 5)` text on `rgb(255, 255, 255)` background with black border), and the complete controls used high-contrast action tokens (`rgb(255, 255, 255)` text on `rgb(0, 63, 143)` background).

## Command Results

- `pnpm lint`: passed on 2026-06-05.
- `pnpm test`: passed on 2026-06-05; 21 files and 73 tests passed.
- `pnpm test:e2e -- tests/integration/student-area-learning-flow.spec.ts`: passed on 2026-06-05; 10 Playwright tests passed across desktop and mobile projects.

## Boundary Check

- `src/features/student-area/actions/complete-topic-action.ts` has no diff.
- Final changed source files are limited to action placement/component styling and duplicate-safe integration test selectors. No `src/server`, `src/storage`, progress repository, or learning progress action behavior changed.
- Remaining `Complete Topic` integration selectors are scoped through exact `Topic actions` or `End of topic actions` group helpers before targeting the button.
