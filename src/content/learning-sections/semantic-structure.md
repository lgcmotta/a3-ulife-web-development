# Semantic Structure

Semantic structure means using page elements for their meaning, not only for their appearance. A heading should introduce a section. Navigation should contain links for moving through the site. A button should perform an action. A label should explain a control. When structure and purpose match, the page becomes easier for everyone to understand. It also becomes much more usable for people who rely on screen readers, keyboard navigation, or browser features that summarize page regions.

Beginners sometimes build a page by choosing visual boxes first: a large text block here, a row of links there, a colored area at the bottom. Visual planning is useful, but it should be paired with an outline. If the outline is confusing, the page will likely be confusing too. A strong page outline begins with one main heading, then uses smaller headings to divide content. The headings should make sense if read as a list. For example, a topic page might have "Problem-Solving Basics" as the main heading, then "Why this matters", "Practice routine", and "What to do next" as section headings.

| Page part | Semantic purpose | Helpful question |
| --- | --- | --- |
| Header | Identifies the site or section | Can a student tell where they are? |
| Navigation | Lists movement options | Are link destinations clear? |
| Main content | Holds the unique page content | Does the main heading name the page? |
| Section headings | Break content into scan points | Can the outline explain the content? |
| Labels | Name controls and inputs | Would the control make sense without layout? |

Screen reader users often navigate by headings, landmarks, and links. If every heading is chosen only because of font size, the heading list may skip levels or repeat vague phrases. If links say only "click here", a links list becomes useless. The [W3C Web Accessibility Initiative page on page structure](https://www.w3.org/WAI/tutorials/page-structure/) explains how headings and regions support navigation. The [MDN guide to HTML semantics](https://developer.mozilla.org/en-US/docs/Glossary/Semantics) gives a concise overview of why element meaning matters.

Semantic structure also helps sighted users. Clear headings support scanning. Meaningful links reduce hesitation. A visible current page state helps students know where they are. A form with labels is easier to review before submitting. Accessibility and usability are not separate concerns here; they are two views of the same design quality.

A practical way to test structure is to remove most visual decoration from your imagination. Ask whether the page still makes sense as a plain outline. If the first heading says "Welcome" but the page is really a learning track builder, the heading is not doing enough. If three different buttons say "Continue" but lead to different outcomes, their labels need more context. If a topic card contains a heading, summary, expected outcome, and link list, that order should remain logical even on a narrow screen.

Semantic structure should not become heavy or academic. You do not need a new region for every sentence. Use structure where it helps people move, understand, or act. A small educational page might need a header, primary navigation, main content, a few sections, and clear links. That is enough. Too many landmarks or repeated headings can become noisy.

When building with components, keep the same discipline. A reusable card can still accept a real heading level. A custom button should still render a button when it performs an action. A tab should expose selected state, not just a color change. If a component hides semantic responsibility, every page that uses it inherits the problem.

## Practice routine

Choose one page from this platform and write its outline on paper. Include the main heading, section headings, navigation region, and primary action. Then ask whether a student could predict the page purpose from only that outline. If not, revise labels and headings before changing visual styling.

## What to do next

Open a topic page and inspect every link label. Replace vague labels with text that names the destination or result. Then check whether the page has one clear main heading and a logical sequence of sections.
