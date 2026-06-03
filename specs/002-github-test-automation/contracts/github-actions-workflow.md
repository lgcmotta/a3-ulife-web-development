# Contract: GitHub Actions Quality Gate

## Workflow File

```text
.github/workflows/quality-gate.yml
```

## Required Trigger Contract

The workflow must run for pull requests targeting `main` and pushes to `main`.

```yaml
on:
  pull_request:
    branches:
      - main
    types:
      - opened
      - synchronize
      - reopened
      - ready_for_review
  push:
    branches:
      - main
```

## Required Concurrency Contract

The workflow must cancel older in-progress runs for the same workflow and ref.

```yaml
concurrency:
  group: ${{ github.workflow }}-${{ github.ref }}
  cancel-in-progress: true
```

## Required Permission Contract

The workflow only needs read access to repository contents.

```yaml
permissions:
  contents: read
```

## Required Action Reference Contract

All `uses:` references must use the current major version only.

Allowed action references for this feature:

- `actions/checkout@v6`
- `pnpm/action-setup@v6`
- `actions/setup-node@v6`

Not allowed:

- Minor or patch tags such as `actions/checkout@v6.0.3`
- Older major tags such as `actions/checkout@v4`
- Floating branch names such as `actions/checkout@main`

## Required Job Contract

The workflow must expose one job named `quality-gate`. The job must perform shared checkout, pnpm setup, Node.js setup with pnpm cache, and dependency installation once, then run named validation steps in the required order. GitHub Actions stops later steps automatically when a previous step fails.

| Order | Step Name | Required Command |
|-------|-----------|------------------|
| 1 | `Run linter` | `pnpm lint` |
| 2 | `Build project` | `pnpm build` |
| 3 | `Run unit tests` | `pnpm test` |
| 4 | `Install Playwright Chromium` | `pnpm exec playwright install --with-deps chromium` |
| 5 | `Run end-to-end tests` | `pnpm test:e2e` |

The `Install Playwright Chromium` step must run only after lint, build, and unit tests pass. The `Run end-to-end tests` step must run only after Playwright Chromium installation succeeds.

## Required Setup Contract

The quality job must use this setup pattern once before validation steps:

```yaml
- name: Checkout
  uses: actions/checkout@v6

- name: Setup pnpm
  uses: pnpm/action-setup@v6

- name: Setup Node.js
  uses: actions/setup-node@v6
  with:
    node-version: 25.9.0
    cache: pnpm
    cache-dependency-path: pnpm-lock.yaml

- name: Install dependencies
  run: pnpm install --frozen-lockfile
```

## Required Step Contract

The quality job must then run validation steps in this exact order:

```yaml
- name: Run linter
  run: pnpm lint

- name: Build project
  run: pnpm build

- name: Run unit tests
  run: pnpm test

- name: Install Playwright Chromium
  run: pnpm exec playwright install --with-deps chromium

- name: Run end-to-end tests
  run: pnpm test:e2e
```

## Required Repository Configuration

No repository secrets or repository variables are required.

| Type | Key | Value | Owner Action |
|------|-----|-------|--------------|
| Secret | None | None | None |
| Variable | None | None | None |

## Out of Scope

- Deployment workflows
- Coverage thresholds
- Security scanning
- Visual regression testing
- Performance budgets
- Repository settings automation
- Required-status-check branch protection configuration
