import "server-only";

import { cache } from "react";

import { createPublicClient } from "@/lib/supabase/public";
import type {
  SupabaseProjectGalleryRow,
  SupabaseProjectHighlightRow,
  SupabaseProjectRow,
  SupabaseProjectTagRow,
  SupabaseProjectToolRow,
} from "@/lib/supabase/types";
import type { Project } from "@/types/project";

function clean(value: string | null | undefined) {
  return value?.trim() ?? "";
}

function groupByProjectId<T extends { project_id: string }>(items: T[]) {
  return items.reduce<Record<string, T[]>>((groups, item) => {
    groups[item.project_id] = [...(groups[item.project_id] ?? []), item];
    return groups;
  }, {});
}

function mapProject(
  row: SupabaseProjectRow,
  tags: SupabaseProjectTagRow[],
  tools: SupabaseProjectToolRow[],
  gallery: SupabaseProjectGalleryRow[],
  highlights: SupabaseProjectHighlightRow[]
): Project {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    type: "design",
    description: row.description,
    summary: clean(row.summary) || undefined,
    tags: tags.map((tag) => tag.name),
    featured: row.featured,
    status: "published",
    externalUrl: clean(row.external_url) || undefined,
    coverUrl: clean(row.cover_url) || undefined,
    year: clean(row.year) || undefined,
    role: clean(row.role) || undefined,
    tools: tools.map((tool) => tool.name),
    highlights: highlights.map((highlight) => highlight.content),
    gallery: gallery.map((item) => ({
      id: item.id,
      title: item.title,
      description: clean(item.description) || undefined,
      imageUrl: clean(item.image_url) || undefined,
    })),
  };
}

export const getPublicDesignProjects = cache(async (): Promise<Project[]> => {
  const supabase = createPublicClient();

  if (!supabase) {
    return [];
  }

  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("type", "design")
      .eq("status", "published")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data?.length) {
      return [];
    }

    const rows = data as SupabaseProjectRow[];
    const projectIds = rows.map((row) => row.id);
    const [tags, tools, gallery, highlights] = await Promise.all([
      supabase.from("project_tags").select("*").in("project_id", projectIds).order("name"),
      supabase.from("project_tools").select("*").in("project_id", projectIds).order("name"),
      supabase
        .from("project_gallery")
        .select("*")
        .in("project_id", projectIds)
        .order("sort_order", { ascending: true }),
      supabase
        .from("project_highlights")
        .select("*")
        .in("project_id", projectIds)
        .order("sort_order", { ascending: true }),
    ]);

    if (tags.error || tools.error || gallery.error || highlights.error) {
      return [];
    }

    const tagsByProject = groupByProjectId((tags.data ?? []) as SupabaseProjectTagRow[]);
    const toolsByProject = groupByProjectId((tools.data ?? []) as SupabaseProjectToolRow[]);
    const galleryByProject = groupByProjectId(
      (gallery.data ?? []) as SupabaseProjectGalleryRow[]
    );
    const highlightsByProject = groupByProjectId(
      (highlights.data ?? []) as SupabaseProjectHighlightRow[]
    );

    return rows.map((row) =>
      mapProject(
        row,
        tagsByProject[row.id] ?? [],
        toolsByProject[row.id] ?? [],
        galleryByProject[row.id] ?? [],
        highlightsByProject[row.id] ?? []
      )
    );
  } catch {
    return [];
  }
});

export async function getFeaturedPublicDesignProjects() {
  const projects = await getPublicDesignProjects();
  return projects.filter((project) => project.featured);
}

export async function getPublicDesignProjectBySlug(slug: string) {
  const projects = await getPublicDesignProjects();
  return projects.find((project) => project.slug === slug);
}
