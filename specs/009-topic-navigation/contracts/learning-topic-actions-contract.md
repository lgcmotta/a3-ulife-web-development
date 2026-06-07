# UI Contract: Learning Topic Actions With Navigation

## Component

`LearningTopicActions`

## Purpose

Render the repeated topic action group for ongoing learning topics. The group contains previous-topic, next-topic, Return to Builder, and Complete Topic controls at both the top and bottom of the topic page.

## Inputs

| Input | Required | Meaning |
|-------|----------|---------|
| `studentId` | Yes | Existing student identifier used by the complete-topic action |
| `pathId` | Yes | Saved learning path identifier used by return, previous, next, and completion actions |
| `topicSlug` | Yes | Current topic identifier supplied to the complete-topic action |
| `placement` | Yes | `start` or `end`, used to distinguish duplicated groups |
| `previousHref` | Yes | Previous topic route, or `null` when unavailable |
| `nextHref` | Yes | Next topic route, or `null` when unavailable |
| `isCurrentTopicCompleted` | Yes | Whether the displayed topic is already complete |

## Rendered Controls

| Control | Visible Label | Role | Required Behavior |
|---------|---------------|------|-------------------|
| Previous topic | Translated Previous text | Link when available; disabled control when unavailable | Opens the immediately previous topic in the saved path order |
| Next topic | Translated Next text | Link when available; disabled control when unavailable | Opens the immediately next topic in the saved path order |
| Return link | Return to Builder | Link | Navigates to `/tracks/builder?edit={pathId}` with the existing behavior |
| Completion button | Complete Topic | Button | Submits the existing `completeTopicAction` unless `isCurrentTopicCompleted` is true |

## Accessibility Contract

- The full group must be wrapped in a grouped context with a distinct accessible label for each placement.
- The top placement label identifies the start-of-topic group.
- The bottom placement label identifies the end-of-topic group.
- Keyboard focus order inside each group is previous, next, Return to Builder, Complete Topic.
- Previous and Next visible text and accessible names come from translations.
- Disabled previous, disabled next, and disabled Complete Topic states are programmatically exposed and visually clear.
- Color is not the only way to communicate availability.

## Layout Contract

- The same four controls appear in both top and bottom action groups.
- The bottom group appears after the final topic content.
- The group must not create horizontal page scrolling on representative mobile or desktop widths.
- Labels may wrap inside their controls under narrow or large-text conditions, but controls must not overlap or clip text.

## State Contract

- Previous/next navigation never changes topic completion state.
- Previous/next navigation never updates the resume destination.
- Complete Topic is disabled when `isCurrentTopicCompleted` is true.
- Return to Builder destination is unchanged.
- Top and bottom groups receive the same hrefs and completion state for a given topic.

## Non-Goals

- Do not add page-number topic jumping.
- Do not change the completion server action destination behavior.
- Do not change saved-path progress, history, or builder persistence semantics.
- Do not add sticky, floating, or global page actions.
