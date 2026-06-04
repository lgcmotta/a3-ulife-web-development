# Feature Specification: Learning Path CRUD State Correction

**Feature Branch**: `005-fix-path-builder-crud`

**Created**: 2026-06-04

**Status**: Draft

**Input**: User description: "Correct the Learning Path Builder CRUD flow and state ownership for personalized learning paths. Define the intended user flow and persistence rules so the builder, history, and learning flow behave like a clear standard CRUD-style experience. The builder is a composition UI with local unsaved state after initial load; create starts empty; edit pre-populates from a saved path ID; track/topic selection follows hierarchy rules; path order is grouped by track and topic order; builder menus only manage composition; save is explicit; discard and clear do not mutate saved paths unless Save is used; history is the read entry point for saved paths; learning progress is separate from builder composition; loading and normal storage operations do not contain hidden recovery, migration, repair, or cleanup behavior; delete is unsupported."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create A Learning Path From Builder State (Priority: P1)

A student opens the Learning Path Builder to create a new path, starts from an empty composition, selects tracks or topics, arranges the selected content, saves explicitly, and then starts learning from the newly saved path.

**Why this priority**: Creating a path is the core workflow. The student must be able to trust that selections are temporary until Save and that Start Learning uses the saved path that was just created.

**Independent Test**: Open the builder in create mode, verify no topics are selected, select track and topic combinations, reorder selected items, save, and confirm Start Learning uses the created saved path ID.

**Acceptance Scenarios**:

1. **Given** the student opens the builder to create a new learning path, **When** the builder renders, **Then** the current builder path is empty and contains no selected tracks or topics.
2. **Given** the builder shows available learning content, **When** the student reviews the selector, **Then** tracks appear as parents and topics appear under their parent tracks.
3. **Given** a track has topics, **When** the student selects the whole track, **Then** all topics in that track are added to the current builder path.
4. **Given** a track is selected, **When** the student deselects the whole track, **Then** all topics from that track are removed from the current builder path.
5. **Given** a track has multiple topics, **When** the student selects one topic, **Then** only that topic is added under its parent track.
6. **Given** a selected topic is shown in the current path, **When** the student deselects that topic, **Then** only that topic is removed.
7. **Given** every topic in a track is selected, **When** the student views the parent track control, **Then** the parent track is shown as selected.
8. **Given** only some topics in a track are selected, **When** the student views the parent track control, **Then** the parent track is not shown as selected and may show a partial or mixed state.
9. **Given** selected topics exist in more than one track, **When** the student moves a track group up or down, **Then** the selected track groups reorder relative to each other and their topics remain inside their original parent tracks.
10. **Given** a selected track group contains multiple topics, **When** the student moves a topic up or down, **Then** the topic reorders only within that parent track group.
11. **Given** a topic reorder would move the topic across track boundaries, **When** the student attempts the move, **Then** the move is blocked and the topic remains in its original parent track.
12. **Given** the current builder path has no topics, **When** the student reviews Save, **Then** Save is disabled.
13. **Given** the current builder path has topics and unsaved changes, **When** the student saves a new path, **Then** a saved learning path and history entry are created, the saved path receives an ID, and Start Learning becomes available using that ID.

---

### User Story 2 - Edit A Saved Learning Path Without Accidental Persistence (Priority: P2)

A student opens Learning Path History, chooses an unfinished saved path, edits it in the builder, and controls exactly when saved data changes through Save, Discard Changes, and Clear Learning Path.

**Why this priority**: Editing is where the current behavior is most fragile. The builder must treat saved data as initial input only and must not mutate the saved path while the student is experimenting.

**Independent Test**: Open history for an unfinished saved path, edit that path by ID, make changes without saving, leave and return, discard changes, clear the builder UI, and save a new composition over the same saved path ID.

**Acceptance Scenarios**:

1. **Given** Learning Path History lists an unfinished saved path, **When** the student selects Edit Path, **Then** the builder opens for that saved path ID and pre-populates the initial builder UI from the last saved state.
2. **Given** the builder has rendered for an existing saved path, **When** the student selects, removes, clears, or reorders items, **Then** those changes remain only in local builder UI state until the student selects Save.
3. **Given** an edited builder path has no unsaved changes, **When** the student reviews Save, **Then** Save is disabled.
4. **Given** an edited builder path has unsaved changes and at least one topic, **When** the student selects Save, **Then** the existing saved path ID is updated instead of creating a new saved path.
5. **Given** an edited builder path has unsaved changes, **When** the student selects Discard Changes, **Then** the builder UI resets to the last saved state for that saved path ID.
6. **Given** an edited builder path has unsaved changes, **When** the student selects Discard Changes, **Then** the saved path and history data are not deleted or updated.
7. **Given** the builder is creating a new path and has unsaved selections, **When** the student selects Discard Changes, **Then** the builder returns to the empty initial create state.
8. **Given** the builder is editing a saved path, **When** the student selects Clear Learning Path, **Then** only the current builder UI state is cleared.
9. **Given** the student cleared the builder while editing a saved path and leaves without saving, **When** they return through history, **Then** the saved path still exists and opens from its last saved state.
10. **Given** the student cleared the builder while editing a saved path, then configures a new valid path, **When** the student selects Save, **Then** the existing saved path ID is overwritten with the newly configured path.
11. **Given** the student clears the builder and no topics remain selected, **When** the student reviews Save, **Then** Save remains disabled until at least one topic is selected.

