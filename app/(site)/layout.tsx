import SiteHeader from "../components/site-nav";
import SiteFooter from "../components/site-footer";
import WhatsAppFloat from "../components/whatsapp-float";

export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
      <WhatsAppFloat />
    </>
  );
}
