export const trackStructure = [
  {
    slug: "programming-foundations",
    topics: [
      "problem-solving-basics",
      "variables-and-flow",
      "debugging-habits",
    ],
  },
  {
    slug: "web-and-accessibility",
    topics: [
      "semantic-structure",
      "responsive-layouts",
      "accessible-navigation",
    ],
  },
  {
    slug: "study-methods",
    topics: [
      "reading-technical-texts",
      "planning-study-sessions",
      "asking-better-questions",
    ],
  },
] as const;

export const homePrincipleOrder = [
  "reliableBeginnerTopics",
  "shortStudyPages",
  "accessibleNavigation",
] as const;

export const topicKeyIdeaOrder = {
  "problem-solving-basics": [
    "identifyInputs",
    "stateResult",
    "breakWorkIntoActions",
    "checkSampleCase",
  ],
  "variables-and-flow": [
    "trackState",
    "readConditions",
    "describeLoops",
    "useTracing",
  ],
  "debugging-habits": [
    "reproduceIssue",
    "readErrors",
    "changeOneThing",
    "confirmFix",
  ],
  "semantic-structure": [
    "mainHeading",
    "semanticGroups",
    "descriptiveLabels",
    "alignedOrder",
  ],
  "responsive-layouts": [
    "flexibleSections",
    "comfortableLineLength",
    "avoidHorizontalScroll",
    "prioritizeActions",
  ],
  "accessible-navigation": [
    "keyboardOrder",
    "visibleFocus",
    "destinationLabels",
    "currentLocation",
  ],
  "reading-technical-texts": [
    "separateVocabulary",
    "connectDiagrams",
    "summarize",
    "saveQuestions",
  ],
  "planning-study-sessions": [
    "smallGoal",
    "activePractice",
    "shortReview",
    "easyRestart",
  ],
  "asking-better-questions": [
    "stateTask",
    "showAttempt",
    "nameBlocker",
    "askNextStep",
  ],
} as const;

export const accessibilityHelpSectionOrder = [
  "mainNavigation",
  "keyboardControls",
  "headingsLandmarks",
  "visualContrast",
] as const;

export const personaOrder = ["marina"] as const;

export const informationArchitectureOrder = {
  mainAreas: [
    "home",
    "tracksOverview",
    "historyTab",
    "builderTab",
    "topicDetail",
    "learningSection",
    "accessibilityHelp",
  ],
  navigationRelationships: [
    "homeLinks",
    "startLearningRoute",
    "studentTabs",
    "historyToBuilder",
    "builderToLearning",
    "savedLearningSections",
    "completionRoute",
    "tracksToTopics",
    "topicsToTracks",
    "globalAccessibility",
  ],
  contentHierarchy: [
    "pageHeading",
    "repeatedItems",
    "studentSeparation",
    "builderLayout",
    "learningActions",
    "primaryActions",
  ],
  wireframeNotes: [
    "desktopHome",
    "mobileHome",
    "trackOverview",
    "topicDetail",
    "studentHistory",
    "studentBuilder",
    "learningSection",
  ],
} as const;

export const heuristicFindingOrder = [
  "visibilityOfStatus",
  "recognition",
  "foundationAccessibility",
  "userControl",
  "realWorldMatch",
  "errorPrevention",
  "builderAccessibility",
] as const;

export type TrackSlug = (typeof trackStructure)[number]["slug"];
export type TopicSlug = (typeof trackStructure)[number]["topics"][number];
