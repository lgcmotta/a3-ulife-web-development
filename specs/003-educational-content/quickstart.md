# Quickstart: Educational Content Refresh

## Implementation Steps

1. Review the approved feature specification and this plan.
2. Inspect current copy in `src/content/diogenes.ts`, `src/content/tracks.ts`, and `src/content/accessibility-help.ts`.
3. Replace generic or placeholder wording with original English content aligned to the Diogenes educational platform.
4. Expand learning-track and topic content while keeping the existing small information architecture.
5. Add minimal optional content fields only if the UI needs them to present realistic topic detail cleanly.
6. Update rendering/tests if content shape changes.

## Content Review Checklist

Search for temporary or release-oriented wording:

```bash
rg -n "placeholder|lorem|first version|intentionally small|coming soon|temporary|example" src
```

Manual content checks:

- Home copy explains Diogenes and the platform purpose within 30 seconds.
- Track cards describe purpose, learner fit, and outcome.
- Topic pages explain what to study, why it matters, key ideas, and next action.
- Help/guidance copy stays static and does not imply a live chatbot.
- Accessibility help includes keyboard, screen reader, visual theme, and navigation guidance.

## Validation Commands

Run the existing quality gates after implementation:

```bash
pnpm lint
pnpm build
pnpm test
pnpm e2e
```

If the project uses a different e2e command in `package.json`, use the existing script name instead of adding a new command for this feature.

## Manual Review Path

1. Open the home page.
2. Navigate to the learning tracks area.
3. Open at least one topic from each track.
4. Open the help or Diogenes guidance entry.
5. Open accessibility help.
6. Repeat the same route with keyboard navigation.
7. Check a mobile-width viewport for text overflow and dense sections.

## Environment And Secrets

No new environment variables, secrets, external services, or repository settings are required for this feature.
