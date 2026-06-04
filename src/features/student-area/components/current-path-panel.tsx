"use client";

import { learningTracks } from "@/content/tracks";
import { PathItemContextMenu } from "@/features/student-area/components/path-item-context-menu";
import type {
  CurrentPathDraft,
  PathContextAction,
  PathItemLevel,
} from "@/server/student-area/types";

export function CurrentPathPanel({
  draft,
  onItemAction,
}: {
  draft: CurrentPathDraft;
  onItemAction?: (
    level: PathItemLevel,
    trackSlug: string,
    topicSlug: string | undefined,
    action: PathContextAction,
  ) => void;
}) {
  return (
    <section className="current-path-panel" aria-labelledby="current-path-heading">
      <h2 id="current-path-heading">Current Path</h2>
      {draft.trackGroups.length === 0 ? (
        <p>Select at least one topic from the available tracks to begin building.</p>
      ) : (
        <ol className="current-path-list">
          {draft.trackGroups.map((group) => {
            const track = learningTracks.find((candidate) => candidate.slug === group.trackSlug);

            return (
              <li key={group.trackSlug} className="current-track-group">
                <div className="path-item-heading">
                  <h3>{track?.title ?? group.trackSlug}</h3>
                  {onItemAction ? (
                    <PathItemContextMenu
                      label={track?.title ?? group.trackSlug}
                      level="track"
                      trackSlug={group.trackSlug}
                      onAction={onItemAction}
                    />
                  ) : null}
                </div>
                <ol>
                  {group.topicItems.map((item) => {
                    const topic = track?.topics.find(
                      (candidate) => candidate.slug === item.topicSlug,
                    );

                    return (
                      <li key={item.topicSlug}>
                        <span data-testid={`current-topic-${item.topicSlug}`}>
                          {topic?.title ?? item.topicSlug}
                        </span>
                        <span className="status-label">
                          {item.completed ? "Completed" : "Not completed"}
                        </span>
                        {onItemAction ? (
                          <PathItemContextMenu
                            label={topic?.title ?? item.topicSlug}
                            level="topic"
                            trackSlug={group.trackSlug}
                            topicSlug={item.topicSlug}
                            onAction={onItemAction}
                          />
                        ) : null}
                      </li>
                    );
                  })}
                </ol>
              </li>
            );
          })}
        </ol>
      )}
    </section>
  );
}
