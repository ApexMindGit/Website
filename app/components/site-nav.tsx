"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { primaryNav } from "./nav-data";
import { Arrow } from "./ui";
import Button from "./button";

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(href + "/");
}

export default function SiteHeader() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hidden, setHidden] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const menuPanel = useRef<HTMLDivElement>(null);

  // Close the mobile menu on route change.
  useEffect(() => {
    setMenuOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Hide the header when scrolling down, reveal it as soon as you scroll up.
  useEffect(() => {
    let last = window.scrollY;
    let raf = 0;
    const check = () => {
      raf = 0;
      const y = window.scrollY;
      if (menuOpen) {
        setHidden(false);
      } else if (y > last && y > 120) {
        setHidden(true);
      } else if (y < last) {
        setHidden(false);
      }
      last = y;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [menuOpen]);

  // Mobile menu: lock scroll, focus first link, trap focus, Escape to close.
  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuPanel.current?.querySelector<HTMLAnchorElement>("a")?.focus();
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      document.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <header className={`site-header${hidden ? " is-hidden" : ""}`}>
      <div className="container nav-inner">
        <Link className="wordmark" href="/" aria-label="Apex Mind, home">
          <span
            className={`logo-mark ${isHome ? "logo-mark-on-dark" : "logo-mark-on-light"}`}
            aria-hidden="true"
          >
            <img src="/brand/apex-mind-mark.png" alt="" />
          </span>
          <span>
            APEX MIND<span className="wordmark-dot">.</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="desktop-nav">
          {primaryNav.map((item) =>
            item.children ? (
              <div
                key={item.href}
                className="nav-dropdown"
                onMouseEnter={() => setOpenDropdown(item.href)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={item.href}
                  className="nav-dropdown-trigger"
                  aria-current={isActive(pathname, item.href) ? "page" : undefined}
                  aria-expanded={openDropdown === item.href}
                  onFocus={() => setOpenDropdown(item.href)}
                >
                  {item.label}
                  <ChevronDown size={14} strokeWidth={1.75} aria-hidden="true" />
                </Link>
                <div
                  className="nav-dropdown-panel"
                  data-open={openDropdown === item.href}
                >
                  {item.children.map((child) => (
                    <Link key={child.href} href={child.href}>
                      <span>{child.label}</span>
                      {child.description && <span>{child.description}</span>}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(pathname, item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <Button
          href="/contact"
          variant={isHome ? "light" : "default"}
          className="nav-cta"
        >
          Let&rsquo;s talk
        </Button>

        <button
          className="menu-toggle"
          ref={menuButton}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {menuOpen && (
        <div id="mobile-menu" ref={menuPanel} className="mobile-menu">
          <nav aria-label="Mobile">
            {primaryNav.map((item) => (
              <div key={item.href}>
                <Link href={item.href}>
                  {item.label}
                  <Arrow />
                </Link>
                {item.children && (
                  <div className="mobile-submenu">
                    {item.children.map((child) => (
                      <Link key={child.href} href={child.href}>
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/contact" className="mobile-cta">
              Contact
              <Arrow diagonal />
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
