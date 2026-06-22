import type { Project, ProjectStatus, ProjectType } from "@/types/project";

export type SupabaseProjectStatus = ProjectStatus | "archived";

export type SupabaseProjectRow = {
  id: string;
  slug: string;
  title: string;
  type: ProjectType;
  description: string;
  summary: string | null;
  status: SupabaseProjectStatus;
  featured: boolean;
  cover_url: string | null;
  year: string | null;
  role: string | null;
  external_url: string | null;
  repository_url: string | null;
  live_url: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type SupabaseProjectTagRow = {
  id: string;
  project_id: string;
  name: string;
};

export type SupabaseProjectToolRow = {
  id: string;
  project_id: string;
  name: string;
};

export type SupabaseProjectGalleryRow = {
  id: string;
  project_id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
};

export type SupabaseProjectHighlightRow = {
  id: string;
  project_id: string;
  content: string;
  sort_order: number;
};

export type SupabaseProfileRow = {
  id: string;
  full_name: string | null;
  display_name: string | null;
  headline: string | null;
  bio: string | null;
  avatar_url: string | null;
  email_public: string | null;
  phone_public: string | null;
  whatsapp_url: string | null;
  github_url: string | null;
  behance_url: string | null;
  linkedin_url: string | null;
  instagram_url: string | null;
  created_at: string;
  updated_at: string;
};

export type SupabaseExperienceRow = {
  id: string;
  title: string;
  organization: string | null;
  description: string | null;
  start_date: string | null;
  end_date: string | null;
  is_current: boolean;
  type: string;
  sort_order: number;
  visible: boolean;
  created_at: string;
  updated_at: string;
};

export type SupabaseCourseRow = {
  id: string;
  title: string;
  institution: string | null;
  description: string | null;
  year: string | null;
  certificate_url: string | null;
  visible: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type SupabaseGitHubRepositoryCurationRow = {
  id: string;
  repository_name: string;
  custom_title: string | null;
  custom_description: string | null;
  custom_summary: string | null;
  custom_tags: string[] | null;
  custom_tools: string[] | null;
  custom_status: SupabaseProjectStatus;
  visible: boolean;
  featured: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type SupabaseContactLinkRow = {
  id: string;
  label: string;
  type: string;
  url: string;
  visible: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type PublicProject = Project;

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: SupabaseProfileRow;
        Insert: Partial<SupabaseProfileRow> & Pick<SupabaseProfileRow, "id">;
        Update: Partial<SupabaseProfileRow>;
      };
      experiences: {
        Row: SupabaseExperienceRow;
        Insert: Partial<SupabaseExperienceRow> & Pick<SupabaseExperienceRow, "title">;
        Update: Partial<SupabaseExperienceRow>;
      };
      courses: {
        Row: SupabaseCourseRow;
        Insert: Partial<SupabaseCourseRow> & Pick<SupabaseCourseRow, "title">;
        Update: Partial<SupabaseCourseRow>;
      };
      projects: {
        Row: SupabaseProjectRow;
        Insert: Partial<SupabaseProjectRow> & Pick<SupabaseProjectRow, "slug" | "title" | "type" | "description">;
        Update: Partial<SupabaseProjectRow>;
      };
      project_tags: {
        Row: SupabaseProjectTagRow;
        Insert: Partial<SupabaseProjectTagRow> & Pick<SupabaseProjectTagRow, "project_id" | "name">;
        Update: Partial<SupabaseProjectTagRow>;
      };
      project_tools: {
        Row: SupabaseProjectToolRow;
        Insert: Partial<SupabaseProjectToolRow> & Pick<SupabaseProjectToolRow, "project_id" | "name">;
        Update: Partial<SupabaseProjectToolRow>;
      };
      project_gallery: {
        Row: SupabaseProjectGalleryRow;
        Insert: Partial<SupabaseProjectGalleryRow> & Pick<SupabaseProjectGalleryRow, "project_id" | "title">;
        Update: Partial<SupabaseProjectGalleryRow>;
      };
      project_highlights: {
        Row: SupabaseProjectHighlightRow;
        Insert: Partial<SupabaseProjectHighlightRow> & Pick<SupabaseProjectHighlightRow, "project_id" | "content">;
        Update: Partial<SupabaseProjectHighlightRow>;
      };
      github_repository_curations: {
        Row: SupabaseGitHubRepositoryCurationRow;
        Insert: Partial<SupabaseGitHubRepositoryCurationRow> & Pick<SupabaseGitHubRepositoryCurationRow, "repository_name">;
        Update: Partial<SupabaseGitHubRepositoryCurationRow>;
      };
      contact_links: {
        Row: SupabaseContactLinkRow;
        Insert: Partial<SupabaseContactLinkRow> & Pick<SupabaseContactLinkRow, "label" | "type" | "url">;
        Update: Partial<SupabaseContactLinkRow>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
