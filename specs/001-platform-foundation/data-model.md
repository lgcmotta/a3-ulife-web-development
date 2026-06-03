# Data Model: Platform Foundation

## Overview

The foundation MVP uses local structured content. The model represents Diogenes, public navigation, learning tracks, topics, accessibility help, visual theme options, and assignment evidence. It does not model accounts, progress, remote data, chat history, community content, maps, calendars, or external integrations.

## Entities

### DiogenesProfile

Represents the retired Computer Science professor figure who frames the platform.

**Fields**:

- `name`: Display name; required; expected value is "Diogenes"
- `role`: Short identity statement; required
- `introduction`: Beginner-friendly explanation of the platform purpose; required
- `teachingTone`: Short guidance phrase for content voice; required

**Relationships**:

- Referenced by the home introduction area and page metadata.

**Validation Rules**:

- Must not reference theme-selection source material.
- Must present Diogenes as a guide, not as a chatbot or interactive AI agent.

### MainNavigationItem

Represents a top-level navigation target.

**Fields**:

- `label`: Human-readable label; required
- `href`: Public route path; required
- `description`: Assistive or contextual description; required
- `order`: Display order; required

**Relationships**:

- Links to main areas: Home, Learning Tracks, Accessibility Help.
- Topic detail pages include return navigation to Learning Tracks.

**Validation Rules**:

- Label must be understandable without relying on icons.
- Navigation must not include unapproved primary areas such as dashboard, chatbot, community, maps, or calendar.

### LearningTrack

Represents a curated beginner-friendly study path.

**Fields**:

- `slug`: Stable route identifier; required and unique
- `title`: Track name; required
- `summary`: Short purpose statement; required
- `description`: Beginner-friendly explanation; required
- `topics`: Ordered list of related topics; required, at least one topic
- `recommendedFor`: Short student need or situation; optional

**Relationships**:

- Contains one or more `Topic` entities.
- Appears on the learning tracks overview.

**Validation Rules**:

- Track count should remain small enough for quick scanning.
- Track language must be welcoming and appropriate for early-stage Computer Science students.
- Track must not introduce unrelated domains outside the Diogenes educational theme.

### Topic

Represents a study content unit inside a learning track.

**Fields**:

- `slug`: Stable route identifier within its track; required
- `trackSlug`: Parent track identifier; required
- `title`: Topic title; required
- `summary`: Short explanation of what the topic is about; required
- `whyItMatters`: Explanation of learning value; required
- `studyNext`: Suggested next study action; required
- `keyIdeas`: Short list of main ideas; optional

**Relationships**:

- Belongs to one `LearningTrack`.
- Rendered by the topic content route.

**Validation Rules**:

- Topic must provide useful study direction even when content is intentionally short.
- Topic page must support return navigation to its parent track overview.
- Topic content must not imply progress tracking, completion state, or personalized recommendation.

### AccessibilityHelpSection

Represents basic help content for navigating and using the platform accessibly.

**Fields**:

- `title`: Section title; required
- `content`: Plain-language guidance; required
- `appliesTo`: Area or interaction the guidance covers; required
- `order`: Display order; required

**Relationships**:

- Rendered in the Accessibility Help area.
- References navigation, keyboard use, screen-reader structure, and visual theme support.

**Validation Rules**:

- Must explain the main areas of the platform.
- Must not require technical knowledge to understand.
- Must cover keyboard navigation and screen-reader-oriented structure.

### VisualTheme

Represents an accessible visual theme option.

**Fields**:

- `id`: Theme identifier; required and unique
- `label`: Human-readable theme label; required
- `purpose`: Explanation of when the theme helps; required
- `isDefault`: Whether this is the default theme; required

**Relationships**:

- Used by the shared layout and accessibility help.

**Validation Rules**:

- Must include one default color-safe theme and one high-contrast theme.
- Meaning must remain available through labels, structure, or icons, not color alone.
- Theme selection must not require accounts or remote storage.

### PersonaArtifact

Represents user research evidence for the assignment.

**Fields**:

- `name`: Persona name or label; required
- `studentStage`: Beginner or early-stage Computer Science context; required
- `goals`: Student goals; required
- `needs`: Usability and accessibility needs; required
- `frustrations`: Likely pain points; required
- `scenario`: Short usage scenario; required

**Relationships**:

- Supports the foundation IA and content decisions.

**Validation Rules**:

- Must focus on the approved audience.
- Must not invent a new core product audience.

### InformationArchitectureArtifact

Represents IA and wireframe-oriented assignment evidence.

**Fields**:

- `mainAreas`: Ordered list of foundation areas; required
- `navigationRelationships`: Description of how students move between areas; required
- `contentHierarchy`: Description of headings and content priority; required
- `wireframeNotes`: Textual wireframe notes for desktop and mobile; required

**Relationships**:

- Supports route and layout implementation.

**Validation Rules**:

- Must cover home, learning tracks, topic content, and accessibility help.
- Must preserve responsive desktop and mobile thinking.

### HeuristicEvaluationFinding

Represents usability evaluation evidence and iteration notes.

**Fields**:

- `heuristic`: Usability principle or review lens; required
- `finding`: Observed issue or positive finding; required
- `severity`: Low, medium, or high; required
- `decision`: Addressed now or deferred; required
- `iterationNote`: What changed or why it remains later-scope; required

**Relationships**:

- Supports assignment evidence and success criterion SC-008.

**Validation Rules**:

- At least one finding must include an iteration decision.
- Deferred findings must not silently expand the foundation MVP.

## State Transitions

### Navigation Flow

1. Student starts at Home.
2. Student opens Learning Tracks.
3. Student chooses a Topic from a track.
4. Student returns to Learning Tracks or opens Accessibility Help.

### Theme Flow

1. Student starts with the default color-safe theme.
2. Student activates high-contrast theme control.
3. Interface updates visual tokens while preserving content, labels, focus behavior, and layout.

No account, dashboard, progress, chat, or remote data state transitions exist in this feature.
