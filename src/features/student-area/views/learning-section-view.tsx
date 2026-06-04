import Link from "next/link";

import { completeTopicAction } from "@/features/student-area/actions/complete-topic-action";
import { LearningSectionContent } from "@/features/student-area/components/learning-section-content";
import { findTopicBySlug } from "@/server/student-area/catalog";
import { loadLearningSectionMarkdown } from "@/server/learning-content/markdown";
import type { SavedLearningPath } from "@/server/student-area/types";
import { buttonVariants } from "@/ui/components/button";
import { Button } from "@/ui/components/button";

export async function LearningSectionView({
  studentId,
  path,
  topicSlug,
}: {
  studentId: string;
  path: SavedLearningPath | null;
  topicSlug: string;
}) {
  const topicContext = findTopicBySlug(topicSlug);

  if (!path) {
    return <LearningSectionError message="No saved learning path was found for this student." />;
  }

  if (path.pathId.length === 0 || !path.trackGroups.some((group) =>
    group.topicItems.some((topic) => topic.topicSlug === topicSlug),
  )) {
    return <LearningSectionError message="This topic is not part of the saved learning path." />;
  }

  if (!topicContext) {
    return <LearningSectionError message="This topic is not available in the learning catalog." />;
  }

  let markdownContent: string;

  try {
    const markdown = await loadLearningSectionMarkdown(topicSlug);
    markdownContent = markdown.markdownContent;
  } catch {
    return <LearningSectionError message="The learning section content could not be loaded." />;
  }

  return (
    <article className="content-container topic-page" aria-labelledby="learning-topic-heading">
      <Link className="return-link" href={`/tracks/builder?edit=${path.pathId}`} prefetch={false}>
        Return to Builder
      </Link>
      <div className="topic-header">
        <p className="eyebrow">{topicContext.track.title}</p>
        <h1 id="learning-topic-heading">{topicContext.topic.title}</h1>
        <p>{topicContext.topic.summary}</p>
      </div>
      <form action={completeTopicAction.bind(null, studentId, path.pathId, topicSlug)}>
        <Button type="submit">Complete Topic</Button>
      </form>
      <LearningSectionContent markdown={markdownContent} />
    </article>
  );
}

function LearningSectionError({ message }: { message: string }) {
  return (
    <section className="content-container page-section" aria-labelledby="learning-error-heading">
      <h1 id="learning-error-heading">Learning section unavailable</h1>
      <p>{message}</p>
      <Link className={buttonVariants()} href="/tracks/builder" prefetch={false}>
        Return to Builder
      </Link>
    </section>
  );
}
