import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";

export function ContactEmptyState() {
  return (
    <BrutalCard className="space-y-5 bg-muted">
      <div className="space-y-3">
        <p className="text-xs font-black uppercase tracking-[0.2em]">
          Contatos pendentes
        </p>
        <h2 className="text-3xl font-black">Nenhum canal publico cadastrado.</h2>
        <p className="max-w-3xl leading-7">
          O site esta pronto para exibir e-mail, telefone, WhatsApp e redes
          sociais, mas nao publica placeholders. Cadastre dados reais em
          `/admin/perfil` para eles aparecerem aqui.
        </p>
      </div>

      <BrutalButton href="/admin/perfil" variant="outline">
        Editar perfil
      </BrutalButton>
    </BrutalCard>
  );
}
