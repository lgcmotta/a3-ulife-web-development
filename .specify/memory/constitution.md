<!--
Sync Impact Report
Version change: placeholder template -> 1.0.0
Modified principles:
- Placeholder principle 1 -> I. Spec-Driven Scope Control
- Placeholder principle 2 -> II. Simplicity and Academic Fit
- Placeholder principle 3 -> III. Usability and Accessibility First
- Placeholder principle 4 -> IV. Static-First Architecture by Default
- Placeholder principle 5 -> V. Independent and Parallel-Safe Testing
- Added -> VI. Assignment Evidence Matters
- Added -> VII. Clear Frontend and Backend Responsibility Boundaries
- Added -> VIII. Single-Flow Function Design
Added sections:
- Architecture and Responsibility Boundaries
- Development Workflow and Quality Gates
Removed sections:
- Placeholder section 2
- Placeholder section 3
Templates requiring updates:
- updated: .specify/templates/plan-template.md
- updated: .specify/templates/spec-template.md
- updated: .specify/templates/tasks-template.md
- updated: .specify/templates/checklist-template.md
- updated: .specify/templates/agent-file-template.md
- not present: .specify/templates/commands/*.md
Runtime guidance requiring updates:
- updated: AGENTS.md
- updated: README.md
Follow-up TODOs: None
-->
# Legado de Diogenes Constitution

## Core Principles

### I. Spec-Driven Scope Control

Product behavior, primary user flows, persistence meaning, and major architecture
changes MUST flow through `spec -> plan -> tasks -> implementation`. Agents MUST NOT
add major behavior opportunistically during implementation. Small corrective work MAY
proceed without a new product feature specification only when it restores compliance
with this constitution, stays inside approved scope, and does not change product
behavior.

Rationale: The project is a Spec Kit-governed academic assignment. Scope control keeps
the product understandable, defensible, and aligned with grading requirements.

### II. Simplicity and Academic Fit

The project MUST prefer the smallest solution that supports a strong usability-focused
class submission. Agents MUST avoid unnecessary features, services, abstractions,
games, speculative systems, or broad rewrites. Any added complexity MUST be justified
in the implementation plan and compared against a simpler rejected alternative.

Rationale: A small, well-evidenced project is more valuable for this assignment than a
larger system with fragile implementation or unclear academic focus.

### III. Usability and Accessibility First

Every feature MUST define user-visible usability outcomes and accessibility acceptance
criteria. Core flows MUST support keyboard-only navigation, semantic landmarks,
coherent heading hierarchy, screen-reader-friendly labels, status announcements where
needed, and color-safe plus high-contrast visual behavior. Color MUST NOT be the only
carrier of meaning.

Rationale: Usability and accessibility are graded deliverables, not optional polish.

### IV. Static-First Architecture by Default

The platform MUST remain frontend-focused and static-first by default. Content SHOULD
remain local/static and preferences SHOULD remain browser-local unless an approved
specification explicitly changes scope. Server components, server actions, Redis, or
other runtime services MAY exist only when already approved or when a future
specification justifies the need, keeps the operational footprint minimal, and
preserves clear responsibility boundaries.

Rationale: Static-first architecture keeps the project deployable, inexpensive, and
simple to present while still allowing narrowly approved exceptions.

### V. Independent and Parallel-Safe Testing

Automated tests MUST be independently runnable, order-independent, and safe to execute
in parallel. End-to-end tests MUST NOT rely on global cleanup, exact generated IDs,
shared mutable scenario state, or previous test execution. Tests that require
persisted data MUST create, seed, isolate, or clean only the data owned by that test.

Rationale: Sequential-only tests hide coupling, slow feedback, and make future changes
fragile.

### VI. Assignment Evidence Matters

Specifications, plans, and tasks MUST include class-facing evidence work when relevant:
personas or equivalent research artifacts, information architecture, wireframes,
heuristic evaluation, accessibility checks, iteration notes, and deployment evidence.
Engineering work alone is insufficient when the feature affects the submitted
assignment experience.

Rationale: The final grade depends on both the application and the academic evidence
that explains design decisions.

### VII. Clear Frontend and Backend Responsibility Boundaries

Even when using Next.js server components, server actions, or lightweight persistence,
the project MUST preserve a clean separation between transient UI state, user flow
orchestration, durable data operations, and storage boundaries. Client/UI code owns
unsaved edits, form composition, local interaction flow, accessibility feedback, and
explicit calls to save, start, resume, or update progress. Server/action code performs
the explicit command requested by the UI and MUST NOT infer unrelated user intent.
Repository/storage code loads saved data, saves provided data, and updates explicit
progress only. Loading data MUST NOT mutate saved data.

Rationale: Clear boundaries keep academic code understandable and prevent persistence
helpers from becoming hidden workflow engines.

### VIII. Single-Flow Function Design

Functions MUST represent one clear responsibility and one control-flow purpose. If a
function accumulates branching to serve multiple user scenarios, workflows, or
persistence meanings, agents MUST split it into separate named functions. Shared
lower-level helpers are allowed, but scenario-specific control flow MUST remain
explicit at the caller level. Branching for validation, simple guards, and small data
transformations is acceptable; branching that changes business meaning or persistence
behavior is a refactoring signal.

Rationale: Idempotent, single-flow functions are easier to test, reason about, and
evolve through future specifications.

## Architecture and Responsibility Boundaries

The intended system shape is a small educational web platform with conservative
extensions around the settled Diogenes theme. The default product areas are home or
introduction, learning tracks, topic detail or study content, progress or feedback,
global Diogenes help, and accessibility help.

Client/UI responsibilities:

- Own transient and unsaved UI state.
- Handle checkbox state, local reorder, clear, discard, menus, and accessibility
  feedback.
- Call explicit server/actions for save, start, resume, and progress changes.

Server/action responsibilities:

- Execute explicit user commands.
- Validate saved data at the durable boundary.
- Avoid hidden recovery, cleanup, migration, or unrelated workflow inference.

Repository/storage responsibilities:

- Load saved data without mutation.
- Save provided data through explicit operations.
- Update explicit progress through explicit operations.
- Avoid repair, recovery, deletion, migration, or multi-scenario orchestration unless a
  specification explicitly requires it.

## Development Workflow and Quality Gates

All future plans MUST perform a Constitution Check before technical design is accepted.
The check MUST cover scope, simplicity, usability, accessibility, static-first fit,
testing independence, assignment evidence, responsibility boundaries, and single-flow
function design.

All future task lists MUST include concrete work for applicable constitution gates.
When a gate is not applicable, the plan or tasks MUST say why. E2E or integration test
tasks MUST be designed to run independently and in parallel.

Existing specifications SHOULD remain historical records. Amend an existing
specification only when it contains actively misleading guidance or would cause future
agents to violate this constitution.

## Governance

This constitution supersedes `AGENTS.md`, templates, feature plans, and informal
workflow habits when they conflict. `AGENTS.md` may provide operational context, but it
MUST NOT weaken these principles.

Amendments MUST be intentional, documented in the Sync Impact Report, and propagated to
dependent Spec Kit templates when they affect future specs, plans, tasks, or
implementation behavior. Version changes follow semantic versioning:

- MAJOR: Removes or redefines a principle in a backward-incompatible way.
- MINOR: Adds a principle, new governance section, or materially expands enforcement.
- PATCH: Clarifies wording without changing obligations.

Compliance review is required during `/speckit.plan`, `/speckit.tasks`, and
implementation review. Any justified exception MUST be documented in the plan's
Complexity Tracking section with the simpler alternative that was rejected.

**Version**: 1.0.0 | **Ratified**: 2026-06-04 | **Last Amended**: 2026-06-04
