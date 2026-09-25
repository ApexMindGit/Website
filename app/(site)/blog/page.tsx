import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, CTABand, Arrow } from "../../components/ui";
import {
  BLOG_AUTHOR,
  formatPostDate,
  readingMinutes,
  sortedBlogPosts,
} from "../../components/blog-data";

export const metadata: Metadata = {
  title: "Blog — Software, AI & automation guides",
  description:
    "Practical guides on AI agents, workflow automation, RPA, MVP development, and technical SEO from the founder-led team at Apex Mind.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    title: "Apex Mind blog — Software, AI & automation guides",
    description:
      "Practical guides on AI agents, workflow automation, RPA, MVP development, and technical SEO.",
  },
};

const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "Apex Mind blog",
  url: "https://apexminds.in/blog",
  publisher: { "@type": "Organization", name: "Apex Mind", url: "https://apexminds.in" },
  blogPost: sortedBlogPosts.map((p) => ({
    "@type": "BlogPosting",
    headline: p.title,
    url: `https://apexminds.in/blog/${p.slug}`,
    datePublished: p.published,
    dateModified: p.updated,
    author: { "@type": "Person", name: BLOG_AUTHOR.name, url: BLOG_AUTHOR.url },
  })),
};

export default function BlogIndex() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Notes from
            <br />
            the build.
          </>
        }
        intro="Practical guides on software, applied AI, automation, and search — written from the projects we ship, not from theory."
      />

      <section className="section container">
        <div className="work-index-pattern">
          {sortedBlogPosts.map((post, i) => (
            <Link
              key={post.slug}
              className={`work-index-row${i === 0 ? " strategic-blue" : ""}`}
              href={`/blog/${post.slug}`}
            >
              <div>
                <span className="eyebrow">
                  {post.category} / {readingMinutes(post)} min read
                </span>
                <h4>{post.title}</h4>
              </div>
              <p>
                {post.excerpt}
                <span className="blog-index-date">
                  <time dateTime={post.published}>{formatPostDate(post.published)}</time>
                </span>
              </p>
              <span className="work-index-arrow">
                <Arrow diagonal />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <CTABand
        title={
          <>
            Have a problem
            <br />
            worth writing about?
          </>
        }
        body="Tell us what you are trying to build, automate, or improve."
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />
    </>
  );
}
