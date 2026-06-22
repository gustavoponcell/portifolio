"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const modes = [
  {
    label: "Design",
    href: "/design",
    className: "bg-design",
  },
  {
    label: "Dev",
    href: "/dev",
    className: "bg-dev",
  },
];

function isModeActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function ModeSwitcher() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Alternar entre modo Design e modo Dev"
      className="brutal-border flex w-full overflow-hidden bg-card sm:w-auto"
    >
      {modes.map((mode) => {
        const active = isModeActive(pathname, mode.href);

        return (
          <Link
            key={mode.href}
            href={mode.href}
            aria-current={active ? "page" : undefined}
            className={cn(
              "flex-1 px-3 py-2 text-center text-xs font-black uppercase tracking-wide no-underline transition-transform hover:-translate-y-0.5 sm:flex-none",
              active
                ? `${mode.className} ink-on-accent border-[#111111]`
                : "bg-card hover:bg-muted",
              mode.href === "/dev" && "border-l-4 border-foreground"
            )}
          >
            {mode.label}
          </Link>
        );
      })}
    </nav>
  );
}
