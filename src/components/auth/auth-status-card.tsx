import { BrutalCard } from "@/components/brand/brutal-card";
import { hasConfiguredAdminEmail } from "@/lib/auth/admin";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";

export function AuthStatusCard() {
  const supabaseConfigured = hasSupabasePublicEnv();
  const adminEmailConfigured = hasConfiguredAdminEmail();

  const statusItems = [
    {
      label: "Conexão Supabase",
      value: supabaseConfigured ? "sim" : "não",
      tone: supabaseConfigured ? "bg-dev ink-on-accent border-[#111111]" : "bg-design ink-on-accent border-[#111111]",
    },
    {
      label: "Admin autorizado",
      value: adminEmailConfigured ? "sim" : "não",
      tone: adminEmailConfigured ? "bg-dev ink-on-accent border-[#111111]" : "bg-design ink-on-accent border-[#111111]",
    },
  ];

  return (
    <BrutalCard className="space-y-5">
      <div>
        <h2 className="text-2xl font-black">Status da autenticação</h2>
        <p className="mt-2 leading-7">
          Este card mostra apenas se o ambiente esta pronto para login. Nenhuma
          chave, token, cookie ou e-mail autorizado aparece na interface.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {statusItems.map((item) => (
          <div key={item.label} className="brutal-border bg-card p-4">
            <p className="text-xs font-black uppercase tracking-[0.18em]">
              {item.label}
            </p>
            <p className={`mt-3 inline-flex brutal-border px-3 py-1 font-black ${item.tone}`}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {!supabaseConfigured || !adminEmailConfigured ? (
        <div className="technical-note px-4 py-3">
          <p className="font-black">Configuração pendente</p>
          <p className="mt-2 leading-7">
            Configure as variáveis públicas do Supabase e o e-mail do
            administrador no arquivo de ambiente local para habilitar o login.
          </p>
        </div>
      ) : null}
    </BrutalCard>
  );
}
