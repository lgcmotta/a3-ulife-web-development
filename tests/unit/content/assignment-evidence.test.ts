import { describe, expect, it } from "vitest";
import { heuristicFindings } from "@/content/evidence/heuristic-evaluation";
import { informationArchitecture } from "@/content/evidence/information-architecture";
import { personas } from "@/content/evidence/personas";

describe("assignment evidence", () => {
  it("includes persona, IA, wireframe, heuristic, and iteration evidence", () => {
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
    const deferred = heuristicFindings.filter(
      (finding) => finding.decision === "deferred",
    );
    expect(deferred.every((finding) => finding.iterationNote.includes("later-scope"))).toBe(
      true,
    );
  });
});
