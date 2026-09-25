import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Arrow, CTABand } from "../../../components/ui";
import BlogContent, { Inline, slugifyHeading } from "../../../components/blog-content";
import {
  BLOG_AUTHOR,
  blogPosts,
  formatPostDate,
  getBlogPost,
  readingMinutes,
} from "../../../components/blog-data";
import { getCaseStudy } from "../../../components/case-studies-data";

const SITE = "https://apexminds.in";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: BLOG_AUTHOR.name, url: BLOG_AUTHOR.url }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${post.slug}`,
      title: post.title,
      description: post.description,
      publishedTime: post.published,
      modifiedTime: post.updated,
      authors: [BLOG_AUTHOR.url],
    },
    twitter: { title: post.title, description: post.description },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const url = `${SITE}/blog/${post.slug}`;
  const headings = post.body.filter((b) => b.type === "h2");
  const related = post.relatedCaseStudies
    .map(getCaseStudy)
    .filter((c) => c !== undefined);
  const morePosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: url,
    datePublished: post.published,
    dateModified: post.updated,
    keywords: post.keywords.join(", "),
    articleSection: post.category,
    author: {
      "@type": "Person",
      name: BLOG_AUTHOR.name,
      jobTitle: BLOG_AUTHOR.role,
      url: BLOG_AUTHOR.url,
    },
    publisher: {
      "@type": "Organization",
      name: "Apex Mind",
      url: SITE,
      logo: { "@type": "ImageObject", url: `${SITE}/icon.png` },
    },
    ...(post.sources.length > 0 && {
      citation: post.sources.map((s) => ({ "@type": "CreativeWork", name: s.label, url: s.href })),
    }),
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: url },
    ],
  };

  return (
    <>
      <article>
        <section className="page-hero container blog-hero">
          <div className="page-hero-main">
            <p className="eyebrow">
              <Link href="/blog">Blog</Link> / {post.category}
            </p>
            <h1 className="display-md blog-title">{post.title}</h1>
            <p className="page-hero-intro">{post.excerpt}</p>
          </div>
          <div className="page-hero-meta">
            <div>
              <span className="mono-label">Written by</span>
              <p>
                <a href={BLOG_AUTHOR.url} rel="author">
                  {BLOG_AUTHOR.name}
                </a>
                , {BLOG_AUTHOR.role}
              </p>
            </div>
            <div>
              <span className="mono-label">Published</span>
              <p>
                <time dateTime={post.published}>{formatPostDate(post.published)}</time>
                {post.updated !== post.published && (
                  <>
                    {" · Updated "}
                    <time dateTime={post.updated}>{formatPostDate(post.updated)}</time>
                  </>
                )}
              </p>
            </div>
            <div>
              <span className="mono-label">Reading time</span>
              <p>{readingMinutes(post)} minutes</p>
            </div>
          </div>
        </section>

        <section className="section container">
          <div className="content-columns">
            <div className="prose blog-prose">
              <div className="blog-tldr">
                <span className="mono-label">Short answer</span>
                <ul>
                  {post.tldr.map((t, i) => (
                    <li key={i}>
                      <Inline text={t} />
                    </li>
                  ))}
                </ul>
              </div>

              <BlogContent blocks={post.body} />

              <h2 id="faq">Frequently asked questions</h2>
              <div className="blog-faq">
                {post.faq.map((f) => (
                  <div key={f.q}>
                    <h3>{f.q}</h3>
                    <p>{f.a}</p>
                  </div>
                ))}
              </div>

              {post.sources.length > 0 && (
                <div className="blog-sources">
                  <span className="mono-label">Sources</span>
                  <ol>
                    {post.sources.map((s) => (
                      <li key={s.href}>
                        <a href={s.href} target="_blank" rel="noopener noreferrer">
                          {s.label}
                        </a>
                      </li>
                    ))}
                  </ol>
                </div>
              )}
            </div>

            <aside className="blog-aside">
              <nav className="aside-block" aria-label="On this page">
                <span className="mono-label">On this page</span>
                <ol className="blog-toc">
                  {headings.map((h) => (
                    <li key={h.text}>
                      <a href={`#${h.id ?? slugifyHeading(h.text)}`}>{h.text}</a>
                    </li>
                  ))}
                  <li>
                    <a href="#faq">FAQ</a>
                  </li>
                </ol>
              </nav>
              <div className="aside-block">
                <span className="mono-label">Related capability</span>
                <p>
                  <Link className="text-link" href={post.capabilityHref}>
                    <Arrow />
                    {post.category}
                  </Link>
                </p>
              </div>
            </aside>
          </div>

          {related.length > 0 && (
            <>
              <div className="subsection-title">
                <h2 className="h4">From our case studies</h2>
                <Link className="mono-sm" href="/case-studies">
                  All work →
                </Link>
              </div>
              <div className="card-grid two">
                {related.map((c) => (
                  <Link key={c.slug} href={`/case-studies/${c.slug}`} className="feature-card">
                    <span className="eyebrow">{c.industry}</span>
                    <h3 style={{ fontSize: "22px" }}>{c.title}</h3>
                    <p>{c.result}</p>
                    <span className="card-cta">
                      Read case study <Arrow diagonal />
                    </span>
                  </Link>
                ))}
              </div>
            </>
          )}

          {morePosts.length > 0 && (
            <>
              <div className="subsection-title">
                <h2 className="h4">Keep reading</h2>
                <Link className="mono-sm" href="/blog">
                  All posts →
                </Link>
              </div>
              <div className="card-grid two">
                {morePosts.map((p) => (
                  <Link key={p.slug} href={`/blog/${p.slug}`} className="feature-card">
                    <span className="eyebrow">{p.category}</span>
                    <h3 style={{ fontSize: "22px" }}>{p.title}</h3>
                    <p>{p.excerpt}</p>
                    <span className="card-cta">
                      Read post <Arrow diagonal />
                    </span>
                  </Link>
                ))}
              </div>
            </>
          )}
        </section>
      </article>

      <CTABand
        title={
          <>
            Want help
            <br />
            putting this to work?
          </>
        }
        body="Tell us what you are trying to build, automate, or improve."
      />

      {[articleSchema, faqSchema, breadcrumbSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
