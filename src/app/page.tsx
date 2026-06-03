import type { Metadata } from "next";
import { HomeView } from "@/features/foundation/views/home-view";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Meet Diogenes and start with curated Computer Science learning tracks.",
};

export default function HomePage() {
  return <HomeView />;
}
