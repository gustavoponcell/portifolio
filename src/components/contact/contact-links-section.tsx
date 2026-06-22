import { ContactEmptyState } from "@/components/contact/contact-empty-state";
import { ContactLinkCard } from "@/components/contact/contact-link-card";
import type { PublicContactLink } from "@/lib/public-profile";

type ContactLinksSectionProps = {
  links: PublicContactLink[];
};

export function ContactLinksSection({ links }: ContactLinksSectionProps) {
  return (
    <section className="brutal-section space-y-6">
      <div className="flex flex-col gap-2">
        <p className="text-sm font-black uppercase tracking-[0.2em]">
          Canais disponiveis
        </p>
        <h2 className="text-3xl font-black sm:text-5xl">
          Escolha o melhor caminho.
        </h2>
      </div>

      {links.length > 0 ? (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {links.map((link) => (
            <ContactLinkCard
              key={`${link.kind}-${link.href}-${link.label}`}
              link={link}
            />
          ))}
        </div>
      ) : (
        <ContactEmptyState />
      )}
    </section>
  );
}
