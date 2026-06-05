# Data Model: Language Support

## Locale

**Purpose**: Identifies one supported language/region choice.

**Fields**:

- `id`: Stable locale id. Allowed values: `en`, `pt-BR`.
- `labelKey`: Message key for the visible/accessibility label.
- `flagGlyph`: Visual flag glyph for the language control.
- `isDefault`: `true` only for English.

**Validation Rules**:

- Unknown locale ids resolve to `en`.
- Locale ids are compared exactly; `pt`, `pt_BR`, and `br` are not accepted aliases in v1.
- Flag glyphs are decorative and never used as accessible names.

## Language Preference

**Purpose**: Stores the student's selected locale for the current browser.

**Fields**:

- `locale`: Supported locale id.
- `source`: `stored`, `document`, or `default`, used only by helper logic and tests.
- `cookieValue`: Server-readable browser-local value used by request-scoped message/content selection.
- `clientSnapshot`: Client-readable value used by the interactive language control.

**Relationships**:

- Selects one `Locale`.
- Drives `Message Catalog`, `Localized Structured Content View`, and `Localized Markdown Asset` selection.
- Must remain independent from visual theme, high contrast, saved paths, builder composition, and progress records.

**State Transitions**:

- `missing -> en`: When no preference exists.
- `invalid -> en`: When a stored value is unsupported.
- `en -> pt-BR`: When the student selects Portuguese (Brazil).
- `pt-BR -> en`: When the student selects English.
- `client write -> route refresh`: After a valid client write, the current route refreshes so server-rendered text and Markdown use the same locale.

## Message Catalog

**Purpose**: Contains all non-Markdown translated text for one locale, including UI text, assistive text, and structured product content.

**Fields**:

- `locale`: Supported locale id.
- `domainFiles`: Domain-split JSON files for the locale.
- `messages`: One composed nested key/value object consumed by translation APIs.
- `namespaces`: Logical groupings such as layout, navigation, preferences, home, tracks, topics, student area, accessibility, feedback, dialogs, and evidence.
- `typedSource`: English composed catalog used as the source for message-key inference.

**Validation Rules**:

- English and Portuguese (Brazil) composed catalogs must have the same key shape.
- Domain JSON files live under `src/i18n/messages/{locale}/`.
- Values should be strings unless the receiving UI genuinely needs an array/object through a structured read.
- Rich text messages may be used only where the renderer is explicitly tested.
- Message keys must not contain long-form Markdown topic prose.
- Screen-reader-only labels, accessible names, status messages, visible labels, home copy, track metadata, topic metadata, accessibility help, and evidence copy are all required catalog entries.
- Message keys should be stable and semantic. Repeated content should prefer identifiers such as track/topic slugs or camel-cased semantic ids over display order.
- Translation keys should be inferred from the English composed catalog through `next-intl` module augmentation. Extra custom type helpers are allowed only if the implementation cannot rely on the package-provided inference.

## Localized Structured Content View

**Purpose**: Provides typed application objects assembled from the selected `Message Catalog` when components or route helpers need structured non-Markdown content.

**Fields**:

- `locale`: Supported locale id.
- `diogenesProfile`: Localized professor/profile copy assembled from message keys.
- `mainNavigation`: Localized navigation labels and descriptions assembled from message keys.
- `accessibilityHelp`: Localized accessibility help sections assembled from message keys or a limited structured read.
- `learningTracks`: Localized tracks and topic metadata assembled from stable semantic message keys.
- `evidence`: Localized assignment evidence copy assembled from message keys or limited structured reads.

**Relationships**:

- Contains `Localized Track` entries.
- Reads from one selected `Message Catalog`.
- Must preserve slug relationships across locales so routes and saved paths remain stable.
- Does not contain hardcoded translated prose in TypeScript.

**Validation Rules**:

- Each locale must expose the same track slugs in the same intended order.
- Each matching track must expose the same topic slugs in the same intended order.
- Localized copy must be placeholder-free and complete for every visible content field.
- Ordinary string fields should be read with normal translation calls.
- Structured reads are allowed only when the UI needs an array/object, such as a list of principles, key ideas, evidence notes, or assembled track/topic data.

