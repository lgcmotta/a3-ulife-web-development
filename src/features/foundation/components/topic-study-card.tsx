import type { Topic } from "@/content/types";

export function TopicStudyCard({ topic }: { topic: Topic }) {
  return (
    <section className="study-card" aria-labelledby="topic-value-heading">
      <h2 id="topic-value-heading">Why this matters</h2>
      <p>{topic.whyItMatters}</p>
      <h2>Main ideas</h2>
      <ul>
        {topic.keyIdeas.map((idea) => (
          <li key={idea}>{idea}</li>
        ))}
      </ul>
      <h2>Practice prompt</h2>
      <p>{topic.practicePrompt}</p>
      <h2>Professor&apos;s note</h2>
      <p>{topic.professorNote}</p>
    </section>
  );
}
