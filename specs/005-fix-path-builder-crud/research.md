# Phase 0 Research: Learning Path CRUD State Correction

## Decision: Builder Composition Is Client-Owned After Initial Render

**Rationale**: The specification requires selections, removals, clears, reorders, and discards to remain local until Save. The current server-backed draft action model writes every builder change and makes Clear/Discard storage operations, which conflicts with the intended CRUD flow. A local client state model makes Create, Edit, Save, Discard, and Clear easier to explain and test.

**Alternatives considered**:

- Persist a draft on every builder action. Rejected because unsaved builder edits would continue mutating storage before explicit Save.
- Persist drafts only after debounce. Rejected because it still writes unsaved composition and blurs the CRUD boundary.
- Store unsaved composition in the URL. Rejected because track/topic order can become verbose and hard to maintain without adding user value.

## Decision: Initial Builder Load Has Explicit Create And Edit Modes

**Rationale**: Create mode can always start empty when no saved path ID is supplied. Edit mode can load one saved path by ID and copy its saved composition into the local builder state. This removes inference from active path or draft IDs and aligns with History as the read entry point for saved paths.

**Alternatives considered**:

- Infer edit mode from a persisted draft matching the active path. Rejected because it ties edit behavior to hidden draft storage.
- Always pre-populate from the latest unfinished path. Rejected because plain builder visits must be clean create sessions unless History supplies a path ID.

## Decision: Save Writes Saved Path Records By ID

**Rationale**: Create Save needs a new path ID and history entry; Edit Save needs to overwrite the same path ID and update the matching history entry. Saved-path-by-ID storage makes Start, Resume, Edit, and Complete deterministic and prevents duplicate history rows.

**Alternatives considered**:

- Keep a single active path and history summaries only. Rejected because Resume/Edit from history should use saved path IDs and saved database state.
- Save every new composition as a new path even in edit mode. Rejected because the spec requires edited saves to overwrite the existing path ID.

## Decision: Repository Loads Must Not Mutate Storage

**Rationale**: The specification explicitly forbids hidden recovery, migration, split-data repair, cleanup, and load-time mutation in normal repository/load/save operations. Repository loads should return data, null, empty lists, or recoverable errors. Save operations should write exactly the requested record.

**Alternatives considered**:

- Keep `recoverSplitLearningData` in history and builder loads. Rejected because it performs hidden cross-student recovery and cleanup during normal reads.
- Delete corrupt JSON during load. Rejected because cleanup behavior must be specified separately if ever needed.
- Keep clear/delete methods on the application repository interface. Rejected because learning paths cannot be deleted through this feature.

## Decision: Builder Menus Are Composition-Only

**Rationale**: Completion and reset are progress operations and belong in the learning flow. Removing Complete/Reset from builder item menus prevents composition edits from resetting or marking progress.

**Alternatives considered**:

- Keep completion actions as shortcuts in the builder. Rejected because this mixes learning progress with composition and conflicts with the spec.
- Show progress-reset actions only in edit mode. Rejected because the spec excludes progress reset from builder composition menus entirely.

## Decision: History Presenter Drives Saved-Path Actions From Saved Path Status

**Rationale**: History is the read entry point for saved paths. It should show Resume Learning and Edit Path for unfinished saved paths and hide both for completed paths. It should never show Delete.

**Alternatives considered**:

- Show actions only for the latest active path. Rejected because history rows are saved path entries identified by path ID.
- Show Edit for completed paths. Rejected because the spec says completed paths do not need edit or resume actions.

## Decision: Verification Combines Pure State Unit Tests With Student-Area Integration Tests

**Rationale**: The risky behavior is split between pure composition rules, repository boundaries, server Save behavior, history presentation, and browser flows. Unit tests should pin pure helpers and idempotent storage boundaries; Playwright tests should verify visible CRUD behavior, history actions, and learning navigation.

**Alternatives considered**:

- Cover only Playwright flows. Rejected because repository and pure local state regressions would be slower and harder to diagnose.
- Cover only unit tests. Rejected because the spec is heavily user-visible and route-driven.
