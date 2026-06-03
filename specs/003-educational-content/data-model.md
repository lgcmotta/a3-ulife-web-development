# Phase 1 Data Model: Educational Content Refresh

## Entity: Diogenes Profile

Represents the public introduction to the professor-guide and the platform purpose.

Fields:

- `name`: Product character display name.
- `role`: Short role statement, e.g. retired Computer Science professor and learning guide.
- `introduction`: Home-page explanation of who Diogenes is and why the platform exists.
- `teachingTone`: Short statement describing calm, practical teaching style.
- `promise`: User-facing value promise focused on reliable, organized beginner learning.

Rules:

- Must explain Diogenes without relying on placeholder release language.
- Must not imply a real person, live tutor, chatbot, account, or personalized advising.
- Must be concise enough for the home page first viewport.

## Entity: Home Principle

Represents one short reason the platform is useful.

Fields:

- `title` or plain string label.
- `description` if the current UI supports richer cards or list items.

Rules:

- Must connect to real beginner student needs: trustworthy content, clear sequence, accessible navigation, and manageable next steps.
- Must avoid product-roadmap phrasing such as "first version" or "later features."

## Entity: Learning Track

Represents a curated beginner study path.

Fields:

- `slug`: Stable route identifier.
- `title`: Beginner-readable track title.
- `summary`: Short overview for scanning.
- `description`: Richer explanation of what the track covers.
- `recommendedFor`: Learner fit cue, such as students new to programming or students building web pages.
- `outcome`: What a student should understand after completing the track.
- `topics`: Ordered topic list.

Rules:

- Keep a small number of predefined tracks.
- Each track must have a distinct purpose and clear reason to choose it.
- Track copy must support fast comparison on desktop and mobile.

## Entity: Topic Content

Represents one topic detail page or topic section.

Fields:

- `slug`: Stable route identifier.
- `title`: Beginner-readable topic name.
- `summary`: Plain-language overview.
- `whyItMatters`: Explanation of practical value.
- `keyIdeas`: Focus points for study; may remain as strings if the UI is list-based.
- `studyNext`: Recommended next action.
- `practicePrompt` (optional): A short original exercise or reflection prompt if the current UI needs more realistic detail.
- `professorNote` (optional): Static Diogenes-style advice, not live assistant behavior.

Rules:

- Each topic must answer: what is this, why does it matter, what should I focus on, and what should I do next?
- Content must stay beginner-friendly and avoid unexplained jargon.
- Content must remain concise; no full textbook chapters in this feature.

## Entity: Diogenes Guidance Copy

Represents static assistant/help text visible in the product.

Fields:

- `purpose`: What the guidance helps with.
- `startAdvice`: Static advice for choosing a track or topic.
- `navigationAdvice`: Static advice for moving through the site.
- `limits`: Wording that avoids implying live chat or personalization.

Rules:

- Must be deterministic static copy.
- Must support a welcoming professor tone.
- Must not create a new assistant feature beyond existing help/guidance surfaces.

## Entity: Accessibility Guidance

Represents user-facing accessibility help content.

Fields:

- `title`: Guidance section title.
- `description`: Plain-language explanation.
- `steps` or `items`: Actionable instructions where helpful.

Rules:

- Must cover keyboard navigation, screen reader structure, visual theme support, and navigation between main areas.
- Must describe actual platform behavior and controls.
- Must not rely on color as the only way to identify meaning.

## Entity: Content Quality Review

Represents manual and automated checks before implementation is considered complete.

Fields:

- `placeholderScanTerms`: Terms that should not appear in user-facing copy, such as "placeholder", "lorem", "first version", "coming soon", and "intentionally small".
- `beginnerClarityCheck`: Reviewer confirms each track/topic can be understood by an early-stage CS student.
- `scopeCheck`: Reviewer confirms no unapproved features were introduced.
- `accessibilityCopyCheck`: Reviewer confirms accessibility guidance is concrete and actionable.

Rules:

- All content must be original English writing.
- Product title may remain "Legado de Diogenes".
- Review must include the home page, tracks area, at least one topic page per track, Diogenes/help copy, and accessibility help.
