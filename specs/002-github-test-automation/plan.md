# Implementation Plan: GitHub Test Automation

**Branch**: `002-github-test-automation` | **Date**: 2026-06-03 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-github-test-automation/spec.md`

**Note**: This template is filled in by the `/speckit-plan` command. See `.specify/templates/plan-template.md` for the execution workflow.

## Summary

Add a GitHub Actions quality gate for the existing frontend project. The workflow will run on pull requests targeting `main`, re-run when pull request commits change, and run again on pushes to `main` after merges. It will use one GitHub Actions job with shared checkout, Node.js setup, pnpm cache, and dependency installation, then run the repository's existing package scripts in this hard-fail step order: lint, build, unit tests, and end-to-end tests. The implementation is limited to `.github/workflows` and supporting documentation; no product behavior, deployment automation, backend service, repository secrets, or external product integration is introduced.

## Technical Context

**Language/Version**: TypeScript 6.0.3 with Node.js v25.9.0

**Primary Dependencies**: GitHub Actions workflow syntax; actions/checkout@v6; pnpm/action-setup@v6; actions/setup-node@v6; pnpm 9.5.0 from `packageManager`; existing Next.js 16.2.7, React 19.2.7, ESLint 9.39.4 with eslint-config-next 16.2.7, Vitest 4.1.8, Playwright 1.60.0

**Storage**: N/A; workflow configuration is versioned in `.github/workflows`, with dependency cache managed by GitHub Actions

**Testing**: Existing scripts: `pnpm lint`, `pnpm build`, `pnpm test`, `pnpm test:e2e`

**Target Platform**: GitHub-hosted Ubuntu runner for repository pull request and default-branch validation

**Project Type**: Static-first frontend web application with repository-hosted CI quality automation

**Performance Goals**: Pull request quality status should be visible without local execution; default branch validation should start within 5 minutes of a merge push; reviewers should identify the failed quality step in under 30 seconds; the workflow should avoid repeated checkout and dependency installation within the same run

**Constraints**: Workflow file must live in `.github/workflows`; trigger on `pull_request` for `opened`, `synchronize`, `reopened`, and `ready_for_review`; trigger on `push` to `main`; use workflow-level concurrency with `group: ${{ github.workflow }}-${{ github.ref }}` and `cancel-in-progress: true`; reference action versions by current major tag only; use a single quality job with multiple named steps; run quality gates in the required order and stop downstream steps after a failure; keep pnpm caching enabled; do not configure repository variables or secrets

**Scale/Scope**: One workflow file with one quality job and ordered validation steps (`lint`, `build`, `unit-tests`, `e2e-tests`) covering the existing application and test suites

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

The repository constitution file is still the default placeholder, so the effective gates for this plan come from `AGENTS.md` manual project governance.

| Gate | Status | Evidence |
|------|--------|----------|
| Spec Kit chain controls scope | PASS | Feature is backed by `specs/002-github-test-automation/spec.md` and stays within regression-prevention automation. |
| Static-compatible frontend | PASS | Plan adds repository CI only; no backend, server runtime, deployment runtime, or product integration is introduced. |
| Usability and accessibility remain protected | PASS | Existing lint, build, unit, and e2e suites include the foundation app and accessibility checks; the workflow prevents regressions from reaching `main`. |
| Simplicity and no speculative systems | PASS | Plan uses one GitHub Actions workflow, one quality job, existing package scripts, and repository-local configuration only. |
| No repository secrets or external services | PASS | Workflow uses only GitHub-provided automation context and public package/browser downloads; no user-managed secrets or variables are required. |

## Project Structure

### Documentation (this feature)

```text
specs/002-github-test-automation/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── github-actions-workflow.md
├── checklists/
│   └── requirements.md
└── tasks.md
```

### Source Code (repository root)

```text
.github/
└── workflows/
    └── quality-gate.yml

package.json
pnpm-lock.yaml
eslint.config.mjs
vitest.config.ts
playwright.config.ts
tests/
├── unit/
└── integration/
```

**Structure Decision**: Add one workflow under `.github/workflows` and reuse the existing project scripts and test configuration. No source application directories are changed by this feature.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

No constitution or governance violations are introduced by this plan.

## Phase 0 Research Summary

Research decisions are captured in [research.md](./research.md). All workflow unknowns are resolved: current major action tags, trigger events, concurrency behavior, linter choice, single-job step ordering, dependency setup, pnpm caching, and repository secret requirements.

## Phase 1 Design Summary

Design artifacts are captured in:

- [data-model.md](./data-model.md)
- [contracts/github-actions-workflow.md](./contracts/github-actions-workflow.md)
- [quickstart.md](./quickstart.md)

## Post-Design Constitution Check

| Gate | Status | Evidence |
|------|--------|----------|
| Spec Kit chain controls scope | PASS | Design artifacts map directly to the approved CI specification and do not add deployment, coverage gates, security scans, or product features. |
| Static-compatible frontend | PASS | The workflow validates the static-first frontend and does not introduce runtime infrastructure. |
| Usability and accessibility remain protected | PASS | The e2e job runs the existing Playwright integration suite, including accessibility checks already present in the foundation project. |
| Simplicity and no speculative systems | PASS | One workflow file, one quality job, ordered validation steps, and existing package scripts keep the implementation small. |
| No repository secrets or external services | PASS | Contract documents that no repository secrets or manually configured variables are required. |
