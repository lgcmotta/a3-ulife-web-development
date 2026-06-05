# Research: Topic Action Buttons

## Decision: Extract a server-renderable learning topic action group

**Rationale**: The existing topic view already renders a Next link for returning to the builder and a form bound to `completeTopicAction` for completion. A server-renderable component can hold those two controls without introducing client state, callback props, or a new behavior layer.

**Alternatives considered**:

- Keep duplicate markup directly inside `LearningSectionView`: rejected because the user explicitly requested a reusable component and duplicated markup would make future label or styling fixes easier to miss.
- Create a client component with callbacks: rejected because the existing server action form already expresses the completion command explicitly and does not need client state.

## Decision: Keep existing button actions exactly as they are

**Rationale**: The feature is a placement and reuse correction. The current return destination is `/tracks/builder?edit={pathId}`, and completion is handled by `completeTopicAction.bind(null, studentId, pathId, topicSlug)`. Keeping those sources avoids changing saved-path IDs, progress updates, history behavior, or redirects.

**Alternatives considered**:

- Create a new wrapper action for bottom completion: rejected because it would add a second command path for the same behavior.
- Derive the builder target from history or current route state: rejected because the existing explicit edit link already matches the current behavior.

## Decision: Render the same action group at the start and end of valid topic content

**Rationale**: The top group supports immediate orientation, and the bottom group solves the reported backtracking problem after reading. Rendering after the markdown content keeps the reading flow uninterrupted.

**Alternatives considered**:

- Sticky footer controls: rejected as broader interaction design and potentially intrusive on mobile.
- Only move the complete button next to the return button at the top: rejected because it does not solve the end-of-topic backtracking problem.

## Decision: Use distinct accessible group labels for repeated controls

**Rationale**: The visible button labels should remain identical, but the repeated groups need distinguishable context for keyboard and assistive-technology review. Distinct group labels also let Playwright tests avoid ambiguous duplicate role queries.

**Alternatives considered**:

- Give both groups the same group label: rejected because test selectors and accessibility reviews would still be ambiguous.
- Change visible button labels at the bottom: rejected because the user asked to reuse the same actions and labels.

## Decision: Scope tests to action groups after duplication

**Rationale**: Existing tests use broad role queries for "Complete Topic". Once two matching buttons exist on each topic page, broad click selectors become ambiguous. Tests should target the top group for existing progression checks and the bottom group for the new redundancy scenario.

**Alternatives considered**:

- Rely on `.first()` everywhere: rejected for the new bottom-action scenario because it would not prove the bottom control works.
- Add hidden text to distinguish buttons: rejected because the actions should remain equivalent and context belongs on the group.
