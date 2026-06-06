# Learning Section Authoring Rules

Each topic in `src/content/tracks.ts` needs one markdown file per supported locale:

```text
en/{topicSlug}.md
pt-BR/{topicSlug}.md
```

Required standards:

- Start with one `#` heading that matches the localized topic title.
- Write at least 600 words of original educational content for each locale.
- Explain the topic in a beginner-friendly way based on the existing topic summary.
- Include practical study guidance or a worked example.
- Include at least one list or table when it improves scanning.
- Include at least two markdown links to stable external references.
- Keep the content self-contained, so links support learning but are not required.
- Do not include raw HTML.
- Do not copy or closely paraphrase external sources.
- Keep English and Portuguese files separate from UI message JSON.
