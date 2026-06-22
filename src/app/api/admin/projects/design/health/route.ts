import { NextResponse } from "next/server";

import { createAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseAdminEnv, hasSupabasePublicEnv } from "@/lib/supabase/env";
import { requireAdmin } from "@/lib/auth/admin";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  const supabaseConfigured = hasSupabasePublicEnv();
  const adminClientConfigured = hasSupabaseAdminEnv();
  let canReadDesignProjects = false;

  if (admin.isAdmin && adminClientConfigured) {
    try {
      const supabase = createAdminClient();
      const { error } = await supabase
        .from("projects")
        .select("id")
        .eq("type", "design")
        .limit(1);

      canReadDesignProjects = !error;
    } catch {
      canReadDesignProjects = false;
    }
  }

  return NextResponse.json({
    authenticated: admin.isAuthenticated,
    isAdmin: admin.isAdmin,
    supabaseConfigured,
    adminClientConfigured,
    canReadDesignProjects,
    timestamp: new Date().toISOString(),
  });
}
