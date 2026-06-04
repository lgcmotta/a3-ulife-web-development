# Phase 1 Data Model: Learning Path CRUD State Correction

## Entity: Anonymous Student Record

Represents the current browser student.

Fields:

- `studentId`: public student ID.
- `numericId`: internal numeric counter value.
- `createdAt`: creation timestamp.
- `lastSeenAt`: last-seen timestamp.

Relationships:

- Owns saved learning paths and history entries.

Validation:

- Student identity remains anonymous and must not require authentication or account setup.
- Student record loading/saving must not mutate learning path records.

## Entity: Available Learning Track

Represents one selectable parent track from the curated catalog.

Fields:

- `trackSlug`
- `title`
- `summary`
- `topics`

Relationships:

- Has many available topics.
- Can become a path track group only when one or more child topics are selected.

Validation:

- A track is selected only when all child topics are selected.
- A track is partial when some but not all child topics are selected.
- Empty tracks must not be saved.

## Entity: Available Topic

Represents one selectable topic from the curated catalog.

Fields:

- `topicSlug`
- `trackSlug`
- `title`
- `summary`

Relationships:

- Belongs to exactly one available learning track.
- Can become a path topic item only inside its parent track group.

Validation:

- A topic cannot move across parent track boundaries.
- Selecting or deselecting one topic affects only that topic.

## Entity: Builder Initial State

Represents the state supplied by the server when the builder first renders.

Fields:

- `mode`: `create` or `edit`.
- `studentId`
- `savedPathId`: null in create mode, existing path ID in edit mode.
- `availableTracks`
- `initialComposition`
- `learningActionPathId`: null until Save creates or confirms a saved path.

Relationships:

- Create mode has no saved path relationship.
- Edit mode references exactly one unfinished saved learning path.

Validation:

- Create mode initial composition is empty.
- Edit mode initial composition is copied from the saved path ID.
- Loading this state must not save, delete, repair, migrate, or clean up learning path data.

## Entity: Builder Composition State

Represents the current unsaved builder UI state owned by the client after initial render.

Fields:

- `trackGroups`: ordered path track groups.
- `dirty`: derived from comparing current composition to the initial or last-saved composition.
- `topicCount`: derived count of selected topics.
- `canSave`: derived from `dirty` and `topicCount`.
- `canClear`: derived from `topicCount`.
- `canStartLearning`: derived from a saved path ID and no unsaved changes.

Relationships:

- Starts from Builder Initial State.
- Can be saved into a Saved Learning Path.

Validation:

- May be empty while composing.
- Must contain at least one topic before Save.
- Must not contain empty track groups.
- Must preserve track-group order.
- Must preserve topic order within each parent track group.
- Must not include completion/reset mutations from builder menus.

## Entity: Saved Learning Path

Represents a persisted learning path record.

Fields:

- `pathId`
- `studentId`
- `trackGroups`
- `status`: `not-started`, `in-progress`, or `completed`.
- `lastActiveTopicSlug`
- `createdAt`
- `updatedAt`
- `completedAt`

Relationships:

- Belongs to one anonymous student.
- Has one history entry.
- Has many path track groups.
- Has learning progress through path topic items.

Validation:

- Must contain at least one selected topic.
- Must not contain empty track groups.
- Each topic item must stay inside its parent track group.
- Create Save assigns a new path ID.
- Edit Save overwrites the same existing path ID.
- Edit Save preserves completion data for retained topics, initializes newly added topics as not completed, and removes progress only for topics removed from that saved path.
- Completed paths are retained but not editable or resumable through this feature.

## Entity: Learning Path History Entry

Represents a readable saved-path row in Learning Path History.

Fields:

- `historyId`
- `studentId`
- `pathId`
- `savedAt`
- `trackSummary`
- `topicCount`
- `completedTopicCount`
- `status`

Relationships:

- Belongs to one saved learning path.
- Reads current progress from the matching saved path when available.

Validation:

- One saved path should have one history row.
- Editing a path updates the row with the same path ID.
- Unfinished rows expose Resume Learning and Edit Path.
- Completed rows expose neither Resume Learning nor Edit Path.
- No row exposes Delete.

## Entity: Path Track Group

Represents one selected track inside a builder composition or saved path.

Fields:

- `trackSlug`
- `order`
- `topicItems`

Relationships:

- Contains one or more path topic items.

Validation:

- Must not be empty when saved.
- Can move only relative to other track groups.
- Removing a track group removes all selected child topics from the current builder composition.

## Entity: Path Topic Item

Represents one selected topic inside a path track group.

Fields:

- `topicSlug`
- `trackSlug`
- `order`
- `completed`
- `completedAt`

Relationships:

- Belongs to one path track group.
- Maps to one available topic.

Validation:

- `trackSlug` must match the parent track group.
- Can reorder only within the parent track group.
- Builder composition must not mark or reset completion.
- Learning flow completion updates `completed` and `completedAt`.

## Entity: Builder Composition Menu

Represents the item menu shown for selected tracks and topics in the current builder path.

Fields:

- `itemLevel`: track or topic.
- `trackSlug`
- `topicSlug`: present for topic items.
- `actions`: remove, move up, move down.

Validation:

- Must not include Complete.
- Must not include Reset.
- Move topic actions cannot cross parent track boundaries.

## State Transitions

### Builder Create Mode

```text
empty local composition -> locally edited -> saved as new path -> clean saved composition
locally edited -> discard -> empty local composition
locally edited -> clear -> empty local composition
```

### Builder Edit Mode

```text
saved path copied to local composition -> locally edited -> save -> same path ID overwritten
locally edited -> discard -> last saved composition for same path ID
locally edited -> clear -> empty local composition
empty local composition -> locally edited -> save -> same path ID overwritten
```

### Saved Learning Path Progress

```text
not-started -> in-progress -> completed
```

Progress transitions occur through the learning flow only.

### History Row Actions

```text
unfinished saved path -> show Resume Learning and Edit Path
completed saved path -> show no Resume Learning and no Edit Path
```
