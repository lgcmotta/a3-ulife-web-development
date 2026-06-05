import type { PersonaArtifact } from "@/content/types";

export const personas: PersonaArtifact[] = [
  {
    name: "Marina, first-semester CS student",
    studentStage:
      "Beginner student taking introductory programming and web classes",
    goals: [
      "Understand what to study first without opening many disconnected resources",
      "Find short explanations before committing to a full lesson",
      "Use the platform on a phone while commuting or between classes",
    ],
    needs: [
      "Plain language labels",
      "Predictable navigation",
      "Readable mobile layout",
      "Clear next study action after each topic",
    ],
    frustrations: [
      "Long lists of topics with no order",
      "Pages that assume prior vocabulary",
      "Navigation that changes between screens",
    ],
    scenario:
      "Marina opens the platform before a study session, reads who Diogenes is, chooses a beginner track, and opens one topic to decide what to practice next.",
  },
];
