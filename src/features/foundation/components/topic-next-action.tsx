import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Topic } from "@/content/types";
import { buttonVariants } from "@/ui/components/button";

export function TopicNextAction({ topic }: { topic: Topic }) {
  return (
    <section className="next-action" aria-labelledby="next-study-heading">
      <div>
        <p className="eyebrow">Next study action</p>
        <h2 id="next-study-heading">What to do next</h2>
        <p>{topic.studyNext}</p>
      </div>
      <Link className={buttonVariants({ variant: "secondary" })} href="/tracks">
        Choose another topic
        <ArrowRight aria-hidden="true" size={18} />
      </Link>
    </section>
  );
}
