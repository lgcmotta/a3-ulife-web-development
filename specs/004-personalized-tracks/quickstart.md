# Quickstart: Personalized Student Area

## Dependencies

Planned packages:

```bash
pnpm add redis sqids react-markdown remark-gfm
```

Planned UI components:

```bash
pnpm dlx shadcn@4.10.0 add accordion checkbox context-menu dialog table tabs sonner
```

After dependency changes, run:

```bash
pnpm audit --prod
```

Audit result after adding the student-area dependencies: one moderate transitive advisory was reported for `postcss <8.5.10` through `next@16.2.7`. No feature secrets are required; reassess the advisory during dependency maintenance or when Next.js updates its transitive PostCSS version.

## Redis Service

Create `docker-compose.yml`:

```yaml
services:
  redis:
    image: mirror.gcr.io/redis:latest
    container_name: redis
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data

volumes:
  redis_data:
    name: redis_data
    external: false
```

Start Redis:

```bash
docker compose up -d redis
```

Default local environment:

```bash
REDIS_URL=redis://localhost:6379
```

## Implementation Path

1. Add Redis Compose file and Redis connection helper.
2. Add Sqids helper for 7-character public IDs.
3. Add anonymous student record creation and browser persistence.
4. Add Redis repositories for draft path, active path, history, and progress.
5. Add `/tracks/history` and `/tracks/builder` routes with tab navigation.
6. Update Home and Learning Tracks `Start Learning` actions to route to `/tracks/history`.
7. Add history table and add-new-learning-path action to `/tracks/builder`.
8. Add builder tree, current path view, context menu actions, toasts, save/discard/clear/start/continue controls.
9. Add markdown learning section files for each topic.
10. Add learning section and completion routes.

## Markdown Content Authoring

Create one realistic markdown file for each available topic:

```text
src/content/learning-sections/
├── problem-solving-basics.md
├── variables-and-flow.md
├── debugging-habits.md
├── semantic-structure.md
├── responsive-layouts.md
├── accessible-navigation.md
├── reading-technical-texts.md
├── planning-study-sessions.md
└── asking-better-questions.md
```

Each file must:

- Contain at least 600 words of original English educational content.
- Explain the topic in detail based on the existing topic summary.
- Include practical study guidance for beginner Computer Science students.
- Include markdown lists or tables where they improve clarity.
- Include at least two markdown links to external sources that add value.
- Keep the content self-contained; links support learning but are not required to understand the topic.
- Avoid copying or closely paraphrasing external sources.

Task generation must include explicit writing tasks for these markdown files, either one task per topic or grouped by track.

Recommended reference categories:

- Programming foundations: reputable programming documentation, open educational material, debugging or problem-solving guides.
- Web and accessibility: MDN Web Docs and W3C/WAI resources.
- Study methods: university learning-center material and high-quality programming help guidance.

## Manual Scenario

1. Start Redis.
2. Start app.
3. Open Home.
4. Select `Start Learning`.
5. Confirm `/tracks/history` opens.
6. Select add-new-learning-path action.
7. Confirm `/tracks/builder` opens.
8. Select one track and confirm all child topics are selected.
9. Deselect one child topic and confirm parent track becomes partial.
10. Save path.
11. Start Learning.
12. Complete first topic.
13. Continue through final topic.
14. Confirm completion page returns to `/tracks/history`.

## Validation Commands

```bash
pnpm lint
pnpm build
pnpm test
pnpm test:e2e
```

Latest validation result:

- `pnpm lint`: passed
- `pnpm build`: passed
- `pnpm test`: passed, 21 files and 55 tests
- `pnpm test:e2e`: passed, 64 Playwright tests with Redis running

Targeted regression validation for the student-area UI fixes also passed:

- Confirmation dialogs render with opaque readable panels.
- Current-path item actions use compact three-dot dropdown triggers.
- Unfinished history rows show Resume Learning and Edit Path actions.
- Completed learning paths show completed progress and status in history.
- Returning to the builder after completing a path shows the initial empty builder state.
- Completed history is preserved while creating a new learning path.
- History edit links open `/tracks/builder?edit={pathId}` for unfinished paths.
- Plain builder visits stay empty after starting an active path unless the user opens Edit Path.
- Edited full tracks can remove one topic without clearing the remaining selected topics.

## Environment And Secrets

Required local variable:

- `REDIS_URL=redis://localhost:6379`

No secrets are required for this feature. Anonymous student IDs are not authentication tokens and must not be treated as secrets.
