import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";

type BrutalButtonVariant = "default" | "design" | "dev" | "outline";

type BrutalButtonBaseProps = {
  variant?: BrutalButtonVariant;
  className?: string;
  children: React.ReactNode;
};

type BrutalButtonLinkProps = BrutalButtonBaseProps &
  Omit<React.ComponentProps<typeof Link>, "className"> & {
    href: string;
  };

type BrutalButtonNativeProps = BrutalButtonBaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className"> & {
    href?: undefined;
  };

type BrutalButtonProps = BrutalButtonLinkProps | BrutalButtonNativeProps;

const variantClasses: Record<BrutalButtonVariant, string> = {
  default: "bg-foreground text-background",
  design: "accent-design",
  dev: "accent-dev",
  outline: "bg-card text-foreground hover:bg-muted",
};

export function BrutalButton({
  variant = "default",
  className,
  children,
  ...props
}: BrutalButtonProps) {
  const classes = cn(
    "brutal-button inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-black uppercase tracking-wide no-underline",
    variantClasses[variant],
    className
  );

  if ("href" in props && props.href) {
    return (
      <Link className={classes} {...props}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as BrutalButtonNativeProps;

  return (
    <button className={classes} type={buttonProps.type ?? "button"} {...buttonProps}>
      {children}
    </button>
  );
}
