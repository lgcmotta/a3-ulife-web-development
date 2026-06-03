# Quickstart: GitHub Test Automation

## Planned Deliverable

Create one workflow file:

```text
.github/workflows/quality-gate.yml
```

The workflow must run for:

- Pull requests targeting `main`, including new commits pushed to the pull request.
- Pushes to `main`, including merge commits after a pull request is merged.

## Required Local Baseline

Before implementing the workflow, confirm the project quality commands pass locally:

```bash
pnpm lint
pnpm build
pnpm test
pnpm test:e2e
```

## Required Workflow Order

The GitHub Actions quality gate must run in this order:

1. Lint with `pnpm lint`
2. Build with `pnpm build`
3. Unit tests with `pnpm test`
4. End-to-end tests with Playwright Chromium setup and `pnpm test:e2e`

Each later job must depend on the previous job. A failed lint job prevents build, unit, and e2e jobs from running. A failed build prevents unit and e2e jobs from running. A failed unit test job prevents e2e tests from running.

## Action Version Rule

Use current major tags only:

```yaml
uses: actions/checkout@v6
uses: pnpm/action-setup@v6
uses: actions/setup-node@v6
```

Do not use minor, patch, branch, or SHA references for this assignment feature.

## Repository Configuration

No repository secrets or repository variables are required for this workflow.

The workflow must not require the assistant or implementation to configure repository settings. Branch protection may later require these checks, but that is outside this feature unless separately specified.

## Verification After Implementation

1. Confirm `.github/workflows/quality-gate.yml` exists.
2. Confirm the workflow contains `pull_request` and `push` triggers scoped to `main`.
3. Confirm the workflow contains the required concurrency block:

   ```yaml
   concurrency:
     group: ${{ github.workflow }}-${{ github.ref }}
     cancel-in-progress: true
   ```

4. Confirm the workflow contains four ordered jobs: `lint`, `build`, `unit-tests`, and `e2e-tests`.
5. Confirm every `uses:` reference has a major-only tag.
6. Confirm no repository secrets or variables are referenced.
7. Run local quality commands to validate the commands used by CI still pass.
