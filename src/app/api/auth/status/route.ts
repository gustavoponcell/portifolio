import { NextResponse } from "next/server";

import { getAdminStatus, hasConfiguredAdminEmail } from "@/lib/auth/admin";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";

export async function GET() {
  const adminStatus = await getAdminStatus();

  return NextResponse.json({
    supabaseConfigured: hasSupabasePublicEnv(),
    adminEmailConfigured: hasConfiguredAdminEmail(),
    authenticated: adminStatus.isAuthenticated,
    isAdmin: adminStatus.isAdmin,
    timestamp: new Date().toISOString(),
  });
}
