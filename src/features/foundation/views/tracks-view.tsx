import { learningTracks } from "@/content/tracks";
import { landmarkLabels } from "@/accessibility/landmarks";
import { TrackCard } from "@/features/foundation/components/track-card";

export function TracksView() {
  return (
    <section className="content-container page-section" aria-labelledby="tracks-heading">
      <div className="page-intro">
        <p className="eyebrow">Learning tracks</p>
        <h1 id="tracks-heading">Choose a small, curated study path</h1>
        <p>
          Each track gives a beginner-friendly purpose and a short set of topics
          to inspect. Start with the track that best matches the study problem in
          front of you.
        </p>
      </div>
      <div className="tracks-grid" aria-label={landmarkLabels.trackList}>
        {learningTracks.map((track) => (
          <TrackCard key={track.slug} track={track} />
        ))}
      </div>
    </section>
  );
}
