# Feature Specification: Personalized Student Area

**Feature Branch**: `004-personalized-tracks`

**Created**: 2026-06-03

**Status**: Draft

**Input**: User description: "Change personalized tracks spec so Home and Learning Tracks show Start Learning that opens the student area at `/tracks/history`, student area uses `/tracks/history` and `/tracks/builder` tabs, history includes an action to add a new learning path by moving to `/tracks/builder`, platform creates a persistent anonymous student record without authentication, student area data is platform-managed, history shows a table, builder shows track/topic tree plus current path, builder supports checkbox hierarchy, reorder, context menu actions, save/continue/discard flows, feedback toasts, confirmation modals for destructive resets, and detailed topic learning sections with completion and next-topic flow."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Enter The Student Area (Priority: P1)

A student sees a clear "Start Learning" action on Home and Learning Tracks, opens the student area, and can switch between Learning Path History and Learning Path Builder using tab navigation that updates the URL.

**Why this priority**: The student area is the entry point for personalization. Without clear access and stable tab routes, students cannot discover or return to the personalized learning workflow.

**Independent Test**: From Home and Learning Tracks, use "Start Learning", confirm `/tracks/history` opens as the default student area tab, switch between both tabs, and confirm the URL and visible tab content match.

**Acceptance Scenarios**:

1. **Given** a student is on Home, **When** they select "Start Learning", **Then** they are taken to `/tracks/history`.
2. **Given** a student is on Learning Tracks, **When** they select "Start Learning", **Then** they are taken to `/tracks/history`.
3. **Given** the student area is open, **When** the student selects the Learning Path History tab, **Then** the URL is `/tracks/history` and the history table is visible.
4. **Given** the student area is open, **When** the student selects the Learning Path Builder tab, **Then** the URL is `/tracks/builder` and the builder interface is visible.
5. **Given** a student reaches the student area without a known student record, **When** the page loads, **Then** the platform creates and preserves an anonymous student record without requiring login, identity setup, authentication, or authorization.

---

### User Story 2 - Review Learning Path History (Priority: P2)

A student opens the Learning Path History tab and sees a table of prior saved learning paths and progress states.

**Why this priority**: History helps students understand what they have built, saved, continued, completed, or changed.

**Independent Test**: Open `/tracks/history` for a student with and without history, confirm the table or empty state appears, confirm each saved path is understandable, and confirm the add-new-path action moves to `/tracks/builder`.

**Acceptance Scenarios**:

1. **Given** a student has saved learning paths, **When** they open `/tracks/history`, **Then** a table lists the saved learning paths.
2. **Given** a saved path appears in the history table, **When** the student reads the row, **Then** they can understand path name or date, selected tracks, progress, and current status.
3. **Given** a student has no saved learning path history, **When** they open `/tracks/history`, **Then** an empty state explains how to start building a path.
4. **Given** history data is unavailable or cannot be loaded, **When** the history tab renders, **Then** the student receives friendly feedback and a clear next action.
5. **Given** a student is on `/tracks/history`, **When** they select the action to add a new learning path, **Then** they are taken to `/tracks/builder`.

---

### User Story 3 - Build A Personalized Path (Priority: P3)

A student opens the Learning Path Builder, selects complete tracks or individual topics from a collapsible checkbox tree, and sees the current path under construction in the main area.

**Why this priority**: The builder is the core personalization tool and must preserve the track-topic hierarchy clearly.

**Independent Test**: Open `/tracks/builder`, select a whole track, select and remove individual topics, confirm parent and child selection states stay synchronized, and confirm the current path updates immediately.

**Acceptance Scenarios**:

1. **Given** the builder opens, **When** the student inspects the left sidebar, **Then** all available learning tracks appear as collapsible parents with their topic children.
2. **Given** a student selects a track checkbox, **When** the selection is applied, **Then** all topics from that track are selected and added to the current path.
3. **Given** a student deselects a track checkbox, **When** the selection is applied, **Then** all topics from that track are removed from the current path.
4. **Given** a student selects one topic inside a track, **When** the selection is applied, **Then** only that topic appears in the current path under its parent track.
5. **Given** a student selects every topic inside a track one by one, **When** the last topic is selected, **Then** the parent track is shown as fully selected.
6. **Given** a student removes one topic from a fully selected track, **When** the selection changes, **Then** the parent track is shown as partially selected and remaining selected topics stay selected.
7. **Given** a student tries to add an empty track with no selected topics, **When** they attempt to save or start, **Then** the action is blocked and friendly feedback explains that at least one topic is required.
8. **Given** a student adds or removes a track or topic, **When** the selection changes, **Then** a friendly notification confirms what changed.

---

### User Story 4 - Organize And Update The Current Path (Priority: P4)

A student reorders selected tracks and topics, uses item actions from a context menu, and receives feedback when an action is invalid, successful, or destructive.

