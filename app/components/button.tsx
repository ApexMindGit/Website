import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "default" | "light" | "secondary";
  className?: string;
  ariaLabel?: string;
};

function isExternal(href: string) {
  return /^(https?:|mailto:|tel:|wa\.me|#)/.test(href);
}

/** Primary pill button with a layered hover interaction: the black chip expands
    left→right to fill the button, the dark label slides up while a white label
    rises from below, and the arrow slides out to the left as a new white arrow
    enters from the left. */
export default function Button({
  children,
  href,
  type = "button",
  disabled,
  variant = "default",
  className = "",
  ariaLabel,
}: ButtonProps) {
  const secondary = variant === "secondary";
  const cls = [
    "btn",
    variant === "light" ? "btn-light" : "",
    secondary ? "btn-secondary" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  // Secondary: a plain pill (no arrow chip / fill) whose label does a blurred
  // vertical swap and whose background lightens on hover.
  const inner = secondary ? (
    <span className="btn-label">
      <span className="btn-label-out">{children}</span>
      <span className="btn-label-in" aria-hidden="true">
        {children}
      </span>
    </span>
  ) : (
    <>
      <span className="btn-fill" aria-hidden="true" />
      <span className="btn-icon" aria-hidden="true">
        <span className="btn-icon-out">
          <ArrowRight size={18} strokeWidth={1.75} />
        </span>
        <span className="btn-icon-in">
          <ArrowRight size={18} strokeWidth={1.75} />
        </span>
      </span>
      <span className="btn-label">
        <span className="btn-label-out">{children}</span>
        <span className="btn-label-in" aria-hidden="true">
          {children}
        </span>
      </span>
    </>
  );

  if (href && !isExternal(href)) {
    return (
      <Link href={href} className={cls} aria-label={ariaLabel}>
        {inner}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} className={cls} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} className={cls} disabled={disabled} aria-label={ariaLabel}>
      {inner}
    </button>
  );
}
