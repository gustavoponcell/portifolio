import { siteConfig } from "@/config/site";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";
import type {
  SupabaseContactLinkRow,
  SupabaseProfileRow,
} from "@/lib/supabase/types";

export type PublicProfile = {
  fullName: string;
  displayName: string;
  headline: string;
  bio: string;
  avatarUrl: string;
  emailPublic: string;
  phonePublic: string;
  whatsappUrl: string;
  githubUrl: string;
  behanceUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  source: "supabase" | "fallback";
};

export type PublicContactLink = {
  label: string;
  value: string;
  href: string;
  kind: string;
  external: boolean;
};

const fallbackProfile: PublicProfile = {
  fullName: siteConfig.name,
  displayName: siteConfig.name,
  headline: siteConfig.shortTitle,
  bio: siteConfig.description,
  avatarUrl: "",
  emailPublic: "",
  phonePublic: "",
  whatsappUrl: "",
  githubUrl: "",
  behanceUrl: "",
  linkedinUrl: "",
  instagramUrl: "",
  source: "fallback",
};

function clean(value: string | null | undefined) {
  return value?.trim() ?? "";
}

function mapProfile(row: SupabaseProfileRow): PublicProfile {
  return {
    fullName: clean(row.full_name) || siteConfig.name,
    displayName: clean(row.display_name) || clean(row.full_name) || siteConfig.name,
    headline: clean(row.headline) || siteConfig.shortTitle,
    bio: clean(row.bio) || siteConfig.description,
    avatarUrl: clean(row.avatar_url),
    emailPublic: clean(row.email_public),
    phonePublic: clean(row.phone_public),
    whatsappUrl: clean(row.whatsapp_url),
    githubUrl: clean(row.github_url),
    behanceUrl: clean(row.behance_url),
    linkedinUrl: clean(row.linkedin_url),
    instagramUrl: clean(row.instagram_url),
    source: "supabase",
  };
}

function toPhoneHref(phone: string) {
  const normalized = phone.replace(/[^\d+]/g, "");

  return normalized ? `tel:${normalized}` : "";
}

function createLink(
  label: string,
  value: string,
  href: string,
  kind: string,
  external = true
): PublicContactLink | null {
  if (!value || !href) {
    return null;
  }

  return { label, value, href, kind, external };
}

function profileLinks(profile: PublicProfile) {
  return [
    createLink(
      "E-mail",
      profile.emailPublic,
      profile.emailPublic ? `mailto:${profile.emailPublic}` : "",
      "email",
      false
    ),
    createLink(
      "Telefone",
      profile.phonePublic,
      toPhoneHref(profile.phonePublic),
      "phone",
      false
    ),
    createLink("WhatsApp", "Abrir conversa", profile.whatsappUrl, "whatsapp"),
    createLink("GitHub", "Ver perfil", profile.githubUrl, "github"),
    createLink("Behance", "Ver portfolio", profile.behanceUrl, "behance"),
    createLink("LinkedIn", "Ver perfil", profile.linkedinUrl, "linkedin"),
    createLink("Instagram", "Ver perfil", profile.instagramUrl, "instagram"),
  ].filter((link): link is PublicContactLink => Boolean(link));
}

function mapContactLink(row: SupabaseContactLinkRow): PublicContactLink | null {
  return createLink(row.label, row.url, row.url, row.type);
}

export async function getPublicProfile(): Promise<PublicProfile> {
  if (!hasSupabasePublicEnv()) {
    return fallbackProfile;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .order("updated_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error || !data) {
      return fallbackProfile;
    }

    return mapProfile(data);
  } catch {
    return fallbackProfile;
  }
}

export async function getPublicContactLinks(profile: PublicProfile) {
  const links = profileLinks(profile);

  if (!hasSupabasePublicEnv()) {
    return links;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("contact_links")
      .select("*")
      .eq("visible", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error || !data) {
      return links;
    }

    const extraLinks = data
      .map(mapContactLink)
      .filter((link): link is PublicContactLink => Boolean(link));

    return [...links, ...extraLinks];
  } catch {
    return links;
  }
}
