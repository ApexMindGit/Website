import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "@fontsource-variable/inter";
import "@fontsource-variable/jetbrains-mono";
import "./globals.css";
import "./studio.css";
import "./site.css";

export const metadata: Metadata = {
  title: {
    default: "Apex Mind — Software, AI & automation consultancy",
    template: "%s — Apex Mind",
  },
  description:
    "Apex Mind is a software consultancy in Lucknow, India, helping teams build software, apply AI, and automate workflows.",
  metadataBase: new URL("https://apexminds.in"),
  openGraph: {
    type: "website",
    siteName: "Apex Mind",
    locale: "en_IN",
    url: "https://apexminds.in",
    title: "Apex Mind — Software, AI & automation consultancy",
    description:
      "Founder-led software consultancy in Lucknow, India, helping startups and public-sector teams build software, apply AI, and automate workflows.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Mind — Software, AI & automation consultancy",
    description:
      "Founder-led software consultancy in Lucknow, India, helping teams build software, apply AI, and automate workflows.",
  },
  // Preview build: keep the whole site out of search until launch.
  robots: { index: false, follow: false },
  // Icons are provided by the App Router file convention:
  // app/favicon.ico, app/icon.png, app/apple-icon.png.
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
