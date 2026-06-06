# Contract: Localized Markdown

## Purpose

Define how long-form topic learning content is stored, selected, and validated separately from the non-Markdown translation catalogs.

## File Layout

```text
src/content/learning-sections/
├── en/
│   ├── problem-solving-basics.md
│   └── ...
└── pt-BR/
    ├── problem-solving-basics.md
    └── ...
```

## Loader Contract

```text
loadLearningSectionMarkdown(topicSlug, locale)
```

Input:

- `topicSlug`: Existing stable topic slug.
- `locale`: Supported locale id.

Output:

- `locale`
- `markdownFileName`
- `markdownFilePath`
- `markdownContent`

Behavior:

- Validate `topicSlug` with the existing slug rules.
- Validate `locale` with supported locale rules.
- Read only the selected locale's Markdown file.
- Do not fall back to English when a localized file is missing.
- Do not mutate saved learning data or topic progress while loading.

## Content Rules

- Every published topic has one English Markdown file and one Portuguese (Brazil) Markdown file.
- Stable topic slugs remain identical across locale folders.
- Short topic metadata such as title, summary, key ideas, practice prompt, and professor note comes from the selected message catalog, not from Markdown.
- Portuguese files are translated during implementation. Automated tests do not attempt to prove the prose is Portuguese.
- Missing Portuguese files fail validation rather than falling back to English.

## Validation

- Unit tests iterate every localized track/topic catalog and verify matching Markdown files.
- Unit tests call `loadLearningSectionMarkdown(topicSlug, "en")` and `loadLearningSectionMarkdown(topicSlug, "pt-BR")` for a representative topic and assert that returned locale/file identity matches the requested language.
- Tests do not inspect the natural language of Markdown prose.
- Broad e2e checks for every topic page are out of scope.
