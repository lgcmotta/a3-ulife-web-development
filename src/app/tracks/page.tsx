import type { Metadata } from "next";
import { TracksView } from "@/features/foundation/views/tracks-view";

export const metadata: Metadata = {
  title: "Learning Tracks",
  description:
    "Browse curated beginner-friendly Computer Science study paths.",
};

export default function TracksPage() {
  return <TracksView />;
}
