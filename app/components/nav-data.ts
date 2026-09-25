// Single source of truth for site navigation and footer links.
// Provisional structure per the approved core sitemap (copy-drafts.md).

export type NavChild = { href: string; label: string; description?: string };
export type NavItem = { href: string; label: string; children?: NavChild[] };

export const CONTACT = {
  email: "aryan@apexminds.in",
  whatsappNumber: "+91 8052799799",
  whatsappHref:
    "https://wa.me/918052799799?text=Hi%20Aryan%2C%20I%27d%20like%20to%20discuss%20a%20project%20with%20Apex%20Mind.",
  responseNote: "We respond within one working day.",
} as const;

// Registrations confirmed by the founder; certificate details and official marks
// pending. ISO 27001 wording/scope to be confirmed before launch.
export const credentials = [
  "Registered LLP",
  "GST",
  "MSME / Udyam",
  "Startup India",
  "ISO 27001:2022",
  "GeM",
];

export const capabilityChildren: NavChild[] = [
  {
    href: "/what-we-do/build",
    label: "Software development",
    description: "Web apps, SaaS products, internal tools, and modernization.",
  },
  {
    href: "/what-we-do/intelligence",
    label: "Applied AI",
    description: "Document AI, agents, and retrieval built for practical tasks.",
  },
  {
    href: "/what-we-do/automate",
    label: "Automate",
    description: "Workflow automation and system integrations.",
  },
  {
    href: "/what-we-do/rpa",
    label: "RPA",
    description: "Bots for systems with no API — legacy portals and desktop apps.",
  },
  {
    href: "/what-we-do/web-seo",
    label: "Web & SEO",
    description: "High-performance sites, technical SEO, and AI-search readiness.",
  },
];

export const primaryNav: NavItem[] = [
  { href: "/what-we-do", label: "What we do", children: capabilityChildren },
  { href: "/solutions", label: "Solutions" },
  { href: "/how-we-work", label: "How we work" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/about", label: "About" },
];

export const footerColumns: { title: string; links: NavChild[] }[] = [
  {
    title: "What we do",
    links: capabilityChildren,
  },
  {
    title: "Studio",
    links: [
      { href: "/solutions", label: "Solutions" },
      { href: "/how-we-work", label: "How we work" },
      { href: "/case-studies", label: "Case studies" },
      { href: "/blog", label: "Blog" },
      { href: "/about", label: "About" },
      { href: "/government", label: "Government" },
    ],
  },
  {
    title: "Start",
    links: [
      { href: "/start", label: "Find a starting point" },
      { href: "/contact", label: "Contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/legal/privacy", label: "Privacy" },
      { href: "/legal/terms", label: "Terms" },
      { href: "/legal/cookies", label: "Cookies" },
    ],
  },
];
