# Feature Specification: Topic Navigation

**Feature Branch**: `009-topic-navigation`

**Created**: 2026-06-06

**Status**: Draft

**Input**: User description: "Support topic navigation for students with an ongoing learning path. Add previous and next topic buttons with arrow icons so students can move back and forth between topics while learning. Going back or forward must not change topic completion status. If the student goes back to a completed topic, Complete Topic is disabled. At the first topic, previous is disabled. At the last topic, next is disabled. Preserve current behavior: completed paths cannot be edited or continued from Learning Path History; editing an ongoing learning path does not affect current topic status for the remaining topics; leaving and returning to a learning path opens the last uncompleted topic. Addendum: the same redundancy already used for Complete Topic and Return to Builder at the top and bottom of the page must also apply to the previous and next topic buttons. The new navigation buttons should be part of the same topic action group as Complete Topic and Return to Builder."

## Constitution Alignment *(mandatory)*

- **Scope control**: This feature improves the existing topic learning flow inside approved personalized learning paths. It does not add a new page, new learning domain, authentication, external integration, or new persistence meaning.
- **Simplicity**: The smallest useful version adds previous-topic and next-topic controls to the existing repeated topic action group for ongoing saved paths. Out of scope: changing completion rules, changing Learning Path History behavior, changing builder editing semantics, adding free-form topic jumps, or changing topic content.
- **Usability/accessibility**: Students must be able to move between neighboring topics from the top or bottom action group without losing their place or accidentally changing progress. Navigation controls must be keyboard reachable, screen-reader understandable, readable in default and high-contrast modes, and distinguishable without relying only on color.
- **Assignment evidence**: Planning and implementation should capture concise usability evidence for top and bottom action groups across first, middle, last, completed-topic, keyboard, mobile, desktop, and high-contrast states.
- **Architecture boundaries**: Topic navigation may change the topic currently displayed inside an ongoing saved path. Only the explicit Complete Topic action may change completion status. Builder composition, Learning Path History, saved-path editing, and normal resume behavior keep their existing responsibilities.
- **Testing independence**: Each boundary and progress-preservation scenario can be tested from its own prepared learning path state without depending on test order, shared mutable state, or previous scenario execution.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Move Between Neighboring Topics (Priority: P1)

A student studying an ongoing learning path can move to the previous topic or next topic from the current topic page, making review and comparison easier without returning to the builder or history.

**Why this priority**: Moving back and forth is the primary user value of the feature. Without it, students must leave the learning flow or rely only on completion-driven movement.

**Independent Test**: Open an ongoing learning path at a middle topic, activate the previous-topic control from the top action group, confirm the previous topic opens, then activate the next-topic control from the bottom action group and confirm the original topic opens again.

**Acceptance Scenarios**:

1. **Given** an ongoing learning path has at least three topics and the student is viewing a middle topic, **When** the student activates the previous-topic control, **Then** the immediately previous topic in the saved path order is displayed.
2. **Given** an ongoing learning path has at least three topics and the student is viewing a middle topic, **When** the student activates the next-topic control, **Then** the immediately next topic in the saved path order is displayed.
3. **Given** the student navigates to a neighboring topic, **When** the topic page updates, **Then** the visible topic title, learning content, and current-position context match the newly selected topic.
4. **Given** the student is at the top of the topic page, **When** the topic action group displays, **Then** previous-topic, next-topic, Return to Builder, and Complete Topic appear together as one action group.
5. **Given** the student reaches the bottom of the topic page, **When** the repeated topic action group displays, **Then** previous-topic, next-topic, Return to Builder, and Complete Topic appear together with the same meanings as the top action group.

---

### User Story 2 - Preserve Completion State While Browsing (Priority: P1)

A student can revisit completed or uncompleted topics without the act of navigation marking anything complete or incomplete.

**Why this priority**: Navigation and progress are separate meanings. Students must be able to review material without accidentally changing their learning path status.

**Independent Test**: Prepare an ongoing path with one completed topic and at least one uncompleted topic, navigate backward and forward across both, and confirm every topic keeps its original completion state until Complete Topic is explicitly used.

**Acceptance Scenarios**:

1. **Given** a student is on an uncompleted topic, **When** the student navigates to another topic with previous or next, **Then** the original topic remains uncompleted.
2. **Given** a student is on a completed topic, **When** the student navigates to another topic with previous or next, **Then** the original topic remains completed.
3. **Given** the student navigates back to a completed topic, **When** the topic page displays, **Then** Complete Topic is disabled and communicates that the topic is already complete.
4. **Given** the student navigates to an uncompleted topic, **When** the topic page displays, **Then** Complete Topic remains available according to the existing completion behavior.

---

### User Story 3 - Understand Navigation Boundaries (Priority: P2)

A student can tell when there is no earlier or later topic, because the previous or next control is disabled at the corresponding boundary.

