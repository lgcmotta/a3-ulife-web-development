# Data Model: Ask Diogenes Chatbot

## Assistant Persona

Represents the Diogenes character identity used by the widget.

**Fields**:

- `name`: Display name for the assistant.
- `shortLabel`: Compact launcher label.
- `greeting`: Initial character greeting shown in the empty state.
- `description`: Short helper text explaining that the assistant uses predefined prompts.

**Validation Rules**:

- All fields are required in both locale JSON catalogs.
- Persona copy must be localized and non-empty.
- Persona copy must not imply real AI, free-form answering, or external chatbot behavior.

## Assistant Prompt

Represents one predefined user-selectable prompt.

**Fields**:

- `id`: Stable prompt identifier used by the widget.
- `label`: Short button label visible in the prompt list.
- `userMessage`: Message shown as the student's selected prompt.
- `response`: Scripted Diogenes response.
- `actions`: Optional ordered list of guided-action IDs.

**Required Prompt IDs**:

- `platformOrientation`
- `learningTracks`
- `topicStudy`
- `progressFeedback`
- `accessibilityLanguage`

**Validation Rules**:

- At least five prompt IDs must exist.
- English and Portuguese JSON must expose the same prompt IDs and nested keys.
- `response` values must be deterministic text from JSON.
- No prompt can require typed free-form user input.

## Scripted Response

Represents the assistant answer associated with one prompt.

**Fields**:

- `promptId`: The Assistant Prompt that owns the response.
- `content`: Localized answer text.
- `actionIds`: Optional action IDs exposed after the response.

**Validation Rules**:

- Content must come from locale JSON.
- The same prompt in the same UI context must produce the same response text.
- Response content must not claim live intelligence, personalization, or external retrieval.

## Guided Action

Represents one safe action offered after an assistant response.

**Fields**:

- `id`: Stable action identifier used in prompt data.
- `label`: Localized button/link text from JSON.
- `target`: Existing route or page section chosen from a component allowlist.
- `fallback`: Optional localized text if the target is not available from the current page.

**Validation Rules**:

- Action labels come from locale JSON.
- Action targets are not arbitrary user input.
- Actions may only lead to existing platform areas.
- Missing or unsupported targets must not render broken controls.

## Assistant Session State

Represents transient client state for the currently open widget.

**Fields**:

- `isOpen`: Whether the widget panel is visible.
- `isMinimized`: Whether the panel is collapsed but the launcher remains visible.
- `selectedPromptId`: Most recently selected prompt, or none.
- `messages`: Current visible user/assistant messages for this open session.
- `isTyping`: Whether typing feedback is currently visible.

**State Transitions**:

1. `closed` -> `openEmpty`: User opens the launcher.
2. `openEmpty` -> `typing`: User selects a predefined prompt.
3. `typing` -> `responseVisible`: Typing delay completes and scripted response appears.
4. `responseVisible` -> `typing`: User selects another predefined prompt.
5. `openEmpty`, `typing`, or `responseVisible` -> `closed`: User closes the widget and session state resets.
6. `openEmpty`, `typing`, or `responseVisible` -> `minimized`: User minimizes the widget without blocking page content.
7. `minimized` -> `openEmpty`: User reopens; the widget returns to the empty prompt state.

**Validation Rules**:

- State is not persisted to Redis or browser storage.
- Opening the widget starts from empty prompt state.
- Closing cancels pending typing feedback.
- Keyboard focus returns predictably after close or minimize.

## Assignment Evidence Artifact

Represents documentation needed for the school-assignment character integration.

**Fields**:

- `promptMap`: List of prompt IDs, response purposes, and guided actions.
- `widgetStates`: Wireframe notes for launcher, empty panel, typing, response, minimized, and small-screen states.
- `accessibilityReview`: Keyboard, label, announcement, contrast, and reduced-disruption review notes.
- `heuristicEvaluation`: Findings and fixes tied to usability heuristics.
- `iterationNotes`: Short record of what changed after review.

**Validation Rules**:

- Evidence must be created before implementation is considered complete.
- Evidence must describe both English/default and Portuguese localized behavior where relevant.
