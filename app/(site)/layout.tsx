import SiteHeader from "../components/site-nav";
import SiteFooter from "../components/site-footer";
import WhatsAppFloat from "../components/whatsapp-float";
import ThemeShell from "../components/theme-shell";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <ThemeShell>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <WhatsAppFloat />
    </ThemeShell>
  );
}
