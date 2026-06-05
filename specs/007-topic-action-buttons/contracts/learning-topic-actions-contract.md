# UI Contract: Learning Topic Actions

## Component

`LearningTopicActions`

## Purpose

Render the existing "Return to Builder" and "Complete Topic" controls as one reusable action group for topic learning pages.

## Inputs

| Input | Required | Meaning |
|-------|----------|---------|
| `studentId` | Yes | Existing student identifier used by the complete-topic action |
| `pathId` | Yes | Existing saved path identifier used by both actions |
| `topicSlug` | Yes | Existing topic identifier used by the complete-topic action |
| `placement` | Yes | `start` or `end`, used to distinguish duplicated groups |

## Rendered Controls

| Control | Visible Label | Role | Required Behavior |
|---------|---------------|------|-------------------|
| Return link | Return to Builder | Link | Navigates to `/tracks/builder?edit={pathId}` with the same behavior as the current return link |
| Completion button | Complete Topic | Button | Submits the existing `completeTopicAction` with `studentId`, `pathId`, and `topicSlug` |

## Accessibility Contract

- The two controls must be wrapped in a grouped context with a distinct accessible label for each placement.
- The top placement label should identify the start-of-topic group.
- The bottom placement label should identify the end-of-topic group.
- Keyboard focus order inside each group must be return link first, completion button second.
- Visible labels must remain "Return to Builder" and "Complete Topic".
- The controls must remain readable in default and high-contrast modes without relying on color alone.

## Layout Contract

- Both controls appear side by side on mobile and desktop widths.
- The group must not create horizontal page scrolling.
- Labels may wrap inside their own controls under larger text settings, but controls must not overlap or clip text.

## Non-Goals

- Do not create a new completion command.
- Do not change redirect behavior after completion.
- Do not change saved-path progress or history persistence.
- Do not add sticky, floating, or global page actions.
