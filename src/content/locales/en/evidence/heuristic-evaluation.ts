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
      "Students need keyboard navigation and a high-contrast option to use the foundation independently.",
    severity: "high",
    decision: "addressed-now",
    iterationNote:
      "The foundation includes skip link, focus states, semantic regions, and a high-contrast theme toggle.",
  },
  {
    heuristic: "User control and freedom",
    finding:
      "Students can make significant path edits and need a way to avoid losing or accidentally applying changes.",
    severity: "high",
    decision: "addressed-now",
    iterationNote:
      "The builder separates Save from Continue Learning, disables invalid actions, and requires confirmation for discard and clear.",
  },
  {
    heuristic: "Match between system and real world",
    finding:
      "The builder must preserve the learning-track hierarchy so students do not see topics detached from their study context.",
    severity: "medium",
    decision: "addressed-now",
    iterationNote:
      "The current path groups selected topics under their parent track and only permits topic reordering inside that group.",
  },
  {
    heuristic: "Error prevention",
    finding:
      "Students may try to continue learning with unsaved edits or save an empty path.",
    severity: "high",
    decision: "addressed-now",
    iterationNote:
      "The action bar disables invalid actions and server actions return friendly feedback for blocked operations.",
  },
  {
    heuristic: "Accessibility and flexibility of use",
    finding:
      "The personalized builder introduces tabs, tree controls, context menus, dialogs, toasts, and long reading pages.",
    severity: "high",
    decision: "addressed-now",
    iterationNote:
      "Student-area tabs expose selected state, controls have readable labels, destructive dialogs are explicit, and learning sections place Complete Topic before long content.",
  },
];