**Why this priority**: Boundary states prevent dead-end actions and make the learning path order clear.

**Independent Test**: Open the first, middle, last, and single-topic positions for ongoing paths and confirm previous/next availability matches each position in both top and bottom action groups.

**Acceptance Scenarios**:

1. **Given** the student is viewing the first topic in an ongoing learning path, **When** either topic action group displays, **Then** the previous-topic control is disabled.
2. **Given** the student is viewing the last topic in an ongoing learning path, **When** either topic action group displays, **Then** the next-topic control is disabled.
3. **Given** the student is viewing a middle topic, **When** either topic action group displays, **Then** both previous-topic and next-topic controls are available.
4. **Given** an ongoing learning path contains only one topic, **When** the topic page displays, **Then** both previous-topic and next-topic controls are disabled.

---

### User Story 4 - Use The Same Action Group At Top And Bottom (Priority: P2)

A student sees the same complete set of topic actions before reading and after finishing the topic content, so navigation, return, and completion controls feel consistent and intentional.

**Why this priority**: The existing duplicated Return to Builder and Complete Topic controls solve the end-of-reading backtracking problem. The new navigation controls must join that same pattern instead of appearing only at one page location.

**Independent Test**: Compare the top and bottom topic action groups on first, middle, last, completed, and uncompleted topics, then confirm matching controls have matching labels, accessible names, order, availability, and outcomes.

**Acceptance Scenarios**:

1. **Given** the topic page has a top action group, **When** the group displays, **Then** it includes previous-topic, next-topic, Return to Builder, and Complete Topic controls.
2. **Given** the topic page has a bottom action group after the learning content, **When** the group displays, **Then** it includes previous-topic, next-topic, Return to Builder, and Complete Topic controls.
3. **Given** the student compares the top and bottom action groups for the same topic, **When** they inspect labels, accessible names, visual priority, and availability, **Then** matching controls communicate the same meaning and state.
4. **Given** the student activates previous-topic, next-topic, Return to Builder, or Complete Topic from either action group, **When** the action resolves, **Then** the outcome matches the same action from the other group.

---

### User Story 5 - Keep Existing Learning Path Rules Unchanged (Priority: P2)

A student gets topic navigation only inside an ongoing learning flow, while completed history records, builder edits, and return-to-path behavior keep their current meanings.

**Why this priority**: The feature is intentionally narrow. It must not reopen previously corrected progress, history, or builder state ownership rules.

**Independent Test**: Complete a path, edit an ongoing path, and leave then return to an ongoing path; confirm the existing outcomes are preserved while topic navigation is available only during ongoing learning.

**Acceptance Scenarios**:

1. **Given** a learning path is completed, **When** the student views Learning Path History, **Then** that path still cannot be edited or continued.
2. **Given** a student edits an ongoing learning path, **When** the edit is saved or discarded according to existing rules, **Then** completion status for remaining topics is not changed by the editing action itself.
3. **Given** a student navigates backward or forward inside an ongoing path and then leaves the learning flow, **When** the student returns to that path later, **Then** the path opens at the last uncompleted topic rather than treating the last browsed topic as new progress.
4. **Given** no uncompleted topics remain in a saved path, **When** the student returns through Learning Path History, **Then** the path follows the existing completed-path behavior rather than offering ongoing navigation.

### Edge Cases

