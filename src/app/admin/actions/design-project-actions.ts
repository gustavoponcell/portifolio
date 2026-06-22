"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createDesignProject,
  deleteDesignProject,
  toggleDesignProjectFeatured,
  updateDesignProject,
  updateDesignProjectStatus,
} from "@/lib/admin/design-projects";
import { requireAdmin } from "@/lib/auth/admin";
import type {
  AdminDesignProjectInput,
  AdminProjectGalleryItem,
  AdminProjectStatus,
} from "@/types/admin";

const allowedStatuses: AdminProjectStatus[] = [
  "draft",
  "published",
  "archived",
  "mock",
];

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function checked(formData: FormData, key: string) {
  return formData.get(key) === "on";
}

function numberValue(formData: FormData, key: string) {
  const number = Number(value(formData, key));
  return Number.isFinite(number) ? number : 0;
}

function listValue(formData: FormData, key: string) {
  return Array.from(
    new Set(
      value(formData, key)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );
}

function lineValue(formData: FormData, key: string) {
  return Array.from(
    new Set(
      value(formData, key)
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean)
    )
  );
}

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

function isValidOptionalUrl(url: string) {
  if (!url) {
    return true;
  }

  try {
    const parsed = new URL(url);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function parseGallery(formData: FormData): Omit<AdminProjectGalleryItem, "id">[] {
  return lineValue(formData, "gallery").map((line, index) => {
    const [title, description = "", imageUrl = ""] = line
      .split("|")
      .map((item) => item.trim());

    return {
      title,
      description,
      imageUrl,
      sortOrder: (index + 1) * 10,
    };
  });
}

function go(message: string, type: "success" | "error") {
  redirect(
    `/admin/projetos/design?type=${type}&message=${encodeURIComponent(message)}`
  );
}

async function ensureAdminAction() {
  const admin = await requireAdmin();

  if (!admin.isAdmin) {
    redirect("/login");
  }
}

function readStatus(formData: FormData): AdminProjectStatus {
  const status = value(formData, "status") as AdminProjectStatus;
  return allowedStatuses.includes(status) ? status : "draft";
}

function readDesignProject(formData: FormData): AdminDesignProjectInput {
  const title = value(formData, "title");
  const slug = slugify(value(formData, "slug") || title);

  return {
    slug,
    title,
    description: value(formData, "description"),
    summary: value(formData, "summary"),
    status: readStatus(formData),
    featured: checked(formData, "featured"),
    coverUrl: value(formData, "coverUrl"),
    year: value(formData, "year"),
    role: value(formData, "role"),
    externalUrl: value(formData, "externalUrl"),
    sortOrder: numberValue(formData, "sortOrder"),
    tags: listValue(formData, "tags"),
    tools: listValue(formData, "tools"),
    gallery: parseGallery(formData),
    highlights: lineValue(formData, "highlights").map((content, index) => ({
      content,
      sortOrder: (index + 1) * 10,
    })),
  };
}

function validateProject(input: AdminDesignProjectInput) {
  if (!input.title) {
    return "Titulo e obrigatorio.";
  }

  if (!input.slug) {
    return "Slug e obrigatorio.";
  }

  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug)) {
    return "Slug deve usar apenas letras minusculas, numeros e hifens.";
  }

  if (!input.description) {
    return "Descricao e obrigatoria.";
  }

  if (!isValidOptionalUrl(input.coverUrl)) {
    return "URL de capa deve comecar com http:// ou https://.";
  }

  if (!isValidOptionalUrl(input.externalUrl)) {
    return "Link externo deve comecar com http:// ou https://.";
  }

  const invalidGalleryUrl = input.gallery.find(
    (item) => !isValidOptionalUrl(item.imageUrl)
  );

  if (invalidGalleryUrl) {
    return "URLs da galeria devem comecar com http:// ou https://.";
  }

  return null;
}

function refresh(slug?: string, previousSlug?: string) {
  revalidatePath("/admin");
  revalidatePath("/admin/projetos/design");
  revalidatePath("/");
  revalidatePath("/design");

  if (slug) {
    revalidatePath(`/projetos/${slug}`);
  }

  if (previousSlug && previousSlug !== slug) {
    revalidatePath(`/projetos/${previousSlug}`);
  }
}

export async function createDesignProjectAction(formData: FormData) {
  await ensureAdminAction();
  const input = readDesignProject(formData);
  const validation = validateProject(input);

  if (validation) {
    go(validation, "error");
  }

  const result = await createDesignProject(input);
  refresh(input.slug);
  go(result.message, result.ok ? "success" : "error");
}

export async function updateDesignProjectAction(formData: FormData) {
  await ensureAdminAction();
  const id = value(formData, "id");
  const previousSlug = value(formData, "previousSlug");

  if (!id) {
    go("Projeto Design nao encontrado.", "error");
  }

  const input = readDesignProject(formData);
  const validation = validateProject(input);

  if (validation) {
    go(validation, "error");
  }

  const result = await updateDesignProject(id, input);
  refresh(input.slug, previousSlug);
  go(result.message, result.ok ? "success" : "error");
}

export async function deleteDesignProjectAction(formData: FormData) {
  await ensureAdminAction();
  const id = value(formData, "id");
  const slug = value(formData, "slug");

  if (!id) {
    go("Projeto Design nao encontrado.", "error");
  }

  const result = await deleteDesignProject(id);
  refresh(slug);
  go(result.message, result.ok ? "success" : "error");
}

export async function updateDesignProjectStatusAction(formData: FormData) {
  await ensureAdminAction();
  const id = value(formData, "id");
  const slug = value(formData, "slug");
  const status = readStatus(formData);

  if (!id) {
    go("Projeto Design nao encontrado.", "error");
  }

  const result = await updateDesignProjectStatus(id, status);
  refresh(slug);
  go(result.message, result.ok ? "success" : "error");
}

export async function toggleDesignProjectFeaturedAction(formData: FormData) {
  await ensureAdminAction();
  const id = value(formData, "id");
  const slug = value(formData, "slug");
  const featured = value(formData, "featured") === "true";

  if (!id) {
    go("Projeto Design nao encontrado.", "error");
  }

  const result = await toggleDesignProjectFeatured(id, featured);
  refresh(slug);
  go(result.message, result.ok ? "success" : "error");
}
