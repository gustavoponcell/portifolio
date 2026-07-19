import type { Project } from "@/types/project";

export function getRelatedProjects(
  projects: Project[],
  currentProject: Project,
  limit = 3
) {
  return projects
    .filter((project) => project.id !== currentProject.id)
    .slice(0, limit);
}