**Why this priority**: Personalization needs clear control over order and progress without breaking the track-topic hierarchy.

**Independent Test**: Select topics from multiple tracks, reorder tracks, reorder topics inside one track, use remove/move/complete/reset actions, and confirm invalid moves are blocked with feedback.

**Acceptance Scenarios**:

1. **Given** the current path contains multiple selected tracks, **When** the student moves a track up or down, **Then** only track order changes and selected topics remain under their original parent track.
2. **Given** the current path contains multiple selected topics inside one track, **When** the student moves a topic up or down, **Then** only topic order within that same track changes.
3. **Given** the student attempts to place a topic before, after, or inside a different track, **When** the action would break hierarchy, **Then** the move is blocked and a friendly notification explains the rule.
4. **Given** a context menu opens for a selected topic, **When** the student chooses remove, move up, move down, complete, or reset, **Then** the chosen action applies only to that topic when valid.
5. **Given** a context menu opens for a selected track, **When** the student chooses remove, move up, move down, complete, or reset, **Then** the chosen action applies to the whole selected track group when valid.
6. **Given** a student marks a track complete, **When** the action succeeds, **Then** all selected topics in that track are marked completed.
7. **Given** a student resets a track, **When** the action succeeds, **Then** all selected topics in that track are marked not completed.
8. **Given** a student removes, completes, resets, saves, or attempts an invalid action, **When** the action resolves, **Then** the student receives friendly feedback.
9. **Given** a student uses keyboard navigation, **When** they select, reorder, and use context-menu actions, **Then** the same actions remain available without a mouse.

---

### User Story 5 - Save, Continue, Or Discard Builder Changes (Priority: P5)

A student saves the current path, continues prior learning when available, and discards unsaved changes only after confirmation.

**Why this priority**: Students need confidence that saved progress is preserved and unsaved changes are visible before navigation.

**Independent Test**: Build a new path, save it, start learning, return to builder, make changes, confirm Continue Learning is blocked until changes are saved or discarded, and confirm destructive actions require confirmation.

**Acceptance Scenarios**:

1. **Given** no saved path exists, **When** the student selects at least one topic, **Then** Save is available and the learning action remains unavailable until the path is saved.
2. **Given** no saved path exists and the student saves a valid path, **When** save succeeds, **Then** a success notification appears and the primary learning action says "Start Learning".
3. **Given** a saved path exists and no unsaved changes exist, **When** the builder loads, **Then** the primary learning action says "Continue Learning".
4. **Given** a saved path exists and the student changes the current path, **When** unsaved changes exist, **Then** Save is available and Continue Learning is unavailable until the student saves or discards changes.
5. **Given** no unsaved changes exist, **When** the builder loads, **Then** Discard Changes is disabled.
6. **Given** unsaved changes exist, **When** the student selects Discard Changes, **Then** a confirmation dialog appears before the current path reverts to the last saved state.
7. **Given** the student chooses to clear the learning path, **When** they select the clear action, **Then** a confirmation dialog appears before the saved path and progress are cleared.
8. **Given** a save, discard, clear, or invalid action completes, **When** feedback appears, **Then** the message is friendly, specific, and understandable without relying on color alone.

---

### User Story 6 - Learn From Detailed Topic Sections (Priority: P6)

A student starts or continues a saved path, studies detailed topic sections, completes topics, moves to the next topic, and sees a completion screen when the path is finished.

**Why this priority**: The personalized path must become an actual learning flow, not only a planning interface.

**Independent Test**: Save a path, start learning, read a topic section, mark it complete, move through all selected topics, and confirm the final completion screen returns the student to the student area.

**Acceptance Scenarios**:

1. **Given** a saved path has no completed topics, **When** the student selects "Start Learning", **Then** they are taken to the first selected topic section in the saved order.
2. **Given** a saved path has progress, **When** the student selects "Continue Learning", **Then** they are taken to the topic section where they most recently stopped or the next uncompleted topic.
3. **Given** a student opens a topic section, **When** the content loads, **Then** it contains substantial self-contained educational content based on the topic.
4. **Given** a topic section includes external references, **When** a student reads the section, **Then** the section remains understandable without requiring those links.
5. **Given** a student is on a topic section, **When** they select Complete Topic, **Then** the topic is marked completed and the student moves to the next selected topic when one exists.
6. **Given** the completed topic is the final topic in the saved path, **When** the student selects Complete Topic, **Then** a friendly completion screen appears with a message such as "Congratulations, you finished your learning path" and an action back to the student area.
7. **Given** a student is on any learning section, **When** they need to adjust the path, **Then** a visible return-to-builder action is available.

### Edge Cases

