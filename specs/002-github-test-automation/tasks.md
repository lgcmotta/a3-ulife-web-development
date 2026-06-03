# Tasks: GitHub Test Automation

**Input**: Design documents from `/specs/002-github-test-automation/`

**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/github-actions-workflow.md, quickstart.md

**Tests**: This feature validates repository automation. The task list includes local command validation and workflow contract checks rather than new product test files.

**Organization**: Tasks are grouped by user story so the pull request MVP can be implemented and validated first, then reviewer clarity and default-branch validation can be layered on.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependency on incomplete tasks)
- **[Story]**: Which user story this task belongs to (US1, US2, US3)
- Every task includes an exact repository file path

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Confirm the repository quality commands and create the GitHub Actions workflow location.

- [X] T001 [P] Verify existing lint, build, unit test, and e2e scripts in package.json
- [X] T002 [P] Verify Playwright webServer command and Chromium dependency expectation in playwright.config.ts
- [X] T003 Create the GitHub Actions workflow directory at .github/workflows
- [X] T004 Create initial empty workflow file at .github/workflows/quality-gate.yml

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Add shared workflow metadata, permissions, cancellation behavior, and reusable setup decisions that all user stories depend on.

**Critical**: No user story work should begin until this phase is complete.

- [X] T005 Add workflow name, contents read permission, and concurrency cancellation block in .github/workflows/quality-gate.yml
- [X] T006 Add major-only setup action references for actions/checkout@v6, pnpm/action-setup@v6, and actions/setup-node@v6 in .github/workflows/quality-gate.yml
- [X] T007 Add dependency installation pattern with pnpm install --frozen-lockfile and pnpm-lock.yaml cache path in .github/workflows/quality-gate.yml

**Checkpoint**: Shared workflow foundation is ready for pull request and main-branch jobs.

---

## Phase 3: User Story 1 - Validate Pull Requests Before Merge (Priority: P1) MVP

**Goal**: Pull requests targeting `main` receive automated lint, build, unit test, and e2e checks in the required hard-fail order.

**Independent Test**: Inspect `.github/workflows/quality-gate.yml` and confirm pull request triggers and ordered jobs match the contract; local commands used by the workflow must pass.

### Implementation for User Story 1

- [X] T008 [US1] Add pull_request trigger for opened, synchronize, reopened, and ready_for_review events targeting main in .github/workflows/quality-gate.yml
- [X] T009 [US1] Add lint job that runs pnpm lint after checkout, pnpm setup, Node.js setup, and dependency installation in .github/workflows/quality-gate.yml
- [X] T010 [US1] Add build job that needs lint and runs pnpm build in .github/workflows/quality-gate.yml
- [X] T011 [US1] Add unit-tests job that needs build and runs pnpm test in .github/workflows/quality-gate.yml
- [X] T012 [US1] Add e2e-tests job that needs unit-tests, installs Playwright Chromium with dependencies, and runs pnpm test:e2e in .github/workflows/quality-gate.yml
- [X] T013 [US1] Validate US1 workflow contract against specs/002-github-test-automation/contracts/github-actions-workflow.md and .github/workflows/quality-gate.yml

**Checkpoint**: User Story 1 is independently complete when pull request validation is represented by ordered workflow jobs and local quality commands pass.

---

## Phase 4: User Story 2 - Review Quality Results Efficiently (Priority: P2)

**Goal**: Reviewers can distinguish style, build, unit, and e2e outcomes from pull request checks without reading unrelated files.

**Independent Test**: Inspect workflow job identifiers and display names in `.github/workflows/quality-gate.yml` and confirm they map clearly to the quality areas in the spec.

### Implementation for User Story 2

- [X] T014 [US2] Set clear workflow and job display names for lint, build, unit-tests, and e2e-tests in .github/workflows/quality-gate.yml
- [X] T015 [US2] Set clear step names for setup, lint, build, unit test, Playwright install, and e2e execution in .github/workflows/quality-gate.yml
- [X] T016 [US2] Validate reviewer-facing check categories against FR-006 in specs/002-github-test-automation/spec.md and .github/workflows/quality-gate.yml

