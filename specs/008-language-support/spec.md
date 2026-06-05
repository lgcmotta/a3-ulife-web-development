# Feature Specification: Language Support

**Feature Branch**: `008-language-support`

**Created**: 2026-06-05

**Status**: Draft

**Input**: User description: "We need to support two languages in our application: English (default) and Portuguese (Brazil). To achieve that we need a way to provide all text that is displayed to the user or read by screen readers in both languages. The topic content which is written in markdown should have a markdown version for english and one markdown version for portuguese, we're not going to use the same translate map for the UI and screen readers that we use for the content of each topic that comes from the Markdown. Just for reference, the screen reader content and the labels will use some sort of i18n package, and the Markdown english files will be translated and copied to a file that is written in Portuguese, in runtime, we should check the current selected language to choose which markdown to serve. The language should follow the same visual pattern as the theme switch and the high contrast switch, but for the language switch the icons should be the flag for each country (USA for english) and BRA for Portuguese"

## Constitution Alignment *(mandatory)*

- **Scope control**: This feature belongs in the Diogenes educational platform because language accessibility improves the existing learning experience for English-speaking and Brazilian Portuguese-speaking students. It extends existing public learning, topic, progress, help, and accessibility surfaces without adding a new product area, audience, authentication model, external service, or learning domain.
- **Simplicity**: The smallest useful version supports two manually selectable languages: English as the default and Portuguese (Brazil) as the alternate language. Out of scope: additional languages, automatic machine translation, browser-language negotiation, cross-device language synchronization, new content domains, and new primary pages beyond any minimal evidence artifacts required for the assignment.
- **Usability/accessibility**: Students must be able to understand visible text, screen-reader-only text, control labels, status messages, and topic study content in their selected language. The language control must be keyboard-operable, screen-reader-friendly, visually consistent with the existing preference controls, and not rely on flag imagery alone.
- **Assignment evidence**: Planning and delivery should include bilingual copy coverage evidence, topic content translation coverage, keyboard and assistive-technology review notes for the language control, and representative screenshots or review notes for English and Portuguese (Brazil) across the primary learning surfaces.
- **Architecture boundaries**: This feature changes language preference behavior, interface copy, accessibility copy, and localized learning content selection. It must not introduce hidden progress changes, storage mutation on read, backend-only language decisions, external translation services, or unrelated student-state behavior.
- **Testing independence**: English and Portuguese scenarios can be checked independently by explicitly selecting the language at the start of each review. Tests and reviews must not depend on a previous language preference, previous visual preference, or shared mutable learning-progress state.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Choose Interface Language (Priority: P1)

A student selects English or Portuguese (Brazil) and sees the application interface, navigation, controls, visible labels, help entries, status messages, and screen-reader-only text in the selected language.

**Why this priority**: The feature is not useful if the application shell and accessibility text remain in the wrong language.

**Independent Test**: Start from a clean preference state, select Portuguese (Brazil), then review the main product areas with visual inspection and assistive-technology inspection. Repeat by selecting English. The test passes only if visible and assistive text follows the selected language in the checked areas.

**Acceptance Scenarios**:

1. **Given** a student has not selected a language before, **When** they open the application, **Then** English is used as the default language.
2. **Given** a student opens the language control, **When** they choose Portuguese (Brazil), **Then** visible interface text, screen-reader-only text, accessible labels, and status messages use Portuguese (Brazil) on the current page.
3. **Given** Portuguese (Brazil) is selected, **When** the student chooses English, **Then** visible interface text, screen-reader-only text, accessible labels, and status messages return to English on the current page.
4. **Given** a student navigates between existing pages or reloads the site, **When** the page is shown again, **Then** the selected language remains consistent for that student.
5. **Given** the student changes language, **When** the change is applied, **Then** the current page context, selected visual theme, high-contrast setting, and learning progress are preserved.

---

### User Story 2 - Read Topic Content In Selected Language (Priority: P2)

A student studying a topic receives the long-form topic content in the selected language, with English and Portuguese (Brazil) topic versions maintained as separate localized learning content.

**Why this priority**: Topic pages are the core learning experience. Localizing only labels would leave the most important content unavailable to Portuguese-speaking students.

**Independent Test**: Select English and open representative topics, then select Portuguese (Brazil) and open the same topics. The test passes only if each topic displays the complete matching-language study content and does not mix unrelated interface copy into the topic prose.

**Acceptance Scenarios**:

