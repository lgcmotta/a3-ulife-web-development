# Phase 1 Data Model: Personalized Student Area

## Entity: Anonymous Student Record

Represents the current browser visitor for server-managed learning data.

Fields:

- `studentId`: 7-character Sqids value.
- `numericId`: internal integer used to generate/decode `studentId`.
- `createdAt`: ISO timestamp.
- `lastSeenAt`: ISO timestamp.

Validation:

- `studentId` must be URL-safe and 7 characters minimum.
- Record must be created before loading `/tracks/history` or `/tracks/builder`.
- Student data keys must include `studentId`.

## Entity: Available Learning Track

Represents one predefined learning track from the existing catalog.

Fields:

- `trackSlug`
- `title`
- `summary`
- `description`
- `outcome`
- `topics`

Relationships:

- Has many `Available Topic` items.
- Can become a `Path Track Group` only when at least one child topic is selected.

Validation:

- Empty tracks cannot be saved in draft or active paths.

## Entity: Available Topic

Represents one selectable topic from an available track.

Fields:

- `topicSlug`
- `trackSlug`
- `title`
- `summary`
- `learningContentPath`

Relationships:

- Belongs to exactly one `Available Learning Track`.
- Can become a `Path Topic Item`.
- Has one local markdown learning section.

Validation:

- Topic cannot be selected without preserving its parent `trackSlug`.
- Topic learning content must exist before the topic can be used in a saved path.

## Entity: Current Path Draft

Represents current builder state, including unsaved changes.

Fields:

- `draftId`: 7-character Sqids value.
- `studentId`
- `trackGroups`: ordered list of `Path Track Group`
- `dirty`: boolean indicating draft differs from active saved path.
- `updatedAt`

Relationships:

- Belongs to one `Anonymous Student Record`.
- May be copied into one `Saved Learning Path`.

Validation:

- Must contain zero or more track groups during editing.
- Must contain at least one selected topic before save.
- Must not contain empty track groups.

## Entity: Saved Learning Path

Represents the active saved path used for Start Learning and Continue Learning.

Fields:

- `pathId`: 7-character Sqids value.
- `studentId`
- `trackGroups`: ordered list of `Path Track Group`
- `status`: `not-started`, `in-progress`, or `completed`
- `lastActiveTopicSlug`
- `createdAt`
- `updatedAt`
- `completedAt`

Relationships:

- Belongs to one `Anonymous Student Record`.
- Produces `Learning Path History Entry` records.
- Contains many `Path Topic Item` values through track groups.

Validation:

- Must contain at least one selected topic.
- Must preserve track group order.
- Must preserve topic order inside each track group.

## Entity: Path Track Group

Represents one selected parent track in draft or saved path.

Fields:

- `trackSlug`
- `order`
- `topicItems`: ordered list of `Path Topic Item`

Relationships:

- Belongs to `Current Path Draft` or `Saved Learning Path`.
- Contains one or more selected topic items.

Validation:

- Cannot be empty.
- Reorder can move only relative to other track groups.
- Complete/reset applies to all child topic items.

## Entity: Path Topic Item

Represents one selected topic and its completion state.

Fields:

- `topicSlug`
- `trackSlug`
- `order`
- `completed`
- `completedAt`

Relationships:

- Belongs to one `Path Track Group`.
- Maps to one `Available Topic`.

Validation:

- `trackSlug` must match parent group.
- Reorder can move only within parent track group.
- Complete action sets `completed` true.
- Reset action sets `completed` false and clears `completedAt`.

## Entity: Learning Path History Entry

Represents one row in `/tracks/history`.

Fields:

- `historyId`: 7-character Sqids value.
- `studentId`
- `pathId`
- `savedAt`
- `trackSummary`
- `topicCount`
- `completedTopicCount`
- `status`

Relationships:

- Belongs to one student.
- References one saved path snapshot or active path.

Validation:

- Must be readable as table row text.
- Must not rely on color alone for status.

## Entity: Builder Feedback Message

Represents user-visible feedback for builder actions.

Fields:

- `messageId`
- `kind`: success, error, info
- `message`
- `relatedAction`

Validation:

- Must be friendly and specific.
- Must be announced to assistive technology when relevant.

## Entity: Learning Section

Represents a topic page in the saved path flow.

Fields:

- `pathId`
- `topicSlug`
- `trackSlug`
- `markdownFileName`
- `markdownContent`
- `wordCount`
- `externalReferences`
- `generatedContentReviewNote`

Relationships:

- Belongs to one saved path and one available topic.

Validation:

- Must have exactly one markdown file for every available topic.
- Must contain at least 600 words excluding navigation labels and reference titles.
- Must include realistic beginner-friendly content based on the existing topic summary.
- Must include markdown links to at least two external sources that add value.
- Must remain understandable without opening external links.
- Must not copy or closely paraphrase external source text.
- Must include Complete Topic and return-to-builder actions.

## State Transitions

### Draft Path

```text
empty -> edited -> dirty -> saved
dirty -> discarded -> last saved draft
dirty or saved -> cleared -> empty
```

### Saved Learning Path

```text
not-started -> in-progress -> completed
in-progress -> in-progress (complete next topic)
completed -> in-progress (if path changes and is saved again)
```

### Topic Progress

```text
not completed -> completed
completed -> not completed
```

## Redis Key Pattern

All student data keys include `studentId`:

- `student:{studentId}`
- `student:{studentId}:path:draft`
- `student:{studentId}:path:active`
- `student:{studentId}:paths:history`
- `student:{studentId}:feedback`

Shared counters are not student data:

- `ids:student`
- `ids:path`
- `ids:history`
