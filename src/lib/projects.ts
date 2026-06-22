import { getPublicProjectsData } from "@/lib/data-source";
import type { Project, ProjectType } from "@/types/project";

const publicProjects = getPublicProjectsData();

export function getAllProjects() {
  return publicProjects;
}

export function getFeaturedProjects() {
  return publicProjects.filter((project) => project.featured);
}

export function getProjectsByType(type: ProjectType) {
  return publicProjects.filter((project) => project.type === type);
}

export function getProjectBySlug(slug: string) {
  return publicProjects.find((project) => project.slug === slug);
}

export function getRelatedProjects(project: Project, limit = 3) {
  const sameTypeProjects = publicProjects.filter(
    (candidate) => candidate.type === project.type && candidate.id !== project.id
  );
  const otherProjects = publicProjects.filter(
    (candidate) => candidate.type !== project.type && candidate.id !== project.id
  );

  return [...sameTypeProjects, ...otherProjects].slice(0, limit);
}
