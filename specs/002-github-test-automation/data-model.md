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
- `jobs`: Ordered jobs that make up the quality gate.

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

**Purpose**: Represents one required quality gate in the workflow.

**Fields**:

- `id`: Stable job identifier.
- `displayName`: Human-readable check name.
- `dependsOn`: Prior job that must pass before this job runs.
- `setupSteps`: Checkout, package manager, runtime, and dependency installation steps.
- `qualityCommand`: Project command that validates the quality area.
- `failureMeaning`: What a failure communicates to contributors and reviewers.

**Validation Rules**:

- Jobs must run in this order: lint, build, unit tests, e2e tests.
- Each job must use major-only action references.
- Each job must install dependencies with the lockfile before running its quality command.
- Downstream jobs must depend on the previous job.

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
