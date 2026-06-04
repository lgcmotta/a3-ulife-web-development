# Phase 0 Research: Personalized Student Area

## Decision 1: Use Redis for student state

**Decision**: Store anonymous student records, current path drafts, saved active paths, progress states, and history entries in Redis.

**Rationale**: The feature requires server-managed persistence and the user explicitly provided the Redis service shape. Redis is simple for one-student-per-browser key/value records and fits the narrow class-project scope.

**Alternatives considered**:

- Browser-local storage: rejected because the updated spec says student area and learning section data are platform-managed persistent records.
- Static files: rejected because completion and builder state change per student.
- Relational database: rejected for now because the data model is small, hierarchical, and key/value friendly.

## Decision 2: Use a server-created anonymous student record

**Decision**: On first student-area access, create a 7-character student ID and preserve it for subsequent requests from the same browser. No identity setup, login, authentication, or authorization is added.

**Rationale**: This satisfies the spec while keeping the product simple. The ID identifies browser state for learning data only; it is not a security boundary.

**Alternatives considered**:

- Accounts or login: rejected because explicitly out of scope.
- Per-session-only ID: rejected because the student must return to saved builder data and history.
- Shared global state: rejected because each browser visitor needs separate learning data.

## Decision 3: Use Sqids for public 7-character pseudo-hash IDs

**Decision**: Use `sqids` with a minimum length of 7 for public-looking IDs derived from monotonically allocated integers.

**Rationale**: `sqids` generates YouTube-like IDs from numbers, decodes them back to numbers, has MIT license metadata, and currently reports zero runtime dependencies via package metadata. `hashids` also matches the requirement and Snyk reports no known direct vulnerabilities for version 2.3.0, but Snyk also marks maintenance inactive. Sqids is the better fit for new code, with the caveat that these IDs are obfuscation only, not security.

**Alternatives considered**:

- `hashids`: rejected because it is inactive despite no known direct vulnerabilities in Snyk.
- Random UUIDs: rejected because the user asked for reversible pseudo-hash IDs similar to Hashids.
- Plain integers: rejected because the user requested public IDs that appear random.

## Decision 4: Keep all student data keys scoped by student ID

**Decision**: Every Redis key containing student data includes the anonymous student ID, for example `student:{studentId}:path:draft`.

**Rationale**: This prevents accidental shared state and makes cleanup/debugging understandable.

**Alternatives considered**:

- One global path key: rejected because it mixes students.
- Hash fields without student key prefix: rejected because it weakens traceability and violates the user rule.

## Decision 5: Represent builder edits as a Redis-backed draft separate from saved path

**Decision**: Keep a draft path and a saved active path. Save copies draft to active/history; discard replaces draft with saved; clear removes saved path, draft, and progress after confirmation.

**Rationale**: The feature distinguishes unsaved changes from saved learning progress and disables Continue Learning while draft changes are pending.

**Alternatives considered**:

- Save every checkbox change directly as active path: rejected because discard changes would have no reliable last-saved state.
- Keep draft only in client memory: rejected because the user plan says builder data is server-handled and Redis-backed.

## Decision 6: Use server components with interactive client islands

**Decision**: Server-render student area routes and learning sections, then use focused client components for tree selection, context menus, reorder controls, toasts, and dialogs.

**Rationale**: Server components fit Redis-backed data loading and markdown rendering, while client interactivity is required for builder operations and immediate feedback.

**Alternatives considered**:

- Fully client-rendered builder with API polling: rejected because the user plan calls for server-side loading and the app already uses app-router pages.
- Static generation for student area: rejected because student records and progress are per visitor.

## Decision 7: Store learning section content as local markdown

**Decision**: Add one markdown file per topic slug and render it in the corresponding learning section. Use `react-markdown` plus `remark-gfm` for basic HTML output including links, lists, and tables; do not render raw HTML from markdown. Each file must contain original AI-assisted educational content, at least 600 words, a complete explanation of the topic, and markdown links to external sources that add study value.

**Rationale**: Markdown keeps educational content fast to edit and review. Rendering without raw HTML keeps content safer and enough for assignment needs. Generative AI can draft realistic beginner-friendly explanations quickly, while implementation tasks must review and ground those drafts against the existing topic summaries and reputable external references without copying source text.

**Alternatives considered**:

- Long strings in TypeScript modules: rejected because extensive topic content would be hard to maintain.
- Remote CMS: rejected as too much scope.
- Raw HTML files: rejected because markdown is easier to author and safer to constrain.
- Link-only resource pages: rejected because the spec requires substantial self-contained learning sections.

## Decision 7A: Use curated external references inside markdown content

**Decision**: Each topic markdown file must include at least two relevant external markdown links. Prefer stable, reputable references such as MDN for web topics, W3C/WAI for accessibility topics, Stack Overflow help pages for asking questions, and university/open educational resources for study skills and programming fundamentals.

**Rationale**: Links add value for deeper study while keeping the platform content self-contained. External links are references, not required reading, and content must remain understandable if the student ignores them.

**Alternatives considered**:

- No external links: rejected because the user requested value-added external sources.
- Copying passages from external sources: rejected due to copyright and inconsistent tone.
- Crowding each page with many links: rejected because beginner students need focused guidance, not a resource dump.

## Decision 8: Use shadcn/Radix-style primitives for complex controls

**Decision**: Use shadcn-compatible primitives for tabs, accordion/tree presentation, checkbox, context menu, dialog, table, and toast feedback.

**Rationale**: These controls support accessibility patterns better than hand-rolled widgets, and the project already uses shadcn-style UI primitives.

**Alternatives considered**:

- Build all controls from scratch: rejected because keyboard and screen reader behavior would be higher risk.
- Drag-and-drop only reorder: rejected because the spec requires keyboard-accessible reordering and context-menu actions.

## Decision 9: Keep Redis local service in Docker Compose

**Decision**: Add the provided Redis Compose service with a named volume for development.

**Rationale**: The user provided the exact service shape and it is sufficient for local development and class demonstration.

**Alternatives considered**:

- In-memory fake Redis only: rejected because the feature needs persistence behavior during development.
- Managed cloud Redis now: rejected because it expands deployment planning before implementation needs it.
