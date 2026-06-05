export type MainArea = "home" | "tracks" | "topic" | "accessibility";

export type DiogenesProfile = {
  name: "Diogenes";
  role: string;
  introduction: string;
  teachingTone: string;
  promise: string;
};

export type MainNavigationItem = {
  href: string;
  order: number;
  area: Exclude<MainArea, "topic">;
};

export type Topic = {
  slug: string;
  trackSlug: string;
  title: string;
  summary: string;
  whyItMatters: string;
  studyNext: string;
  keyIdeas: string[];
  practicePrompt: string;
  professorNote: string;
};

export type LearningTrack = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  recommendedFor: string;
  outcome: string;
  topics: Topic[];
};

export type AccessibilityHelpSection = {
  title: string;
  content: string;
  appliesTo: string;
  order: number;
};

export type VisualTheme = {
  id: "light" | "light-high" | "dark" | "dark-high";
  label: string;
  purpose: string;
  isDefault: boolean;
  baseTheme: "light" | "dark";
  highContrast: boolean;
};

export type PersonaArtifact = {
  name: string;
  studentStage: string;
  goals: string[];
  needs: string[];
  frustrations: string[];
  scenario: string;
};

export type InformationArchitectureArtifact = {
  mainAreas: string[];
  navigationRelationships: string[];
  contentHierarchy: string[];
  wireframeNotes: string[];
};

export type HeuristicEvaluationFinding = {
  heuristic: string;
  finding: string;
  severity: "low" | "medium" | "high";
  decision: "addressed-now" | "deferred";
  iterationNote: string;
};
