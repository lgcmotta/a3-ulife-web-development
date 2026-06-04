import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function LearningSectionContent({ markdown }: { markdown: string }) {
  const renderedMarkdown = markdown.replace(/^# .+\n+/, "");

  return (
    <div className="learning-markdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{renderedMarkdown}</ReactMarkdown>
    </div>
  );
}