---

### User Story 3 - Read And Resume Saved Paths From History (Priority: P3)

A student uses Learning Path History as the entry point for saved paths, resumes unfinished learning from the next unlearned topic, and sees completed paths as completed records without edit or resume actions.

**Why this priority**: History is the read surface for saved paths. It must clearly separate saved path access from builder composition and learning progress.

**Independent Test**: Create multiple saved paths with different progress states, open history, resume an unfinished path, edit an unfinished path, and confirm completed paths do not offer resume or edit actions.

**Acceptance Scenarios**:

1. **Given** saved learning paths exist, **When** the student opens Learning Path History, **Then** the history lists the saved paths.
2. **Given** a saved path is not completed, **When** the student views its history row, **Then** Resume Learning and Edit Path are available for that path.
3. **Given** the student selects Resume Learning for an unfinished path, **When** the learning flow opens, **Then** it uses the saved path ID and navigates to the last unlearned topic in saved path order.
4. **Given** the student selects Edit Path for an unfinished path, **When** the builder opens, **Then** it uses that saved path ID and pre-populates from saved data.
5. **Given** a saved path is completed, **When** the student views its history row, **Then** Resume Learning and Edit Path are not shown for that path.
6. **Given** history lists saved paths, **When** the student reviews available actions, **Then** no delete action is shown for any learning path.

---

### User Story 4 - Keep Learning Progress Separate From Builder Composition (Priority: P4)

A student completes topics only inside the learning flow, while the builder remains focused on composing, ordering, saving, discarding, and clearing the current path.

**Why this priority**: Completion and composition are different responsibilities. Mixing them makes progress fragile and makes builder state hard to reason about.

**Independent Test**: Open the builder menus and learning flow for a saved path, confirm builder item menus only include composition actions, complete topics in the learning flow, and verify history status changes through learning progress rather than builder edits.

**Acceptance Scenarios**:

1. **Given** the current builder path contains track and topic items, **When** the student opens an item menu, **Then** the menu contains only remove, move up, and move down composition actions.
2. **Given** the student is using the builder, **When** they change composition, **Then** the builder does not mark topics complete and does not reset completed topics.
3. **Given** the student is in the learning flow for a saved path, **When** they complete a topic, **Then** progress for that saved path is updated.
4. **Given** topic completion changes the saved path status, **When** the student returns to history, **Then** history reflects the updated progress or completed status for that saved path.
5. **Given** future behavior would reset progress from builder composition changes, **When** that behavior is considered, **Then** it remains out of scope unless a later approved specification adds it.

---

### User Story 5 - Preserve A Simple Persistence Boundary (Priority: P5)

The system treats saved path storage as a predictable boundary: loading does not mutate data, clearing builder UI does not delete saved records, and delete or hidden repair behavior is not part of this feature.

**Why this priority**: A clear persistence boundary keeps the feature understandable, testable, and academically defensible.

**Independent Test**: Load builder and history states with saved paths, perform clear and discard flows, save valid edits, and confirm no hidden deletion, migration, repair, cleanup, or duplicate path creation occurs.

**Acceptance Scenarios**:

1. **Given** a saved learning path exists, **When** the builder loads that path for editing, **Then** loading pre-populates UI state without modifying the saved path.
2. **Given** normal history or builder loading occurs, **When** saved data is read, **Then** hidden recovery, migration, split-data repair, or cleanup behavior is not performed.
3. **Given** the builder UI is cleared, **When** the student leaves without saving, **Then** saved path and history data remain unchanged.
4. **Given** an edited path is saved, **When** the save completes, **Then** the existing saved path record and its history summary reflect the new composition without creating a duplicate path.
5. **Given** the student looks for path management actions, **When** they inspect history and builder controls, **Then** learning paths cannot be deleted through this feature.

### Edge Cases

