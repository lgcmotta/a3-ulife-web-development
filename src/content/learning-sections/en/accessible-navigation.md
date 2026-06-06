# Accessible Navigation

Navigation is the student's map through a web application. If the map only works with a mouse, only communicates with color, or gives links vague names, many students will hesitate or get lost. Accessible navigation means that links, buttons, focus order, current location, and feedback can be understood by keyboard users, screen reader users, low-vision users, and students who are simply tired or new to the material.

Keyboard access is the first practical test. A student should be able to press Tab and move through interactive elements in a logical order. Every focused item should show a visible focus indicator. The student should be able to activate links and buttons using the keyboard. If a menu, tab, dialog, or context menu exists, it should not trap the student unexpectedly, and it should restore focus when closed. The [W3C WAI keyboard compatibility guidance](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html) explains why keyboard operation is a core accessibility requirement.

Link text matters. A link called "Read more" may be understandable inside a card, but it becomes unclear when read out of context. "Open Problem-Solving Basics" is stronger because it names the destination. Buttons should name the action: "Save", "Discard Changes", "Complete Topic", or "Return to Builder". When two controls do different things, they should not have identical labels unless surrounding context is programmatically clear.

| Navigation signal | Weak version | Stronger version |
| --- | --- | --- |
| Link label | Click here | Open Accessible Navigation |
| Current page | Green color only | Text, underline, and `aria-current` |
| Focus | No visible change | Clear outline around focused item |
| Disabled action | Pale color only | Disabled state plus explanatory feedback |

Color cannot be the only signal. A selected tab may use a different color, but it should also expose selected state and use another visible cue such as underline or border. A completed topic may use a badge or text label, not only green. An error toast should include words that explain the issue, not only red styling. This is helpful for color-blind users and for anyone using a high-contrast theme.

Screen reader users benefit from landmarks and states. Navigation regions should have accessible names when there is more than one. Current page links can use `aria-current`. Tabs should expose selected state. Dialogs should have titles and descriptions. Toast messages or status changes should be announced through a live region when they matter. The [ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/) is a useful reference for complex widgets, though beginners should prefer native HTML elements whenever possible.

Accessible navigation is also about predictability. The same main navigation should appear in the same place. A "Start Learning" button should lead to the same student area from Home and Learning Tracks. The history and builder tabs should update the URL so students can return to the same place. A Return to Builder link on every learning section gives students a reliable escape path when they need to adjust their path.

Testing does not require expensive tools. Use the keyboard only. Start at the browser address bar and press Tab through the page. Say the focused control names out loud. If a name does not explain the result, improve it. Try Shift+Tab to move backward. Open and close dialogs. Activate a context menu. If you lose focus or cannot tell where you are, the navigation needs work.

## Practice routine

Pick one page and complete its main workflow without touching the mouse. Keep notes in three columns: focus is clear, label is clear, result is clear. Any row marked "no" becomes a concrete improvement task.

## What to do next

Test the student-area tabs using only the keyboard. Confirm you can reach History, Builder, Save, Discard Changes, and Return to Builder controls, and confirm the current location is communicated with more than color.
