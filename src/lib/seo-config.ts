export const SITE_CONFIG = {
  name: "Girish Lade",
  fullName: "Girish Balaso Lade",
  title: "Girish Lade | Full-Stack Developer, UI/UX Designer & LadeStack Founder",
  description:
    "Portfolio of Girish Balaso Lade, a UI/UX designer and full-stack developer in Pune, India building LadeStack, privacy-first developer tools, and modern web applications.",
  siteUrl: "https://ladestack.in",
  defaultOgImage: "https://ladestack.in/og-image.jpg",
  author: "Girish Lade",
  email: "admin@ladestack.in",
  location: "Pune, Maharashtra, India",
  socials: {
    github: "https://github.com/girishlade111",
    linkedin: "https://linkedin.com/in/girish-lade/",
    instagram: "https://instagram.com/girish_lade_/",
  },
  keywords: [
    "Girish Lade",
    "Girish Balaso Lade",
    "LadeStack",
    "UI/UX Designer",
    "Full-Stack Developer",
    "Pune Developer",
    "React Developer",
    "Frontend Engineer",
    "TypeScript",
    "Web Applications",
    "Privacy Tools",
    "Developer Ecosystem",
  ],
};

export const createBreadcrumbSchema = (
  items: Array<{ name: string; url: string }>
) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http")
        ? item.url
        : `${SITE_CONFIG.siteUrl}${item.url}`,
    })),
  };
};
