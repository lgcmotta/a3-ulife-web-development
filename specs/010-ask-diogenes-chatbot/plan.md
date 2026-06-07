# Implementation Plan: Ask Diogenes Chatbot

**Branch**: `010-ask-diogenes-chatbot` | **Date**: 2026-06-07 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/010-ask-diogenes-chatbot/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Add Ask Diogenes as a floating mocked character/chat widget that helps students understand the platform through predefined prompts, scripted responses, typing feedback, and simple guided actions. The implementation should be intentionally small: reuse the shadcn-chatbot-kit pieces already installed where they fit, keep the widget state empty every time it opens, store all deterministic assistant copy in locale JSON files, and avoid Redis conversation history, AI SDKs, LLM providers, chatbot APIs, free-form input, and real natural-language processing.

## Technical Context

**Language/Version**: TypeScript 6.0.3, Node.js v25.9.0, Next.js 16.2.7, React 19.2.7.

**Primary Dependencies**: Next.js, next-intl 4.13.0, Tailwind CSS 4.3.0, shadcn/ui local components, shadcn-chatbot-kit local components already added, lucide-react, existing Redis dependency only for unrelated student-area flows.

**Storage**: Locale JSON files under `src/i18n/messages/en` and `src/i18n/messages/pt-BR` hold all predefined assistant prompts and answers. Runtime assistant state is transient client state. Redis conversation history is intentionally not used for this minimum implementation.

**Testing**: Vitest for message/catalog and lightweight component behavior; Playwright for open/select/typing/guided-action/keyboard/high-contrast behavior; existing axe-powered accessibility checks can be extended for the widget.

**Target Platform**: Responsive public web application rendered by the existing Next.js app.

**Project Type**: Single frontend-focused web application with existing server-backed student-area routes remaining separate.

**Performance Goals**: Widget opens without noticeable delay; selected prompts show typing feedback immediately and reveal the final scripted response within 3 seconds as required by the spec.

**Constraints**: No external AI SDK, LLM provider, chatbot API, external chatbot service, real natural-language processing, free-form prompt input, audio input, file attachments, or durable conversation history. Keep the implementation low-effort and avoid creating a large number of files.

**Scale/Scope**: One floating assistant widget, two locale JSON files, at least five deterministic prompts, a small number of guided actions to existing pages or page sections, and focused tests/evidence.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Answer each gate with PASS, N/A with justification, or VIOLATION with a Complexity
Tracking entry:

- **Spec-driven scope**: PASS. The plan implements only the approved Ask Diogenes mocked assistant behavior and does not add a new page, user role, real chatbot, or unrelated workflow.
- **Simplicity and academic fit**: PASS. The plan chooses the smallest defensible assignment solution: one widget, local JSON scripts, existing UI pieces, and no Redis chat storage.
- **Usability and accessibility**: PASS. The plan includes keyboard operation, focus return, labels, typing announcements, readable default/high-contrast states, and non-color-only state cues.
- **Static-first fit**: PASS. The assistant is static/scripted content plus transient UI state. Existing Redis remains available for student-area flows, but this feature does not introduce a runtime storage dependency.
- **Independent testing**: PASS. Tests start from fresh page visits, do not depend on stored chat history, and can run in parallel without Redis cleanup.
- **Assignment evidence**: PASS. The plan includes prompt map, widget-state wireframes, heuristic evaluation, accessibility review, and iteration notes for the final character integration requirement.
- **Responsibility boundaries**: PASS. Client UI owns open/minimized/typing/selected-prompt state; locale JSON owns deterministic text; no server action or repository behavior is added.
- **Single-flow functions**: PASS. Prompt selection, guided action handling, and widget open/close behavior should remain separate small flows rather than one branching chat engine.

## Project Structure

### Documentation (this feature)

```text
specs/010-ask-diogenes-chatbot/
├── plan.md              # This file (/speckit-plan command output)
├── research.md          # Phase 0 output (/speckit-plan command)
├── data-model.md        # Phase 1 output (/speckit-plan command)
├── quickstart.md        # Phase 1 output (/speckit-plan command)
├── contracts/           # Phase 1 output (/speckit-plan command)
└── tasks.md             # Phase 2 output (/speckit-tasks command - NOT created by /speckit-plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   └── layout.tsx                         # Mount global assistant inside existing providers
├── features/
│   └── ask-diogenes/
│       └── components/
│           └── ask-diogenes-widget.tsx    # Small client widget; owns transient chat state
├── i18n/
│   └── messages/
│       ├── en.ts                          # Import ask-diogenes.json
│       ├── en/
│       │   └── ask-diogenes.json          # English prompts, labels, answers
│       ├── pt-BR.ts                       # Import ask-diogenes.json
│       └── pt-BR/
│           └── ask-diogenes.json          # Portuguese prompts, labels, answers
└── ui/
    └── components/
        ├── chat-message.tsx               # Existing shadcn-chatbot-kit display piece
        ├── prompt-suggestions.tsx         # Existing piece if it fits fixed prompt buttons
        └── typing-indicator.tsx           # Existing typing feedback piece

tests/
├── unit/
│   ├── i18n/
│   │   └── message-catalog.test.ts        # Existing catalog-shape test covers new JSON imports
│   └── features/
│       └── ask-diogenes/
│           └── ask-diogenes-widget.test.tsx
└── integration/
    └── ask-diogenes-widget.spec.ts        # Playwright widget and accessibility flow
```

**Structure Decision**: Use the existing single-app structure. Add one feature component folder for the widget and two locale JSON files following the current message-catalog pattern. Reuse installed shadcn-chatbot-kit pieces selectively; do not adopt its full input, attachment, or audio flow because the feature forbids free-form chatbot behavior.

## Complexity Tracking

No constitution violations. No complexity exception is required.
