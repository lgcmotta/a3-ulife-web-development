# Data Model: GitHub Test Automation

This feature does not add application data, student data, browser storage, accounts, or backend persistence. The entities below describe repository automation state and are used to plan workflow behavior.

## Entity: Workflow

**Purpose**: Defines the automated quality gate stored in `.github/workflows`.

**Fields**:

- `name`: Human-readable workflow name shown in GitHub Actions.
- `filePath`: Repository path for the workflow file.
- `triggers`: Events that start the workflow.
- `concurrencyGroup`: Expression used to cancel older runs for the same workflow/ref.
- `permissions`: Minimal repository token permissions.
- `job`: The single quality job that contains ordered validation steps.

**Validation Rules**:

- Must be stored under `.github/workflows`.
- Must trigger on pull requests targeting `main`.
- Must trigger on pushes to `main`.
- Must include the required concurrency group and cancellation behavior.
- Must not require repository secrets or user-configured repository variables.

## Entity: Trigger

**Purpose**: Represents the repository event that starts the workflow.

**Fields**:

- `event`: `pull_request` or `push`.
- `branches`: Branch filters for the event.
- `types`: Pull request activity types where applicable.

**Validation Rules**:

- Pull request trigger must include `opened`, `synchronize`, `reopened`, and `ready_for_review`.
- Push trigger must be scoped to `main`.
- Trigger configuration must not skip relevant pull request updates.

## Entity: Quality Job

**Purpose**: Represents the single workflow job that runs all validation steps after shared setup.

**Fields**:

- `id`: Stable job identifier.
- `displayName`: Human-readable check name.
- `setupSteps`: Checkout, package manager, runtime, and dependency installation steps.
- `validationSteps`: Ordered steps that validate lint, build, unit, and e2e behavior.
- `failureMeaning`: What a failed step communicates to contributors and reviewers.

**Validation Rules**:

- Workflow must expose one quality job.
- The quality job must run steps in this order: lint, build, unit tests, e2e tests.
- The quality job must use major-only action references.
- The quality job must install dependencies with the lockfile once before running validation commands.
- Later validation steps must not run when an earlier validation step fails.

## Entity: Quality Step

**Purpose**: Represents one named validation step inside the single quality job.

**Fields**:

- `name`: Human-readable step name shown in the job log.
- `qualityCommand`: Project command that validates the quality area.
- `order`: Position in the hard-fail sequence.
- `setupRequirement`: Any prerequisite unique to the step.

**Validation Rules**:

- Lint step must run `pnpm lint` first.
- Build step must run `pnpm build` after lint passes.
- Unit test step must run `pnpm test` after build passes.
- E2e setup must install Playwright Chromium before e2e tests run.
- E2e step must run `pnpm test:e2e` last.

## Entity: Action Reference

**Purpose**: Represents an external GitHub Action used by the workflow.

**Fields**:

- `name`: Action identifier.
- `majorTag`: Major version tag used in workflow YAML.
- `purpose`: Why the action is needed.

**Validation Rules**:

- `actions/checkout` must use `@v6`.
- `pnpm/action-setup` must use `@v6`.
- `actions/setup-node` must use `@v6`.
- No action reference may include minor or patch segments.

## Entity: Repository Configuration Requirement

**Purpose**: Captures whether the repository owner must create secrets or variables before the workflow can run.

**Fields**:

- `requiredSecrets`: Secret names and values, if any.
- `requiredVariables`: Variable names and values, if any.
- `ownerActionRequired`: Whether repository settings must be changed.

**Validation Rules**:

- For this feature, `requiredSecrets` must be empty.
- For this feature, `requiredVariables` must be empty.
- If a later plan introduces required configuration, it must list exact names and expected values before implementation.