## Localized Track

**Purpose**: Represents one learning track in one locale.

**Fields**:

- `slug`: Stable route/storage slug shared across locales.
- `title`: Localized visible title.
- `summary`: Localized short summary.
- `description`: Localized longer description.
- `recommendedFor`: Localized audience guidance.
- `outcome`: Localized learning outcome.
- `topics`: Localized topic metadata for that track.

**Validation Rules**:

- Slug must match the English source slug.
- Topic count and topic slugs must match across locales.
- Localized values must not be empty or placeholder text.
- Localized values must come from the selected message catalog, not translated TypeScript constants.

## Localized Topic

**Purpose**: Represents one topic's localized metadata in one locale.

**Fields**:

- `slug`: Stable route/storage slug shared across locales.
- `trackSlug`: Stable parent track slug.
- `title`: Localized topic title.
- `summary`: Localized topic summary.
- `whyItMatters`: Localized rationale.
- `studyNext`: Localized next-step guidance.
- `keyIdeas`: Localized key idea list.
- `practicePrompt`: Localized practice prompt.
- `professorNote`: Localized Diogenes note.

**Relationships**:

- Maps to one `Localized Markdown Asset` with the same `locale` and `slug`.
- Slug remains the stable value used by routes, saved paths, progress records, and Markdown lookup.

**Validation Rules**:

- `keyIdeas` must remain at least four items.
- All localized fields must be non-empty.
- Localized title must match the first heading in the corresponding Markdown file.
- Localized metadata must come from stable semantic message keys. Index-based key paths are avoided unless no stable semantic identifier exists.

## Localized Markdown Asset

**Purpose**: Stores full learning-section prose for one topic in one locale.

**Fields**:

- `locale`: Supported locale id.
- `topicSlug`: Stable topic slug.
- `markdownFilePath`: Local file path under the selected locale folder.
- `markdownFileName`: Local file name returned by the loader for assertions and diagnostics.
- `markdownContent`: Loaded Markdown text.

**Validation Rules**:

- File path must be derived only from a validated locale and validated topic slug.
- Each published topic must have one English and one Portuguese (Brazil) Markdown asset.
- Loader tests must assert that requesting English returns the English file and requesting Portuguese (Brazil) returns the Portuguese (Brazil) file.
- Automated tests must not try to infer the human language of the Markdown prose.
- Missing Portuguese content must fail validation rather than silently falling back to English.

## Language Control

**Purpose**: Lets the student select the current language.

**Fields**:

- `currentLocale`: Selected locale id.
- `options`: English and Portuguese (Brazil) options.
- `accessibleName`: Localized name for the control.
- `optionLabels`: Localized accessible option names.
- `flagGlyphs`: Decorative flag glyphs for visual recognition.
- `selectedState`: Programmatic and visual selected state.

**Validation Rules**:

- Keyboard users can reach and operate the control.
- Assistive technology exposes purpose, available choices, and selected state.
- Selected state is not communicated by color or flag alone.
- Long Portuguese labels fit or wrap without clipping.

## Bilingual Coverage Evidence

**Purpose**: Records class-facing review evidence for bilingual support.

**Fields**:

- `reviewedRoutes`: Primary routes checked in both locales.
- `reviewedControls`: Controls checked for visible labels and accessible names.
- `reviewedTopics`: Topic slugs with both localized Markdown files reviewed.
- `keyboardNotes`: Language-control keyboard review.
- `assistiveTechNotes`: Language-control and screen-reader text review.
- `manualReviewNotes`: User-owned mobile, desktop, default, and high-contrast notes.
- `commandResults`: Test, lint, and build results.
- `openIssues`: Remaining issues and planned follow-up, if any.

**Validation Rules**:

- Evidence must cover both supported locales.
- Evidence must include topic Markdown coverage and UI/assistive text coverage separately.
- Evidence must distinguish automated coverage from user-owned manual visual review.
- Open issues must include user impact and follow-up status.
