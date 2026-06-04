# Data Model: Theme And Contrast Modes

## BaseTheme

Represents the student's chosen visual foundation.

**Fields**:

- `id`: `light | dark`
- `label`: visible label for controls
- `isDefault`: true only for `light`

**Validation rules**:

- Unknown or missing values resolve to `light`.
- Changing this value must not change high contrast.

## HighContrastPreference

Represents whether the contrast modifier is enabled.

**Fields**:

- `enabled`: boolean
- `label`: "High contrast"

**Validation rules**:

- Missing values resolve to `false`.
- Unknown values resolve to `false`.
- Changing this value must not change the base theme.

## VisualPreference

The resolved browser-local preference used by controls and root attributes.

**Fields**:

- `baseTheme`: `BaseTheme`
- `highContrast`: `HighContrastPreference`
- `combination`: one of `light-normal`, `light-high`, `dark-normal`, `dark-high`
- `source`: `stored | applied | default | legacy`

**Relationships**:

- Combines exactly one `BaseTheme` with exactly one `HighContrastPreference`.
- Determines one `ThemeTokenSet`.

**State transitions**:

- `setBaseTheme(light | dark)`: updates `baseTheme`, preserves `highContrast`.
- `setHighContrast(true | false)`: updates `highContrast`, preserves `baseTheme`.
- `resetInvalidPreference`: resolves invalid stored values to `light-normal`.
- `legacyThemeFallback`: maps the old `default` value to `light-normal` and old `high-contrast` value to `light-high`.

## AppliedThemeAttributes

The root document attributes consumed by CSS before and after hydration.

**Fields**:

- `data-theme`: `light | dark`
- `data-contrast`: `normal | high`

**Validation rules**:

- Attributes must always represent a valid `VisualPreference`.
- Server-rendered defaults must be readable without JavaScript.
- Pre-hydration script must apply stored values before interactive controls render.

## ThemeTokenSet

The semantic token values for one visual combination.

**Fields**:

- `background` / `foreground`
- `surface` / `surfaceForeground`
- `surfaceStrong` / `surfaceStrongForeground`
- `action` / `actionForeground`
- `actionHover` / `actionHoverForeground`
- `control` / `controlForeground`
- `controlSelected` / `controlSelectedForeground`
- `disabled` / `disabledForeground`
- `border`
- `focus`
- `link`
- `accent`, `warning`, `success`, `danger`

**Validation rules**:

- Normal text pairs must meet at least 4.5:1 contrast.
- Large text, essential icons, focus indicators, boundaries, and non-text controls must meet at least 3:1 contrast.
- No token pair may produce white-on-white, black-on-black, or equivalent unreadable pairing.

## InteractiveElementState

Represents the visual state that a reusable control must support.

**Fields**:

- `elementType`: button, link, switch, menu item, tab, dialog action, form control, card action, icon-only control, navigation item
- `state`: default, hover, focus, pressed, selected, current, disabled, loading
- `backgroundToken`
- `foregroundToken`
- `nonColorCue`: underline, border, label, icon, selected state, disabled text, or equivalent cue

**Validation rules**:

- Each state with text or icons must declare a readable foreground/background pairing.
- Disabled state must remain readable and not depend on opacity alone.
- Selected/current/progress/status states must not rely on color alone.

## AccessibilityEvidence

Concise class-facing evidence produced during implementation.

**Fields**:

- `visualCombination`: one of the four combinations
- `routesChecked`: route list
- `surfacesChecked`: navigation, hero actions, buttons, links, menus, tabs, dialogs, switches, disabled actions, selected actions, focus rings, icon-only controls
- `keyboardResult`
- `assistiveLabelResult`
- `contrastResult`
- `whiteOnWhiteResult`
- `notes`

**Validation rules**:

- Evidence must cover all four visual combinations.
- Evidence must explicitly mention the original white-on-white defect.
- Remaining issues must include impact and follow-up before presentation.