- A path has exactly one topic; both navigation controls must be disabled while Complete Topic follows the existing completion state.
- A path has exactly two topics; previous and next availability must still match the current position.
- The student navigates from an uncompleted topic to a completed topic; the uncompleted topic must remain uncompleted and the completed topic must not offer another completion action.
- The student navigates from a completed topic to an uncompleted topic; the completed topic must remain completed and the uncompleted topic must still be completable.
- The student completes the final uncompleted topic after navigating; the path must follow the existing completed-path outcome.
- The top and bottom topic action groups must show the same navigation availability and completion state for the same topic.
- Disabled previous, next, and Complete Topic states must be clear to keyboard and screen-reader users, not only visually dimmed.
- The full action group must remain readable and non-overlapping on representative mobile and desktop widths.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The topic learning view for an ongoing saved learning path MUST provide a previous-topic control and a next-topic control as part of the same topic action group that contains Return to Builder and Complete Topic.
- **FR-002**: The previous-topic and next-topic controls MUST use directional arrow icons as visual cues and MUST expose clear accessible names that identify previous-topic and next-topic navigation.
- **FR-003**: The previous-topic control MUST be available only when the current topic has an earlier topic in the same saved path.
- **FR-004**: The previous-topic control MUST be disabled when the current topic is the first topic in the saved path.
- **FR-005**: The next-topic control MUST be available only when the current topic has a later topic in the same saved path.
- **FR-006**: The next-topic control MUST be disabled when the current topic is the last topic in the saved path.
- **FR-007**: If the saved path contains only one topic, both previous-topic and next-topic controls MUST be disabled.
- **FR-008**: Activating previous-topic MUST display the immediately previous topic in the saved path order.
- **FR-009**: Activating next-topic MUST display the immediately next topic in the saved path order.
- **FR-010**: Previous-topic and next-topic navigation MUST NOT mark any topic completed.
- **FR-011**: Previous-topic and next-topic navigation MUST NOT mark any completed topic uncompleted.
- **FR-012**: Previous-topic and next-topic navigation MUST NOT change the saved path status except through existing status derived from explicit topic completion.
- **FR-013**: When the displayed topic is already completed, Complete Topic MUST be disabled and the disabled state MUST communicate that the topic is already complete.
- **FR-014**: When the displayed topic is not completed, Complete Topic MUST keep the existing completion behavior.
- **FR-015**: If a student leaves an ongoing learning path after using previous-topic or next-topic navigation, returning to the path MUST still open the last uncompleted topic according to existing behavior.
- **FR-016**: Completed paths in Learning Path History MUST continue to hide or disable edit and continue actions according to existing behavior.
- **FR-017**: Editing an ongoing learning path MUST continue to avoid changing completion status for remaining topics as a side effect of editing.
- **FR-018**: The topic learning view MUST present the full topic action group near the top of the topic content and repeat the same full action group after the final topic content.
- **FR-019**: Both the top and bottom topic action groups MUST include previous-topic, next-topic, Return to Builder, and Complete Topic controls.
- **FR-020**: Both topic action groups MUST show equivalent labels, accessible names, visual priority, control order, availability, and outcomes for matching actions.
- **FR-021**: If the current topic position or completion state changes, both topic action groups MUST represent the same current previous-topic, next-topic, and Complete Topic availability.
- **FR-022**: Previous-topic, next-topic, and Complete Topic disabled states MUST be programmatically exposed and visually clear without relying on color alone.
- **FR-023**: The navigation controls MUST support keyboard-only operation in a logical order near the existing topic actions.
- **FR-024**: The navigation controls MUST remain readable, reachable, and non-overlapping at representative mobile and desktop widths.
- **FR-025**: The feature MUST NOT add free-form topic jumping, new path history actions, new builder actions, new learning content, new persistence rules, authentication, external services, or unrelated student-area behavior.

### Key Entities *(include if feature involves data)*

- **Ongoing Learning Path**: A saved learning path that still has at least one uncompleted topic and can be continued through the learning flow.
- **Path Topic Position**: The current topic's location within the saved path order, used to determine the immediately previous and next topics.
- **Topic Completion State**: Whether a topic in the saved path is completed or uncompleted, changed only by the explicit Complete Topic action.
- **Topic Action Group**: The repeated set of topic controls containing previous-topic, next-topic, Return to Builder, and Complete Topic.
- **Topic Navigation Control**: A previous-topic or next-topic action within the topic action group that changes the displayed topic without changing completion status.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In review of a middle-topic path, a student can open the immediately previous topic in one action from either action group and the immediately next topic in one action from either action group.
- **SC-002**: In first-topic, middle-topic, last-topic, and single-topic checks, previous-topic and next-topic availability matches the specified boundary rules in 100% of top and bottom action group cases.
- **SC-003**: In navigation tests across completed and uncompleted topics, 100% of topics keep their original completion state after previous-topic or next-topic navigation.
- **SC-004**: In completed-topic checks, Complete Topic is disabled and understandable in 100% of cases where the displayed topic is already complete.
- **SC-005**: In return-to-path checks, leaving after browsing to another topic and returning later opens the last uncompleted topic in 100% of tested ongoing paths.
- **SC-006**: Keyboard-only review confirms a student can reach previous-topic, next-topic, Return to Builder, and Complete Topic controls in a predictable order in both action groups and can identify disabled controls.
- **SC-007**: Mobile and desktop visual review finds no overlapping controls, clipped labels, unreadable icons, or horizontal scrolling in either topic action group in default or high-contrast modes.
- **SC-008**: Top and bottom action group comparison confirms previous-topic, next-topic, Return to Builder, and Complete Topic controls match in labels, accessible names, order, availability, and outcomes in 100% of reviewed topic states.

## Assumptions

- "Ongoing learning path" means a saved learning path that is not completed and is currently available through the existing start or resume learning flow.
- "Previous session" and "next session" in the request mean the immediately previous and next topics in the saved learning path order.
- The saved path order is the existing order already used by the learning flow for Start, Resume, and Complete Topic movement.
- Topic navigation changes only the currently displayed topic during the learning session; it does not redefine where Resume Learning returns later.
- The existing Return to Builder and Complete Topic action meanings remain unchanged except that Complete Topic is disabled when the displayed topic is already complete.
- The existing topic page already has repeated top and bottom topic actions; this feature expands that repeated action group rather than creating a separate navigation-only control area.
