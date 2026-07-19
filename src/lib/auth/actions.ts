"use server";

import { redirect } from "next/navigation";

import { getConfiguredAdminEmail, normalizeEmail } from "@/lib/auth/admin";
import type { LoginActionState } from "@/lib/auth/types";
import { createClient } from "@/lib/supabase/server";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";

const invalidCredentialsMessage =
  "Não foi possível entrar. Confira o e-mail, a senha e sua permissão de acesso.";

export async function signInWithPasswordAction(
  _previousState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const email = normalizeEmail(String(formData.get("email") ?? ""));
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return {
      status: "error",
      message: "Informe e-mail e senha para acessar a área restrita.",
    };
  }

  if (!hasSupabasePublicEnv()) {
    return {
      status: "error",
      message: "O acesso restrito está temporariamente indisponível.",
    };
  }

  const adminEmail = getConfiguredAdminEmail();

  if (!adminEmail) {
    return {
      status: "error",
      message: "O acesso restrito está temporariamente indisponível.",
    };
  }

  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return {
      status: "error",
      message: invalidCredentialsMessage,
    };
  }

  const signedEmail = normalizeEmail(data.user.email);

  if (!signedEmail || signedEmail !== adminEmail) {
    await supabase.auth.signOut();

    return {
      status: "error",
      message: "Este usuário não tem permissão para acessar o painel.",
    };
  }

  redirect("/admin");
}

export async function signOutAction() {
  if (hasSupabasePublicEnv()) {
    try {
      const supabase = await createClient();
      await supabase.auth.signOut();
    } catch {
      // Logout should remain safe even when the session is already gone.
    }
  }

  redirect("/login");
}
