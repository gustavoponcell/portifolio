import { describe, expect, it } from "vitest";

import { getRelatedProjects } from "@/lib/projects";
import type { Project } from "@/types/project";

function makeProject(id: string, type: Project["type"] = "design"): Project {
  return {
    id,
    slug: `projeto-${id}`,
    title: `Projeto ${id}`,
    type,
    description: "Descrição",
    tags: [],
  };
}

describe("getRelatedProjects", () => {
  it("never includes the current project", () => {
    const current = makeProject("1");
    const projects = [current, makeProject("2"), makeProject("3")];

    const related = getRelatedProjects(projects, current);

    expect(related.some((project) => project.id === current.id)).toBe(false);
  });

  it("respects the limit", () => {
    const current = makeProject("1");
    const projects = [
      current,
      makeProject("2"),
      makeProject("3"),
      makeProject("4"),
      makeProject("5"),
    ];

    const related = getRelatedProjects(projects, current, 2);

    expect(related).toHaveLength(2);
  });
});
