import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { StudentTabs } from "@/features/student-area/components/student-tabs";

describe("StudentTabs", () => {
  it("exposes two route-backed student area tabs", () => {
    render(React.createElement(StudentTabs, { activePath: "/tracks/history" }));

    expect(screen.getByRole("tab", { name: "Learning Path History" }).getAttribute("href")).toBe(
      "/tracks/history",
    );
    expect(screen.getByRole("tab", { name: "Learning Path Builder" }).getAttribute("href")).toBe(
      "/tracks/builder",
    );
    expect(
      screen.getByRole("tab", { name: "Learning Path History" }).getAttribute("aria-selected"),
    ).toBe("true");
  });
});
