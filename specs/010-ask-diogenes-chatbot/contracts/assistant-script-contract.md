# Contract: Assistant Script JSON

## Purpose

Define the JSON-backed deterministic script shape for Ask Diogenes. This is an internal content contract, not an external API.

## Files

```text
src/i18n/messages/en/ask-diogenes.json
src/i18n/messages/pt-BR/ask-diogenes.json
```

Both files must have the same key structure so the existing catalog-shape test can detect missing translations.

## Shape

```json
{
  "launcher": {
    "openLabel": "Ask Diogenes",
    "closedLabel": "Ask Diogenes",
    "minimizedLabel": "Ask Diogenes is minimized"
  },
  "panel": {
    "title": "Ask Diogenes",
    "description": "Choose a prompt for scripted help.",
    "promptGroupLabel": "Choose a question",
    "typingLabel": "Diogenes is thinking",
    "closeLabel": "Close Ask Diogenes",
    "minimizeLabel": "Minimize Ask Diogenes"
  },
  "persona": {
    "name": "Diogenes",
    "greeting": "Welcome. I can point you around the platform with a few prepared questions."
  },
  "actions": {
    "openTracks": {
      "label": "Explore learning tracks"
    },
    "openAccessibility": {
      "label": "Open accessibility help"
    }
  },
  "prompts": {
    "platformOrientation": {
      "label": "How do I use this platform?",
      "userMessage": "How do I use this platform?",
      "response": "Start with the learning tracks, open a topic, and use the study prompts to practice.",
      "actions": ["openTracks", "openAccessibility"]
    }
  }
}
```

## Required Prompt IDs

- `platformOrientation`
- `learningTracks`
- `topicStudy`
- `progressFeedback`
- `accessibilityLanguage`

## Required Rules

- All assistant responses must come from `response` fields in these JSON files.
- Prompt labels, visible selected prompt text, typing labels, panel labels, and action labels must come from these JSON files.
- English is the default catalog. Portuguese UI must read from the `pt-BR` catalog.
- Prompt IDs and action IDs are stable implementation identifiers and must remain aligned across locales.
- JSON must not include free-form user text handling, AI-provider configuration, model names, external URLs, or Redis keys.

## Action Target Allowlist

Action labels live in JSON. Action targets live in the component allowlist and may only point to existing platform areas:

- `openTracks` -> `/tracks`
- `openBuilder` -> `/tracks/builder`
- `openHistory` -> `/tracks/history`
- `openAccessibility` -> `/accessibility`
- `backHome` -> `/`

Unsupported actions must be hidden or replaced by a localized fallback message rather than rendering a broken control.
