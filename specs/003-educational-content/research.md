# Phase 0 Research: Educational Content Refresh

## Decision 1: Use the approved Diogenes premise as the content anchor

**Decision**: Write the content around Diogenes Carvalho Matias as a retired Computer Science professor who shares organized, reliable beginner learning material through Legado de Diogenes.

**Rationale**: This keeps the website tied to the class assignment narrative while replacing generic "first version" copy with a concrete educational purpose.

**Alternatives considered**:

- Generic study portal language: rejected because it weakens the project identity.
- Highly playful character copy: rejected because the foundation slice should prioritize usability and credibility over entertainment.
- Long biography-first writing: rejected because beginners need quick orientation and study paths more than narrative detail.

## Decision 2: Deepen existing tracks instead of adding many new tracks

**Decision**: Keep the existing small curated track structure and enrich each track/topic with realistic purpose, learner fit, key ideas, and study-next guidance.

**Rationale**: The current information architecture is intentionally simple. Richer content inside the existing tracks improves credibility without increasing navigation complexity.

**Alternatives considered**:

- Add more Computer Science tracks now: rejected because it risks scope expansion and makes the first foundation harder to evaluate.
- Convert topics into long lessons: rejected because the MVP only needs clear introductions and next study actions.
- Add quizzes or challenges: rejected for this feature because the approved request is content refresh, not new interaction design.

## Decision 3: Keep all educational text original and beginner-friendly

**Decision**: Write original English copy using common beginner Computer Science concepts as background knowledge. Do not copy or closely paraphrase external passages.

**Rationale**: Original writing avoids copyright risk and keeps tone consistent across the application.

**Alternatives considered**:

- Use direct excerpts from online resources: rejected due to copyright and tone mismatch.
- Use highly technical textbook language: rejected because the primary audience is beginner or early-stage CS students.
- Use very simplified slogans only: rejected because the user requested realistic, richer educational content.

## Decision 4: Treat Diogenes guidance as static professor-style help

**Decision**: Keep assistant/help content scripted, bounded, and deterministic. It may sound like advice from Diogenes, but it must not imply live chat, AI behavior, personalization, accounts, or progress tracking.

**Rationale**: This satisfies the character-guidance expectation while preserving the approved no-chatbot scope.

**Alternatives considered**:

- Add a chatbot-like conversation surface: rejected because it is explicitly outside the current foundation scope.
- Remove Diogenes guidance entirely: rejected because the product identity depends on the professor-guide concept.

## Decision 5: Make accessibility guidance concrete to this product

**Decision**: Accessibility guidance must explain actual platform navigation, including skip links, landmarks/headings, keyboard movement, topic links, and visual theme support.

**Rationale**: Generic accessibility promises are weak for grading. Actionable guidance helps users and supports class evaluation.

**Alternatives considered**:

- Leave accessibility as hidden implementation only: rejected because the first specification requires a user-facing help area.
- Provide broad accessibility policy text: rejected because users need practical instructions for this exact site.
