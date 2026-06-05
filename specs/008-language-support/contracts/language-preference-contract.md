# Contract: Language Preference

## Purpose

Define how the application reads, writes, validates, and applies the selected language without changing student progress or visual preferences.

## Supported Locales

```text
en
pt-BR
```

- Default locale: `en`
- Unsupported locale values resolve to `en`
- No aliases are accepted in v1

## Preference Behavior

- The preference is browser-local.
- The selected locale is stored in a server-readable cookie so request-scoped rendering can load the correct messages and Markdown.
- The selected locale is mirrored into client-readable preference state so the interactive control can render a deterministic snapshot.
- The current language is applied to `document.documentElement.lang`.
- The current language is also exposed as `document.documentElement.dataset.language`.
- Language writes notify any subscribed controls in the current tab.
- Language changes request a refresh of the current route so server-rendered messages and Markdown content use the selected language.

## Preference Keys

```text
cookie: legado-de-diogenes-language
client snapshot: legado-de-diogenes-language
```

## Required Helper Surface

```text
isSupportedLocale(value) -> boolean
resolveLocale(value) -> "en" | "pt-BR"
readStoredLanguagePreference() -> "en" | "pt-BR" | null
readLanguageCookie() -> "en" | "pt-BR" | null
readAppliedLanguagePreference() -> "en" | "pt-BR"
getLanguagePreferenceSnapshot() -> "en" | "pt-BR"
writeLanguagePreference(locale) -> void
applyLanguagePreference(locale) -> void
subscribeToLanguagePreference(callback) -> unsubscribe
notifyLanguagePreferenceChange() -> void
```

## Independence Rules

- MUST NOT write to saved learning path records.
- MUST NOT write to topic progress.
- MUST NOT change builder composition.
- MUST NOT change base theme or high-contrast preference.
- MUST NOT infer language from saved-path data.

## Test Obligations

- Missing preference resolves to English.
- Invalid stored preference resolves to English.
- Writing Portuguese applies `lang="pt-BR"` and `data-language="pt-BR"`.
- Writing English applies `lang="en"` and `data-language="en"`.
- Language changes preserve existing theme and high-contrast values.
