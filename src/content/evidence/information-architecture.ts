import type { InformationArchitectureArtifact } from "@/content/types";

export const informationArchitecture: InformationArchitectureArtifact = {
  mainAreas: [
    "Home or introduction area",
    "Learning tracks overview",
    "Student area history tab",
    "Student area builder tab",
    "Topic detail area",
    "Personalized learning section area",
    "Accessibility help area",
  ],
  navigationRelationships: [
    "Home introduces the purpose and links to Start Learning, Learning Tracks, and Accessibility Help.",
    "Start Learning on Home and Learning Tracks opens the default student area tab at /tracks/history.",
    "Learning Path History and Learning Path Builder are sibling tabs with URL-backed routes.",
    "Learning Path History lists saved paths and links to /tracks/builder when students need a new path.",
    "Learning Path Builder lets students configure the current path and start or continue the saved path.",
    "Saved learning paths open detailed learning sections and each section returns to the builder.",
    "Completing the final topic opens a completion screen with a route back to /tracks/history.",
    "Learning Tracks lists curated paths and links to foundation topic detail pages.",
    "Topic pages explain one study unit and return students to Learning Tracks.",
    "Accessibility Help is reachable from every main page through primary navigation.",
  ],
  contentHierarchy: [
    "Each page starts with one main heading and a short orientation paragraph.",
    "Repeated track and topic items use consistent labels and supporting descriptions.",
    "Student-area content separates history review from builder editing to reduce task switching confusion.",
    "Builder content keeps the source catalog in a left tree and the current path in a main ordered view.",
    "Learning sections keep Complete Topic and Return to Builder actions before long markdown content.",
    "Primary actions appear before secondary details on both desktop and mobile.",
  ],
  wireframeNotes: [
    "Desktop home uses a full-width professor image with overlayed introduction text and visible next-section preview.",
    "Mobile home places the same introduction first, then stacks actions and content summaries.",
    "Track overview uses repeated cards with title, purpose, recommendation, and topic links.",
    "Topic detail uses a narrow reading column with key ideas and a next study action.",
    "Student history uses a tab shell, then either an accessible table or an empty state with Add New Learning Path.",
    "Student builder uses a two-column desktop layout and stacks the action bar, catalog tree, and current path on mobile.",
    "Learning section pages use a constrained reading column so markdown tables, links, and lists stay readable.",
  ],
};
