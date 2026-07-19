import { NextResponse } from "next/server";

import { siteConfig } from "@/config/site";
import { getPublicDesignProjects } from "@/lib/design-projects";
import { getPublicDevRepositories } from "@/lib/dev-repositories";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";

export async function GET() {
  const [designProjects, devResult] = await Promise.all([
    getPublicDesignProjects(),
    getPublicDevRepositories(),
  ]);

  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    siteUrlConfigured: process.env.NEXT_PUBLIC_SITE_URL?.trim()
      ? true
      : false,
    supabasePublicConfigured: hasSupabasePublicEnv(),
    githubUsernameConfigured: Boolean(siteConfig.githubUsername),
    publicRoutes: siteConfig.publicRoutes.length,
    publicProjects: designProjects.length + devResult.repositories.length,
  });
}