- Student reaches the student area without an existing anonymous student record.
- Student opens `/tracks/history` with no saved history.
- Student opens `/tracks/builder` with no saved path.
- Student opens `/tracks/builder` with saved path data.
- Student changes a saved path and tries to continue without saving or discarding changes.
- Student selects every topic in a track one by one instead of selecting the parent track.
- Student deselects one topic from a fully selected track.
- Student tries to add or save an empty track with no topics.
- Student removes all topics from the current path.
- Student tries to reorder a topic outside its parent track.
- Student uses remove, complete, or reset on a whole track.
- Student clicks Discard Changes with unsaved changes.
- Student clears the learning path and progress.
- Student completes the final selected topic.
- Student reopens a completed topic and selects Complete Topic again.
- Student data cannot be loaded or saved.
- Notification appears while another notification is still visible.
- External reference links are unavailable or ignored.
- Long topic section content must remain readable on mobile.
- All selection, reorder, context-menu, progress, completion, tab, and confirmation flows must be keyboard accessible and understandable to screen reader users.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Home MUST display a "Start Learning" action that opens `/tracks/history`.
- **FR-002**: Learning Tracks MUST display a "Start Learning" action that opens `/tracks/history`.
- **FR-003**: The student area MUST have exactly two primary tabs: Learning Path History and Learning Path Builder.
- **FR-004**: The Learning Path History tab MUST use the `/tracks/history` path.
- **FR-005**: The Learning Path Builder tab MUST use the `/tracks/builder` path.
- **FR-006**: Switching between student area tabs MUST update the URL to the matching tab path.
- **FR-007**: The platform MUST treat the browser visitor as the current student without requiring identity setup, login, authentication, or authorization.
- **FR-008**: If no student record exists for the current visitor, the platform MUST create and preserve an anonymous student record before showing student-specific data.
- **FR-009**: Student area data and learning section data MUST be served from platform-managed persistent records.
- **FR-010**: Learning Path History MUST show a table of saved learning path history when history exists.
- **FR-011**: Learning Path History MUST show a clear empty state when no history exists.
- **FR-012**: Learning Path History MUST display an action to add a new learning path, and that action MUST open `/tracks/builder`.
- **FR-013**: The builder MUST show all available tracks and topics in a collapsible tree view.
- **FR-014**: Each track and topic in the builder tree MUST have a checkbox or equivalent selectable control.
- **FR-015**: Selecting a track MUST select all topics that belong to that track.
- **FR-016**: Deselecting a track MUST remove all topics that belong to that track from the current path.
- **FR-017**: Selecting a topic MUST add only that topic to the current path under its parent track.
- **FR-018**: Deselecting a topic MUST remove only that topic from the current path.
- **FR-019**: A parent track MUST be marked selected only when all child topics are selected.
- **FR-020**: A parent track MUST show a partial state when some but not all child topics are selected.
- **FR-021**: Selection state MUST stay synchronized between track parents and topic children.
- **FR-022**: The builder main area MUST display the current path under construction.
- **FR-023**: The current path MUST always group selected topics by their parent track.
- **FR-024**: Empty tracks MUST NOT be added to or saved in the current path.
- **FR-025**: Students MUST be able to reorder selected tracks relative to other selected tracks.
- **FR-026**: Students MUST be able to reorder selected topics only within their own parent track.
- **FR-027**: The platform MUST prevent moving a topic outside its parent track.
- **FR-028**: Track and topic items in the current path MUST provide context-menu actions for remove, move up, move down, complete, and reset.
- **FR-029**: Remove MUST remove the selected topic or selected track group from the current path.
- **FR-030**: Move up and move down MUST move a topic only within its parent track or move a track only among selected track groups.
- **FR-031**: Complete MUST mark the selected topic completed or mark all selected topics in a selected track group completed.
- **FR-032**: Reset MUST mark the selected topic not completed or mark all selected topics in a selected track group not completed.
- **FR-033**: Completion and reset actions MUST update the student record.
- **FR-034**: The builder MUST provide Save, Discard Changes, Clear Learning Path, and Start/Continue learning actions.
- **FR-035**: Save MUST be enabled only when the current path has at least one selected topic and has unsaved changes.
- **FR-036**: Discard Changes MUST be enabled only when unsaved changes exist.
- **FR-037**: Clear Learning Path MUST ask for confirmation before clearing saved path data or progress.
- **FR-038**: Discard Changes MUST ask for confirmation before reverting unsaved changes.
- **FR-039**: If no saved path exists, the learning action MUST become "Start Learning" only after a valid current path is saved.
- **FR-040**: If a saved path exists and no unsaved changes exist, the learning action MUST say "Continue Learning".
- **FR-041**: If a saved path exists and unsaved changes exist, Continue Learning MUST be unavailable until the student saves or discards changes.
- **FR-042**: Starting a saved path MUST open the first selected topic section in saved order.
- **FR-043**: Continuing a saved path MUST open the topic section where the student most recently stopped or the next uncompleted topic.
- **FR-044**: Every add, remove, reorder, complete, reset, save, discard, clear, blocked, or failed action MUST provide clear feedback.
- **FR-045**: Invalid actions MUST show friendly error feedback.
- **FR-046**: Successful save and progress actions MUST show friendly success feedback.
- **FR-047**: Topic learning sections MUST display substantial self-contained educational content for each topic.
- **FR-048**: Topic learning content MAY include external references, but the section MUST remain understandable without opening them.
- **FR-049**: Topic learning sections MUST provide a Complete Topic action near the top of the section.
- **FR-050**: Completing a topic MUST mark it completed and move the student to the next selected topic when one exists.
- **FR-051**: Completing the final selected topic MUST show a friendly completion screen and an action back to the student area.
- **FR-052**: Every learning section MUST include a visible return-to-builder action.
- **FR-053**: Color MUST NOT be the only way to communicate selection, partial selection, completion, disabled actions, current location, or feedback severity.
- **FR-054**: Core student area and learning section flows MUST support keyboard navigation and screen reader users.
- **FR-055**: The feature MUST preserve responsive desktop and mobile usability.
- **FR-056**: The feature MUST NOT add identity setup, authentication, authorization, community features, real chatbot behavior, game mechanics, maps, or calendars.