- The builder opens in create mode after a prior edit session; it must still start from the empty create state.
- The builder opens for an unfinished saved path after earlier unsaved edits were discarded; it must use the last saved state.
- The student selects every topic in a track individually; the parent track must become selected only after the final child topic is selected.
- The student removes one topic from a fully selected track; the parent track must stop showing as selected and may show a partial state.
- The student removes the final topic from a track group; the empty track group must not remain in the current path and must never be saved.
- The student attempts to save immediately after opening create mode; Save must be disabled because no topics are selected.
- The student attempts to save immediately after opening edit mode with no changes; Save must be disabled because there are no unsaved changes.
- The student clears all builder UI state while editing, navigates away, and returns from history; the saved path must still be available.
- The student clears all builder UI state, selects a different set of topics, and saves; the existing path ID must be overwritten rather than replaced by a new ID.
- The student completes every topic in a saved path; history must treat the path as completed and hide resume and edit actions.
- The student uses only a keyboard or screen reader to select, reorder, save, discard, clear, resume, edit, and complete topics; the states and actions must remain understandable.
- Saved data is unavailable or inconsistent; normal load operations must not silently repair or delete data as part of this feature.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The builder MUST support a create mode that begins from an empty current builder path with no selected tracks or topics.
- **FR-002**: The builder MUST support an edit mode that receives an existing saved learning path ID.
- **FR-003**: Edit mode MUST use the saved path ID only to pre-populate the initial builder UI state from the last saved data for that path.
- **FR-004**: After the builder renders, unsaved selections, removals, clears, and reorders MUST remain in local builder UI state until the student explicitly saves.
- **FR-005**: Loading builder state MUST NOT mutate saved learning path data or history data.
- **FR-006**: The builder MUST show available tracks and topics as a hierarchy with topics grouped under their parent tracks.
- **FR-007**: Selecting a whole track MUST select every topic in that track and add those topics to the current builder path.
- **FR-008**: Deselecting a whole track MUST remove every topic from that track from the current builder path.
- **FR-009**: Selecting one topic MUST affect only that topic.
- **FR-010**: Deselecting one topic MUST affect only that topic.
- **FR-011**: A track MUST be shown selected only when all of its topics are selected.
- **FR-012**: A track MUST NOT be shown selected when only some of its topics are selected.
- **FR-013**: A track with only some selected topics MAY show a partial or mixed visual state when the interface supports it.
- **FR-014**: Empty track groups MUST NOT be saved.
- **FR-015**: The current builder path MUST be ordered by track groups and by topic order within each track group.
- **FR-016**: Students MUST be able to reorder selected track groups relative to other selected track groups.
- **FR-017**: Students MUST be able to reorder selected topics only within their own parent track group.
- **FR-018**: Topics MUST NOT move across tracks.
- **FR-019**: Current-path item menus in the builder MUST only manage composition through remove, move up, and move down actions.
- **FR-020**: Completion and reset progress actions MUST NOT be part of builder composition menus.
- **FR-021**: Save MUST be explicit and initiated by the student.
- **FR-022**: Save MUST be disabled when the current builder path has no topics.
- **FR-023**: Save MUST be disabled when the current builder path has no unsaved changes.
- **FR-024**: Saving a new path MUST create a saved learning path with a path ID and create a history entry.
- **FR-025**: After saving a new valid path, Start Learning MUST become available using the created path ID.
- **FR-026**: Saving edits for an existing path MUST update the existing saved path ID instead of creating a new saved path.
- **FR-027**: Saving edits for an existing path MUST update the existing history summary instead of creating a duplicate saved-path row.
- **FR-028**: Discard Changes in create mode MUST reset the builder UI to the empty initial create state.
- **FR-029**: Discard Changes in edit mode MUST reset the builder UI to the last saved data for the current saved path ID.
- **FR-030**: Discard Changes MUST NOT delete or update the saved path.
- **FR-031**: Clear Learning Path MUST clear only the current builder UI state.
- **FR-032**: Clear Learning Path MUST NOT delete saved path data or history data.
- **FR-033**: If Clear Learning Path asks for confirmation, the confirmation MUST describe that it clears the builder UI and does not delete saved data before Save.
- **FR-034**: If the student clears the builder while editing, configures a new valid path, and saves, the existing saved path ID MUST be overwritten with the newly configured path.
- **FR-035**: Learning Path History MUST be the read entry point for saved learning paths.
- **FR-036**: Learning Path History MUST list saved learning paths.
- **FR-037**: Unfinished saved paths in history MUST offer Resume Learning.
- **FR-038**: Unfinished saved paths in history MUST offer Edit Path.
- **FR-039**: Resume Learning MUST navigate to the last unlearned topic in that saved path.
- **FR-040**: Edit Path MUST open the builder with the saved path ID and pre-populate builder UI state from saved data.
- **FR-041**: Completed paths MUST NOT show Resume Learning.
- **FR-042**: Completed paths MUST NOT show Edit Path.
- **FR-043**: Topic completion MUST happen in the learning flow, not in the builder.
- **FR-044**: Completing topics MUST update saved progress and history status for the saved path.
- **FR-045**: Builder composition changes MUST NOT mark topics complete.
- **FR-046**: Builder composition changes MUST NOT reset completed topics unless a later approved specification explicitly adds that behavior.
- **FR-047**: Normal load and save operations MUST NOT contain hidden recovery, migration, split-data repair, or cleanup behavior.
- **FR-048**: Data recovery or migration behavior MUST require a separate approved specification before it is added.
- **FR-049**: Clearing builder UI state MUST NOT delete saved path or history data.
- **FR-050**: Learning paths MUST NOT have a delete operation through this feature.
- **FR-051**: Selection state, partial state, disabled state, item order, unsaved state, save success, and progress status MUST be communicated without relying on color alone.
- **FR-052**: The create, edit, discard, clear, save, reorder, resume, and learning-completion flows MUST support keyboard-only operation and screen-reader-understandable labels or states.
- **FR-053**: The feature MUST remain within the existing personalized learning path scope and MUST NOT add authentication, account management, external APIs, real AI behavior, maps, calendars, games, or unrelated student-area features.

