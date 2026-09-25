import Link from "next/link";
import type { BlogBlock } from "./blog-data";

// Renders the tiny inline markup used in blog-data.ts:
// [label](href) → link (internal via next/link), **text** → <strong>.
export function Inline({ text }: { text: string }) {
  const parts = text.split(/(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, href] = link;
          return href.startsWith("/") ? (
            <Link key={i} href={href}>
              {label}
            </Link>
          ) : (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          );
        }
        const bold = part.match(/^\*\*([^*]+)\*\*$/);
        if (bold) return <strong key={i}>{bold[1]}</strong>;
        return part;
      })}
    </>
  );
}

export function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function BlogContent({ blocks }: { blocks: BlogBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i}>
                <Inline text={block.text} />
              </p>
            );
          case "h2":
            return (
              <h2 key={i} id={block.id ?? slugifyHeading(block.text)}>
                {block.text}
              </h2>
            );
          case "h3":
            return <h3 key={i}>{block.text}</h3>;
          case "ul":
          case "ol": {
            const List = block.type;
            return (
              <List key={i}>
                {block.items.map((item, j) => (
                  <li key={j}>
                    <Inline text={item} />
                  </li>
                ))}
              </List>
            );
          }
          case "callout":
            return (
              <div key={i} className="blog-callout">
                <span className="mono-label">{block.label}</span>
                <p>
                  <Inline text={block.text} />
                </p>
              </div>
            );
          case "table":
            return (
              <div key={i} className="blog-table-wrap">
                <table className="blog-table">
                  {block.caption && <caption>{block.caption}</caption>}
                  <thead>
                    <tr>
                      {block.head.map((h, j) => (
                        <th key={j} scope="col">
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr key={j}>
                        {row.map((cell, k) =>
                          k === 0 ? (
                            <th key={k} scope="row">
                              <Inline text={cell} />
                            </th>
                          ) : (
                            <td key={k}>
                              <Inline text={cell} />
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </>
  );
}