1. **Given** English is selected, **When** the student opens a topic detail or study page, **Then** the topic title, topic body, examples, headings, and learning prompts are shown in English.
2. **Given** Portuguese (Brazil) is selected, **When** the student opens the same topic detail or study page, **Then** the topic title, topic body, examples, headings, and learning prompts are shown in Portuguese (Brazil).
3. **Given** the student switches language while viewing a topic, **When** the content refreshes, **Then** the same topic remains selected and the topic content changes to the matching language.
4. **Given** topic content is localized, **When** reviewers inspect the content model for a topic, **Then** the topic's long-form learning content is represented separately from short interface labels and screen-reader messages.

---

### User Story 3 - Use A Familiar Language Control (Priority: P3)

A student can find and operate a language switch that visually matches the existing theme and high-contrast preference controls while clearly showing English and Portuguese (Brazil) choices.

**Why this priority**: The language control should feel like part of the existing preference system and must be understandable for mouse, keyboard, and screen-reader users.

**Independent Test**: Review the language control in the same locations and visual modes as the existing preference controls. Operate it using mouse, keyboard, and assistive technology, then verify that language changes are understandable without reading extra instructions.

**Acceptance Scenarios**:

1. **Given** the student can access the existing visual preference controls, **When** they look for language selection, **Then** the language control follows the same visual pattern and placement family as the theme and high-contrast controls.
2. **Given** the language control is visible, **When** it presents English, **Then** the English option includes a United States flag icon and an accessible language name.
3. **Given** the language control is visible, **When** it presents Portuguese (Brazil), **Then** the Portuguese option includes a Brazilian flag icon and an accessible language name.
4. **Given** the student uses only a keyboard, **When** they navigate to and operate the language control, **Then** focus order is predictable and every focused choice has a visible focus indicator.
5. **Given** the student reviews the control with assistive technology, **When** each language option receives focus, **Then** the control exposes the option name, the current selected language, and the purpose of the control.

---

### User Story 4 - Review Bilingual Evidence For Presentation (Priority: P4)

The project team can show concise evidence that bilingual interface text, accessibility text, and topic content were intentionally covered before class presentation.

**Why this priority**: The assignment values usability, accessibility, and presentation evidence. Bilingual support needs review artifacts, not only code changes.

**Independent Test**: Review the feature evidence after delivery and confirm it covers interface copy, assistive text, topic content, the language control, and representative primary pages in both supported languages.

**Acceptance Scenarios**:

1. **Given** the feature is ready for review, **When** the team reviews bilingual coverage evidence, **Then** it identifies which primary pages and user flows were checked in English and Portuguese (Brazil).
2. **Given** the feature is ready for review, **When** the team reviews accessibility evidence, **Then** it includes keyboard and assistive-technology checks for the language control.
3. **Given** localized topic content is ready, **When** the team reviews content coverage evidence, **Then** it identifies which topics have complete English and Portuguese (Brazil) versions.
4. **Given** any translation or language-control issue remains, **When** the team reviews evidence, **Then** the issue is documented with impact and planned follow-up before presentation.

### Edge Cases

- The stored language preference is unavailable, invalid, or unsupported; the application must fall back to English without breaking the page.
- A Portuguese (Brazil) topic version is missing or incomplete; the application must not silently present a mixed-language learning page as complete.
- A visible label is translated but the screen-reader-only name or status message remains in the previous language; review must catch this as incomplete localization.
- A student changes language while using dark theme, light theme, high contrast, or high-contrast dark mode; the visual preference must remain unchanged.
- A student changes language while viewing a saved learning path, topic detail, progress surface, help entry, or accessibility help; the current task context must remain intact.
- Flag icons fail to load or are not perceivable; language options must still be identifiable by accessible language names.
- Translated labels are longer than English labels; controls must remain readable without horizontal overflow or clipped text.
- Status, warning, success, progress, selected, and current-page messages must not mix English and Portuguese (Brazil) after a language change.
- Existing English-only content or copy discovered during implementation must be classified as either in scope for translation or explicitly documented as out of scope before release.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: The system MUST support English and Portuguese (Brazil) as the only languages for this feature release.
- **FR-002**: English MUST be the default language when the student has not selected a language or when a stored language preference is unavailable, invalid, or unsupported.
- **FR-003**: Students MUST be able to select English or Portuguese (Brazil) through a language control available with the existing global preference controls.
- **FR-004**: The language control MUST follow the same visual pattern and placement family as the existing theme and high-contrast controls.
- **FR-005**: The English option MUST include a United States flag icon and an accessible language name.
- **FR-006**: The Portuguese (Brazil) option MUST include a Brazilian flag icon and an accessible language name.
- **FR-007**: The language control MUST NOT rely on flag icons alone to communicate language choices or selected state.
- **FR-008**: The selected language MUST remain consistent as the student navigates between existing pages and reloads the site.
- **FR-009**: Changing language MUST NOT reset the selected base theme, high-contrast preference, current page context, saved learning path, builder composition, or learning progress.
- **FR-010**: All user-visible interface text in existing approved product areas MUST be available in English and Portuguese (Brazil).
- **FR-011**: All screen-reader-only text, accessible control names, status messages, and assistive descriptions in existing approved product areas MUST be available in English and Portuguese (Brazil).
- **FR-012**: Interface text and assistive text MUST use the selected language on initial page view, after language changes, after navigation, and after reload.
- **FR-013**: Each published topic MUST have a complete English topic content version and a complete Portuguese (Brazil) topic content version before the feature is considered complete.
- **FR-014**: Topic title, topic body, examples, headings, prompts, and related long-form learning content MUST be selected according to the student's current language.
- **FR-015**: Topic long-form learning content MUST be maintained separately from short interface labels, control names, and screen-reader messages.
- **FR-016**: The system MUST avoid silently presenting mixed-language or incomplete topic content as a complete localized topic.
- **FR-017**: The language control MUST be reachable and operable with keyboard-only navigation.
- **FR-018**: The language control MUST expose its purpose, available choices, and current selected language to assistive technology.
- **FR-019**: Language changes MUST be understandable without relying on color alone.
- **FR-020**: Translated labels and content MUST remain readable on small screens and large screens without clipped text or horizontal page overflow.
- **FR-021**: The feature MUST include evidence that primary pages, primary controls, assistive text, and representative topics were reviewed in both supported languages.
- **FR-022**: This feature MUST stay within bilingual language support and MUST NOT add additional languages, authentication, external translation services, real AI behavior, new learning domains, or unrelated product areas.

