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

The workflow must expose four ordered jobs. Each downstream job must depend on the previous job so failures stop later quality gates.

| Order | Job ID | Required Command | Depends On |
|-------|--------|------------------|------------|
| 1 | `lint` | `pnpm lint` | None |
| 2 | `build` | `pnpm build` | `lint` |
| 3 | `unit-tests` | `pnpm test` | `build` |
| 4 | `e2e-tests` | `pnpm exec playwright install --with-deps chromium` then `pnpm test:e2e` | `unit-tests` |

Each job must perform repository checkout, pnpm setup, Node.js setup for `25.9.0`, dependency installation with `pnpm install --frozen-lockfile`, and then the quality command for that job.

## Required Setup Contract

Each job must use this setup pattern before its quality command:

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
