import { portfolioProjects } from "@/data/portfolio-projects";

export type ReferenceDataSource = "local-reference";

export function getReferenceDataSource(): ReferenceDataSource {
  return "local-reference";
}

export function getReferenceProjectsData() {
  return portfolioProjects;
}
