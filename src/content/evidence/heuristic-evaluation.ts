import type { HeuristicEvaluationFinding } from "@/content/types";

export const heuristicFindings: HeuristicEvaluationFinding[] = [
  {
    heuristic: "Visibility of system status",
    finding:
      "Students need to know which main area they are in while moving between Home, Tracks, and Accessibility Help.",
    severity: "medium",
    decision: "addressed-now",
    iterationNote:
      "Primary navigation includes current-page state and topic pages include return navigation.",
  },
  {
    heuristic: "Recognition rather than recall",
    finding:
      "Track options should explain their purpose without requiring students to remember course terminology.",
    severity: "medium",
    decision: "addressed-now",
    iterationNote:
      "Each track includes a beginner-friendly summary, description, and recommended-for statement.",
  },
  {
    heuristic: "Accessibility and flexibility of use",
    finding:
      "The first version needs keyboard navigation and a high-contrast option before adding richer features.",
    severity: "high",
    decision: "addressed-now",
    iterationNote:
      "The foundation includes skip link, focus states, semantic regions, and a high-contrast theme toggle.",
  },
  {
    heuristic: "User control and freedom",
    finding:
      "A future progress dashboard could help students resume study, but it would expand scope beyond the foundation MVP.",
    severity: "low",
    decision: "deferred",
    iterationNote:
      "Progress behavior is documented as later-scope work and not presented in the current interface.",
  },
];
