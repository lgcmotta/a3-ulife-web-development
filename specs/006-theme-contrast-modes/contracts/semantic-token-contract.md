# Semantic Token Contract

## Scope

Defines the theme token rules that all shared UI primitives and page-specific interactive surfaces must follow. The implementation must keep the token set small and tied to the four approved visual combinations.

## Required Combinations

```text
light + normal contrast
light + high contrast
dark + normal contrast
dark + high contrast
```

## Required Token Pairs

| Surface Purpose | Background Token | Foreground Token |
|-----------------|------------------|------------------|
| Page | `--background` | `--foreground` |
| Panel/card/dialog | `--surface` | `--surface-foreground` |
| Raised/selected neutral surface | `--surface-strong` | `--surface-strong-foreground` |
| Primary action | `--action` | `--action-foreground` |
| Primary action hover | `--action-hover` | `--action-hover-foreground` |
| Neutral control | `--control` | `--control-foreground` |
| Selected/current control | `--control-selected` | `--control-selected-foreground` |
| Disabled control | `--disabled` | `--disabled-foreground` |

Supporting tokens:

```text
--muted-foreground
--border
--focus
--link
--accent
--warning
--success
--danger
```

## Consumption Rules

- A component that sets a background and contains text or icons must also set the paired foreground.
- Buttons must not rely on inherited foreground when variant background changes.
- Disabled controls must use disabled tokens and a visible boundary; opacity alone is not sufficient.
- Selected/current states must include a non-color cue such as underline, border, selected state, text, or icon.
- Focus rings must use `--focus` and remain visible against adjacent colors in all four combinations.
- Menus, tabs, dialogs, switches, and icon-only controls must consume these tokens instead of unrelated generated color names.
- Page-specific hard-coded foreground/background colors are allowed only where they are intentionally paired and verified, such as text over imagery.

## Contrast Requirements

- Normal-size text: at least 4.5:1 contrast against its immediate background.
- Large text, essential icons, focus indicators, form boundaries, and interactive control boundaries: at least 3:1 contrast against adjacent colors.
- White-on-white, black-on-black, and equivalent unreadable pairings fail even if limited to one state.

## Required Component Coverage

| Surface | States To Check |
|---------|-----------------|
| Buttons | default, hover, focus, pressed, disabled, loading |
| Links/navigation | default, hover, focus, current |
| Switches | on, off, focus, disabled if present |
| Menus | content, item focus, checked/radio indicator, disabled, destructive |
| Tabs | inactive, active, hover, focus, disabled if present |
| Dialogs | panel, overlay, close button, description, actions |
| Icon-only controls | default, hover, focus, disabled if present |
| Student-area controls | save/start/clear/discard, selected topics, status labels, menus |

## Acceptance Checks

- Automated contrast-pair test validates declared token pairs for all four combinations.
- Playwright checks representative pages and primary interactive states in all four combinations.
- The reported high-contrast white-background/white-text button failure is reproduced before the fix when possible and marked fixed after the token update.
