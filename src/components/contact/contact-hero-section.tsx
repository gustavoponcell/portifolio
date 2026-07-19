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
        title="Vamos conversar?"
        description="Se você tem uma oportunidade, projeto, parceria ou ideia que combina com design e desenvolvimento, pode me chamar por um dos canais disponíveis."
        accent="dev"
      />

      <BrutalCard className="bg-dev brutal-card-accent ink-on-accent">
        <p className="text-xs font-black uppercase tracking-[0.2em]">
          Gustavo Poncell
        </p>
        <h2 className="mt-3 text-2xl font-black">{profile.displayName}</h2>
        <p className="mt-2 font-bold">{profile.headline}</p>
      </BrutalCard>
    </section>
  );
}
