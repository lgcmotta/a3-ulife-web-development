# Feature Specification: Ask Diogenes Chatbot

**Feature Branch**: `010-ask-diogenes-chatbot`

**Created**: 2026-06-07

**Status**: Draft

**Input**: User description: "the final requirement for this school assignment is to implement Ask Diogenes the chatbot. Build a mocked character assistant for the web platform. The assistant appears as a floating character/chat widget and helps users understand the platform through scripted interactions. The assistant must not use real AI or external chatbot services. It should provide predefined responses, animated typing feedback, and simple guided actions based on user-selected prompts. The goal is to satisfy the character integration requirement through UI animation and conversational presentation, while keeping behavior deterministic and suitable for a school assignment."

## Constitution Alignment *(mandatory)*

- **Scope control**: This feature adds the already planned global Diogenes help entry as a small character assistant for the educational platform. It supports platform orientation and assignment presentation quality without creating a new product domain, user role, or primary learning workflow.
- **Simplicity**: The smallest useful version is a floating character/chat widget with predefined prompts, scripted responses, typing feedback, and guided actions to existing platform areas. Real AI, free-form question answering, external chatbot services, accounts, analytics, voice interaction, and durable conversation history are out of scope.
- **Usability/accessibility**: The assistant must make help easier to discover without blocking study tasks. It must support keyboard-only use, clear focus movement, screen-reader-friendly labels and announcements, readable default and high-contrast themes, and non-color-only status cues.
- **Assignment evidence**: Planning and tasks must include a prompt map, basic widget-state wireframes, responsive and accessibility review notes, heuristic evaluation findings, and iteration notes showing how the character integration supports the school assignment.
- **Architecture boundaries**: The assistant presentation owns open, closed, minimized, selected-prompt, and typing states. Assistant content remains scripted and bounded. No server, storage, external service, or hidden persistence responsibility is required for this slice unless a later approved plan explicitly justifies a narrow browser-local preference.
- **Testing independence**: Each prompt, response, guided action, widget state, and accessibility behavior can be tested from a fresh page visit without relying on stored chat history, shared mutable state, or a previous test run.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Get Platform Orientation (Priority: P1)

A new Computer Science student opens Ask Diogenes from a visible floating character entry and receives a friendly explanation of how to use the platform.

**Why this priority**: The assistant exists primarily to help students understand the platform and satisfy the character integration requirement through a clear, demonstrable interaction.

**Independent Test**: Open the assistant on a fresh visit, choose the orientation prompt, and verify that the assistant presents typing feedback followed by a scripted explanation of the main platform areas.

**Acceptance Scenarios**:

1. **Given** a student is on a main public page, **When** they open Ask Diogenes, **Then** the assistant displays a character greeting and predefined prompt choices.
2. **Given** the assistant prompt choices are visible, **When** the student selects the platform orientation prompt, **Then** the assistant shows typing feedback and then explains where to start, how learning tracks work, and where help can be found.

---

### User Story 2 - Use Deterministic Guided Prompts (Priority: P2)

A student uses predefined prompt choices instead of typing free-form questions, so the assistant feels conversational while remaining predictable and school-project appropriate.

**Why this priority**: Scripted prompts protect the scope boundary against real chatbot behavior and make the experience easy to review, test, and present.

**Independent Test**: Select each available prompt from a fresh assistant session and verify that the same prompt produces the approved scripted response and does not request or process free-form user text.

**Acceptance Scenarios**:

1. **Given** the assistant is open, **When** the student reviews available prompts, **Then** every user question option is selectable from the interface and no free-form question field is presented.
2. **Given** the student selects the same prompt more than once in the same context, **When** the assistant responds, **Then** the response content remains consistent except for presentation timing.

---

### User Story 3 - Follow Simple Guided Actions (Priority: P3)

A student can use assistant actions to move toward existing platform areas, such as learning tracks, current topic content, progress feedback, accessibility help, or language help.

**Why this priority**: Guided actions turn the assistant from a decorative character into a usable help tool while keeping it bounded to existing platform structure.

**Independent Test**: Open Ask Diogenes, select prompts with guided actions, activate each action, and verify that the action leads to or identifies the intended existing platform area.

**Acceptance Scenarios**:

1. **Given** an assistant response includes a guided action, **When** the student activates that action, **Then** the platform moves to or highlights the relevant existing area without creating a new workflow.
2. **Given** the current page does not support a specific guided action, **When** the student selects a prompt that would normally offer that action, **Then** the assistant provides a helpful fallback and avoids a broken or misleading control.

---

### User Story 4 - Use the Assistant Without Disrupting Study (Priority: P4)

A student can open, read, minimize, close, and reopen the assistant without losing their place or blocking core study controls.

**Why this priority**: The assistant must support usability and accessibility requirements rather than becoming visual clutter or a barrier to the learning flow.

**Independent Test**: Use the assistant with keyboard, pointer, small-screen layout, default theme, and high-contrast theme, then verify that core page content and controls remain usable.

**Acceptance Scenarios**:

