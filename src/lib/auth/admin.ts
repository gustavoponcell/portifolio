import { getCurrentUser } from "@/lib/auth/session";
import type { AdminCheckResult } from "@/lib/auth/types";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";

export function normalizeEmail(email: string | null | undefined) {
  return email?.trim().toLowerCase() ?? "";
}

export function getConfiguredAdminEmail() {
  return normalizeEmail(process.env.ADMIN_EMAIL);
}

export function hasConfiguredAdminEmail() {
  return Boolean(getConfiguredAdminEmail());
}

export async function getAdminStatus(): Promise<AdminCheckResult> {
  if (!hasSupabasePublicEnv()) {
    return {
      isAuthenticated: false,
      isAdmin: false,
      email: null,
      reason: "supabase_not_configured",
    };
  }

  const adminEmail = getConfiguredAdminEmail();

  if (!adminEmail) {
    return {
      isAuthenticated: false,
      isAdmin: false,
      email: null,
      reason: "admin_email_not_configured",
    };
  }

  const user = await getCurrentUser();

  if (!user) {
    return {
      isAuthenticated: false,
      isAdmin: false,
      email: null,
      reason: "not_authenticated",
    };
  }

  const userEmail = normalizeEmail(user.email);

  if (!userEmail) {
    return {
      isAuthenticated: true,
      isAdmin: false,
      email: null,
      reason: "missing_user_email",
    };
  }

  const isAdmin = userEmail === adminEmail;

  return {
    isAuthenticated: true,
    isAdmin,
    email: user.email,
    reason: isAdmin ? "ok" : "not_allowed",
  };
}

export async function requireAdmin() {
  return getAdminStatus();
}
