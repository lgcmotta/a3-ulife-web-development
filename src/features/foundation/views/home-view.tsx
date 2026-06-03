import { HomeIntroduction } from "@/features/foundation/components/home-introduction";
import { learningTracks } from "@/content/tracks";

export function HomeView() {
  return (
    <>
      <HomeIntroduction />
      <section className="content-band" aria-labelledby="foundation-preview-heading">
        <div className="content-container preview-grid">
          <div>
          <p className="eyebrow">Foundation MVP</p>
          <h2 id="foundation-preview-heading">A simple route into Computer Science study</h2>
        </div>
        <p>
          Students begin with a short professor introduction, compare curated
          study tracks, open focused topic pages, and use accessibility guidance
          whenever they need help moving through the platform.
        </p>
      </div>
      </section>
      <section className="content-container track-strip" aria-label="Available track preview">
        {learningTracks.map((track) => (
          <article className="compact-track" key={track.slug}>
            <h3>{track.title}</h3>
            <p>{track.summary}</p>
          </article>
        ))}
      </section>
    </>
  );
}
