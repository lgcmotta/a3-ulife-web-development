# Quickstart: Platform Foundation

## Prerequisites

- Node.js v25.9.0
- pnpm 9.5.0 or compatible package manager setup
- Feature context: `specs/001-platform-foundation/spec.md`
- Implementation plan: `specs/001-platform-foundation/plan.md`

## Planned Setup

Scaffold the application at the repository root as a TypeScript Next.js app with `src/` routing:

```bash
pnpm create next-app@16.2.7 . --ts --tailwind --eslint --app --src-dir --import-alias "@/*"
```

Pin the requested/runtime-aligned dependencies:

```bash
pnpm add next@16.2.7 react@19.2.7 react-dom@19.2.7 lucide-react@1.17.0 class-variance-authority@0.7.1 clsx@2.1.1 tailwind-merge@3.6.0
pnpm add -D typescript@6.0.3 tailwindcss@4.3.0 vitest@4.1.8 @testing-library/react@16.3.2 @testing-library/user-event@14.6.1 jsdom@29.1.1 @playwright/test@1.60.0 @axe-core/playwright@4.11.3
```

Initialize shadcn component conventions and add only the primitives needed for the foundation:

```bash
pnpm dlx shadcn@4.10.0 init
pnpm dlx shadcn@4.10.0 add button badge separator switch
```

## Planned Static Compatibility

Configure the app for static export compatibility and avoid features that require a server runtime:

- Use local content modules in `src/content`.
- Use static route generation for curated topic routes.
- Do not add API routes, server actions, authentication, or remote data fetching.
- Keep images and public assets compatible with static hosting.

## Expected Validation Commands

After implementation tasks create the app and scripts, run:

```bash
pnpm lint
pnpm test
pnpm test:e2e
pnpm build
```

## Validation Result

Completed on 2026-06-02:

- `pnpm lint` passed.
- `pnpm test` passed with 7 test files and 12 unit tests.
- `pnpm test:e2e` passed with 20 Playwright checks across desktop and mobile, including axe accessibility scans.
- `pnpm build` passed and generated static routes for the home page, accessibility help, tracks overview, and all curated topic routes.

The `pnpm build` script uses `next build --webpack` because the default Turbopack build attempted sandbox-restricted process/port behavior during validation. The public validation command remains `pnpm build`.

## Manual Review Checklist

- A first-time student can understand Diogenes and the platform purpose within 60 seconds.
- Learning tracks are reachable from the home area and are easy to compare.
- Each topic page explains what the topic is about and what to study next.
- Keyboard-only navigation reaches all required controls without traps.
- Screen-reader-oriented structure exposes main heading, navigation, main content, and control labels.
- Default and high-contrast themes are both usable.
- Mobile layout has no hidden essential content, overlap, or horizontal scrolling.
- Assignment evidence includes persona, IA/wireframe notes, heuristic findings, and iteration notes.
