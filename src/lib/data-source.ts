import { portfolioProjects } from "@/data/portfolio-projects";

export type PublicDataSource = "mock" | "supabase";

export function getPublicDataSource(): PublicDataSource {
  // TODO: switch public reads to Supabase after CRUD/admin and content curation exist.
  return "mock";
}

export function getPublicProjectsData() {
  return portfolioProjects;
}
