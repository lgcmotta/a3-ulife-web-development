# Content Quality Contract

## Scope

This contract applies to visible user-facing content updated for the educational content refresh:

- `src/content/diogenes.ts`
- `src/content/tracks.ts`
- `src/content/accessibility-help.ts`
- Any page or component changed only to render richer approved content fields

## Home And Introduction Contract

- The home area must explain who Diogenes is and what Legado de Diogenes offers.
- Copy must present Diogenes as a retired Computer Science professor sharing organized beginner learning material.
- Copy must not include release-framing phrases such as "the first version keeps", "placeholder", "temporary", or "coming soon".
- Copy must remain short enough to scan before choosing a main navigation target.

## Learning Tracks Contract

- The application must keep a small curated set of learning tracks.
- Each track must include a realistic purpose, learner fit, and expected outcome.
- Track summaries must help a beginner compare options without needing prior Computer Science expertise.
- Topic lists must remain ordered and easy to scan.

## Topic Content Contract

Each topic must provide:

- A plain-language summary.
- A realistic explanation of why the topic matters.
- Key ideas that go beyond one-word labels when the UI allows it.
- A concrete next study action.

Topic content must not:

- Become a full long-form course.
- Introduce advanced concepts without beginner framing.
- Add quizzes, scoring, game mechanics, progress tracking, or personalization.

## Diogenes Guidance Contract

- Guidance may use a calm professor-like voice.
- Guidance must be static and deterministic.
- Guidance must not imply live chat, generative AI, personal tutoring, accounts, saved progress, or real-time feedback.
- Guidance should help students choose a track, open a topic, and continue studying.

## Accessibility Guidance Contract

Accessibility copy must explain:

- Keyboard navigation through skip links, main navigation, track links, topic links, and controls.
- Screen reader structure through landmarks, headings, labels, and meaningful links.
- Visual theme support, including high-contrast use.
- Main-area navigation for home, tracks, topics, help, and accessibility content.

Accessibility copy must be specific to this product. Generic policy language is not enough.

## Originality And Copyright Contract

- All revised educational copy must be original English writing.
- External material may be used only as background understanding, not copied or closely paraphrased.
- The implementation must not include copied passages from assignment prompts, textbooks, tutorials, or web pages.

## Review Checks

Before marking implementation complete:

- Search user-facing content for placeholder terms.
- Review one topic from each track on desktop and mobile layouts.
- Confirm each topic gives a clear next study action.
- Confirm accessibility guidance names actual site behaviors.
- Confirm no new feature area or interaction model was introduced.
