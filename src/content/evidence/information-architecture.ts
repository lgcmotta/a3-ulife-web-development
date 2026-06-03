import type { InformationArchitectureArtifact } from "@/content/types";

export const informationArchitecture: InformationArchitectureArtifact = {
  mainAreas: [
    "Home or introduction area",
    "Learning tracks overview",
    "Topic detail area",
    "Accessibility help area",
  ],
  navigationRelationships: [
    "Home introduces the purpose and links to Learning Tracks and Accessibility Help.",
    "Learning Tracks lists curated paths and links to topic detail pages.",
    "Topic pages explain one study unit and return students to Learning Tracks.",
    "Accessibility Help is reachable from every main page through primary navigation.",
  ],
  contentHierarchy: [
    "Each page starts with one main heading and a short orientation paragraph.",
    "Repeated track and topic items use consistent labels and supporting descriptions.",
    "Primary actions appear before secondary details on both desktop and mobile.",
  ],
  wireframeNotes: [
    "Desktop home uses a full-width professor image with overlayed introduction text and visible next-section preview.",
    "Mobile home places the same introduction first, then stacks actions and content summaries.",
    "Track overview uses repeated cards with title, purpose, recommendation, and topic links.",
    "Topic detail uses a narrow reading column with key ideas and a next study action.",
  ],
};
