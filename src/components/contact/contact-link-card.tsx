import type { PublicContactLink } from "@/lib/public-profile";

type ContactLinkCardProps = {
  link: PublicContactLink;
};

export function ContactLinkCard({ link }: ContactLinkCardProps) {
  return (
    <a
      className="brutal-card block p-5 no-underline transition-transform hover:-translate-y-1"
      href={link.href}
      rel={link.external ? "noreferrer" : undefined}
      target={link.external ? "_blank" : undefined}
    >
      <span className="text-xs font-black uppercase tracking-[0.2em]">
        {link.label}
      </span>
      <span className="mt-3 block break-words text-2xl font-black">
        {link.value}
      </span>
      <span className="mt-4 block text-sm font-bold">
        {link.external ? "Abrir link externo" : "Abrir contato"}
      </span>
    </a>
  );
}
