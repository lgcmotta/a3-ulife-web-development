import type { AccessibilityHelpSection } from "@/content/types";

export const accessibilityHelpSections: AccessibilityHelpSection[] = [
  {
    title: "Start from the main navigation",
    content:
      "Use the header links to move between Home, Learning Tracks, and Accessibility Help. Topic pages include a Back to learning tracks link so you can return to the track overview without retracing every previous step.",
    appliesTo: "Main areas",
    order: 1,
  },
  {
    title: "Move through controls with the keyboard",
    content:
      "Press Tab to move forward through links, topic cards, the base theme switch, and the High contrast switch. Press Shift+Tab to move backward, then use Enter or Space to activate the focused item. The skip link moves focus directly to the main content.",
    appliesTo: "Keyboard navigation",
    order: 2,
  },
  {
    title: "Use headings and landmarks as a page map",
    content:
      "Each page has a primary navigation region, one main content region, and clear headings for the current area. Screen reader users can jump by headings to compare tracks, find topic sections, and reach the next study action.",
    appliesTo: "Screen reader structure",
    order: 3,
  },
  {
    title: "Switch to stronger visual contrast",
    content:
      "Use the base theme switch to move between Light theme and Dark theme, then turn High contrast on or off independently. High-contrast mode strengthens text, borders, focus outlines, and button contrast without changing the content order. Current navigation state is also shown with text and underline, not color alone.",
    appliesTo: "Visual accessibility",
    order: 4,
  },
];
