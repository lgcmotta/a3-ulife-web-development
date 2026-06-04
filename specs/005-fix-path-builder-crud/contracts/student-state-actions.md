# Student State Action Contract

## Ensure Student

Input:

- optional existing anonymous student ID from browser state

Output:

- `studentId`
- `created`: boolean

Rules:

- Valid existing student records are reused.
- Missing or invalid student records create a new anonymous student record.
- No login, account, authentication, or authorization is introduced.

## Load Builder Initial State

Input:

- `studentId`
- optional `editPathId`

Output:

- available track catalog
- mode: create or edit
- initial composition
- optional saved path ID
- action availability metadata

Rules:

- Create mode returns an empty initial composition.
- Edit mode loads the saved path by ID and copies its composition if the path is unfinished.
- Completed saved paths are not editable.
- Loading does not save, delete, repair, migrate, clean up, or otherwise mutate learning path data.

## Save Builder Composition

Implemented server action: `saveBuilderCompositionAction(studentId, state, trackGroups)`.

Input:

- `studentId`
- optional `pathId`
- ordered track groups and topic items from the local builder composition

Output:

- saved path ID
- saved learning path summary
- updated history entry
- clean builder state metadata
- feedback message

Rules:

- Reject empty compositions.
- Reject empty track groups.
- Reject topics outside their parent tracks.
- Reject topics not present in the available catalog.
- If `pathId` is absent, allocate a new saved path ID and new history ID.
- If `pathId` is present, update that existing unfinished saved path ID.
- When updating an existing path, preserve progress for retained topics, initialize newly added topics as not completed, and remove progress only for topics removed from that saved path.
- Do not update completed paths through the builder.
- Do not create duplicate history rows for an edited path.
- Do not delete any saved path or history entry.

## Load History

Input:

- `studentId`

Output:

- saved path history rows ordered newest first

Rules:

- Missing history returns an empty list.
- History loading does not call recovery, repair, migration, cleanup, or delete behavior.
- Rows for unfinished saved paths include Resume Learning and Edit Path destinations.
- Rows for completed paths include no Resume Learning or Edit Path destinations.
- Rows never include Delete.

## Resolve Learning Destination

Implemented server action: `startOrContinueLearningAction(studentId, pathId)`.

Input:

- `studentId`
- `pathId`

Output:

- destination URL for the first unlearned topic, or completion route if all topics are complete.

Rules:

- Uses the saved path ID supplied by Start Learning or Resume Learning.
- Does not use a global active path.
- Does not allow unsaved builder composition to influence learning navigation.

## Complete Topic

Implemented server action: `completeTopicAction(studentId, pathId, topicSlug)`.

Input:

- `studentId`
- `pathId`
- `topicSlug`

Output:

- updated saved path progress
- updated history status
- destination URL for next topic or completion screen

Rules:

- Updates only the saved path matching `pathId`.
- Marks topic completion in the learning flow only.
- Does not update builder composition state.
- Does not create a builder draft.

## Unsupported Operations

The application must not expose or call learning-path delete behavior in this feature.

Normal application flows must not expose:

- Delete saved path
- Delete history row
- Clear saved path data
- Recover split learning data
- Migrate learning data
- Repair learning data
- Cleanup learning data during load