### Key Entities *(include if feature involves data)*

- **Available Learning Track**: A curated parent category that contains available topics and may be selected as a whole.
- **Available Topic**: A selectable learning item that belongs to exactly one available learning track.
- **Builder UI State**: The current unsaved composition shown in the builder, including selected track groups, selected topics, order, and whether the state differs from its initial state.
- **Builder Initial State**: The state used when the builder first renders; empty for create mode and copied from the saved path for edit mode.
- **Saved Learning Path**: A persisted learning path with a stable path ID, selected track groups, selected topics, order, and progress status.
- **Learning Path History Entry**: A readable row or record that represents a saved learning path and exposes valid actions according to completion status.
- **Path Track Group**: A selected track inside a builder or saved path, containing one or more selected topics.
- **Path Topic Item**: A selected topic inside a path track group, preserving its parent track and order.
- **Learning Progress State**: Completion information for topics in a saved path, updated by the learning flow.
- **Builder Composition Menu**: The item menu in the current builder path, limited to remove, move up, and move down actions.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In review, creating a new path starts from zero selected topics in 100% of attempts.
- **SC-002**: In selection tests, whole-track selection, whole-track deselection, individual topic selection, individual topic deselection, full parent state, and partial parent state match the specification in 100% of cases.
- **SC-003**: In reorder tests, 100% of track moves preserve each track's topics, and 100% of topic moves remain within the original parent track.
- **SC-004**: Save availability matches the no-topics and no-unsaved-changes rules in 100% of create and edit state checks.
- **SC-005**: A student can create a valid path, save it, and start learning from the created path ID in under 3 minutes during usability review.
- **SC-006**: Editing and saving an unfinished path preserves the same saved path ID and does not add a duplicate saved-path row in 100% of edit-save tests.
- **SC-007**: Clearing the builder UI while editing and leaving without saving preserves the saved path and history entry in 100% of clear-without-save tests.
- **SC-008**: Clearing an edited path, configuring a new valid composition, and saving overwrites the existing path ID in 100% of clear-then-save tests.
- **SC-009**: Resume Learning opens the last unlearned topic for unfinished saved paths in 100% of tested progress states.
- **SC-010**: Completed paths show no Resume Learning or Edit Path actions in 100% of history checks.
- **SC-011**: Builder item menus contain no completion or reset progress actions in 100% of menu checks.
- **SC-012**: No visible delete action exists for learning paths in history or builder review.
- **SC-013**: Keyboard-only review confirms a student can select topics, reorder at least one track and one topic, save, discard, clear, resume learning, and complete a topic without a mouse.
- **SC-014**: Screen-reader review confirms selected, partial, disabled, unsaved, saved, progress, and completed states are understandable without visual-only cues.

## Assumptions

- The existing student area already provides entry points to Learning Path History and Learning Path Builder.
- "Create mode" means the builder is opened without a saved learning path ID.
- "Edit mode" means the builder is opened with one unfinished saved learning path ID.
- "Last unlearned topic" means the first topic in saved path order that has not been completed; if no such topic exists, the path is considered completed.
- Completed paths are retained as history records but are not editable or resumable through this feature.
- If saved data cannot be loaded, the user receives a clear recoverable state; this feature does not silently repair, migrate, delete, or clean up that data.
- Existing available tracks and topics remain the source of selectable learning content.
