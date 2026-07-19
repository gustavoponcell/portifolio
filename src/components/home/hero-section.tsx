import { BrutalButton } from "@/components/brand/brutal-button";
import { BrutalCard } from "@/components/brand/brutal-card";
import { ModeBadge } from "@/components/brand/mode-badge";
import { ResponsiveImage } from "@/components/media/responsive-image";
import { siteConfig } from "@/config/site";
import type { PublicProfile } from "@/lib/public-profile";

type HeroSectionProps = {
  profile: PublicProfile;
};

export function HeroSection({ profile }: HeroSectionProps) {
  const heroPhotoUrl = profile.avatarUrl || "/gustavo-poncell-photo.jpg";

  return (
    <section className="brutal-section grid min-h-[calc(100vh-12rem)] items-center gap-10 py-12 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="space-y-7">
        <div className="flex flex-wrap gap-3">
          <ModeBadge mode="hybrid" />
          <ModeBadge mode="design" />
          <ModeBadge mode="dev" />
        </div>

        <div className="space-y-5">
          <p className="brutal-border inline-flex bg-muted px-3 py-1 text-xs font-black uppercase tracking-[0.2em]">
            Portfólio pessoal
          </p>
          <h1 className="max-w-5xl text-balance text-5xl font-black leading-none tracking-tight sm:text-7xl lg:text-8xl">
            {siteConfig.name}
          </h1>
          <p className="text-3xl font-black sm:text-5xl">
            {siteConfig.shortTitle}
          </p>
          <p className="max-w-3xl text-lg font-medium leading-8 sm:text-xl">
            Um portfólio que une criação visual, identidade, interfaces,
            projetos digitais e desenvolvimento web em uma experiência direta,
            expressiva e funcional.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <BrutalButton href="/design" variant="design">
            Ver modo Design
          </BrutalButton>
          <BrutalButton href="/dev" variant="dev">
            Ver modo Dev
          </BrutalButton>
          <BrutalButton href="#projetos" variant="outline">
            Projetos em destaque
          </BrutalButton>
        </div>
      </div>

      <BrutalCard className="relative overflow-hidden bg-card">
        <div className="absolute right-5 top-5 h-12 w-12 brutal-border border-[#111111] bg-design" />
        <div className="absolute right-16 top-20 h-10 w-10 brutal-border border-[#111111] bg-dev" />
        <div className="relative space-y-6 pt-6">
          <div className="w-56 max-w-[75%] -rotate-2 brutal-border border-[#111111] bg-[#f7f3e8] p-2 brutal-shadow-sm">
            <ResponsiveImage
              alt={`Foto de ${profile.displayName}`}
              className="aspect-square w-full object-cover grayscale"
              src={heroPhotoUrl}
            />
          </div>

          <p className="brutal-border inline-flex bg-muted px-3 py-1 text-xs font-black uppercase tracking-[0.2em]">
            Identidade híbrida
          </p>
          <h2 className="max-w-sm text-3xl font-black leading-none">
            Dois modos, uma identidade
          </h2>
          <div className="grid gap-4">
            <div className="brutal-border border-[#111111] bg-design p-4 ink-on-accent">
              <p className="text-2xl font-black">Design</p>
              <p className="mt-2 font-medium">
                Visual, marca, interfaces e apresentação.
              </p>
            </div>
            <div className="brutal-border border-[#111111] bg-dev p-4 ink-on-accent">
              <p className="text-2xl font-black">Dev</p>
              <p className="mt-2 font-medium">
                Código, web, sistemas e produtos digitais.
              </p>
            </div>
          </div>
        </div>
      </BrutalCard>
    </section>
  );
}
