"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { requireAdmin } from "@/lib/auth/admin";
import { upsertProfile } from "@/lib/admin/profile";
import type { ProfileInput } from "@/types/admin";

function value(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

function isEmail(input: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
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
  redirect(`/admin/perfil?type=${type}&message=${encodeURIComponent(message)}`);
}

export async function saveProfileAction(formData: FormData) {
  const admin = await requireAdmin();

  if (!admin.isAdmin) {
    redirect("/login");
  }

  const input: ProfileInput = {
    fullName: value(formData, "fullName"),
    displayName: value(formData, "displayName"),
    headline: value(formData, "headline"),
    bio: value(formData, "bio"),
    avatarUrl: value(formData, "avatarUrl"),
    emailPublic: value(formData, "emailPublic"),
    phonePublic: value(formData, "phonePublic"),
    whatsappUrl: value(formData, "whatsappUrl"),
    githubUrl: value(formData, "githubUrl"),
    behanceUrl: value(formData, "behanceUrl"),
    linkedinUrl: value(formData, "linkedinUrl"),
    instagramUrl: value(formData, "instagramUrl"),
  };

  if (!input.fullName) {
    go("Nome completo e obrigatorio.", "error");
  }

  if (input.emailPublic && !isEmail(input.emailPublic)) {
    go("E-mail publico invalido.", "error");
  }

  const urls = [
    input.avatarUrl,
    input.whatsappUrl,
    input.githubUrl,
    input.behanceUrl,
    input.linkedinUrl,
    input.instagramUrl,
  ];

  if (urls.some((url) => !isUrl(url))) {
    go("Preencha URLs completas com http:// ou https://.", "error");
  }

  const result = await upsertProfile(input);

  revalidatePath("/admin");
  revalidatePath("/admin/perfil");
  revalidatePath("/");

  go(result.message, result.ok ? "success" : "error");
}
