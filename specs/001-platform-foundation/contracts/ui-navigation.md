# UI Contract: Platform Foundation Navigation and Interaction

## Purpose

This contract defines the public route surface, navigation behavior, and accessibility expectations for the foundation MVP. It is a UI contract, not an API contract. The project exposes no backend endpoints for this feature.

## Public Routes

| Route | Purpose | Required Content | Primary Actions |
|-------|---------|------------------|-----------------|
| `/` | Home introduction | Diogenes identity, platform purpose, foundation areas, primary next action | Open Learning Tracks, open Accessibility Help |
| `/tracks` | Learning tracks overview | Small curated track list, each track purpose, topic links | Open a topic, return Home, open Accessibility Help |
| `/tracks/[trackSlug]/[topicSlug]` | Topic content | Topic title, summary, why it matters, key ideas if available, suggested next study action | Return to Learning Tracks, open Accessibility Help |
| `/accessibility` | Accessibility help | Keyboard guidance, screen-reader structure guidance, visual theme guidance, main area explanation | Return Home, open Learning Tracks, toggle visual theme |

## Navigation Requirements

- Primary navigation must expose Home, Learning Tracks, and Accessibility Help.
- Topic pages must preserve orientation through a visible topic title and return path to Learning Tracks.
- Navigation labels must remain understandable without relying on icons alone.
- Current location must be communicated through text, structure, or accessible state; color alone is insufficient.
- Mobile navigation must make all primary destinations reachable without horizontal scrolling.

## Keyboard Contract

- A keyboard-only student can reach the skip link, primary navigation, theme control, track/topic controls, and main content.
- Focus order follows the visual and content reading order.
- No required interaction depends on hover or pointer-only behavior.
- Focus must never become trapped in navigation or theme controls.

## Screen Reader Contract

- Each route has one clear main heading.
- Primary navigation is identifiable as navigation.
- Main content is identifiable as the main region.
- Interactive controls expose meaningful accessible names.
- Icon usage is decorative or accompanied by text/accessible labels.

## Visual Theme Contract

- The application supports a default color-safe theme and a high-contrast theme.
- The theme control is reachable by keyboard and has an understandable label.
- Theme changes must not change route, remove content, or disrupt focus.
- Meaning remains available through labels, structure, text, or icons; color is never the only signal.

## Exclusions

The foundation UI contract does not include:

- Progress dashboard routes
- Assistant or chatbot interactions
- Authentication or account flows
- Community, social, map, or calendar routes
- External service calls
- Game-like mechanics
