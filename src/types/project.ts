export type ProjectType = "design" | "dev";
export type ProjectStatus = "mock" | "draft" | "published" | "archived";

export type ProjectGalleryItem = {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
};

export type Project = {
  id: string;
  slug: string;
  title: string;
  type: ProjectType;
  description: string;
  summary?: string;
  tags: string[];
  featured?: boolean;
  status?: ProjectStatus;
  externalUrl?: string;
  cover?: string;
  coverUrl?: string;
  year?: string;
  role?: string;
  tools?: string[];
  problem?: string;
  solution?: string;
  highlights?: string[];
  gallery?: ProjectGalleryItem[];
  repositoryUrl?: string;
  liveUrl?: string;
};
