# Student Area Route Contract

## Entry Routes

### Home

- Source: `/`
- Required action: `Start Learning`
- Destination: `/tracks/history`
- Expected result: student area history tab opens and anonymous student record exists.

### Learning Tracks

- Source: `/tracks`
- Required action: `Start Learning`
- Destination: `/tracks/history`
- Expected result: student area history tab opens and anonymous student record exists.

## Student Area Tabs

### Learning Path History

- Route: `/tracks/history`
- Content:
  - student area tab navigation
  - history table when history exists
  - empty state when history does not exist
  - Add New Learning Path action
- Add New Learning Path destination: `/tracks/builder`
- Accessibility:
  - selected tab state exposed to assistive technology
  - table headers identify row values
  - empty state includes a keyboard reachable action

### Learning Path Builder

- Route: `/tracks/builder`
- Content:
  - student area tab navigation
  - collapsible track/topic selection tree
  - current path under construction
  - Save, Discard Changes, Clear Learning Path, and Start/Continue learning actions
  - feedback region for success/error messages
- Accessibility:
  - tree expansion state and checkbox state exposed
  - partial track selection exposed
  - context-menu actions keyboard reachable
  - confirmation dialogs trap focus and restore focus on close

## Learning Section Routes

### Topic Learning Section

- Route shape: `/tracks/learn/{pathId}/{topicSlug}`
- Content:
  - track/topic context
  - substantial markdown-rendered topic content from the topic's required markdown file
  - markdown links to external references that add value
  - Complete Topic action near top
  - Return to Builder action
  - next-topic behavior after completion
- Accessibility:
  - heading hierarchy starts with topic title
  - markdown output preserves semantic lists, links, and tables
  - Complete Topic action is keyboard reachable before long content

### Path Completion

- Route shape: `/tracks/learn/{pathId}/complete`
- Content:
  - friendly completion message
  - action back to `/tracks/history`
- Accessibility:
  - message is announced by normal page heading
  - return action is keyboard reachable

## Error States

- Missing anonymous student record: create record and continue.
- Missing saved path for learning route: show friendly message and link to `/tracks/builder`.
- Missing topic content: show friendly message and link to `/tracks/builder`.
- Redis unavailable: show friendly message and avoid destructive UI changes.

## Related Contracts

- See `student-learning-content.md` for required markdown files and external-link rules.
