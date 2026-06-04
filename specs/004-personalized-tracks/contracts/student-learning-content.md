# Student Learning Content Contract

## Scope

Every available topic must have one markdown file under `src/content/learning-sections/`.

Required files:

- `problem-solving-basics.md`
- `variables-and-flow.md`
- `debugging-habits.md`
- `semantic-structure.md`
- `responsive-layouts.md`
- `accessible-navigation.md`
- `reading-technical-texts.md`
- `planning-study-sessions.md`
- `asking-better-questions.md`

## Markdown Requirements

Each file must include:

- Topic title as the first heading.
- At least 600 words of original English educational content.
- Complete beginner-friendly explanation based on the existing topic summary.
- Practical study guidance or a worked learning example.
- At least one list or table when useful for scanning.
- At least two markdown links to external sources that add value.
- A short "What to do next" section.

Each file must not:

- Copy or closely paraphrase external source text.
- Depend on external links for core understanding.
- Include raw HTML.
- Include unrelated advanced material that makes the topic less beginner-friendly.

## Suggested External Reference Targets

Use stable, reputable sources. Examples:

- Web semantics and headings: MDN Web Docs and W3C/WAI tutorials.
- Responsive layout: MDN Web Docs responsive design and media query guides.
- Accessible navigation: W3C/WAI accessibility principles and keyboard guidance.
- Asking better questions: Stack Overflow or Computer Science Stack Exchange help pages.
- Programming foundations and study methods: official documentation, university learning-center pages, or open educational resources.

## Review Checks

Before implementation is complete:

- Confirm all nine files exist.
- Confirm each file maps to one existing topic slug.
- Confirm each file has at least two external links.
- Confirm each file has at least 600 words excluding link labels and navigation labels.
- Confirm learning sections render lists, links, and tables through `react-markdown`.
- Confirm no file copies external source text.
