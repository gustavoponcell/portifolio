import { NextResponse } from "next/server";

import { MEDIA_BUCKET } from "@/config/media";
import { requireAdmin } from "@/lib/auth/admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { hasSupabaseAdminEnv, hasSupabasePublicEnv } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export async function GET() {
  const admin = await requireAdmin();
  const adminClientConfigured = hasSupabaseAdminEnv();
  let storageReady = false;

  if (admin.isAdmin && adminClientConfigured) {
    try {
      const supabase = createAdminClient();
      const { data, error } = await supabase.storage.getBucket(MEDIA_BUCKET);
      storageReady = !error && data?.name === MEDIA_BUCKET;
    } catch {
      storageReady = false;
    }
  }

  return NextResponse.json({
    authenticated: admin.isAuthenticated,
    isAdmin: admin.isAdmin,
    supabaseConfigured: hasSupabasePublicEnv(),
    adminClientConfigured,
    bucketName: MEDIA_BUCKET,
    storageReady,
    timestamp: new Date().toISOString(),
  });
}
