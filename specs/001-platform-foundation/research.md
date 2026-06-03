# Research: Platform Foundation

## Decision: Use Next.js 16.2.7 with App Router and static export compatibility

**Rationale**: The user requested Next.js, and the repository governance requires a public, frontend-only, static-first web application. App Router supports a small route model for the foundation MVP while keeping pages easy to present, test, and statically export.

**Alternatives considered**:

- Vite + React: simpler for a static SPA, but the user explicitly requested Next.js and the route model benefits from Next page conventions.
- Next.js with server-rendered runtime behavior: rejected because the project should not require a backend or server runtime by default.

## Decision: Use TypeScript 6.0.3 on Node.js v25.9.0

**Rationale**: The active local Node runtime is v25.9.0, and `typescript@6.0.3` is available from the package registry. Pinning the TypeScript version keeps later tasks concrete and aligned with the user's request.

**Alternatives considered**:

- Use the Next.js default TypeScript version: rejected because the user requested a specific TypeScript version.
- Use JavaScript only: rejected because TypeScript improves content model safety for tracks, topics, routes, and evidence artifacts.

## Decision: Use Tailwind CSS 4.3.0 and shadcn-derived component primitives

**Rationale**: Tailwind supports a compact responsive design system, accessible focus styles, and default/high-contrast theme tokens. shadcn components are copied into the project and can be kept minimal, avoiding a heavy third-party UI framework while making buttons, badges, separators, and repeated item layouts easier to implement consistently.

**Alternatives considered**:

- Handwritten CSS only: viable, but slower to keep consistent across responsive states and accessibility themes.
- Large component framework: rejected because it would add low-value complexity for a small academic MVP.

## Decision: Keep all educational content local and typed

**Rationale**: The approved MVP requires a small curated set of tracks and topics. Local typed content supports static hosting, avoids external integrations, and makes the assignment evidence easy to inspect.

**Alternatives considered**:

- CMS or external content service: rejected because external integrations are out of scope.
- Hardcoded text directly inside pages: rejected because it makes IA, routes, tests, and later feature additions harder to maintain.

## Decision: Use four public route groups for the foundation IA

**Rationale**: The MVP needs clear navigation between introduction, tracks, topic detail, and accessibility help. The route groups `/`, `/tracks`, `/tracks/[trackSlug]/[topicSlug]`, and `/accessibility` make these areas directly addressable for presentation and testing.

**Alternatives considered**:

- One-page anchor-only layout: simpler, but weaker for topic detail, direct linking, and route-based testing.
- More primary pages: rejected because the foundation scope should stay narrow.

## Decision: Include default and high-contrast visual themes as foundation accessibility support

**Rationale**: `AGENTS.md` defines at least two accessible visual themes as a baseline quality rule. Implementing the theme foundation now keeps accessibility from becoming a late retrofit and supports class grading expectations.

**Alternatives considered**:

- Default theme only: rejected because it violates repository governance.
- Multiple decorative themes: rejected because that would be personalization beyond the approved MVP.

## Decision: Test with Vitest, React Testing Library, Playwright, and axe integration

**Rationale**: Unit tests can validate content models, route helpers, and accessibility utility behavior. Integration tests can validate keyboard navigation, responsive flows, route reachability, and automated accessibility checks. Heuristic evaluation remains documented as assignment evidence.

**Alternatives considered**:

- Manual testing only: rejected because accessibility and navigation behavior need repeatable checks.
- Full visual regression system: rejected as unnecessary complexity for the first foundation slice.
