# Data Model: Topic Action Buttons

This feature introduces no new persistent data, no new storage records, and no new progress state. It adds one reusable UI component that consumes existing identifiers and invokes existing actions.

## LearningTopicActions

**Purpose**: Present the two existing topic learning actions as one reusable group that can appear at the start and end of a topic page.

**Fields / Props**:

- `studentId`: Existing anonymous student identifier passed through to the current completion action.
- `pathId`: Existing saved learning path identifier. Used by the return link target and completion action.
- `topicSlug`: Existing current topic identifier passed through to the completion action.
- `placement`: `start` or `end`. Used to provide distinct accessible context for duplicated controls.

**Relationships**:

- Uses `completeTopicAction` as the only completion command.
- Uses the existing builder edit route for the return link.
- Is rendered by `LearningSectionView` for valid saved-path topic pages.

**Validation Rules**:

- The component receives identifiers only after `LearningSectionView` has confirmed the saved path exists and includes the topic.
- `placement` must be one of the supported placement values.
- The component must not load, save, repair, delete, or infer progress state during render.

**State Transitions**:

- Render: no data state changes.
- Return activation: navigates to the existing builder edit destination.
- Complete activation: submits the existing completion action, which owns progress updates and redirect behavior.

## Topic Action Placement

**Purpose**: Distinguish where an otherwise identical action group appears.

**Values**:

- `start`: Action group before the topic header and reading content.
- `end`: Action group after the final rendered learning content.

**Rules**:

- Both placements expose the same visible actions and behavior.
- Both placements maintain consecutive keyboard focus order: return action, then complete action.
- Both placements remain side by side on mobile and desktop layouts.
