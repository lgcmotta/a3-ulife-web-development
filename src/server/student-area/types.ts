export type PathStatus = "not-started" | "in-progress" | "completed";
export type FeedbackKind = "success" | "error" | "info";
export type PathItemLevel = "track" | "topic";
export type PathDirection = "up" | "down";
export type PathContextAction = "remove" | "move-up" | "move-down";
export type BuilderMode = "create" | "edit";

export type AnonymousStudentRecord = {
  studentId: string;
  numericId: number;
  createdAt: string;
  lastSeenAt: string;
};

export type PathTopicItem = {
  topicSlug: string;
  trackSlug: string;
  order: number;
  completed: boolean;
  completedAt: string | null;
};

export type PathTrackGroup = {
  trackSlug: string;
  order: number;
  topicItems: PathTopicItem[];
};

export type BuilderComposition = {
  draftId: string;
  studentId: string;
  trackGroups: PathTrackGroup[];
  dirty: boolean;
  updatedAt: string;
};

// Backward-compatible name for existing component/test surfaces. This is local
// builder composition state, not a persisted storage draft.
export type CurrentPathDraft = BuilderComposition;

export type SavedLearningPath = {
  pathId: string;
  studentId: string;
  trackGroups: PathTrackGroup[];
  status: PathStatus;
  lastActiveTopicSlug: string | null;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
};

export type LearningPathHistoryEntry = {
  historyId: string;
  studentId: string;
  pathId: string;
  savedAt: string;
  trackSummary: string;
  topicCount: number;
  completedTopicCount: number;
  status: PathStatus;
};

export type BuilderFeedbackMessage = {
  messageId: string;
  kind: FeedbackKind;
  message: string;
  relatedAction: string;
};

export type BuilderSelectionState = "selected" | "partial" | "unselected";

export type LearningSection = {
  pathId: string;
  topicSlug: string;
  trackSlug: string;
  markdownFileName: string;
  markdownContent: string;
  wordCount: number;
  externalReferences: string[];
};
