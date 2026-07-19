"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createExperience,
  deleteExperience,
  toggleExperienceVisibility,
  updateExperience,
} from "@/lib/admin/experiences";
import { requireAdmin } from "@/lib/auth/admin";
import type { ExperienceInput } from "@/types/admin";

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

function go(message: string, type: "success" | "error") {
  redirect(`/admin/experiencias?type=${type}&message=${encodeURIComponent(message)}`);
}

async function ensureAdminAction() {
  const admin = await requireAdmin();

  if (!admin.isAdmin) {
    redirect("/login");
  }
}

function readExperience(formData: FormData): ExperienceInput {
  return {
    title: value(formData, "title"),
    organization: value(formData, "organization"),
    description: value(formData, "description"),
    startDate: value(formData, "startDate"),
    endDate: value(formData, "endDate"),
    isCurrent: checked(formData, "isCurrent"),
    type: value(formData, "type") || "general",
    sortOrder: numberValue(formData, "sortOrder"),
    visible: checked(formData, "visible"),
  };
}

function validateExperience(input: ExperienceInput) {
  if (!input.title) {
    return "Título é obrigatório.";
  }

  if (input.startDate && input.endDate && !input.isCurrent && input.endDate < input.startDate) {
    return "A data de fim não pode ser anterior à data de início.";
  }

  return null;
}

function refresh() {
  revalidatePath("/admin");
  revalidatePath("/admin/experiencias");
  revalidatePath("/");
}

export async function createExperienceAction(formData: FormData) {
  await ensureAdminAction();
  const input = readExperience(formData);
  const validation = validateExperience(input);

  if (validation) {
    go(validation, "error");
  }

  const result = await createExperience(input);
  refresh();
  go(result.message, result.ok ? "success" : "error");
}

export async function updateExperienceAction(formData: FormData) {
  await ensureAdminAction();
  const id = value(formData, "id");

  if (!id) {
    go("Experiência não encontrada.", "error");
  }

  const input = readExperience(formData);
  const validation = validateExperience(input);

  if (validation) {
    go(validation, "error");
  }

  const result = await updateExperience(id, input);
  refresh();
  go(result.message, result.ok ? "success" : "error");
}

export async function deleteExperienceAction(formData: FormData) {
  await ensureAdminAction();
  const id = value(formData, "id");

  if (!id) {
    go("Experiência não encontrada.", "error");
  }

  const result = await deleteExperience(id);
  refresh();
  go(result.message, result.ok ? "success" : "error");
}

export async function toggleExperienceVisibilityAction(formData: FormData) {
  await ensureAdminAction();
  const id = value(formData, "id");
  const visible = value(formData, "visible") === "true";

  if (!id) {
    go("Experiência não encontrada.", "error");
  }

  const result = await toggleExperienceVisibility(id, visible);
  refresh();
  go(result.message, result.ok ? "success" : "error");
}
