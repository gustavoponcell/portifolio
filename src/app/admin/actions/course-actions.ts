"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  createCourse,
  deleteCourse,
  toggleCourseVisibility,
  updateCourse,
} from "@/lib/admin/courses";
import { requireAdmin } from "@/lib/auth/admin";
import type { CourseInput } from "@/types/admin";

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

function isUrl(input: string) {
  if (!input) {
    return true;
  }

  try {
    const url = new URL(input);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

function go(message: string, type: "success" | "error") {
  redirect(`/admin/cursos?type=${type}&message=${encodeURIComponent(message)}`);
}

async function ensureAdminAction() {
  const admin = await requireAdmin();

  if (!admin.isAdmin) {
    redirect("/login");
  }
}

function readCourse(formData: FormData): CourseInput {
  return {
    title: value(formData, "title"),
    institution: value(formData, "institution"),
    description: value(formData, "description"),
    year: value(formData, "year"),
    certificateUrl: value(formData, "certificateUrl"),
    sortOrder: numberValue(formData, "sortOrder"),
    visible: checked(formData, "visible"),
  };
}

function validateCourse(input: CourseInput) {
  if (!input.title) {
    return "Título é obrigatório.";
  }

  if (!isUrl(input.certificateUrl)) {
    return "URL do certificado deve comecar com http:// ou https://.";
  }

  return null;
}

function refresh() {
  revalidatePath("/admin");
  revalidatePath("/admin/cursos");
  revalidatePath("/");
}

export async function createCourseAction(formData: FormData) {
  await ensureAdminAction();
  const input = readCourse(formData);
  const validation = validateCourse(input);

  if (validation) {
    go(validation, "error");
  }

  const result = await createCourse(input);
  refresh();
  go(result.message, result.ok ? "success" : "error");
}

export async function updateCourseAction(formData: FormData) {
  await ensureAdminAction();
  const id = value(formData, "id");

  if (!id) {
    go("Curso não encontrado.", "error");
  }

  const input = readCourse(formData);
  const validation = validateCourse(input);

  if (validation) {
    go(validation, "error");
  }

  const result = await updateCourse(id, input);
  refresh();
  go(result.message, result.ok ? "success" : "error");
}

export async function deleteCourseAction(formData: FormData) {
  await ensureAdminAction();
  const id = value(formData, "id");

  if (!id) {
    go("Curso não encontrado.", "error");
  }

  const result = await deleteCourse(id);
  refresh();
  go(result.message, result.ok ? "success" : "error");
}

export async function toggleCourseVisibilityAction(formData: FormData) {
  await ensureAdminAction();
  const id = value(formData, "id");
  const visible = value(formData, "visible") === "true";

  if (!id) {
    go("Curso não encontrado.", "error");
  }

  const result = await toggleCourseVisibility(id, visible);
  refresh();
  go(result.message, result.ok ? "success" : "error");
}
