import { normalizePathGroups } from "@/server/student-area/path-validation";
import type { CurrentPathDraft, PathDirection, PathItemLevel } from "@/server/student-area/types";

export function movePathItem({
  draft,
  level,
  trackSlug,
  topicSlug,
  direction,
}: {
  draft: CurrentPathDraft;
  level: PathItemLevel;
  trackSlug: string;
  topicSlug?: string;
  direction: PathDirection;
}) {
  const delta = direction === "up" ? -1 : 1;

  if (level === "track") {
    const index = draft.trackGroups.findIndex((group) => group.trackSlug === trackSlug);
    const nextIndex = index + delta;

    if (index < 0 || nextIndex < 0 || nextIndex >= draft.trackGroups.length) {
      return {
        ok: false,
        draft,
        feedback: `This track is already ${direction === "up" ? "first" : "last"}.`,
      };
    }

    const groups = draft.trackGroups.toSpliced(index, 1);
    groups.splice(nextIndex, 0, draft.trackGroups[index]!);

    return {
      ok: true,
      draft: {
        ...draft,
        dirty: true,
        updatedAt: new Date().toISOString(),
        trackGroups: normalizePathGroups(groups),
      },
      feedback: "Track order updated.",
    };
  }

  const group = draft.trackGroups.find((candidate) => candidate.trackSlug === trackSlug);
  const topicIndex = group?.topicItems.findIndex((topic) => topic.topicSlug === topicSlug) ?? -1;
  const nextTopicIndex = topicIndex + delta;

  if (!group || topicIndex < 0 || nextTopicIndex < 0 || nextTopicIndex >= group.topicItems.length) {
    return {
      ok: false,
      draft,
      feedback: `This topic is already ${direction === "up" ? "first" : "last"} in its track.`,
    };
  }

  const topicItems = group.topicItems.toSpliced(topicIndex, 1);
  topicItems.splice(nextTopicIndex, 0, group.topicItems[topicIndex]!);

  const groups = draft.trackGroups.map((candidate) =>
    candidate.trackSlug === trackSlug ? { ...candidate, topicItems } : candidate,
  );

  return {
    ok: true,
    draft: {
      ...draft,
      dirty: true,
      updatedAt: new Date().toISOString(),
      trackGroups: normalizePathGroups(groups),
    },
    feedback: "Topic order updated inside its track.",
  };
}
