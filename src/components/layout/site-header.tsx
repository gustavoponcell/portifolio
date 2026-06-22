"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/layout/container";
import { ModeSwitcher } from "@/components/layout/mode-switcher";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b-4 border-foreground bg-background/95 py-4 backdrop-blur">
      <Container className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between lg:justify-start">
          <Link href="/" className="group no-underline" aria-label="Ir para a página inicial">
            <span className="block text-lg font-black leading-none">
              {siteConfig.name}
            </span>
            <span className="mt-1 block text-xs font-bold uppercase tracking-[0.18em]">
              {siteConfig.shortTitle}
            </span>
          </Link>

          <ModeSwitcher />
        </div>

        <nav
          aria-label="Navegacao principal"
          className="flex flex-wrap items-center gap-2"
        >
          {siteConfig.mainNav.map((item) => {
            const active = isActive(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "brutal-border bg-card px-3 py-2 text-sm font-black no-underline transition-transform hover:-translate-y-0.5",
                  active && "bg-muted shadow-[3px_3px_0_var(--color-border)]"
                )}
              >
                {item.title}
              </Link>
            );
          })}

          <Link
            href={siteConfig.adminNav.href}
            aria-current={isActive(pathname, siteConfig.adminNav.href) ? "page" : undefined}
            className={cn(
              "brutal-border bg-foreground px-3 py-2 text-sm font-black text-background no-underline transition-transform hover:-translate-y-0.5",
              isActive(pathname, siteConfig.adminNav.href) &&
                "bg-card text-foreground shadow-[3px_3px_0_var(--color-border)]"
            )}
          >
            {siteConfig.adminNav.title}
          </Link>
        </nav>
      </Container>
    </header>
  );
}
