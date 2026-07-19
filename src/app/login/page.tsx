import { redirect } from "next/navigation";

import { AuthStatusCard } from "@/components/auth/auth-status-card";
import { LoginForm } from "@/components/auth/login-form";
import { LogoutButton } from "@/components/auth/logout-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";
import { getAdminStatus, hasConfiguredAdminEmail } from "@/lib/auth/admin";
import { noIndexMetadata } from "@/lib/seo/metadata";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";

export const metadata = noIndexMetadata;
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  const adminStatus = await getAdminStatus();
  const supabaseConfigured = hasSupabasePublicEnv();
  const adminEmailConfigured = hasConfiguredAdminEmail();

  if (adminStatus.isAdmin) {
    redirect("/admin");
  }

  const loginDisabled = !supabaseConfigured || !adminEmailConfigured;

  return (
    <div className="brutal-section grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem]">
      <div className="space-y-8">
        <SectionHeading
          eyebrow="Login"
          title="Acesso restrito"
          description="Entre com a conta autorizada para gerenciar o conteúdo do portfólio."
        />

        {adminStatus.isAuthenticated && !adminStatus.isAdmin ? (
          <BrutalCard className="space-y-4">
            <h2 className="text-2xl font-black">Sessao sem permissao</h2>
            <p className="leading-7">
              Existe uma sessão autenticada, mas ela não corresponde ao e-mail
              autorizado para o painel. Saia e entre com a conta correta.
            </p>
            <LogoutButton />
          </BrutalCard>
        ) : null}

        <LoginForm disabled={loginDisabled} />
      </div>

      <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
        <AuthStatusCard />
        <BrutalCard className="space-y-3">
          <h2 className="text-2xl font-black">Sem cadastro público</h2>
          <p className="leading-7">
            O acesso é exclusivo para a conta responsável pelo portfólio. Não é
            possível criar novas contas por esta página.
          </p>
        </BrutalCard>
      </aside>
    </div>
  );
}