### Key Entities *(include if feature involves data)*

- **Language Preference**: The student's selected language for the application, either English or Portuguese (Brazil), with English used as the fallback default.
- **Localized Interface Text**: Short user-facing copy such as navigation labels, button labels, form labels, help text, status text, and feedback messages.
- **Localized Assistive Text**: Text intended for screen readers or other assistive technology, including accessible names, hidden descriptions, state announcements, and status messages.
- **Localized Topic Content**: Full learning content for a specific topic in one supported language, including title, body, headings, examples, prompts, and study guidance.
- **Language Control**: The user-facing preference control that presents English and Portuguese (Brazil) choices with flag icons, accessible names, selected state, and keyboard support.
- **Bilingual Coverage Evidence**: Review notes, screenshots, content coverage records, or equivalent artifacts showing that interface text, assistive text, and topic content were checked in both languages.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A student can switch from English to Portuguese (Brazil), and back to English, in under 30 seconds without leaving the current page.
- **SC-002**: 100% of reviewed user-visible interface text in the primary product areas appears in the selected language.
- **SC-003**: 100% of reviewed screen-reader-only text, accessible control names, status messages, and assistive descriptions appear in the selected language.
- **SC-004**: 100% of published topics included in the feature release have complete English and Portuguese (Brazil) content versions before release.
- **SC-005**: 100% of reviewed topic pages show topic title, body, headings, examples, and prompts in the selected language with no silent mixed-language sections.
- **SC-006**: A keyboard-only reviewer can reach and operate the language control in 100% of checked visual modes and viewport sizes.
- **SC-007**: Assistive-technology review confirms the language control exposes its purpose, available choices, and current selected language in 100% of checked cases.
- **SC-008**: At least 3 of 3 usability reviewers can identify the current language and switch to the other supported language without reading separate instructions.
- **SC-009**: In 100% of checked flows, switching language preserves the current page context, selected base theme, high-contrast setting, saved learning path, and learning progress.
- **SC-010**: Bilingual presentation evidence covers primary pages, the language control, representative topic content, visible interface copy, and assistive text in both supported languages before the feature is considered ready for implementation completion.

## Assumptions

- Portuguese means Portuguese (Brazil), not European Portuguese or a mixed Portuguese variant.
- Students choose their language manually; automatic browser-language detection is out of scope for the first release.
- The feature applies to existing approved product areas available at planning time: home or introduction, learning tracks, topic detail or study content, progress or feedback surfaces, Diogenes help, accessibility help, global navigation, and approved student-area surfaces.
- The current visual preference controls provide the pattern for language control placement and styling.
- Language preference can remain a student-local preference; accounts, cross-device synchronization, and server-side user profiles are not required for this feature.
- Portuguese topic content should preserve the same learning intent, structure, and level of detail as the English version, even when wording differs naturally by language.
- Flag icons are supplementary visual cues; accessible names and text labels remain the authoritative language identifiers.
