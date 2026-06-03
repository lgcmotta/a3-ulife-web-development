# Content Review: Educational Content Refresh

## Source Inventory

- `src/content/diogenes.ts`: Diogenes profile and home principles. Needs richer professor identity, clearer platform purpose, and no release-framing promise.
- `src/content/tracks.ts`: Three learning tracks and nine topics. Needs track outcomes plus richer topic practice prompts and static professor notes.
- `src/content/accessibility-help.ts`: Accessibility help sections. Needs more product-specific keyboard, screen reader, theme, and navigation instructions.
- `src/features/foundation/views/accessibility-view.tsx`: Accessibility page introduction. Needs realistic copy without "first version" language.
- `src/features/foundation/views/home-view.tsx`: Home overview copy. Contains release-framing language and should be reviewed during polish.
- `src/content/evidence/heuristic-evaluation.ts`: Assignment evidence copy. Contains release-framing language; update only if it conflicts with refreshed content.

## Placeholder Scan

Command:

```bash
rg -n "placeholder|lorem|first version|intentionally small|coming soon|temporary|example" src
```

Matches requiring rewrite:

- `src/features/foundation/views/home-view.tsx`: "The first version keeps..." release framing.
- `src/features/foundation/views/accessibility-view.tsx`: "planned into the first version..." release framing.
- `src/content/evidence/heuristic-evaluation.ts`: "The first version needs..." release framing.

Matches reviewed as acceptable study language:

- `src/content/tracks.ts`: "example" appears in beginner study context and may remain if the final sentence is realistic, non-placeholder copy.

## Rewrite Checklist

- Home copy explains Diogenes Carvalho Matias as a retired Computer Science professor and learning guide.
- Learning tracks include realistic purpose, learner fit, outcome, and ordered topics.
- Topic pages include summary, why it matters, key ideas, practice prompt, professor note, and next action.
- Help/guidance copy remains static and does not imply a chatbot, AI, accounts, progress tracking, or personalization.
- Accessibility guidance names actual platform behavior: skip links, navigation, topic links, landmarks, headings, theme switch, and high contrast.
- Final scan has no release-framing or temporary wording in user-facing content.

## Final Review

- Final placeholder scan against `src/` returned no matches.
- All tasks in `tasks.md` are marked complete.
- Validation completed with lint, build, unit tests, and Playwright e2e tests.
