# Diogenes Legacy Development Guidelines

Auto-generated from feature plans where applicable. The manual project governance below must remain in effect. 

## Active Technologies

- 001-platform-foundation: TypeScript 6.0.3, Node.js v25.9.0, Next.js 16.2.7, React 19.2.7, Tailwind CSS 4.3.0, shadcn CLI 4.10.0, Vitest 4.1.8, Playwright 1.60.0.
- 002-github-test-automation: GitHub Actions, actions/checkout@v6, pnpm/action-setup@v6, actions/setup-node@v6, pnpm 9.5.0, ESLint 9.39.4, Vitest 4.1.8, Playwright 1.60.0.

## Project Structure

```text
specs/
src/
  app/
  routes/
  features/
  content/
  ui/
  accessibility/
  storage/
tests/
  unit/
  integration/
public/
```

## Commands

- Primary workflow commands: `/speckit.specify`, `/speckit.plan`, `/speckit.tasks`, `/speckit.implement`
- No build, test, or deployment commands should be assumed until a feature plan formally defines the toolchain.

## Code Style

- Keep all Spec Kit artifacts in English by default.
- Prefer the simplest solution that satisfies the approved specification and assignment goals.
- Do not introduce low-value complexity, speculative subsystems, or unapproved platform dependencies.

## Recent Changes

- 2026-04-21: Established root agent governance for the Legado de Diogenes class project.

<!-- MANUAL ADDITIONS START -->

## Project Identity

This repository defines **Legado de Diogenes**, a usability-focused educational web platform for Computer Science students. The platform centers on a retired Computer Science professor who shares reliable, well-organized learning content with new students.

The project goal is to deliver a simple, usable, accessible class assignment with strong academic presentation quality. This repository is governed as a Spec Kit project first: agents must understand the product, preserve the assignment intent, and use the specification workflow before changing scope or behavior.

Do not reference the theme-selection source material in future artifacts. Treat the project theme as settled context.

## Assignment Requirements

All future specifications, plans, tasks, fixes, and implementations must preserve these class-facing outcomes:

- Deliver a responsive public web application.
- Keep usability as a primary evaluation axis, not a secondary polish pass.
- Treat accessibility as a graded deliverable.
- Include personas or equivalent user research artifacts.
- Include information architecture work and wireframes.
- Include heuristic evaluation, findings, and iteration notes.
- Preserve a publicly hosted URL as a project requirement for presentation.

## Product Boundaries

This project must remain intentionally small and academically defensible.

- Prefer the simplest possible solution that can still earn a strong class grade.
- Avoid turning the product into a game or a game-like experience unless a later approved specification explicitly changes direction.
- Keep the product as a frontend-only, static-first SPA by default.
- Do not introduce a backend by default.
- Do not introduce a real AI chatbot by default.
- Do not introduce Lovable or make the project depend on Lovable.
- Do not invent new core domains, audiences, or narratives outside the Diogenes educational theme.

## Core Product Taxonomy

The default product model is a small educational platform with these stable areas:

- Home or introduction area
- Learning tracks area
- Topic detail or study content area
- Progress or feedback area
- Global Diogenes assistant or help entry
- Accessibility help entry

Future features should extend these areas conservatively instead of creating unrelated modules.

## Content, Data, and Hosting Defaults

- Content should be local and static by default.
- User progress and user preferences should be browser-local by default.
- Assistant responses should be scripted, bounded, and deterministic.
- Avoid external integrations unless they are explicitly approved through the Spec Kit workflow.
- Static site deployment is the default delivery model.
- Planned hosting shape is S3 + CloudFront + Route53.
- Future architecture decisions must remain compatible with static hosting and HTTPS delivery unless an approved specification changes scope.
- Avoid introducing any required server runtime by default.

## Agent Workflow Contract

This repository follows a strict Spec Kit workflow. Agents must use the workflow to control scope and quality.

### `/speckit.specify`

- May define new features only when they fit the current project theme and assignment boundaries.
- Must keep scope minimal, rubric-oriented, and aligned with the Diogenes educational platform.
- Must not invent major new domains, audiences, or product goals.
- Must not frame speculative or optional ideas as approved requirements.

### `/speckit.plan`

- Must transform approved features into implementation-ready plans that preserve static-hosting compatibility, usability-first design, accessibility-first behavior, and simple information architecture.
- Must include assignment evidence work when relevant, not only engineering work.
- Must not quietly expand scope beyond the approved specification.

### `/speckit.tasks`

- Must generate tasks covering both product work and assignment evidence work.
- Should include research/personas, IA, accessibility, usability evaluation, implementation, and deployment whenever the approved feature requires them.
- Must keep tasks sequenced so documentation and planning decisions precede implementation work.

### `/speckit.implement`

- May implement only features already backed by specification, plan, and tasks.
- Must not opportunistically add major behavior during implementation.
- Must keep implementation aligned with the currently approved feature specification.

## Change-Control Rules

No agent may introduce a major feature without the full `spec -> plan -> tasks` chain.

A major feature includes any of the following:

- A new primary page or section
- Authentication or authorization
- Persistence beyond browser-local storage
- External APIs or third-party service dependencies
- Real chatbot or generative AI behavior
- Maps, calendars, social/community systems, or unrelated learning domains

Small fixes may proceed without a new feature specification only if all of the following are true:

- They stay inside already approved scope.
- They do not change project direction.
- They do not conflict with the current feature specification.
- They do not implicitly require a new architecture decision.

If a requested fix would materially change scope, treat it as a feature and route it through Spec Kit.

## Architecture Overview

The intended application shape is a single frontend application at the repository root.

- Favor a feature-oriented frontend structure with clear separation for routes, shared UI, content/data, accessibility helpers, and tests.
- Keep routes and pages small, content-driven, and easy to understand.
- Prefer simple reusable content structures over dynamic systems.
- Keep assistant behavior scripted, deterministic, and easy to test.
- Keep architecture decisions biased toward static deployment and low operational complexity.

## Quality Gates

Every future feature must include explicit usability and accessibility acceptance criteria.

The baseline quality rules are:

- Core flows must support keyboard-only navigation.
- Pages must use semantic landmarks and coherent heading hierarchy.
- Interactive elements must expose screen-reader-friendly labels.
- Important status changes should use live announcements where appropriate.
- The product must support at least two accessible visual themes:
  - default color-safe theme
  - high-contrast theme
- Color must never be the only carrier of meaning.
- Accessibility behavior must be planned deliberately, not retrofitted at the end.

## Agent Behavior Rules

- Keep future artifacts concise, concrete, and tied to this project.
- Optimize for class success, clarity, usability evidence, and delivery simplicity.
- Avoid unnecessary abstractions, frameworks, services, or infrastructure.
- When uncertainty exists, prefer the simpler option unless the approved spec requires otherwise.
- Do not treat unapproved ideas as part of the baseline product.

<!-- MANUAL ADDITIONS END -->

<!-- SPECKIT START -->
For additional context about technologies to be used, project structure,
shell commands, and other important information, read the current plan
at specs/002-github-test-automation/plan.md
<!-- SPECKIT END -->
