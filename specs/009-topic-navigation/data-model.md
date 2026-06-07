# Data Model: Topic Navigation

## Existing Entities Reused

### Saved Learning Path

Represents the persisted path being studied.

Relevant fields:

- `pathId`: stable route identifier for the saved path.
- `trackGroups`: ordered track groups containing ordered topic items.
- `status`: existing path status derived from topic completion counts.
- `lastActiveTopicSlug`: existing resume-related field; this feature does not update it during previous/next browsing.

Validation rules:

- Previous/next navigation is available only when the current topic belongs to this saved path.
- Completed saved paths keep existing history behavior and are not continued from history.
- Browsing links must not mutate `status`, `lastActiveTopicSlug`, `completedAt`, or topic completion flags.

### Path Topic Item

Represents one topic inside a saved path.

Relevant fields:

- `topicSlug`: route identifier for the learning topic.
- `trackSlug`: parent track identifier.
- `order`: position inside its parent track group.
- `completed`: whether Complete Topic has already marked this topic complete.
- `completedAt`: completion timestamp when completed.

Validation rules:

- Previous and next are calculated from saved path order, not global catalog order.
- `completed` only changes through the existing Complete Topic command.
- When `completed` is true for the displayed topic, Complete Topic is disabled.

## New Derived View Model

### Topic Navigation State

Read-only view model passed from the learning view into `LearningTopicActions`.

Fields:

- `previousHref`: route for the immediately previous topic, or `null`.
- `nextHref`: route for the immediately next topic, or `null`.
- `isCurrentTopicCompleted`: true when the displayed topic is already complete in the saved path.

Relationships:

- Derived from one `Saved Learning Path` and the current `topicSlug`.
- Consumed by both top and bottom `LearningTopicActions` placements.

Validation rules:

- First topic: `previousHref` is `null`.
- Middle topic: both hrefs are present.
- Last topic: `nextHref` is `null`.
- Single-topic path: both hrefs are `null`.
- Missing current topic: the existing topic-not-in-path error path applies before actions render.

## State Transitions

### Browsing Previous Or Next

1. Student activates an available previous or next control.
2. The app navigates to the neighboring topic route.
3. The newly displayed page derives a fresh `Topic Navigation State`.
4. No saved progress fields change.

### Completing Current Topic

1. Student activates Complete Topic while it is enabled.
2. Existing completion action marks that topic complete and updates path status.
3. Existing completion destination behavior continues.
4. If the student later browses back to the completed topic, Complete Topic is disabled.

### Leaving And Returning

1. Student browses to any topic with previous/next.
2. Student leaves the learning flow.
3. Student returns through existing history/resume behavior.
4. Existing destination logic opens the last uncompleted topic, not the last browsed topic.
