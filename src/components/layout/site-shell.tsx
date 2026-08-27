import * as React from "react";

import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

type SiteShellProps = {
  children: React.ReactNode;
};

export function SiteShell({ children }: SiteShellProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only border-4 border-border bg-background px-4 py-2 text-sm font-black uppercase tracking-[0.2em] text-foreground focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:shadow-[var(--shadow-brutal-sm)]"
      >
        Pular para o conteúdo
      </a>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
