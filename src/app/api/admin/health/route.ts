import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseAdminEnv, hasSupabasePublicEnv } from "@/lib/supabase/env";

export async function GET() {
  const admin = await requireAdmin();
  const adminClientConfigured = hasSupabaseAdminEnv();
  let canReadProfile = false;

  if (admin.isAdmin && adminClientConfigured) {
    try {
      const supabase = createAdminClient();
      const { error } = await supabase.from("profiles").select("id").limit(1);
      canReadProfile = !error;
    } catch {
      canReadProfile = false;
    }
  }

  return NextResponse.json({
    authenticated: admin.isAuthenticated,
    isAdmin: admin.isAdmin,
    supabaseConfigured: hasSupabasePublicEnv(),
    adminClientConfigured,
    canReadProfile,
    timestamp: new Date().toISOString(),
  });
}
