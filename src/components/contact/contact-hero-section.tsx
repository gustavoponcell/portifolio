import { BrutalCard } from "@/components/brand/brutal-card";
import { SectionHeading } from "@/components/brand/section-heading";
import type { PublicProfile } from "@/lib/public-profile";

type ContactHeroSectionProps = {
  profile: PublicProfile;
};

export function ContactHeroSection({ profile }: ContactHeroSectionProps) {
  return (
    <section className="brutal-section grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
      <SectionHeading
        eyebrow="Contato"
        title="Vamos conversar com clareza."
        description="Esta pagina mostra apenas canais publicos cadastrados. Quando um contato nao existe no perfil, ele fica oculto."
        accent="dev"
      />

      <BrutalCard className="bg-dev brutal-card-accent ink-on-accent">
        <p className="text-xs font-black uppercase tracking-[0.2em]">
          Perfil publico
        </p>
        <h2 className="mt-3 text-2xl font-black">{profile.displayName}</h2>
        <p className="mt-2 font-bold">{profile.headline}</p>
        <p className="mt-4 text-sm font-bold">
          Origem: {profile.source === "supabase" ? "Supabase" : "fallback local"}
        </p>
      </BrutalCard>
    </section>
  );
}
