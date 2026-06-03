# Legado de Diogenes

Legado de Diogenes is a usability-focused educational web platform for beginner and early-stage Computer Science students. The foundation MVP introduces Diogenes, presents a small set of curated learning tracks, opens concise topic pages, and includes accessibility help for keyboard, screen-reader-oriented structure, and visual theme support.

## Current Feature

The active implementation follows `specs/004-personalized-tracks/plan.md`.

## Local Commands

```bash
pnpm install
docker compose up -d redis
pnpm dev
pnpm lint
pnpm test
pnpm test:e2e
pnpm build
```

## Redis

The personalized student area stores anonymous browser-student records, drafts, saved paths, progress, and history in Redis.

Local default:

```bash
REDIS_URL=redis://localhost:6379
```

No secrets are required for local development.

## Learning Content

Detailed topic sections live in `src/content/learning-sections/` and are rendered from markdown. Each available topic has one markdown file with original English educational content, beginner-friendly guidance, and external reference links.

## Public Presentation URL

The project is planned for static hosting. After deployment, add the shared class presentation URL here so reviewers can open the public foundation experience directly.
