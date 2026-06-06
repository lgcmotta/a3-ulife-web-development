import { describe, expect, it } from "vitest";
import { getLocalizedContent } from "@/content/locales";

describe("assignment evidence", () => {
  it("includes persona, IA, wireframe, heuristic, and iteration evidence", () => {
    const { heuristicFindings, informationArchitecture, personas } =
      getLocalizedContent("en");

    expect(personas.length).toBeGreaterThanOrEqual(1);
    expect(personas[0].studentStage.toLowerCase()).toContain("beginner");
    expect(informationArchitecture.mainAreas).toContain("Home or introduction area");
    expect(informationArchitecture.wireframeNotes.length).toBeGreaterThan(0);
    expect(heuristicFindings.length).toBeGreaterThan(0);
    expect(
      heuristicFindings.some((finding) => finding.iterationNote.length > 20),
    ).toBe(true);
  });

  it("keeps deferred evidence within later-scope boundaries", () => {
    const { heuristicFindings } = getLocalizedContent("en");
    const deferred = heuristicFindings.filter(
      (finding) => finding.decision === "deferred",
    );
    expect(deferred.every((finding) => finding.iterationNote.includes("later-scope"))).toBe(
      true,
    );
  });
});
