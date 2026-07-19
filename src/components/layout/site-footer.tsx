import Link from "next/link";

import { Container } from "@/components/layout/container";
import { siteConfig } from "@/config/site";

const footerLinks = [...siteConfig.mainNav, siteConfig.restrictedNav];

export function SiteFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-4 border-foreground bg-card py-10 text-foreground">
      <Container className="grid gap-8 md:grid-cols-[1.2fr_1fr_1fr] md:items-start">
        <div className="space-y-3">
          <p className="text-2xl font-black">{siteConfig.name}</p>
          <p className="font-bold">{siteConfig.shortTitle}</p>
          <p className="max-w-md text-sm leading-6 text-muted-foreground">
            Eu conecto design gráfico, interfaces e desenvolvimento web para
            criar projetos digitais com identidade, clareza e função.
          </p>
        </div>

        <nav aria-label="Links do rodapé" className="space-y-3">
          <p className="text-sm font-black uppercase tracking-[0.2em]">
            Navegação
          </p>
          <div className="flex flex-wrap gap-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="brutal-border bg-background px-3 py-2 text-sm font-black text-foreground no-underline hover:bg-muted"
              >
                {link.title}
              </Link>
            ))}
          </div>
        </nav>

        <div className="space-y-3 md:text-right">
          <p className="text-sm font-black uppercase tracking-[0.2em]">
            Portfólio
          </p>
          <p className="text-sm leading-6 text-muted-foreground">
            Aqui eu reúno meus projetos, experiências e caminhos para a gente
            conversar sobre oportunidades, parcerias e novas ideias.
          </p>
          <p className="text-sm font-bold">&copy; {currentYear}</p>
        </div>
      </Container>
    </footer>
  );
}
