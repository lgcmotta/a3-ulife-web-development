# Responsive Layouts

A responsive layout keeps content usable when the screen changes. It is not only a visual decoration task, and it is not only about phones. A class project may be viewed on a laptop, a lab monitor, a projector, or a small phone during the commute home. The same learning content should remain readable, navigable, and understandable across those situations. If the page technically contains all content but requires sideways scrolling or hides the main action, the design has failed an important usability test.

Responsive thinking begins with content priority. Ask what the student needs first. On a learning tracks page, the student needs the page heading, a short explanation, and the available tracks. On a topic page, the student needs the topic title, context, and a way to continue or return. A wide screen may show track cards in columns because there is room to compare them side by side. A narrow screen may stack the same cards in a single column so each card can be read without compression.

| Layout decision | Wide screen option | Narrow screen option |
| --- | --- | --- |
| Track overview | Three columns for comparison | One column in reading order |
| Navigation | Horizontal links | Wrapped links or compact grouping |
| Builder interface | Sidebar plus current path | Stacked tree and current path |
| Long text | Comfortable max line length | Full width with generous spacing |

Flexible units help. A fixed width of 1200 pixels may look fine on one laptop and break on a phone. A max width with flexible padding is usually safer. Grid and flex layouts can let content wrap instead of overflow. The [MDN responsive design guide](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design) explains the main ideas, and the [MDN media queries guide](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries) shows how styles can respond to screen conditions.

However, media queries are not the whole solution. Many responsive problems are caused by content that cannot shrink or wrap. Long labels, wide tables, fixed cards, and images without constraints can all create horizontal scrolling. For educational pages, readable text is especially important. Lines that are too long become tiring; lines that are too short become choppy. Use a comfortable maximum width for long study sections and let shorter interface panels use denser layouts.

Responsive layout also affects keyboard users. If the visual order changes across screen sizes, the keyboard focus order should still make sense. A student should not tab through a hidden or distant section before reaching the visible primary action. When stacking a sidebar above main content on mobile, consider whether the student should encounter available tracks first or the current path first. The right answer depends on the workflow, but it should be intentional.

Images need care too. A hero image can support identity, but it should not push the main purpose below the first screen on every device. Informative images need meaningful alternative text. Decorative images can be hidden from assistive technology. If an image is cropped, make sure it still communicates the right subject. A picture of Diogenes should show the professor clearly, not become an abstract background that competes with text.

Testing responsive design should be practical. Resize the browser. Use a mobile viewport. Zoom the page. Try a long track title or a translated label. Look for overlapping text, clipped buttons, tiny tap targets, and horizontal scroll. Then test the actual workflow: can the student enter the page, find the main action, read the next section, and move on?

## Practice routine

Sketch the same page twice: once as a wide desktop view and once as a narrow mobile view. Number the content blocks in the order a student should encounter them. If the mobile order feels confusing, revise the information architecture before polishing styles.

## What to do next

Open the learning tracks page at a narrow viewport. Check whether every track title, summary, and topic link remains readable without sideways scrolling. Then repeat the same check on a topic page with long markdown content.
