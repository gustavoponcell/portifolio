export type Profile = {
  id: string;
  fullName: string;
  displayName: string;
  headline: string;
  bio: string;
  avatarUrl: string;
  emailPublic: string;
  phonePublic: string;
  whatsappUrl: string;
  githubUrl: string;
  behanceUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  createdAt?: string;
  updatedAt?: string;
};

export type Experience = {
  id: string;
  title: string;
  organization: string;
  description: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  type: string;
  sortOrder: number;
  visible: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type Course = {
  id: string;
  title: string;
  institution: string;
  description: string;
  year: string;
  certificateUrl: string;
  sortOrder: number;
  visible: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type AdminProjectStatus = "draft" | "published" | "archived" | "mock";

export type AdminProjectGalleryItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  sortOrder: number;
};

export type AdminProjectHighlight = {
  id: string;
  content: string;
  sortOrder: number;
};

export type AdminDesignProject = {
  id: string;
  slug: string;
  title: string;
  description: string;
  summary: string;
  status: AdminProjectStatus;
  featured: boolean;
  coverUrl: string;
  year: string;
  role: string;
  externalUrl: string;
  sortOrder: number;
  tags: string[];
  tools: string[];
  gallery: AdminProjectGalleryItem[];
  highlights: AdminProjectHighlight[];
  createdAt?: string;
  updatedAt?: string;
};

export type ProfileInput = Omit<Profile, "id" | "createdAt" | "updatedAt">;
export type ExperienceInput = Omit<Experience, "id" | "createdAt" | "updatedAt">;
export type CourseInput = Omit<Course, "id" | "createdAt" | "updatedAt">;
export type AdminDesignProjectInput = Omit<
  AdminDesignProject,
  "id" | "gallery" | "highlights" | "createdAt" | "updatedAt"
> & {
  gallery: Omit<AdminProjectGalleryItem, "id">[];
  highlights: Omit<AdminProjectHighlight, "id">[];
};

export type AdminGitHubRepositoryCurationStatus =
  | "draft"
  | "published"
  | "archived"
  | "mock";

export type AdminGitHubRepositoryCuration = {
  id?: string;
  repositoryName: string;
  customTitle: string;
  customDescription: string;
  customSummary: string;
  customTags: string[];
  customTools: string[];
  customStatus: AdminGitHubRepositoryCurationStatus;
  visible: boolean;
  featured: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
};

export type AdminGitHubRepositoryCurationInput = Omit<
  AdminGitHubRepositoryCuration,
  "id" | "createdAt" | "updatedAt"
>;

export type AdminCrudResult<T = undefined> = {
  ok: boolean;
  message: string;
  data?: T;
};
