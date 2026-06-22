import { MEDIA_BUCKET } from "@/config/media";
import { BrutalCard } from "@/components/brand/brutal-card";

type StorageStatusCardProps = {
  configured: boolean;
};

export function StorageStatusCard({ configured }: StorageStatusCardProps) {
  return (
    <BrutalCard
      className={
        configured
          ? "bg-dev brutal-card-accent ink-on-accent"
          : "bg-design brutal-card-accent ink-on-accent"
      }
    >
      <p className="text-xs font-black uppercase tracking-[0.18em]">Storage</p>
      <h2 className="mt-2 text-2xl font-black">
        {configured ? "Supabase Storage configurado" : "Storage pendente"}
      </h2>
      <p className="mt-2 leading-7">
        Bucket esperado: <span className="font-black">{MEDIA_BUCKET}</span>.{" "}
        {configured
          ? "Uploads usam client admin somente no servidor."
          : "Configure Supabase publico e chave admin server-side para habilitar upload."}
      </p>
    </BrutalCard>
  );
}
