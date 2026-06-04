# Quickstart: Learning Path CRUD State Correction

## Prerequisites

- Install dependencies with the repository's package manager if needed.
- Start Redis through the existing Docker Compose setup before running integration tests that touch student-area persistence.

## Implementation Order

1. Refactor types and repository boundaries first so app-facing storage no longer exposes persisted drafts, active-path-only behavior, recovery, cleanup, or delete operations.
2. Refactor builder initial loading into explicit create/edit modes.
3. Move builder selection, removal, clear, discard, and reorder behavior into local client state.
4. Replace builder Save with a server action that accepts the local composition payload and creates or overwrites a saved path by ID.
5. Update history presentation and learning navigation to use saved path IDs.
6. Remove Complete and Reset from builder item menus.
7. Update unit and integration tests.

## Targeted Verification

Run focused unit tests while refactoring:

```bash
pnpm test tests/unit/features/student-area/builder-selection.test.ts
pnpm test tests/unit/features/student-area/path-organization.test.ts
pnpm test tests/unit/features/student-area/path-persistence.test.ts
pnpm test tests/unit/features/student-area/history-presenter.test.ts
pnpm test tests/unit/server/student-area/repository.test.ts
```

Run focused integration tests after the UI and server actions are updated:

```bash
pnpm test:e2e tests/integration/student-area-builder-selection.spec.ts
pnpm test:e2e tests/integration/student-area-builder-organization.spec.ts
pnpm test:e2e tests/integration/student-area-builder-persistence.spec.ts
pnpm test:e2e tests/integration/student-area-history.spec.ts
pnpm test:e2e tests/integration/student-area-learning-flow.spec.ts
```

Run full gates before implementation is considered complete:

```bash
pnpm test
pnpm lint
pnpm build
pnpm test:e2e
```

## Verification Results

Recorded after implementation:

- `pnpm test`: passed, 21 files and 64 tests.
- `pnpm lint`: passed with `eslint . --max-warnings=0`.
- `pnpm build`: passed with `next build --webpack`.
- Focused student-area Playwright suite: passed, 46 tests across desktop and mobile.
- `pnpm test:e2e`: passed, 80 tests across desktop and mobile.

The focused Playwright command required the local Next.js server and Redis to be reachable. The session route now coalesces concurrent anonymous session allocation so first-visit document and RSC requests use the same student record.

## Required Test Coverage

- Create mode opens with empty builder state.
- Edit mode opens from a saved path ID and pre-populates from saved state.
- Whole-track selection selects all child topics.
- Topic selection affects only one topic.
- Parent track selected state appears only when every child topic is selected.
- Parent track partial state appears when only some topics are selected.
- Track reorder preserves child topics.
- Topic reorder stays within the parent track.
- Save creates a new path and enables Start Learning from the created ID.
- Save while editing overwrites the existing path ID.
- Save while editing preserves progress for retained topics, initializes newly added topics as not completed, and removes progress only for removed topics.
- Editing save does not create duplicate history rows.
- Discard in create mode returns to empty local state.
- Discard in edit mode returns to the initial saved-path state.
- Clear clears only local builder UI.
- Clear without Save preserves saved path and history data.
- Clear then Save overwrites the edited path ID.
- History Resume Learning opens the last unlearned topic for an unfinished path.
- History Edit Path opens the builder with the saved path ID.
- Completed history rows show no Resume Learning or Edit Path.
- Builder menus show Remove, Move up, and Move down only.
- Learning paths expose no Delete action.
- Topic completion updates progress in the learning flow only.

## Manual Review Checklist

- Confirm Clear dialog copy says local builder state is cleared and saved data remains unchanged until Save.
- Confirm Save disabled states are understandable without color alone.
- Confirm keyboard users can select tracks/topics, open item menus, reorder, clear, discard, save, start learning, resume learning, and complete a topic.
- Confirm screen reader labels expose selected, partial, disabled, unsaved, saved, progress, and completed states clearly.
