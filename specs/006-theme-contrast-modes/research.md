# Research: Theme And Contrast Modes

## Decision: Store Base Theme And High Contrast Independently

Use separate browser-local preference values for base theme (`light` or `dark`) and high contrast (`off` or `on`). Derive the visible combination from those two values.

**Rationale**: The specification requires high contrast to be enabled or disabled for both light and dark. A single enum such as `default | high-contrast` cannot represent dark without high contrast or dark with high contrast without becoming ambiguous.

**Alternatives considered**:

- Keep the existing single `default | high-contrast` value. Rejected because it cannot represent the required four combinations.
- Store a four-value enum only. Rejected because it makes the base-theme and high-contrast controls harder to keep independent.
- Use account or server storage. Rejected because the feature must stay frontend-only and static-hosting compatible.

## Decision: Apply Root Attributes Before Hydration

Use `data-theme="light|dark"` and `data-contrast="normal|high"` on the root document element. Render the server default as light normal, then use the existing inline bootstrap pattern to apply stored browser preferences before hydration.

**Rationale**: The existing app already uses a pre-hydration root attribute script to avoid visible mismatch. Keeping that pattern prevents React/Next hydration warnings and avoids a flash where controls display one state while CSS uses another.

**Alternatives considered**:

- Apply preferences in a mount effect. Rejected because prior work showed effect-driven state synchronization causes hydration divergence and visual flicker.
- Use a theme provider dependency. Rejected because the current app already has a small local mechanism and the feature does not need provider-level behavior.
- Use CSS media queries only. Rejected because users need explicit controls and persistent independent preferences.

## Decision: Keep `useSyncExternalStore` For Theme Controls

Continue using an external-store pattern for the client controls. The snapshot should represent the resolved visual preference, and subscriptions should react to storage changes and local preference writes.

**Rationale**: The current validated pattern makes the first server render and first client render deterministic while still letting browser-backed preference state take over after hydration.

**Alternatives considered**:

- Local component state initialized from `localStorage`. Rejected because it can diverge from server markup and does not automatically synchronize multiple controls or tabs.
- Context-only state. Rejected because it adds hierarchy without solving pre-hydration application.

## Decision: Use Semantic Token Pairs

Define a compact set of semantic CSS variables for four combinations. Every interactive surface that sets a background must use a matching foreground token.

**Rationale**: The reported defect is a token pairing failure: controls can end up with white foreground on white surfaces. Pairing tokens at the theme layer prevents the same bug from being fixed one component at a time.

**Alternatives considered**:

- Patch only the visible hero buttons. Rejected because menus, tabs, dialogs, switches, disabled states, and future controls would remain fragile.
- Create per-component color values for every theme. Rejected as a large theme matrix and harder to audit.
- Rely only on opacity for disabled states. Rejected because opacity can reduce contrast below the requirement.

## Decision: Use Native Accessible Controls For Preferences

Represent base theme as a labelled binary switch that displays the current Light theme or Dark theme state with the matching icon, and keep high contrast as a labelled switch.

**Rationale**: Native or native-like controls provide predictable keyboard behavior and clear assistive-technology state. The paired switches keep independence explicit: one switch controls the light/dark base theme, and one switch controls contrast.

**Alternatives considered**:

- Keep only the high-contrast switch. Rejected because it does not expose light/dark choice.
- Use an unlabeled icon-only theme button. Rejected because the state would be harder for screen-reader and keyboard users to understand.
- Use a large settings panel or new page. Rejected because the feature must preserve routes and stay small.

## Decision: Verify With Automated And Concise Manual Evidence

Use unit tests for preference resolution and contrast-pair thresholds, Playwright for all four visual combinations and keyboard behavior, axe for accessibility regressions, and a concise evidence artifact for class presentation.

**Rationale**: Automated tests catch preference and contrast regressions, while a short evidence file satisfies the assignment requirement to show accessibility work was deliberately evaluated.

**Alternatives considered**:

- Manual screenshots only. Rejected because they are weak regression protection.
- Automated tests only. Rejected because the class project also needs presentation evidence and before/after explanation.
