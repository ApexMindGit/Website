import type { MetadataRoute } from "next";

// Search engines and AI search/answer crawlers are all allowed (see PRD §4:
// the site is indexable). The confirmation page carries no content.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/contact/received"] }],
    sitemap: "https://apexminds.in/sitemap.xml",
    host: "https://apexminds.in",
  };
}
