"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  deleteDevRepositoryCuration,
  toggleDevRepositoryFeatured,
  toggleDevRepositoryVisibility,
  upsertDevRepositoryCuration,
} from "@/lib/admin/dev-curation";
import { requireAdmin } from "@/lib/auth/admin";
import type {
  GitHubRepositoryCurationInput,
  GitHubRepositoryCurationStatus,
} from "@/types/github";

const allowedStatuses: GitHubRepositoryCurationStatus[] = [
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

function readStatus(formData: FormData) {
  const status = value(formData, "customStatus") as GitHubRepositoryCurationStatus;
  return allowedStatuses.includes(status) ? status : "published";
}

function go(message: string, type: "success" | "error") {
  redirect(`/admin/projetos/dev?type=${type}&message=${encodeURIComponent(message)}`);
}

async function ensureAdminAction() {
  const admin = await requireAdmin();

  if (!admin.isAdmin) {
    redirect("/login");
  }
}

function readCuration(formData: FormData): GitHubRepositoryCurationInput {
  return {
    repositoryName: value(formData, "repositoryName"),
    customTitle: value(formData, "customTitle"),
    customDescription: value(formData, "customDescription"),
    customSummary: value(formData, "customSummary"),
    customTags: listValue(formData, "customTags"),
    customTools: listValue(formData, "customTools"),
    customStatus: readStatus(formData),
    visible: checked(formData, "visible"),
    featured: checked(formData, "featured"),
    sortOrder: numberValue(formData, "sortOrder"),
  };
}

function validateCuration(input: GitHubRepositoryCurationInput) {
  if (!input.repositoryName) {
    return "Nome do repositório é obrigatório.";
  }

  if (!/^[A-Za-z0-9._-]+$/.test(input.repositoryName)) {
    return "Nome do repositório contém caracteres inválidos.";
  }

  return null;
}

function refresh() {
  revalidatePath("/admin");
  revalidatePath("/admin/projetos/dev");
  revalidatePath("/dev");
  revalidatePath("/");
}

export async function upsertDevRepositoryCurationAction(formData: FormData) {
  await ensureAdminAction();
  const input = readCuration(formData);
  const validation = validateCuration(input);

  if (validation) {
    go(validation, "error");
  }

  const result = await upsertDevRepositoryCuration(input);
  refresh();
  go(result.message, result.ok ? "success" : "error");
}

export async function deleteDevRepositoryCurationAction(formData: FormData) {
  await ensureAdminAction();
  const repositoryName = value(formData, "repositoryName");

  if (!repositoryName) {
    go("Repositório não encontrado.", "error");
  }

  const result = await deleteDevRepositoryCuration(repositoryName);
  refresh();
  go(result.message, result.ok ? "success" : "error");
}

export async function toggleDevRepositoryVisibilityAction(formData: FormData) {
  await ensureAdminAction();
  const repositoryName = value(formData, "repositoryName");
  const visible = value(formData, "visible") === "true";

  if (!repositoryName) {
    go("Repositório não encontrado.", "error");
  }

  const result = await toggleDevRepositoryVisibility(repositoryName, visible);
  refresh();
  go(result.message, result.ok ? "success" : "error");
}

export async function toggleDevRepositoryFeaturedAction(formData: FormData) {
  await ensureAdminAction();
  const repositoryName = value(formData, "repositoryName");
  const featured = value(formData, "featured") === "true";

  if (!repositoryName) {
    go("Repositório não encontrado.", "error");
  }

  const result = await toggleDevRepositoryFeatured(repositoryName, featured);
  refresh();
  go(result.message, result.ok ? "success" : "error");
}
