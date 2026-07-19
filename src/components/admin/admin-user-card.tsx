import { LogoutButton } from "@/components/auth/logout-button";
import { BrutalCard } from "@/components/brand/brutal-card";

type AdminUserCardProps = {
  email: string | null;
};

export function AdminUserCard({ email }: AdminUserCardProps) {
  return (
    <BrutalCard className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.18em]">
          Sessao autorizada
        </p>
        <h2 className="mt-2 text-3xl font-black">Bem-vindo ao admin</h2>
        <p className="mt-2 leading-7">
          Usuário autenticado: <strong>{email ?? "e-mail não disponível"}</strong>
        </p>
      </div>
      <LogoutButton />
    </BrutalCard>
  );
}
