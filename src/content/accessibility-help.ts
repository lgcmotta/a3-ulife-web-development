import type { AccessibilityHelpSection } from "@/content/types";

export const accessibilityHelpSections: AccessibilityHelpSection[] = [
  {
    title: "Use the main navigation",
    content:
      "The top navigation links to Home, Learning Tracks, and Accessibility Help. Topic pages also include a return path back to the learning tracks overview.",
    appliesTo: "Main areas",
    order: 1,
  },
  {
    title: "Move with the keyboard",
    content:
      "Use Tab to move through links and controls, Shift+Tab to move backward, and Enter or Space to activate focused controls. The skip link moves directly to the main content.",
    appliesTo: "Keyboard navigation",
    order: 2,
  },
  {
    title: "Follow the page structure",
    content:
      "Each page has a clear main heading, a navigation region, and a main content region so screen reader users can understand the current area and available choices.",
    appliesTo: "Screen reader structure",
    order: 3,
  },
  {
    title: "Choose a visual theme",
    content:
      "The default theme uses calm academic colors. The high-contrast theme strengthens boundaries and text contrast without changing the content or navigation.",
    appliesTo: "Visual accessibility",
    order: 4,
  },
];
