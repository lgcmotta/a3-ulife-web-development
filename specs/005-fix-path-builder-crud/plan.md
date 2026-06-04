# Implementation Plan: Learning Path CRUD State Correction

**Branch**: `005-fix-path-builder-crud` | **Date**: 2026-06-04 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/005-fix-path-builder-crud/spec.md`

## Summary

Refactor the personalized learning path feature so the Learning Path Builder is a client-owned composition UI after initial render. Server-side loading will provide only the initial create or edit state: create mode starts empty, and edit mode loads one saved path by ID to pre-populate local builder state. All selection, removal, clear, discard, and reorder behavior runs locally until Save. Save is the only builder operation that writes learning path composition, creating a new saved path or overwriting the edited saved path ID. Repository functions become simple idempotent load/save boundaries for students, saved paths, and history, with no normal-flow delete, recovery, migration, split-data repair, cleanup, or load-time mutation.

## Technical Context

**Language/Version**: TypeScript 6.0.3, Node.js v25.9.0

**Primary Dependencies**: Next.js 16.2.7 server components/actions, React 19.2.7 client components, Tailwind CSS 4.3.0, shadcn/Radix UI components, `redis` 6.0.0, `sqids` 0.3.0, `react-markdown` 10.1.0, `remark-gfm` 4.0.1

**Storage**: Existing Redis-backed anonymous student storage. This refactor changes normal learning path storage from active-path plus persisted draft behavior to saved-path-by-ID records plus history entries; builder composition state is not persisted until Save.

**Testing**: Vitest unit tests, Playwright integration tests, ESLint, TypeScript/Next build

**Target Platform**: Responsive web application for anonymous browser students

**Project Type**: Next.js web application with server-rendered routes and client-side builder controls

**Performance Goals**: Builder composition actions should update visible UI immediately without waiting on storage; Save and learning navigation feedback should complete within 1 second locally with Redis available; history and builder initial loads should render usable content within 2 seconds locally.

**Constraints**: No authentication, accounts, external APIs, real AI behavior, maps, calendars, games, or unrelated student-area modules. No builder composition writes before Save. No hidden recovery, repair, migration, cleanup, or load-time mutation in normal repository/load/action flows. No learning path delete operation. Completion/reset progress stays in the learning flow, not builder menus. Accessibility states for selection, partial selection, disabled actions, unsaved changes, progress, and completion cannot rely on color alone.

**Scale/Scope**: One anonymous student per browser, existing curated learning tracks/topics, multiple saved learning path records, history rows for saved paths, and learning progress per saved path ID. This is a corrective refactor inside the already approved personalized student area.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The formal constitution file is still the project template and defines no enforceable project-specific gates. The effective project governance comes from `AGENTS.md` and the approved personalized student area scope.

- Spec Kit workflow: PASS. Feature has an approved spec at `specs/005-fix-path-builder-crud/spec.md`.
- Scope control: PASS. Refactor stays inside the existing personalized learning path feature and does not add new product domains.
- Simplicity: PASS. Plan removes hidden server-side draft mutation and recovery behavior from normal flows.
- Usability-first behavior: PASS. Plan makes Save, Discard, Clear, Start, Resume, and Edit states explicit and predictable.
- Accessibility-first behavior: PASS. Plan preserves keyboard and screen-reader coverage for builder composition, history, and learning flow.
- Static-first default: PASS WITH INHERITED DEVIATION. The approved 004 feature already introduced Redis/server persistence for anonymous student data; this plan does not add a new external dependency or broaden that deviation.
- No auth/community/game scope: PASS. No authentication, accounts, social features, game mechanics, maps, calendars, or real AI behavior are introduced.

## Project Structure

### Documentation (this feature)

```text
specs/005-fix-path-builder-crud/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   ├── builder-state-contract.md
│   ├── history-learning-contract.md
│   └── student-state-actions.md
└── checklists/
    └── requirements.md
```

### Source Code (repository root)

```text
src/
├── app/
│   └── tracks/
│       ├── builder/page.tsx
│       ├── history/page.tsx
│       └── learn/[pathId]/
│           ├── [topicSlug]/page.tsx
│           └── complete/page.tsx
├── features/
│   └── student-area/
│       ├── actions/
│       │   ├── complete-topic-action.ts
│       │   ├── learning-navigation-actions.ts
│       │   └── student-path-actions.ts
│       ├── components/
│       │   ├── builder-action-bar.tsx
│       │   ├── builder-confirmation-dialogs.tsx
│       │   ├── current-path-panel.tsx
│       │   ├── learning-path-history-table.tsx
│       │   ├── path-item-context-menu.tsx
│       │   ├── student-builder-client.tsx
│       │   └── track-topic-tree.tsx
│       ├── server/
│       │   ├── builder-selection.ts
│       │   ├── history-presenter.ts
│       │   ├── path-persistence.ts
│       │   ├── path-progress.ts
│       │   └── path-reorder.ts
│       └── views/
│           ├── learning-section-view.tsx
│           ├── student-builder-view.tsx
│           └── student-history-view.tsx
├── server/
│   └── student-area/
│       ├── keys.ts
│       ├── path-validation.ts
│       ├── repository.ts
│       ├── student-record.ts
│       └── types.ts
└── content/
    └── tracks.ts

