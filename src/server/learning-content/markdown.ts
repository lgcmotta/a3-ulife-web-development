import { readFile } from "node:fs/promises";
import path from "node:path";
import { defaultLocale, resolveLocale, type SupportedLocale } from "@/i18n/locales";

const markdownDirectory = path.join(process.cwd(), "src/content/learning-sections");
const learningSectionSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function getLearningSectionFileName(topicSlug: string) {
  if (!learningSectionSlugPattern.test(topicSlug)) {
    throw new Error("Invalid learning section slug");
  }

  return `${topicSlug}.md`;
}

export function getLearningSectionFilePath(
  topicSlug: string,
  locale: SupportedLocale = defaultLocale,
) {
  return path.join(markdownDirectory, locale, getLearningSectionFileName(topicSlug));
}

export function parseMarkdownMetadata(markdownContent: string) {
  const withoutLinks = markdownContent.replace(/\[([^\]]+)]\((https?:\/\/[^)]+)\)/g, "$1");
  const words = withoutLinks.match(/[A-Za-z0-9]+(?:[-'][A-Za-z0-9]+)?/g) ?? [];
  const externalReferences = Array.from(
    markdownContent.matchAll(/\[[^\]]+]\((https?:\/\/[^)]+)\)/g),
    (match) => match[1],
  );

  return {
    wordCount: words.length,
    externalReferences,
  };
}

export async function loadLearningSectionMarkdown(
  topicSlug: string,
  locale: unknown = defaultLocale,
) {
  const selectedLocale = resolveLocale(locale);
  const markdownFileName = getLearningSectionFileName(topicSlug);
  const markdownFilePath = getLearningSectionFilePath(topicSlug, selectedLocale);
  const markdownContent = await readFile(markdownFilePath, "utf8");
  const metadata = parseMarkdownMetadata(markdownContent);

  return {
    locale: selectedLocale,
    markdownFileName,
    markdownFilePath,
    markdownContent,
    ...metadata,
  };
}
