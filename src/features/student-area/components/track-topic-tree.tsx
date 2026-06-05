"use client";

import { useTranslations } from "next-intl";
import type { LearningTrack } from "@/content/types";
import {
  getTrackSelectionState,
  isTopicSelected,
} from "@/features/student-area/server/builder-selection";
import type { CurrentPathDraft } from "@/server/student-area/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/ui/components/accordion";
import { Checkbox } from "@/ui/components/checkbox";

export function TrackTopicTree({
  tracks,
  draft,
  onToggleTrack,
  onToggleTopic,
}: {
  tracks: LearningTrack[];
  draft: CurrentPathDraft;
  onToggleTrack: (trackSlug: string, selected: boolean) => void;
  onToggleTopic: (trackSlug: string, topicSlug: string, selected: boolean) => void;
}) {
  const t = useTranslations("studentArea.builder");

  return (
    <div className="builder-sidebar" aria-labelledby="available-tracks-heading">
      <h2 id="available-tracks-heading">{t("availableTracks")}</h2>
      <Accordion type="multiple" className="track-tree">
        {tracks.map((track) => {
          const state = getTrackSelectionState(draft, track.slug, tracks);
          const checked = state === "selected";
          const partial = state === "partial";

          return (
            <AccordionItem value={track.slug} key={track.slug}>
              <div className="tree-track-row">
                <Checkbox
                  aria-label={t("selectTrack", { track: track.title })}
                  aria-checked={partial ? "mixed" : checked}
                  checked={partial ? "indeterminate" : checked}
                  onCheckedChange={(value) => onToggleTrack(track.slug, value === true)}
                />
                <AccordionTrigger>{track.title}</AccordionTrigger>
              </div>
              <AccordionContent>
                <ul className="tree-topic-list">
                  {track.topics.map((topic) => (
                    <li className="tree-topic-row" key={topic.slug}>
                      <Checkbox
                        aria-label={topic.title}
                        checked={isTopicSelected(draft, track.slug, topic.slug)}
                        onCheckedChange={(value) =>
                          onToggleTopic(track.slug, topic.slug, value === true)
                        }
                      />
                      <span>{topic.title}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
