type SupabasePublicEnv = {
  url: string;
  key: string;
  keySource: "publishable" | "anon";
};

type SupabaseAdminEnv = {
  url: string;
  key: string;
  keySource: "secret" | "service_role";
};

function clean(value: string | undefined) {
  return value?.trim() ?? "";
}

export function getSupabasePublicEnv(): SupabasePublicEnv | null {
  const url = clean(process.env.NEXT_PUBLIC_SUPABASE_URL);
  const publishableKey = clean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
  const anonKey = clean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  const key = publishableKey || anonKey;

  if (!url || !key) {
    return null;
  }

  return {
    url,
    key,
    keySource: publishableKey ? "publishable" : "anon",
  };
}

export function getSupabaseAdminEnv(): SupabaseAdminEnv | null {
  const publicEnv = getSupabasePublicEnv();
  const secretKey = clean(process.env.SUPABASE_SECRET_KEY);
  const serviceRoleKey = clean(process.env.SUPABASE_SERVICE_ROLE_KEY);
  const key = secretKey || serviceRoleKey;

  if (!publicEnv || !key) {
    return null;
  }

  return {
    url: publicEnv.url,
    key,
    keySource: secretKey ? "secret" : "service_role",
  };
}

export function hasSupabasePublicEnv() {
  return getSupabasePublicEnv() !== null;
}

export function hasSupabaseAdminEnv() {
  return getSupabaseAdminEnv() !== null;
}

export function requireSupabasePublicEnv() {
  const env = getSupabasePublicEnv();

  if (!env) {
    throw new Error(
      "Supabase publico nao configurado. Defina NEXT_PUBLIC_SUPABASE_URL e NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ou NEXT_PUBLIC_SUPABASE_ANON_KEY."
    );
  }

  return env;
}

export function requireSupabaseAdminEnv() {
  const env = getSupabaseAdminEnv();

  if (!env) {
    throw new Error(
      "Supabase admin nao configurado. Defina as envs publicas e SUPABASE_SECRET_KEY ou SUPABASE_SERVICE_ROLE_KEY somente no servidor."
    );
  }

  return env;
}
