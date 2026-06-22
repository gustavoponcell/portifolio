import * as React from "react";

import { cn } from "@/lib/utils";

type BrutalCardProps = React.ComponentProps<"div">;

export function BrutalCard({ className, ...props }: BrutalCardProps) {
  return (
    <div
      className={cn("brutal-card p-5 sm:p-6", className)}
      {...props}
    />
  );
}
