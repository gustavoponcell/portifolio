"use server";

import { redirect } from "next/navigation";

import { getConfiguredAdminEmail, normalizeEmail } from "@/lib/auth/admin";
import type { LoginActionState } from "@/lib/auth/types";
import { createClient } from "@/lib/supabase/server";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";

const invalidCredentialsMessage =
  "Nao foi possivel entrar. Confira e-mail, senha e permissao de admin.";

export async function signInWithPasswordAction(
  _previousState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const email = normalizeEmail(String(formData.get("email") ?? ""));
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return {
      status: "error",
      message: "Informe e-mail e senha para acessar o admin.",
    };
  }

  if (!hasSupabasePublicEnv()) {
    return {
      status: "error",
      message:
        "A conexao publica com o Supabase ainda nao esta configurada no ambiente local.",
    };
  }

  const adminEmail = getConfiguredAdminEmail();

  if (!adminEmail) {
    return {
      status: "error",
      message:
        "O e-mail administrador ainda nao foi configurado no ambiente local.",
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
      message: "Este usuario nao tem permissao para acessar o painel.",
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
