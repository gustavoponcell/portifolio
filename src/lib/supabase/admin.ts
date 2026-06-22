import "server-only";

import { createClient as createSupabaseClient } from "@supabase/supabase-js";

import { requireSupabaseAdminEnv } from "@/lib/supabase/env";

export function createAdminClient() {
  const { url, key } = requireSupabaseAdminEnv();

  return createSupabaseClient(url, key, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
