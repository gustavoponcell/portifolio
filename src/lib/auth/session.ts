import { createClient } from "@/lib/supabase/server";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";
import type { AuthUser } from "@/lib/auth/types";

function stringClaim(value: unknown) {
  return typeof value === "string" ? value : null;
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  if (!hasSupabasePublicEnv()) {
    return null;
  }

  try {
    const supabase = await createClient();
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims();
    const claims = claimsData?.claims;
    const userId = stringClaim(claims?.sub);

    if (claimsError || !userId) {
      return null;
    }

    const emailFromClaims = stringClaim(claims?.email);

    if (emailFromClaims) {
      return {
        id: userId,
        email: emailFromClaims,
      };
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();

    if (userError || !userData.user) {
      return {
        id: userId,
        email: null,
      };
    }

    return {
      id: userData.user.id,
      email: userData.user.email ?? null,
    };
  } catch {
    return null;
  }
}

export async function getCurrentUserEmail() {
  const user = await getCurrentUser();

  return user?.email ?? null;
}
