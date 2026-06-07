import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";

import { LearningSectionContent } from "@/features/student-area/components/learning-section-content";
import { LearningTopicActions } from "@/features/student-area/components/learning-topic-actions";
import { findTopicBySlug } from "@/server/student-area/catalog";
import { loadLearningSectionMarkdown } from "@/server/learning-content/markdown";
import { getTopicNavigationState } from "@/features/student-area/server/path-persistence";
import type { SavedLearningPath } from "@/server/student-area/types";
import { buttonVariants } from "@/ui/components/button";

export async function LearningSectionView({
  studentId,
  path,
  topicSlug,
}: {
  studentId: string;
  path: SavedLearningPath | null;
  topicSlug: string;
}) {
  const locale = await getLocale();
  const t = await getTranslations("studentArea.learning");
  const topicContext = findTopicBySlug(topicSlug, locale);

  if (!path) {
    return <LearningSectionError message={t("pathNotFound")} />;
  }

  const navigationState = getTopicNavigationState(path, topicSlug);

  if (path.pathId.length === 0 || !navigationState.currentTopic) {
    return <LearningSectionError message={t("topicNotInPath")} />;
  }

  if (!topicContext) {
    return <LearningSectionError message={t("topicNotAvailable")} />;
  }

  let markdownContent: string;

  try {
    const markdown = await loadLearningSectionMarkdown(topicSlug, locale);
    markdownContent = markdown.markdownContent;
  } catch {
    return <LearningSectionError message={t("contentNotLoaded")} />;
  }

  return (
    <article className="content-container topic-page" aria-labelledby="learning-topic-heading">
      <LearningTopicActions
        pathId={path.pathId}
        placement="start"
        isCurrentTopicCompleted={navigationState.isCurrentTopicCompleted}
        nextHref={navigationState.nextHref}
        previousHref={navigationState.previousHref}
        studentId={studentId}
        topicSlug={topicSlug}
      />
      <div className="topic-header">
        <p className="eyebrow">{topicContext.track.title}</p>
        <h1 id="learning-topic-heading">{topicContext.topic.title}</h1>
        <p>{topicContext.topic.summary}</p>
      </div>
      <LearningSectionContent markdown={markdownContent} />
      <LearningTopicActions
        pathId={path.pathId}
        placement="end"
        isCurrentTopicCompleted={navigationState.isCurrentTopicCompleted}
        nextHref={navigationState.nextHref}
        previousHref={navigationState.previousHref}
        studentId={studentId}
        topicSlug={topicSlug}
      />
    </article>
  );
}

async function LearningSectionError({ message }: { message: string }) {
  const t = await getTranslations("studentArea.learning");

  return (
    <section className="content-container page-section" aria-labelledby="learning-error-heading">
      <h1 id="learning-error-heading">{t("sectionUnavailable")}</h1>
      <p>{message}</p>
      <Link className={buttonVariants()} href="/tracks/builder" prefetch={false}>
        {t("returnToBuilder")}
      </Link>
    </section>
  );
}