1. **Given** the assistant is open, **When** the student closes or minimizes it, **Then** focus returns predictably and the page's main learning controls remain available.
2. **Given** the assistant is used in a small viewport or high-contrast theme, **When** the student opens and closes the widget, **Then** text remains readable and the widget does not permanently cover essential page actions.

### Edge Cases

- The student opens the assistant while already on a topic page, progress area, or accessibility help area.
- The student closes or minimizes the assistant while typing feedback is still being shown.
- The student selects prompts quickly or repeats the same prompt multiple times.
- A guided action points to an area that is unavailable from the current page.
- The assistant is opened on a small screen where floating UI could overlap primary content.
- The platform is using high-contrast visual settings.
- The assistant text is shown in a supported language state where surrounding page labels are translated.
- A keyboard-only or screen-reader user enters and exits the assistant.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST provide a visible Ask Diogenes floating character/chat entry on main public platform pages.
- **FR-002**: Users MUST be able to open, close, minimize, and reopen the assistant without losing access to the current page's primary content.
- **FR-003**: The assistant MUST present Diogenes as a consistent educational character with a brief greeting and conversational tone aligned to the platform identity.
- **FR-004**: The assistant MUST offer at least five predefined prompt choices covering platform orientation, learning tracks, topic study, progress or feedback, and accessibility or language help.
- **FR-005**: The assistant MUST NOT provide a free-form question field, real AI behavior, generative answers, or external chatbot-service behavior.
- **FR-006**: The assistant MUST show animated typing feedback after a user selects a prompt and before the final scripted response appears.
- **FR-007**: The assistant MUST return predefined, deterministic responses for each supported prompt, with consistent results when the same prompt is selected in the same context.
- **FR-008**: The assistant MUST offer simple guided actions when relevant responses can lead users to existing platform areas.
- **FR-009**: Guided actions MUST be clearly labeled and MUST avoid broken or misleading behavior when the current page cannot support a requested action.
- **FR-010**: Assistant labels, prompts, and scripted responses MUST follow the platform's active supported language state when translations are available.
- **FR-011**: The assistant MUST support keyboard-only operation for opening, selecting prompts, activating actions, minimizing, closing, and returning focus.
- **FR-012**: The assistant MUST expose screen-reader-friendly labels and status announcements for opening, typing feedback, new responses, and closing.
- **FR-013**: The assistant MUST remain readable and usable in the default color-safe visual theme and the high-contrast visual theme.
- **FR-014**: The assistant MUST NOT require user accounts, personal profile data, durable chat history, external integrations, or network-based chatbot processing.
- **FR-015**: The assistant MUST avoid using color as the only way to communicate state, prompt category, action availability, or response status.
- **FR-016**: The feature MUST include assignment evidence covering the assistant prompt map, widget-state wireframes, accessibility review, heuristic evaluation findings, and iteration notes.

### Key Entities *(include if feature involves data)*

- **Assistant Persona**: The Diogenes character voice and presentation rules used for greeting, tone, and bounded help behavior.
- **Assistant Prompt**: A predefined user-selectable question or help topic with a label, intended purpose, supported language text, and response mapping.
- **Scripted Response**: A predefined assistant message tied to one prompt and optional page context.
- **Guided Action**: A simple user action offered by a response that leads to or identifies an existing platform area.
- **Assistant Session State**: The current open, minimized, selected prompt, typing, and visible response state for the active visit.
- **Assignment Evidence Artifact**: A planning or evaluation record showing prompt design, wireframes, accessibility checks, heuristic findings, or iteration notes.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: In a student walkthrough, at least 90% of participants can identify how to start a learning track and where to find accessibility help after using Ask Diogenes for no more than 2 minutes.
- **SC-002**: 100% of approved prompt choices show typing feedback before the final response, and the final response appears within 3 seconds after selection during normal review.
- **SC-003**: 100% of primary assistant controls can be reached, understood, activated, and dismissed through keyboard-only review.
- **SC-004**: Accessibility review finds no unresolved high-severity issue in assistant labels, focus behavior, status announcements, contrast, or text readability.
- **SC-005**: Repeated selection of the same prompt in the same context produces the approved scripted response in 100% of verification attempts.
- **SC-006**: Responsive review finds no state where the assistant permanently blocks a core page action after the user minimizes or closes it.
- **SC-007**: The submitted assignment evidence includes at least one prompt map, one widget-state wireframe set, one heuristic evaluation record, one accessibility review record, and one iteration note tied to the assistant.

## Assumptions

- Ask Diogenes is available on main public platform pages rather than on a separate new primary page.
- Users interact with the assistant through selected prompts and guided actions, not through typed natural-language questions.
- Chat history does not need to persist across visits, page refreshes, or devices.
- Guided actions should point to existing platform areas and must not create new learning, progress, account, or content workflows.
- The character presentation can be lightweight as long as it is recognizable, animated enough for the assignment requirement, and consistent with the Diogenes educational theme.
- The approved prompt set will be small enough to review manually and keep deterministic.