**Checkpoint**: User Story 2 is independently complete when the workflow exposes clear review-facing check and step names for each quality area.

---

## Phase 5: User Story 3 - Confirm Default Branch Health After Merge (Priority: P3)

**Goal**: Pushes to `main`, including merge commits, run the same ordered validation so maintainers can see default-branch health.

**Independent Test**: Inspect `.github/workflows/quality-gate.yml` and confirm `push` to `main` runs the same dependent jobs used by pull request validation.

### Implementation for User Story 3

- [X] T017 [US3] Add push trigger scoped to main in .github/workflows/quality-gate.yml
- [X] T018 [US3] Confirm the push to main trigger uses the same lint, build, unit-tests, and e2e-tests jobs in .github/workflows/quality-gate.yml
- [X] T019 [US3] Validate default-branch automation expectations against FR-008, FR-009, and FR-010 in specs/002-github-test-automation/spec.md and .github/workflows/quality-gate.yml

**Checkpoint**: User Story 3 is independently complete when `main` pushes trigger the same ordered quality gate as pull requests.

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Validate formatting, scope, repository configuration requirements, and local command compatibility.

- [X] T020 Validate all uses references are major-only and no repository secrets or variables are referenced in .github/workflows/quality-gate.yml
- [X] T021 Run pnpm lint to validate the lint command referenced by .github/workflows/quality-gate.yml
- [X] T022 Run pnpm build to validate the build command referenced by .github/workflows/quality-gate.yml
- [X] T023 Run pnpm test to validate the unit test command referenced by .github/workflows/quality-gate.yml
- [X] T024 Run pnpm test:e2e to validate the e2e command referenced by .github/workflows/quality-gate.yml
- [X] T025 Run git diff --check to validate whitespace and formatting across .github/workflows/quality-gate.yml and specs/002-github-test-automation/tasks.md

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies; starts immediately.
- **Foundational (Phase 2)**: Depends on Phase 1; blocks all user story work.
- **User Story 1 (Phase 3)**: Depends on Phase 2 and is the MVP.
- **User Story 2 (Phase 4)**: Depends on User Story 1 because it clarifies the checks created for pull request validation.
- **User Story 3 (Phase 5)**: Depends on User Story 1 because it reuses the same ordered quality jobs for the default branch.
- **Polish (Phase 6)**: Depends on all desired user stories being complete.

### User Story Dependencies

- **User Story 1 (P1)**: No dependency on other user stories after foundational setup.
- **User Story 2 (P2)**: Depends on US1 job structure being present.
- **User Story 3 (P3)**: Depends on US1 job structure being present.

### Parallel Opportunities

- Setup verification tasks T001 and T002 can be reviewed in parallel before T003 and T004 create the workflow location.
- US2 validation T016 can be performed immediately after T014 and T015 are complete.
- US3 validation T019 can be performed immediately after T017 and T018 are complete.
- Polish validation commands T021, T022, T023, and T024 must be run in the same order as the workflow to preserve the hard-fail sequence.

---

## Parallel Example: User Story 2

```text
Task: "T014 [US2] Set clear workflow and job display names for lint, build, unit-tests, and e2e-tests in .github/workflows/quality-gate.yml"
Task: "T015 [US2] Set clear step names for setup, lint, build, unit test, Playwright install, and e2e execution in .github/workflows/quality-gate.yml"
```

These touch the same workflow file and should be coordinated carefully if performed by multiple contributors.

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup.
2. Complete Phase 2: Foundational workflow metadata and setup.
3. Complete Phase 3: Pull request validation.
4. Stop and validate that pull requests targeting `main` would run lint, build, unit tests, and e2e tests in order.

### Incremental Delivery

1. Deliver US1 for the core regression-prevention quality gate.
2. Add US2 so reviewers see clear quality categories.
3. Add US3 so `main` remains protected after merges.
4. Run polish validation commands in the same hard-fail order as the workflow.

### Final Validation

The feature is complete when `.github/workflows/quality-gate.yml` satisfies the contract, all tasks are marked complete, local quality commands pass, and no repository secrets or variables are required.
