import "server-only";

import { createClient } from "@supabase/supabase-js";

import { getSupabasePublicEnv } from "@/lib/supabase/env";
import type { Database } from "@/lib/supabase/types";

export function createPublicClient() {
  const env = getSupabasePublicEnv();

  if (!env) {
    return null;
  }

  return createClient<Database>(env.url, env.key, {
    auth: {
      autoRefreshToken: false,
      detectSessionInUrl: false,
      persistSession: false,
    },
  });
}
