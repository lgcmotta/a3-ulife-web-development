# Visual Preference Contract

## Scope

Defines how the frontend stores, resolves, applies, and exposes visual mode preferences. This contract is browser-local only and must not introduce backend storage or external services.

## Stored Values

| Preference | Valid Values | Default | Persistence |
|------------|--------------|---------|-------------|
| Base theme | `light`, `dark` | `light` | Browser local storage |
| High contrast | `false`, `true` | `false` | Browser local storage |

The existing legacy visual theme key may be read as a compatibility fallback:

| Legacy Value | Resolved Base Theme | Resolved High Contrast |
|--------------|---------------------|------------------------|
| missing | `light` | `false` |
| `default` | `light` | `false` |
| `high-contrast` | `light` | `true` |
| invalid | `light` | `false` |

## Applied Root Attributes

The root document element must expose:

```text
data-theme="light" | "dark"
data-contrast="normal" | "high"
```

Valid combinations:

| Combination | Attributes |
|-------------|------------|
| Light | `data-theme="light" data-contrast="normal"` |
| Light high contrast | `data-theme="light" data-contrast="high"` |
| Dark | `data-theme="dark" data-contrast="normal"` |
| Dark high contrast | `data-theme="dark" data-contrast="high"` |

## Resolution Rules

- Stored valid preferences take precedence over applied attributes.
- Applied attributes take precedence over defaults when stored preferences are missing.
- Invalid stored values resolve to the default readable mode.
- Changing base theme preserves high contrast.
- Changing high contrast preserves base theme.
- Applying a preference must not navigate, reload, or reset the current learning task.

## Hydration Rules

- Server markup must render a readable default light normal state.
- The pre-hydration script must resolve browser-local preference and set both root attributes before React hydrates.
- Client controls must use a hydration-safe external-store snapshot rather than mount-effect synchronization.
- The server snapshot used by client controls must match the server-rendered default.

## Control Accessibility

- Base theme control exposes a group label and selected Light/Dark state.
- High-contrast control exposes an on/off state and the label "High contrast".
- Controls are reachable by keyboard in the header.
- Focus remains visible and remains on the operated control after a preference change.
- Preference state must be understandable from text/state, not color alone.

## Acceptance Checks

- Reload after setting each of the four visual combinations and verify root attributes match the selected combination.
- Toggle high contrast on and off without changing the selected base theme.
- Switch light/dark without changing the high-contrast state.
- Confirm no hydration mismatch warning is produced by the visual preference controls.
- Confirm invalid stored values fall back to the readable default.
