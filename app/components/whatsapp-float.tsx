import { MessageCircle } from "lucide-react";
import { CONTACT } from "./nav-data";

export default function WhatsAppFloat() {
  return (
    <a
      className="whatsapp-float site-whatsapp-float"
      href={CONTACT.whatsappHref}
      aria-label="Contact Apex Mind on WhatsApp"
    >
      <MessageCircle size={24} strokeWidth={1.5} aria-hidden="true" />
    </a>
  );
}
