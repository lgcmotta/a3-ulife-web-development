# Builder State Contract

## Route: Learning Path Builder

Route: `/tracks/builder`

Create mode:

- Triggered when no `edit` query parameter is present.
- Server provides available tracks and an empty initial composition.
- Server does not create, save, update, delete, repair, migrate, or clean up any learning path data.
- Save is disabled until the student selects at least one topic.
- Start Learning is disabled until Save returns a saved path ID.

Edit mode:

- Triggered by `/tracks/builder?edit={pathId}`.
- Server loads the saved path with `{pathId}` for the current student.
- If the path is unfinished, server copies saved track groups into initial composition.
- If the path is missing or completed, UI shows a recoverable message and does not mutate storage.
- Save is disabled until local composition differs from the initial composition and contains at least one topic.

## Client-Owned Composition Actions

All actions in this section happen locally after initial render.

### Select Track

Input:

- `trackSlug`
- `selected: true`

Rules:

- Selects all topics in the track.
- Adds the track group if absent.
- Replaces any partial selection for that track with all child topics.
- Does not write storage.

### Deselect Track

Input:

- `trackSlug`
- `selected: false`

Rules:

- Removes all topics from that track.
- Removes the track group from the current composition.
- Does not write storage.

### Select Topic

Input:

- `trackSlug`
- `topicSlug`
- `selected: true`

Rules:

- Adds only that topic under the parent track.
- Parent track becomes selected only when all child topics are selected.
- Parent track is partial when some but not all topics are selected.
- Does not write storage.

### Deselect Topic

Input:

- `trackSlug`
- `topicSlug`
- `selected: false`

Rules:

- Removes only that topic.
- Removes the parent track group if no topics remain.
- Does not write storage.

### Remove Item

Input:

- `itemLevel`: track or topic.
- `trackSlug`
- optional `topicSlug`

Rules:

- Track remove removes the whole selected track group.
- Topic remove removes only the selected topic.
- Empty track groups are removed from local composition.
- Does not write storage.

### Move Item

Input:

- `itemLevel`: track or topic.
- `trackSlug`
- optional `topicSlug`
- `direction`: up or down.

Rules:

- Track move reorders selected track groups.
- Topic move reorders only within the parent track group.
- Topic move cannot cross track boundaries.
- Invalid boundary moves leave composition unchanged and show friendly feedback.
- Does not write storage.

### Discard Changes

Input:

- user confirmation if the UI requires confirmation.

Rules:

- Create mode resets to the empty initial composition.
- Edit mode resets to the initial composition copied from the saved path.
- Does not write storage.
- Does not delete or update saved path data.

### Clear Learning Path

Input:

- user confirmation if the UI requires confirmation.

Rules:

- Clears only local builder composition.
- Does not write storage.
- Does not delete saved path or history data.
- If editing, a later valid Save overwrites the edited path ID with the new composition.

## Builder Menu Contract

Current path item menus expose only:

- Remove
- Move up
- Move down

Menus must not expose:

- Complete
- Reset
- Delete

## Local Derived State

The builder derives these values locally:

- `topicCount`
- selected/partial/unselected track state
- selected topic state
- `dirty`
- `canSave`
- `canClear`
- `canStartLearning`

Rules:

- `canSave` is true only when `dirty` is true and `topicCount` is greater than 0.
- `canStartLearning` is true only after a saved path ID exists and there are no unsaved changes.
- Color must not be the only state indicator.
