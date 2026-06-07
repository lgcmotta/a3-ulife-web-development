# Research: Topic Navigation

## Decision: Use shadcn Pagination For Previous/Next Controls

Use a local shadcn-style pagination primitive for the previous-topic and next-topic controls inside `LearningTopicActions`.

**Rationale**: The requested control is exactly a previous/next navigation pair. The official shadcn pagination docs describe pagination as next and previous links, show the `Pagination`, `PaginationContent`, `PaginationItem`, `PaginationPrevious`, and `PaginationNext` composition, and include an icons-only example with only previous and next controls. This keeps the UI familiar while avoiding a custom arrow-button component.

**Alternatives considered**:

- Hand-built buttons with lucide arrows: rejected because the user specifically requested the shadcn pagination component.
- Full page-number pagination: rejected because the spec only requires neighboring topic movement and explicitly excludes free-form topic jumping.

## Decision: Adapt PaginationLink To Next.js Link

Add `src/ui/components/pagination.tsx` and type its link props from `next/link`.

**Rationale**: The official shadcn docs state that `PaginationLink` renders an anchor by default and show changing it to Next.js `Link` for Next.js apps. This repo already uses Next.js route links for student-area navigation, and previous/next topic browsing should remain normal link navigation rather than a client-side click handler.

**Alternatives considered**:

- Use raw anchors: rejected because local navigation convention is Next.js `Link` with `prefetch={false}` where appropriate.
- Install or generate the component during implementation: rejected for planning because the local UI library already contains hand-maintained shadcn-style primitives and the task should stay narrow.

## Decision: Translate Previous And Next Through Message Catalogs

Pass translated `text` and accessible labels into `PaginationPrevious` and `PaginationNext` from `studentArea.learning`.

**Rationale**: The docs show a `text` prop for `PaginationPrevious` and `PaginationNext`. The active app uses `next-intl`, and the user explicitly required the Previous and Next text to be translatable. Using `t(...)` in `LearningTopicActions` keeps labels aligned with the existing `Return to Builder` and `Complete Topic` labels.

**Alternatives considered**:

- Keep default "Previous" and "Next" inside the UI primitive: rejected because it would bypass localization.
- Store labels in route data: rejected because these are UI control labels, not saved path data.

## Decision: Derive Topic Neighbors From Saved Path Order

Compute previous and next topics by flattening the current saved path order and locating the current topic slug.

**Rationale**: The existing saved path order already controls Start, Resume, and Complete Topic movement. Deriving neighbors from the same order preserves the student's chosen sequence while keeping browsing read-only.

**Alternatives considered**:

- Use global catalog order: rejected because saved paths can include selected subsets and edited order.
- Persist a current browsing cursor: rejected because leaving and returning must still open the last uncompleted topic, not the last browsed topic.

## Decision: Keep Completion Disablement Simple

Disable the existing Complete Topic button when the current saved path topic is already completed.

**Rationale**: The user asked not to over-engineer this behavior. The topic page already has the saved path and can know whether the displayed topic is complete. Passing a boolean to the button preserves the existing explicit completion action and avoids new persistence rules.

**Alternatives considered**:

- Add a new server action response for already completed topics: rejected as unnecessary for the requested UI behavior.
- Hide Complete Topic on completed topics: rejected because the spec says the button should be disabled, not removed.
