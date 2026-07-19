import { hasSupabasePublicEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type { SupabaseExperienceRow } from "@/lib/supabase/types";

export type PublicExperience = {
  id: string;
  title: string;
  organization: string;
  description: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  type: string;
  sortOrder: number;
};

function clean(value: string | null | undefined) {
  return value?.trim() ?? "";
}

function mapExperience(row: SupabaseExperienceRow): PublicExperience {
  return {
    id: row.id,
    title: row.title,
    organization: clean(row.organization),
    description: clean(row.description),
    startDate: clean(row.start_date),
    endDate: clean(row.end_date),
    isCurrent: row.is_current,
    type: row.type,
    sortOrder: row.sort_order,
  };
}

export async function getPublicExperiences(): Promise<PublicExperience[]> {
  if (!hasSupabasePublicEnv()) {
    return [];
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("experiences")
      .select("*")
      .eq("visible", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });

    if (error || !data) {
      return [];
    }

    return data.map(mapExperience);
  } catch {
    return [];
  }
}
