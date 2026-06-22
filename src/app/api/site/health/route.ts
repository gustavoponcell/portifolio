import { NextResponse } from "next/server";

import { siteConfig } from "@/config/site";
import { getAllProjects } from "@/lib/projects";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";

export async function GET() {
  const projects = getAllProjects();

  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    siteUrlConfigured: process.env.NEXT_PUBLIC_SITE_URL?.trim()
      ? true
      : false,
    supabasePublicConfigured: hasSupabasePublicEnv(),
    githubUsernameConfigured: Boolean(siteConfig.githubUsername),
    publicRoutes: siteConfig.publicRoutes.length,
    publicProjects: projects.length,
  });
}
