# Research: GitHub Test Automation

## Decision: Use one GitHub Actions workflow with pull request and main-branch push triggers

**Rationale**: The feature requires validation when a pull request opens, when commits are pushed to that pull request, and after the pull request is merged into `main`. GitHub's `pull_request` event supports `opened`, `synchronize`, `reopened`, and `ready_for_review`, and a `push` trigger scoped to `main` covers post-merge default-branch validation. This avoids `pull_request_target`, which is not appropriate when the workflow must build and test pull request code.

**Alternatives considered**:

- `pull_request_target`: Rejected because the workflow needs to run untrusted pull request code and does not need elevated repository permissions.
- `push` on all branches: Rejected because the requirement is pull request validation plus default-branch validation, not every branch push.
- Separate pull request and main workflows: Rejected for this feature because one workflow keeps the quality gate easier to understand and maintain.

**Sources**:

- GitHub Docs, Events that trigger workflows: https://docs.github.com/en/actions/reference/workflows-and-actions/events-that-trigger-workflows
- GitHub Docs, Workflow syntax: https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax

## Decision: Use workflow-level concurrency cancellation

**Rationale**: The user explicitly required cancellation when a new commit is pushed while a run is active. GitHub's native concurrency key supports canceling in-progress workflow runs with `cancel-in-progress: true`, and the group expression `${{ github.workflow }}-${{ github.ref }}` limits cancellation to the same workflow and ref.

**Alternatives considered**:

- Third-party cancellation action: Rejected because native GitHub Actions concurrency is simpler and avoids another dependency.
- Job-level concurrency only: Rejected because workflow-level cancellation is clearer and applies consistently across all ordered jobs.

**Sources**:

- GitHub Docs, Workflow syntax concurrency examples: https://docs.github.com/en/actions/reference/workflows-and-actions/workflow-syntax

## Decision: Use current major action tags only

**Rationale**: The user required action references at the most recent major version and explicitly rejected minor or patch pinning. Current official releases identify `actions/checkout` v6, `actions/setup-node` v6, and `pnpm/action-setup` v6 as the current major tags. The implementation must therefore use `actions/checkout@v6`, `actions/setup-node@v6`, and `pnpm/action-setup@v6`.

**Alternatives considered**:

- Patch-pinned tags such as `@v6.0.3`: Rejected by explicit user requirement.
- Older stable major tags such as `@v4`: Rejected because current official releases have advanced beyond those majors.
- SHA pinning: Rejected because it conflicts with the user's requested major-tag convention for this assignment.

**Sources**:

- actions/checkout releases: https://github.com/actions/checkout/releases
- actions/setup-node releases: https://github.com/actions/setup-node/releases
- pnpm/action-setup releases: https://github.com/pnpm/action-setup/releases

## Decision: Use ESLint as the linter for this TypeScript Next.js project

**Rationale**: The project already has `eslint.config.mjs`, `eslint` 9, and `eslint-config-next` configured for Core Web Vitals and TypeScript. The existing `pnpm lint` script runs `eslint . --max-warnings=0`, which is an appropriate style and static-quality gate for a TypeScript Next.js application without adding another formatter or linter dependency.

**Alternatives considered**:

- TypeScript compiler only: Rejected because it checks types but does not cover the project's existing lint/style rules.
- Prettier-only formatting gate: Rejected because Prettier is not currently configured and would broaden scope.
- Biome: Rejected because it would add a new tool without a need strong enough for this narrow automation feature.

## Decision: Use one quality job with ordered validation steps

**Rationale**: One job avoids repeating checkout, Node.js setup, pnpm setup, dependency cache restore, and dependency installation for each quality gate. GitHub Actions steps already hard-fail sequentially by default, so lint can run first, build second, unit tests third, and e2e tests fourth while stopping later steps after the first failure. Clear step names preserve reviewer visibility inside the single quality check.

**Alternatives considered**:

- Four dependent jobs: Rejected for the revised plan because each job repeats checkout and dependency installation, which adds avoidable runtime for this small project.
- Parallel jobs: Rejected because the user explicitly required hard-fail ordering and because e2e should not run after lint, build, or unit failures.
- Separate workflows: Rejected because the feature is one quality gate and should remain easy to reason about.

## Decision: Reuse existing package scripts and test configuration

**Rationale**: The repository already defines the exact quality commands needed by the feature: `pnpm lint`, `pnpm build`, `pnpm test`, and `pnpm test:e2e`. Reusing them keeps local and CI behavior aligned. The single quality job must install Playwright Chromium and operating-system dependencies after unit tests pass and before running `pnpm test:e2e`.

**Alternatives considered**:

- Inline tool commands in the workflow: Rejected because package scripts are already the project contract.
- Add new CI-only scripts: Rejected because the existing commands are clear and sufficient.

## Decision: No repository secrets or user-configured variables are required

**Rationale**: The workflow only checks out repository contents, installs dependencies from public registries, builds the app, and runs tests. It does not deploy, publish packages, call private APIs, or access third-party services. GitHub-provided context and token permissions are sufficient, with `contents: read` matching checkout's recommended minimal permission.

**Alternatives considered**:

- Add repository variables for Node or pnpm versions: Rejected because the versions already live in the project plan and package metadata.
- Add secrets for package installation: Rejected because the project has no private package registry dependency.
