import { NextResponse } from "next/server";

import {
  hasSupabaseAdminEnv,
  hasSupabasePublicEnv,
} from "@/lib/supabase/env";

export function GET() {
  const publicEnv = hasSupabasePublicEnv();
  const adminEnv = hasSupabaseAdminEnv();

  return NextResponse.json({
    configured: publicEnv,
    publicEnv,
    adminEnv,
    timestamp: new Date().toISOString(),
  });
}