### Key Entities *(include if feature involves data)*

- **Anonymous Student Record**: Platform-managed record for the current browser visitor, used to store student area data without login or identity setup.
- **Learning Path History Entry**: One saved or completed learning path record shown in the history table, including date or label, selected track summary, progress, and status.
- **Available Learning Track**: Existing curated track that can be expanded in the builder tree and selected as a group.
- **Available Topic**: Topic belonging to one available learning track and selectable individually in the builder.
- **Current Path Draft**: Unsaved builder state containing selected track groups, selected topics, order, completion states, and dirty/unchanged status.
- **Saved Learning Path**: Persisted version of the current path used for Start Learning and Continue Learning.
- **Path Track Group**: Selected parent track inside a current or saved path, containing one or more selected topics.
- **Topic Progress State**: Completion state for one selected topic, either completed or not completed.
- **Builder Feedback Message**: Toast or equivalent message that explains success, error, blocked action, or save state.
- **Confirmation Dialog**: Modal confirmation used only for discarding unsaved changes or clearing a learning path.
- **Learning Section**: Detailed topic study page shown as part of a saved path.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A first-time student can reach `/tracks/history` from Home or Learning Tracks in one action.
- **SC-002**: A student can switch between Learning Path History and Learning Path Builder, and the URL matches the selected tab 100% of the time in review.
- **SC-003**: A first-time student can reach `/tracks/builder` from `/tracks/history` using the add-new-learning-path action in one action.
- **SC-004**: A first-time student can create an anonymous student record, build a valid path with at least one topic, save it, and reach the first learning section in under 4 minutes.
- **SC-005**: 100% of available tracks and topics appear in the builder tree.
- **SC-006**: In usability review, at least 90% of parent/child selection state changes match expected full, partial, and unselected behavior.
- **SC-007**: A returning student can open `/tracks/builder` and see saved path data, order, and progress without rebuilding the path.
- **SC-008**: A student can reorder selected tracks and reorder topics within a track without moving any topic into another parent track.
- **SC-009**: A student with unsaved changes can identify whether Save, Continue Learning, and Discard Changes are available within 10 seconds.
- **SC-010**: A student can complete a topic and reach the next selected topic in under 30 seconds after selecting Complete Topic.
- **SC-011**: Each learning section contains at least 600 words of self-contained educational content, excluding navigation labels and external reference titles.
- **SC-012**: Keyboard-only users can complete the core flow: open student area, switch tabs, select topics, reorder at least one item, save, start learning, complete a topic, and return to builder.
- **SC-013**: Screen reader review confirms tab state, selection state, partial selection, completion state, feedback messages, confirmation dialogs, and page structure are understandable without visual-only cues.
- **SC-014**: Mobile review confirms the history table, builder tree, current path, learning section content, completion action, and return-to-builder action are usable without horizontal scrolling.

## Assumptions

- "Student" means the person currently using the browser; no identity, authentication, or authorization flow is introduced.
- The platform creates or finds an anonymous student record for the visitor before loading student area data.
- Student area and learning section data are platform-managed persistent data, not only temporary page state.
- The default student area destination from "Start Learning" is Learning Path History at `/tracks/history`.
- Learning Path Builder is always available at `/tracks/builder`.
- Detailed learning section content is original English educational content and suitable for beginner or early-stage Computer Science students.
- External references are optional supporting material, not required for completing a topic.
- Clearing a learning path removes the saved path and progress for that path after confirmation.
- If available tracks or topics change after a path was saved, the student area should keep available items, explain unavailable removed items, and avoid breaking the path UI.
