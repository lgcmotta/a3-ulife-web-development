# Feature Specification: Topic Action Buttons

**Feature Branch**: `007-topic-action-buttons`

**Created**: 2026-06-04

**Status**: Draft

**Input**: User description: "Adjust the topic learning view to make the buttons Return to Builder and Complete Topic side by side on mobile and desktop. Also show both buttons at the bottom of the page so a user who finishes reading the topic does not have to scroll back to the top to complete the topic or return to the builder."

## Constitution Alignment *(mandatory)*

- **Scope control**: This feature improves an existing learning topic view inside the approved learning tracks area. It does not add a new page, new learning domain, authentication, external integration, or unrelated product behavior.
- **Simplicity**: The smallest useful version is a layout and redundancy correction for two existing topic actions. Out of scope: redesigning the topic page, changing track progress rules, adding sticky controls, adding new action types, or changing topic content.
- **Usability/accessibility**: Students must see the two available topic actions as a clear pair before reading and again after finishing the topic. The controls must remain keyboard reachable, screen-reader understandable, visually distinct, and readable in default and high-contrast visual modes.
- **Assignment evidence**: Planning and implementation should capture concise before/after evidence for mobile and desktop, plus a short usability note that the end-of-topic completion path no longer requires returning to the top of the page.
- **Architecture boundaries**: The topic view may present existing actions in two locations, but the actions keep their current meanings. Unsaved UI interaction, completion commands, builder navigation, and any existing progress storage remain explicit and separate.
- **Testing independence**: The top action group, bottom action group, mobile layout, desktop layout, keyboard flow, and completed-topic state can each be verified from a topic page without depending on test order or shared mutable state.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - See paired topic actions before reading (Priority: P1)

A student opening a topic can immediately understand that returning to the builder and completing the topic are both available actions, because the controls appear as a paired group at the top of the topic content on mobile and desktop.

**Why this priority**: The current separation makes the complete action easy to miss, especially on wide screens where the requested placement is visually distant from the return action.

**Independent Test**: Open a topic learning view at representative mobile and desktop widths and confirm both actions appear together before the topic title or main reading content, with readable labels and no overlap.

**Acceptance Scenarios**:

1. **Given** a student opens a topic learning view on a mobile-width screen, **When** the top of the topic content is displayed, **Then** "Return to Builder" and "Complete Topic" appear side by side as a single action group.
2. **Given** a student opens a topic learning view on a desktop-width screen, **When** the top of the topic content is displayed, **Then** "Return to Builder" and "Complete Topic" appear side by side as a single action group.
3. **Given** a student uses keyboard navigation from the top of the topic view, **When** focus reaches the action group, **Then** the return action and completion action are reached in a logical consecutive order.

---

### User Story 2 - Finish reading without backtracking (Priority: P1)

A student who reaches the end of the topic can complete the topic or return to the builder from the bottom of the page without scrolling back to the top.

**Why this priority**: The reported usability problem occurs after reading, when the user naturally expects the next action to be available near the end of the content.

**Independent Test**: Scroll to the end of a long topic and confirm both actions appear after the final learning content, side by side on mobile and desktop, and trigger the same outcomes as the top actions.

**Acceptance Scenarios**:

1. **Given** a student has scrolled to the end of a topic on a mobile-width screen, **When** the final topic section is visible, **Then** "Return to Builder" and "Complete Topic" appear side by side after the content.
2. **Given** a student has scrolled to the end of a topic on a desktop-width screen, **When** the final topic section is visible, **Then** "Return to Builder" and "Complete Topic" appear side by side after the content.
3. **Given** a student activates "Complete Topic" from the bottom action group, **When** the action completes, **Then** the topic completion outcome matches the existing top completion action.
4. **Given** a student activates "Return to Builder" from the bottom action group, **When** navigation occurs, **Then** the destination matches the existing top return action.

---

### User Story 3 - Use duplicated actions without confusion (Priority: P2)

A student sees the same labels, visual hierarchy, and availability state for both top and bottom action groups, so duplicated controls feel intentional rather than inconsistent.

**Why this priority**: Redundant controls improve usability only if users can trust that both placements perform the same actions and reflect the same state.

**Independent Test**: Compare the top and bottom action groups before and after completing a topic and confirm that matching actions have equivalent labels, accessible names, visual priority, and availability.

**Acceptance Scenarios**:

1. **Given** a topic is not yet completed, **When** the student compares the top and bottom action groups, **Then** both groups present the same return and completion options with matching meaning.
2. **Given** the topic completion state changes, **When** the student views either action group, **Then** both groups represent the same current completion state.

### Edge Cases

- On narrow mobile screens, both actions must remain side by side within the content width without horizontal scrolling, label clipping, or overlap.
- With larger text settings, labels may wrap inside their own controls, but the actions must remain visually grouped, readable, and reachable in a consecutive focus order.
- For already completed topics, both action groups must show the same completed-topic behavior or availability state as the existing completion action.
- In high-contrast mode, the two actions must remain readable and distinguishable without relying on color alone.
- If topic content includes tables, links, or long sections, the bottom action group must still appear after the final topic content rather than interrupting the reading flow.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The topic learning view MUST present "Return to Builder" and "Complete Topic" together as a side-by-side action group near the top of the topic content on mobile and desktop layouts.
- **FR-002**: The topic learning view MUST repeat the same two actions together as a side-by-side action group after the final topic content on mobile and desktop layouts.
- **FR-003**: The top and bottom "Return to Builder" actions MUST have the same destination and user-visible meaning.
- **FR-004**: The top and bottom "Complete Topic" actions MUST have the same completion outcome and must respect the same current topic completion state.
- **FR-005**: The paired actions MUST maintain readable labels without clipping, overlapping, or causing horizontal page scrolling at representative mobile and desktop widths.
- **FR-006**: The paired actions MUST be reachable and activatable with keyboard-only navigation in a logical order at both page locations.
- **FR-007**: The paired actions MUST expose clear accessible names that match their visible purpose.
- **FR-008**: The visual hierarchy MUST make the completion action and return action distinguishable in default and high-contrast modes without using color as the only cue.
- **FR-009**: The bottom action group MUST appear after the learning content so students who finish reading can act without returning to the top of the page.
- **FR-010**: The feature MUST NOT add new topic actions, new learning content, new persistence rules, or hidden progress changes beyond the explicit existing completion action.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In mobile and desktop review viewports, 100% of inspected topic pages show "Return to Builder" and "Complete Topic" side by side in the top action area before the main reading content.
- **SC-002**: In mobile and desktop review viewports, 100% of inspected topic pages show the same two actions side by side after the final topic content.
- **SC-003**: A student who reaches the final topic section can activate either "Return to Builder" or "Complete Topic" within 5 seconds without scrolling upward.
- **SC-004**: Keyboard-only review confirms both top actions and both bottom actions can be focused and activated in a predictable order.
- **SC-005**: Visual review at representative mobile and desktop widths finds no clipped labels, overlapping controls, horizontal page scrolling, or unreadable action states in default or high-contrast modes.

## Assumptions

- The requested topic learning view is the existing topic detail or study content view reached from the learning tracks flow.
- The bottom action group is a normal end-of-content control group, not a sticky footer or floating overlay.
- "Return to Builder" keeps the existing return behavior, and "Complete Topic" keeps the existing completion behavior.
- The feature is a focused usability correction and does not require new data entities, external services, or changes to topic content.
