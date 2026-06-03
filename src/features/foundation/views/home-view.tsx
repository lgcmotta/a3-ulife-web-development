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
            The first version keeps the structure intentionally small: a clear
            introduction, a curated tracks overview, concise topic pages, and
            accessibility guidance that is available from every main area.
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
