import { describe, expect, it } from "vitest";
import { diogenesProfile } from "@/content/diogenes";
import { mainNavigation } from "@/routes/navigation";

describe("foundation content", () => {
  it("defines Diogenes as a bounded educational guide", () => {
    expect(diogenesProfile.name).toBe("Diogenes");
    expect(diogenesProfile.role).toContain("professor");
    expect(diogenesProfile.introduction).toContain("Computer Science");
    expect(
      `${diogenesProfile.role} ${diogenesProfile.introduction} ${diogenesProfile.promise}`.toLowerCase(),
    ).not.toMatch(/chatbot|dashboard|account|authentication|community/);
  });

  it("keeps primary navigation focused on approved main areas", () => {
    expect(mainNavigation.map((item) => item.href)).toEqual([
      "/",
      "/tracks",
      "/accessibility",
    ]);
    expect(mainNavigation.every((item) => item.label && item.description)).toBe(true);
  });
});
