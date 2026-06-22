import { NextResponse } from "next/server";

import { getGitHubRepositories } from "@/lib/github";
import { requireAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseAdminEnv, hasSupabasePublicEnv } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  const githubResult = await getGitHubRepositories();
  const adminClientConfigured = hasSupabaseAdminEnv();
  let canReadCurations = false;

  if (admin.isAdmin && adminClientConfigured) {
    try {
      const supabase = createAdminClient();
      const { error } = await supabase
        .from("github_repository_curations")
        .select("id")
        .limit(1);

      canReadCurations = !error;
    } catch {
      canReadCurations = false;
    }
  }

  return NextResponse.json({
    authenticated: admin.isAuthenticated,
    isAdmin: admin.isAdmin,
    supabaseConfigured: hasSupabasePublicEnv(),
    adminClientConfigured,
    githubSource: githubResult.source,
    canReadCurations,
    repositoryCount: githubResult.repositories.length,
    timestamp: new Date().toISOString(),
  });
}
