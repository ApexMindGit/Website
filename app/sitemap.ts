import type { MetadataRoute } from "next";
import { blogPosts } from "./components/blog-data";
import { caseStudies } from "./components/case-studies-data";

const SITE = "https://apexminds.in";

// Indexable marketing routes. /contact/received and /_design are excluded.
const staticRoutes = [
  "",
  "/what-we-do",
  "/what-we-do/build",
  "/what-we-do/intelligence",
  "/what-we-do/automate",
  "/what-we-do/rpa",
  "/what-we-do/web-seo",
  "/solutions",
  "/how-we-work",
  "/case-studies",
  "/blog",
  "/about",
  "/government",
  "/contact",
  "/start",
  "/legal/privacy",
  "/legal/terms",
  "/legal/cookies",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const latestPost = blogPosts.reduce(
    (latest, p) => (p.updated > latest ? p.updated : latest),
    "",
  );
  return [
    ...staticRoutes.map((path) => ({
      url: `${SITE}${path}`,
      ...(path === "/blog" && latestPost && { lastModified: latestPost }),
    })),
    ...caseStudies.map((c) => ({ url: `${SITE}/case-studies/${c.slug}` })),
    ...blogPosts.map((p) => ({
      url: `${SITE}/blog/${p.slug}`,
      lastModified: p.updated,
    })),
  ];
}
