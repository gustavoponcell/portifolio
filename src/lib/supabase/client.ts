import { createBrowserClient } from "@supabase/ssr";

import { requireSupabasePublicEnv } from "@/lib/supabase/env";
import type { Database } from "@/lib/supabase/types";

export function createClient() {
  const { url, key } = requireSupabasePublicEnv();

  return createBrowserClient<Database>(url, key);
}
