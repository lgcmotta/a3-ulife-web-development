# History And Learning Contract

## Learning Path History

Route: `/tracks/history`

Content:

- Saved learning path rows.
- Empty state when no saved paths exist.
- Add New Learning Path action to `/tracks/builder`.

Row fields:

- saved date or label
- track summary
- progress label
- status label
- actions based on saved path status

Rules:

- History is the read entry point for saved paths.
- Unfinished saved paths show Resume Learning and Edit Path.
- Resume Learning links to the next unlearned topic for that path ID.
- Edit Path links to `/tracks/builder?edit={pathId}`.
- Completed saved paths show no Resume Learning and no Edit Path.
- No row shows Delete.
- Status and action availability must be understandable without relying on color alone.

## Start Learning After Save

Trigger:

- Student saves a valid new builder composition.

Rules:

- Save returns the created saved path ID.
- Start Learning becomes enabled after Save.
- Start Learning uses the created saved path ID.
- The first destination is the first unlearned topic in saved path order.

## Resume Learning From History

Trigger:

- Student selects Resume Learning on an unfinished history row.

Rules:

- Resume uses the selected row's saved path ID.
- Destination is the first unlearned topic in saved path order.
- If every topic is complete, destination is the completion route and history should subsequently show completed status.

## Edit Path From History

Trigger:

- Student selects Edit Path on an unfinished history row.

Rules:

- Builder opens with `edit={pathId}`.
- Builder pre-populates from saved database state for that path ID.
- Unsaved edits remain local until Save.
- Save overwrites the same path ID.

## Topic Learning Section

Route shape: `/tracks/learn/{pathId}/{topicSlug}`

Rules:

- Loads the saved path by route `pathId`.
- Rejects or explains missing paths and topics without mutating storage.
- Complete Topic marks the topic complete on that saved path ID.
- Complete Topic updates history progress/status for that path ID.
- Completion navigates to the next unlearned topic or `/tracks/learn/{pathId}/complete`.

## Path Completion

Route shape: `/tracks/learn/{pathId}/complete`

Rules:

- Shows a completion message for a completed saved path.
- Offers return to Learning Path History.
- Completed history row has no Resume Learning or Edit Path.
