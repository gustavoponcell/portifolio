function cleanSiteUrl(value: string | undefined) {
  const defaultUrl = "http://localhost:3000";
  const url = value?.trim() || defaultUrl;

  return url.replace(/\/+$/, "");
}

const siteUrl = cleanSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const siteConfig = {
  name: "Gustavo Poncell",
  author: "Gustavo Poncell",
  title: "Gustavo Poncell | Design + Desenvolvimento",
  shortTitle: "Design + Desenvolvimento",
  description:
    "Portfólio de Gustavo Poncell, designer e desenvolvedor em formação, com projetos de identidade visual, interfaces, desenvolvimento web e experiências digitais.",
  keywords: [
    "portfólio",
    "design",
    "desenvolvimento",
    "frontend",
    "ui design",
    "gustavo poncell",
  ],
  locale: "pt_BR",
  url: siteUrl,
  ogImage: `${siteUrl}/og`,
  mainNav: [
    { title: "Início", href: "/" },
    { title: "Design", href: "/design" },
    { title: "Dev", href: "/dev" },
    { title: "Contato", href: "/contato" },
  ],
  restrictedNav: { title: "Área restrita", href: "/admin" },
  publicRoutes: ["/", "/design", "/dev", "/contato"],
  noIndexRoutes: ["/admin", "/login", "/api"],
  githubUsername: "gustavoponcell",
  externalLinks: [],
};
