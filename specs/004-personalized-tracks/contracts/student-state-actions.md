# Student State Action Contract

## Identity-Free Student Record

### Ensure Student

Input:

- optional existing anonymous student ID from browser state

Output:

- `studentId`
- `created`: boolean

Rules:

- If ID exists and record is valid, update last seen timestamp.
- If ID is missing or invalid, create a new anonymous student record.
- Do not require identity setup, login, authentication, or authorization.

## History Actions

### Load History

Input:

- `studentId`

Output:

- history entries ordered newest first
- empty state flag

Rules:

- Missing history returns an empty list, not an error.
- Redis load failure returns a friendly recoverable error state.

## Builder Actions

### Load Builder State

Input:

- `studentId`

Output:

- available track catalog
- draft path
- active saved path
- dirty state

Rules:

- If draft is missing and saved path exists, derive draft from saved path.
- If both are missing, return empty draft.

### Toggle Track

Input:

- `studentId`
- `trackSlug`
- `selected`

Output:

- updated draft
- feedback message

Rules:

- Selecting track selects all child topics.
- Deselecting track removes all child topics.
- Empty track group must not remain.

### Toggle Topic

Input:

- `studentId`
- `trackSlug`
- `topicSlug`
- `selected`

Output:

- updated draft
- parent selection state
- feedback message

Rules:

- Selecting topic adds it under its parent track.
- Deselecting topic removes only that topic.
- If last topic is removed, remove parent group.
- If all child topics become selected, parent is fully selected.
- If some child topics are selected, parent is partial.

### Reorder Item

Input:

- `studentId`
- `itemLevel`: track or topic
- `trackSlug`
- optional `topicSlug`
- `direction`: up or down

Output:

- updated draft
- feedback message

Rules:

- Track reorder moves only whole track groups.
- Topic reorder moves only within parent track group.
- Invalid boundary moves return friendly error feedback.

### Apply Context Menu Action

Input:

- `studentId`
- `itemLevel`: track or topic
- `trackSlug`
- optional `topicSlug`
- `action`: remove, move up, move down, complete, reset

Output:

- updated draft
- feedback message

Rules:

- Remove track removes whole group.
- Remove topic removes one topic and removes parent group if empty.
- Complete track completes all child topics.
- Reset track resets all child topics.
- Complete/reset topic affects one topic.

### Save Draft

Input:

- `studentId`

Output:

- saved active path
- history entry
- dirty state false
- feedback message

Rules:

- Draft must contain at least one selected topic.
- Empty track groups are rejected.
- Save copies draft to active path and appends/updates history.

### Discard Changes

Input:

- `studentId`
- confirmation accepted

Output:

- draft reset to saved path or empty draft
- dirty state false
- feedback message

Rules:

- Must require confirmation before applying.
- If no saved path exists, discard returns to empty draft.

### Clear Learning Path

Input:

- `studentId`
- confirmation accepted

Output:

- empty draft
- no active path
- cleared progress
- updated history state
- feedback message

Rules:

- Must require confirmation before applying.
- Clears saved path and progress for current student.

## Learning Actions

### Start Learning

Input:

- `studentId`

Output:

- destination topic route

Rules:

- Requires saved path with at least one selected topic.
- Opens first selected topic when no progress exists.

### Continue Learning

Input:

- `studentId`

Output:

- destination topic route or completion route

Rules:

- Disabled while unsaved changes exist.
- Opens last active topic or next uncompleted topic.
- Opens completion route when all topics are complete.

### Complete Topic

Input:

- `studentId`
- `pathId`
- `topicSlug`

Output:

- updated progress
- next destination
- feedback message

Rules:

- Marks topic completed.
- Moves to next selected topic when available.
- Moves to completion route if final topic completed.
