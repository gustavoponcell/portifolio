function cleanSiteUrl(value: string | undefined) {
  const fallback = "http://localhost:3000";
  const url = value?.trim() || fallback;

  return url.replace(/\/+$/, "");
}

const siteUrl = cleanSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const siteConfig = {
  name: "Gustavo Poncell",
  author: "Gustavo Poncell",
  title: "Gustavo Poncell | Design + Desenvolvimento",
  shortTitle: "Design + Desenvolvimento",
  description:
    "Portfolio pessoal de Gustavo Poncell reunindo projetos de design, desenvolvimento, curriculo e contato.",
  keywords: [
    "portfolio",
    "design",
    "desenvolvimento",
    "frontend",
    "ui design",
    "gustavo poncell",
  ],
  locale: "pt_BR",
  url: siteUrl,
  ogImage: `${siteUrl}/window.svg`,
  mainNav: [
    { title: "Inicio", href: "/" },
    { title: "Design", href: "/design" },
    { title: "Dev", href: "/dev" },
    { title: "Contato", href: "/contato" },
  ],
  adminNav: { title: "Admin", href: "/admin" },
  publicRoutes: ["/", "/design", "/dev", "/contato"],
  noIndexRoutes: ["/admin", "/login", "/api"],
  githubUsername: "gustavoponcell",
  externalLinks: [],
};