tests/
├── integration/
│   ├── student-area-builder-organization.spec.ts
│   ├── student-area-builder-persistence.spec.ts
│   ├── student-area-builder-selection.spec.ts
│   ├── student-area-history.spec.ts
│   └── student-area-learning-flow.spec.ts
└── unit/
    ├── features/student-area/
    │   ├── builder-selection.test.ts
    │   ├── history-presenter.test.ts
    │   ├── path-organization.test.ts
    │   └── path-persistence.test.ts
    └── server/student-area/
        ├── path-validation.test.ts
        └── repository.test.ts
```

**Structure Decision**: Keep the existing feature-oriented student area structure. Move builder composition helpers into client-safe pure modules that can be reused by `StudentBuilderClient` and unit tests. Keep server actions only for initial load, Save, learning navigation, and topic completion. Keep Redis repository code under `src/server/student-area/`, but simplify it to explicit load/save operations for student records, saved paths by ID, and history.

## Implementation Strategy

### Builder Initial Load

- `StudentBuilderView` remains the server-rendered entry for `/tracks/builder`.
- When no `edit` query parameter is present, load a create-mode initial state with:
  - `mode: "create"`
  - no saved path ID
  - empty track groups
  - clean/unchanged state
  - Start Learning disabled until Save returns a path ID
- When an `edit` query parameter is present, load only that saved path ID for the current student.
- If the saved path exists and is unfinished, copy its saved track groups into the initial builder composition and mark it clean.
- If the saved path is missing or completed, show a recoverable builder/history message; do not mutate storage.
- Initial load must not create, save, update, delete, repair, or migrate any builder draft or saved path data.

### Client-Owned Builder Composition

- `StudentBuilderClient` owns the current composition with local React state after initial render.
- Replace server-backed toggle/reorder/menu actions with local pure operations:
  - select whole track
  - deselect whole track
  - select one topic
  - deselect one topic
  - remove item
  - move track up/down
  - move topic up/down within its parent track
  - clear local composition
  - discard local changes back to initial state
- Keep `getTrackSelectionState`, topic-selected checks, normalization, and reorder constraints pure and deterministic.
- Track selected state is derived from all child topics being selected; partial state is derived from some but not all child topics being selected.
- Clear Learning Path sets the local composition to empty and does not call a server action.
- Discard Changes resets local composition to the initial builder state captured at render or after successful Save.
- Save disabled state is derived locally from `topicCount === 0` or `currentComposition` deep-equal to `initialComposition`.

### Save Behavior

- Replace `saveDraftAction(studentId, editPathId?)` with a save action that receives:
  - student ID
  - optional saved path ID for edit mode
  - current composition payload
- Server-side Save validates:
  - at least one topic exists
  - no empty track group exists
  - every topic stays inside its parent track
  - every selected topic belongs to the current catalog
  - completed-path IDs are not edited through the builder
- Create mode Save allocates a new path ID and history ID, saves the path record, adds a history entry, and returns the saved path ID plus a clean builder state.
- Edit mode Save loads the existing unfinished path by ID, overwrites that same path ID with the submitted composition, preserves progress for retained topics, initializes newly added topics as not completed, removes progress only for topics removed from that saved path, updates the matching history entry, and returns the same path ID plus a clean builder state.
- Save must not create duplicate history rows for an edited path.
- Save must not delete old saved path records or history entries.

### Repository Boundary

- Remove normal-flow repository methods and calls for:
  - persisted builder drafts
  - active-path-only loading
  - learning path deletion
  - `recoverSplitLearningData`
  - `clearStudentLearningData`
  - JSON parse cleanup that deletes corrupt keys during load
- Add or retain simple idempotent methods:
  - `loadStudent(studentId)`
  - `saveStudent(record)`
  - `loadSavedPath(studentId, pathId)`
  - `saveSavedPath(path)`
  - `loadHistory(studentId)`
  - `saveHistory(studentId, entries)` or `upsertHistoryEntry(entry)`
  - `allocateId(counterKey)`
- Loads return data or a recoverable error/null result without mutating storage.
- Saves write the submitted record deterministically and may overwrite an existing saved path with the same ID.
- Test cleanup may continue to clear Redis test keys through test utilities, but application behavior must not expose learning path delete.

### History And Learning Navigation

- `StudentHistoryView` loads history and the saved path records needed to compute current progress for rows; it does not call recovery.
- `presentHistoryRows` exposes Resume Learning and Edit Path only for unfinished saved paths.
- Completed rows show completed status and no Resume Learning or Edit Path links.
- No history or builder UI exposes delete.
- Resume Learning uses the row's saved path ID and resolves the last unlearned topic from that saved path.
- Start Learning after Save uses the saved path ID returned by Save.
- Learning section routes load the saved path by route path ID instead of relying on a global active path.
- `completeTopicAction` updates only the saved path matching the route path ID and updates that path's history status.

### Builder Menus And Progress Separation

- `PathContextAction` is reduced to `remove | move-up | move-down`.
- `PathItemContextMenu` renders only Remove, Move up, and Move down.
- `CurrentPathPanel` stops showing completion status inside the builder unless it is needed as read-only context for future approved behavior.
- `completePathItem` and `resetPathItem` are removed from builder action paths. Topic completion remains in `completeTopicAction` and learning views.

## Implementation Task Outline

1. Update `src/server/student-area/types.ts` so builder composition uses local `BuilderCompositionState` or a renamed draft type without implying persisted drafts; reduce `PathContextAction` to composition actions only.
2. Refactor `src/server/student-area/keys.ts` and `src/server/student-area/repository.ts` to use saved path records by ID and history load/save methods; remove app-facing draft, active-path-only, delete, recovery, split-data repair, cleanup, and load-time mutation methods.
3. Update test utilities only where needed to clear Redis keys for isolated tests without reintroducing app-facing delete behavior.
4. Refactor `src/features/student-area/server/builder-selection.ts` into pure client-safe composition helpers plus a server initial-state loader that never writes during load.
5. Move `toggleTrackInDraft`, `toggleTopicInDraft`, `movePathItem`, selected-state helpers, normalization, dirty comparison, Discard, and Clear behavior into local client state in `src/features/student-area/components/student-builder-client.tsx`.
6. Remove server actions for toggle track, toggle topic, context menu item mutation, discard, and clear from `src/features/student-area/actions/student-path-actions.ts`.
7. Replace Save with a single server action that receives the local composition payload, validates it server-side, creates a new saved path or overwrites the edited path ID, and upserts the matching history row.
8. Update `src/features/student-area/components/builder-action-bar.tsx` so Save, Discard, Clear, and Start Learning enabled states are derived from local state and returned saved path ID.
9. Update `src/features/student-area/components/builder-confirmation-dialogs.tsx` copy so Clear describes clearing only local builder UI, not saved path or progress deletion.
10. Update `src/features/student-area/components/path-item-context-menu.tsx` and `src/features/student-area/components/current-path-panel.tsx` to remove Complete/Reset menu items and keep item menus composition-only.
11. Update `src/features/student-area/server/path-persistence.ts` to create/update saved path records by ID, preserve path ID on edits, preserve progress for retained topics, initialize newly added topics as not completed, remove progress only for removed topics, and prevent duplicate history rows.
12. Update `src/features/student-area/server/history-presenter.ts`, `student-history-view.tsx`, and `learning-path-history-table.tsx` so history rows load/read saved paths by ID, hide Resume/Edit for completed rows, and expose no delete action.
13. Update `src/features/student-area/actions/learning-navigation-actions.ts`, learning route pages, `learning-section-view.tsx`, and `complete-topic-action.ts` so Start/Resume/Complete use the saved path ID from Save/history/route rather than a global active path.
14. Add or update Vitest coverage for create initial state, edit initial state, local discard, local clear, save create, save edit overwrite, no duplicate history row, repository no load-time mutation, no delete operation, no builder complete/reset actions, track/topic selection state, partial parent state, and reorder constraints.
15. Add or update Playwright coverage for create, edit from history by ID, save then start from created ID, resume unfinished path, discard in create and edit, clear-without-save preserving saved path, clear-then-save overwriting the edited path ID, completed rows with no actions, no delete UI, composition-only menus, track/topic selection, and reorder constraints.
16. Run `pnpm test`, `pnpm lint`, `pnpm build`, and targeted `pnpm test:e2e` specs for the student area after implementation.

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Redis-backed saved path records remain in use | The 004 feature already established server-managed anonymous student persistence | Reverting to browser-local state would conflict with the approved personalized-tracks architecture |
| Saved path records by ID replace the current active-path-only model | History Resume/Edit must operate by saved path ID and edits must overwrite the same path ID | Keeping only a single active path leaves history rows without deterministic saved-path data for Resume/Edit |

## Post-Design Constitution Check

- Spec Kit workflow: PASS. Plan, research, data model, contracts, and quickstart are generated under the active feature directory.
- Scope control: PASS. Design only corrects builder/history/learning state ownership inside the existing student area.
- Simplicity: PASS. Design removes persisted builder drafts and hidden recovery from normal flows.
- Usability/accessibility: PASS. Explicit local state, disabled rules, confirmation copy, and action visibility are planned and covered by tests.
- Static-first default: PASS WITH INHERITED DEVIATION. Redis remains from 004, with no new service or integration.
- No auth/community/game scope: PASS. No disallowed scope added.
